'use client';
import { Dispatch, SetStateAction } from 'react';
import style from './directory.module.css';
import NoPokemonFound from './NoPokemonFound';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import { PokemonMetadata } from '@/app/types/Pokemon';

interface Props {
  pokemon: PokemonMetadata[];
  setSelectedPokemon: Dispatch<SetStateAction<string | undefined>>;
  searchTerm: string;
  loading: boolean;
  selectedPokemon?: string;
}

/**
 * Will highlight the search term within each pokemon's name that contains
 * the search term as a substring. This will make it easier for the user to
 * see why a pokemon is being shown as a respone to their search.
 */
function highlightMatchedText(name: string, searchTerm: string) {
  const strArray = name.split(new RegExp(`(${searchTerm})`, 'gi')); // global, case-insensitive
  return (
    <>
      {strArray.map((subStr, index) =>
        subStr.toLowerCase() === searchTerm.toLowerCase() ? <strong key={index}>{subStr}</strong> : subStr
      )}
    </>
  );
}

export default function PokemonList({ pokemon, setSelectedPokemon, selectedPokemon, loading, searchTerm }: Props) {
  return (
    <div className={`list-group ${style.pokemonList}`}>
      {!loading && !pokemon.length ? (
        <NoPokemonFound />
      ) : (
        pokemon
          .filter((mon: PokemonMetadata) => mon.name.toLowerCase().includes(searchTerm))
          .map((mon: PokemonMetadata) => {
            return (
              <button
                key={mon.id}
                type="button"
                className={`list-group-item list-group-item-action ${style.pokemonListItem}`}
                onClick={() => setSelectedPokemon(mon.name)}
                // using style here because I need to use a conditional on a pokemon's's attributes,
                // which I cannot access in css
                style={
                  mon.name === selectedPokemon
                    ? {
                        backgroundColor: 'green',
                        color: 'white'
                      }
                    : undefined
                }
              >
                No. {mon.id + ': '}
                {highlightMatchedText(capitalizeFirstLetterOfString(mon.name), searchTerm)}
              </button>
            );
          })
      )}
    </div>
  );
}
