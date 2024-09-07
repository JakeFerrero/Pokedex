'use client';
import { Dispatch, SetStateAction } from 'react';
import style from './directory.module.css';
import NoPokemonFound from './NoPokemonFound';

const SITE_BLUE = '#0047AB';

interface Props {
  pokemon: string[];
  setSelectedPokemon: Dispatch<SetStateAction<string | undefined>>;
  searchTerm: string;
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

export default function PokemonList({ pokemon, setSelectedPokemon, selectedPokemon, searchTerm }: Props) {
  return (
    <div className={`list-group ${style.pokemonList}`}>
      {!pokemon.length ? (
        <NoPokemonFound />
      ) : (
        pokemon
          .filter((name: string) => name.toLowerCase().includes(searchTerm))
          .map((name: string, index: number) => {
            return (
              <button
                key={index}
                type="button"
                className={`list-group-item list-group-item-action ${style.pokemonListItem}`}
                onClick={() => setSelectedPokemon(name)}
                // using style here because I need to use a conditional on a pokemon's's attributes,
                // which I cannot access in css
                style={
                  name === selectedPokemon
                    ? {
                        backgroundColor: 'grey',
                        borderColor: 'grey',
                        color: 'white'
                      }
                    : undefined
                }
              >
                {highlightMatchedText(name.charAt(0).toUpperCase() + name.slice(1), searchTerm)}
              </button>
            );
          })
      )}
    </div>
  );
}
