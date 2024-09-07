import { FlavorTextEntry, GetPokemonResult, GetSpeciesResponse, ListPokemonResult, Stat } from '../types/PokeApi';
import { Pokemon, Stats } from '../types/Pokemon';
import { PokemonCache } from './PokemonCache';

const GENERATION_POKEMON_COUNT: Record<string, number> = {
  '1': 151,
  '2': 100,
  '3': 135,
  '4': 107,
  '5': 156
};

interface GetPokemonDetails {
  id: number;
  name: string;
  abilities: string[];
  types: string[];
  spriteUrl: string;
  stats: Stats;
}

interface GetSpeciesDetails {
  eggGroups: string[];
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

  async getPokemonByGeneration(generation: number): Promise<string[]> {
    const count = GENERATION_POKEMON_COUNT['' + generation];

    function buildOffset(targetGeneration: number): number {
      let offset = 0;
      for (const [gen, numPokemon] of Object.entries(GENERATION_POKEMON_COUNT)) {
        if (gen === '' + targetGeneration) break;
        offset += numPokemon;
      }
      return offset;
    }

    const offset = buildOffset(generation);
    const apiResponse = await fetch(this.baseUrl + `pokemon/?limit=${count}&offset=${offset}`);
    return ((await apiResponse.json()).results as ListPokemonResult[]).map((mon) => mon.name) ?? [];
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
      name: resp.name.charAt(0).toUpperCase() + resp.name.slice(1),
      spriteUrl: resp.sprites.front_default,
      abilities: resp.abilities.map((a) => a.ability.name) ?? [],
      types: resp.types.map((t) => t.type.name) ?? [],
      stats: this.buildStats(resp.stats)
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
      eggGroups: resp.egg_groups.map(e => e.name) ?? [],
      evolvesFrom: resp.evolves_from_species?.name,
      flavorText: this.findFirstEnglishFlavorText(resp.flavor_text_entries)
    };
  }

  private findFirstEnglishFlavorText(flavorTextEntries: FlavorTextEntry[]): string | undefined {
    return flavorTextEntries.find(entry => {
      return entry.language.name === 'en';
    })?.flavor_text;
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
