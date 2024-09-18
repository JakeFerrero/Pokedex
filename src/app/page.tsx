'use client';
import { useEffect, useState } from 'react';
import Directory from './components/directory/Directory';
import Profile from './components/profile/Profile';
import style from './page.module.css';
import { Pokemon, PokemonMetadata } from './types/Pokemon';
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
      let pokemon: PokemonMetadata[] = [];
      try {
        pokemon = await client.getPokemonByGeneration(1);
        setErrorFetchingPokemonNames(false);
      } catch (error) {
        console.error('Could not fetch list of Pokemon.', error);
        setErrorFetchingPokemonNames(true);
      }
      setPokemon(pokemon);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    // only make the API call once a pokemon has been selected
    selectedPokemon &&
      (async () => {
        // when the selected pokemon changes, reset details
        setSelectedPokemonDetails(undefined);
        setProfileLoading(true);
        let details: Pokemon | undefined;
        try {
          details = await client.getPokemonByName(selectedPokemon);
          setErrorFetchingPokemonDetails(false);
        } catch (error) {
          console.error('Could not fetch information for selected Pokemon.', error);
          setErrorFetchingPokemonDetails(true);
        }
        setSelectedPokemonDetails(details);
        setProfileLoading(false);
      })();
  }, [selectedPokemon]);

  return (
    <div className={style.webAddressBook}>
      <Directory
        pokemon={pokemon}
        loading={loading}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        error={errorFetchingPokemonNames}
      />
      <Profile pokemon={selectedPokemonDeatils} loading={profileLoading} error={errorFetchingPokemonDetails} />
    </div>
  );
}
