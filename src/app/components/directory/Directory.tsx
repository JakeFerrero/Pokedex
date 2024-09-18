import ErrorTriangle from '@/app/components/utils/ErrorTriangle';
import { Dispatch, SetStateAction } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import SearchFilterBox from './SearchFilterBox';
import style from './directory.module.css';
import PokemonList from './PokemonList';
import { PokemonMetadata } from '@/app/types/Pokemon';

interface Props {
  pokemon: PokemonMetadata[];
  loading: boolean;
  selectedPokemon: string | undefined;
  setSelectedPokemon: Dispatch<SetStateAction<string | undefined>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  error: boolean;
}

export default function Directory({
  pokemon,
  loading,
  selectedPokemon,
  setSelectedPokemon,
  searchValue,
  setSearchValue,
  error
}: Props) {
  return (
    <div className={style.directory}>
      <SearchFilterBox setSearchValue={setSearchValue} />
      {loading ? (
        <div className={style.directorySpinnerContainer}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <ErrorTriangle size="small" message="Failed to fetch Pokemon" />
      ) : (
        <PokemonList
          pokemon={pokemon}
          setSelectedPokemon={setSelectedPokemon}
          selectedPokemon={selectedPokemon}
          searchTerm={searchValue}
        />
      )}
    </div>
  );
}
