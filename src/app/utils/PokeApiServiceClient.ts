import {
  FlavorTextEntry,
  Genera,
  GetPokemonResult,
  GetSpeciesResponse,
  ListPokemonResult,
  Stat
} from '../types/PokeApi';
import { Pokemon, PokemonMetadata, Stats, Type } from '../types/Pokemon';
import { Region } from '../types/Regions';
import { capitalizeFirstLetterOfString } from './capitalizeFirstLetterOfString';
import { PokemonCache } from './PokemonCache';
import { sleep } from './sleep';

const REGION_POKEMON_COUNT: Record<Region, number> = {
  'Kanto': 151,
  'Johto': 100,
  'Hoenn': 135
};

interface GetPokemonDetails {
  id: number;
  name: string;
  abilities: string[];
  types: Type[];
  spriteUrl: string;
  stats: Stats;
  height: number;
  weight: number;
}

interface GetSpeciesDetails {
  eggGroups: string[];
  genderRate: number;
  growthRate: string;
  captureRate: number;
  genus?: string;
  evolvesFrom?: string;
  flavorText?: string;
}

/**
 * An HTTP Service Client for getting Pokemon and their details from
 * the PokeAPI.
 *
 * A cache can optionally be provided, and if so, the cache will be used
 * before reaching out to the backend datastore when fetching a pokemon's
 * details.
 */
export class PokeApiServiceClient {
  private baseUrl: string;
  private cache: PokemonCache | undefined;

  constructor(cache?: PokemonCache) {
    this.baseUrl = 'https://pokeapi.co/api/v2/';
    this.cache = cache;
  }

  async getPokemonByRegion(region: Region): Promise<PokemonMetadata[]> {
    await sleep(3000);
    const count = REGION_POKEMON_COUNT[region];

    function buildOffset(targetRegion: Region): number {
      let offset = 0;
      for (const [region, numPokemon] of Object.entries(REGION_POKEMON_COUNT)) {
        if (region === targetRegion) break;
        offset += numPokemon;
      }
      return offset;
    }

    const offset = buildOffset(region);
    const apiResponse = await fetch(this.baseUrl + `pokemon/?limit=${count}&offset=${offset}`);

    /**
     * The url syntax that is returned from the Poke API has the pokemon's number/id
     * as the last portion of the url. So we can use the url to get the pokemon's number
     * since it isn't in the original response.
     */
    const getIdFromUrl = (url: string): number => {
      // https://pokeapi.co/api/v2/pokemon/104/ -> 104
      return parseInt(url.split('/')[6]);
    };

    return (
      ((await apiResponse.json()).results as ListPokemonResult[]).map((mon) => {
        return {
          name: mon.name,
          id: getIdFromUrl(mon.url)
        };
      }) ?? []
    );
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    if (this.cache) {
      const cachedDetails = this.getPokemonFromCache(name);
      if (cachedDetails) return cachedDetails;
    }

    const pokemonDetails = await this.getPokemonDetailsByName(name);
    const speciesDetails = await this.getPokemonSpeciesByName(name);
    const pokemon = {
      ...pokemonDetails,
      ...speciesDetails
    };

    if (this.cache) {
      this.setPokemonInCache(name, pokemon);
    }

    return pokemon;
  }

  private async getPokemonDetailsByName(name: string): Promise<GetPokemonDetails> {
    const apiResponse = await fetch(this.baseUrl + `pokemon/${name}`);
    const resp: GetPokemonResult = await apiResponse.json();
    return {
      id: resp.id,
      name: capitalizeFirstLetterOfString(resp.name),
      spriteUrl: resp.sprites.other['official-artwork'].front_default,
      abilities: resp.abilities.map((a) => a.ability.name) ?? [],
      types: resp.types.map((t) => t.type.name as Type) ?? [],
      stats: this.buildStats(resp.stats),
      height: resp.height / 10, // height from API is in decimeters, convert to m
      weight: resp.weight / 10 // weight from API is in hectograms, convert to kg
    };
  }

  private buildStats(stats: Stat[]): Stats {
    let finalStats: Stats = {} as any;
    stats.forEach((stat: Stat) => {
      finalStats[stat.stat.name] = stat.base_stat;
    });
    return finalStats;
  }

  private async getPokemonSpeciesByName(name: string): Promise<GetSpeciesDetails> {
    const apiResponse = await fetch(this.baseUrl + `pokemon-species/${name}`);
    const resp: GetSpeciesResponse = await apiResponse.json();
    return {
      eggGroups: resp.egg_groups.map((e) => e.name) ?? [],
      evolvesFrom: resp.evolves_from_species?.name,
      flavorText: this.findFirstEnglishFlavorText(resp.flavor_text_entries),
      genus: this.findFirstEnglishGenus(resp.genera),
      genderRate: (resp.gender_rate / 8) * 100, // API returns gender rate as a value out of 8
      growthRate: resp.growth_rate.name,
      captureRate: resp.capture_rate
    };
  }

  private findFirstEnglishFlavorText(flavorTextEntries: FlavorTextEntry[]): string | undefined {
    return flavorTextEntries.find((entry) => {
      return entry.language.name === 'en';
    })?.flavor_text;
  }

  private findFirstEnglishGenus(genera: Genera[]): string | undefined {
    return genera.find((g) => {
      return g.language.name === 'en';
    })?.genus;
  }

  private getPokemonFromCache(name: string): any | undefined {
    try {
      return this.cache!.getPokemonDetails(name);
    } catch (error) {
      console.warn('Could not fetch Pokemon from cache. Failling back to database...', error);
    }
  }

  private setPokemonInCache(name: string, details: any): void {
    try {
      this.cache!.setPokemonDetails(name, details);
    } catch (error) {
      if ((error as any).name === 'QuotaExceededError') {
        console.warn("Browser's local storage full. Clearing Pokemon cache...");
        this.cache!.clear();
      }
      console.warn('Could not set cache.', error);
    }
  }
}
