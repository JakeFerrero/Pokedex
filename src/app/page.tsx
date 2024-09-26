'use client';
import { useEffect, useState } from 'react';
import Directory from './components/directory/Directory';
import Profile from './components/profile/Profile';
import WebsiteHeader from './components/utils/WebsiteHeader';
import style from './page.module.css';
import { Pokemon, PokemonMetadata } from './types/Pokemon';
import { Region } from './types/Regions';
import { PokeApiServiceClient } from './utils/PokeApiServiceClient';
import { CachedPokemon, PokemonCache } from './utils/PokemonCache';

const clearCache = () => localStorage.removeItem('pokemonDetailsCache');
const getCache = () => localStorage.getItem('pokemonDetailsCache');
const setCache = (detailMap: CachedPokemon) => {
  localStorage.setItem('pokemonDetailsCache', JSON.stringify(detailMap));
};
const cache = new PokemonCache(getCache, setCache, clearCache);
const client = new PokeApiServiceClient(cache);

export default function Home() {
  // pokemon, selected pokemon and their details
  const [pokemon, setPokemon] = useState<PokemonMetadata[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>();
  const [selectedPokemonDeatils, setSelectedPokemonDetails] = useState<Pokemon | undefined>();

  // form of pokemon
  const [pokemonForm, setPokemonForm] = useState<string | undefined>();
  const [shiny, setShiny] = useState<boolean>(false);

  // region
  const [region, setRegion] = useState<Region>('Kanto');

  // directory and profile loading status
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // search and filter values
  const [searchValue, setSearchValue] = useState('');

  // track if errors occured fetching pokemon or details
  const [errorFetchingPokemonNames, setErrorFetchingPokemonNames] = useState(false);
  const [errorFetchingPokemonDetails, setErrorFetchingPokemonDetails] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let pokemon: PokemonMetadata[] = [];
      try {
        pokemon = await client.getPokemonByRegion(region);
        setErrorFetchingPokemonNames(false);
      } catch (error) {
        console.error('Could not fetch list of Pokemon.', error);
        setErrorFetchingPokemonNames(true);
      }
      setPokemon(pokemon);
      setLoading(false);
    })();
  }, [region]);

  useEffect(() => {
    // only make the API call once a pokemon has been selected
    selectedPokemon &&
      (async () => {
        // when the selected pokemon changes, reset details, form, and shininess
        setSelectedPokemonDetails(undefined);
        setPokemonForm(undefined);
        setShiny(false);
        setProfileLoading(true);
        let details: Pokemon | undefined;
        try {
          details = await client.getPokemonByName(selectedPokemon);
          setErrorFetchingPokemonDetails(false);
        } catch (error) {
          console.error('Could not fetch information for selected Pokemon.', error);
          setErrorFetchingPokemonDetails(true);
        }

        let typeIconUrls: string[] = [];
        if (details) {
          for (const type of details.types) {
            try {
              const typeUrl = await client.getTypeIconUrl(type);
              typeIconUrls.push(typeUrl);
            } catch (error) {
              console.warn('Could not fetch type icon URL for selected Pokemon.', error);
            }
          }
          if (typeIconUrls.length) details.typeIconUrls = typeIconUrls;
        }

        setSelectedPokemonDetails(details);
        setProfileLoading(false);
      })();
  }, [selectedPokemon]);

  // form change
  useEffect(() => {
    selectedPokemon &&
      (async () => {
        // when the pokemon form changes, reset details and shininess
        setSelectedPokemonDetails(undefined);
        setShiny(false);
        setProfileLoading(true);
        let details: Pokemon | undefined;
        try {
          details = await client.getPokemonByName(selectedPokemon, pokemonForm);
          setErrorFetchingPokemonDetails(false);
        } catch (error) {
          console.error('Could not fetch information for selected Pokemon.', error);
          setErrorFetchingPokemonDetails(true);
        }

        let typeIconUrls: string[] = [];
        if (details) {
          for (const type of details.types) {
            try {
              const typeUrl = await client.getTypeIconUrl(type);
              typeIconUrls.push(typeUrl);
            } catch (error) {
              console.warn('Could not fetch type icon URL for selected Pokemon.', error);
            }
          }
          if (typeIconUrls.length) details.typeIconUrls = typeIconUrls;
        }

        setSelectedPokemonDetails(details);
        setProfileLoading(false);
      })();
  }, [pokemonForm]);
  // TODO: React hook useEffect has a missingDependancy: selectedPokemon

  return (
    <div>
      <WebsiteHeader selectedRegion={region} setRegion={setRegion} />
      <div className={style.pokedex}>
        <Directory
          pokemon={pokemon}
          loading={loading}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          error={errorFetchingPokemonNames}
        />
        <Profile
          pokemon={selectedPokemonDeatils}
          loading={profileLoading}
          error={errorFetchingPokemonDetails}
          currentForm={pokemonForm}
          setForm={setPokemonForm}
          shiny={shiny}
          setShiny={setShiny}
        />
      </div>
    </div>
  );
}
