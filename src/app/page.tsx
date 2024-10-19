'use client';
import { useEffect, useState } from 'react';
import Directory from './components/directory/Directory';
import Profile from './components/profile/Profile';
import WebsiteHeader from './components/utils/WebsiteHeader';
import style from './page.module.css';
import { Pokemon, PokemonDetails, PokemonForm, PokemonMetadata, PokemonSpecies } from './types/Pokemon';
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
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | undefined>();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>();
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<PokemonDetails | undefined>();
  const [selectedPokemonSpecies, setSelectedPokemonSpecies] = useState<PokemonSpecies | undefined>();

  // form of pokemon
  const [formIdx, setFormIdx] = useState<number>(0);
  const [pokemonForm, setPokemonForm] = useState<PokemonForm | undefined>();
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
        pokemon = await client.getPokemonListByRegion(region);
        setErrorFetchingPokemonNames(false);
      } catch (error) {
        console.error('Could not fetch list of Pokemon.', error);
        setErrorFetchingPokemonNames(true);
      }
      setPokemon(pokemon);
      setLoading(false);
    })();
  }, [region]);

  // species
  useEffect(() => {
    selectedPokemonId &&
      (async () => {
        setPokemonForm(undefined);
        setFormIdx(0);
        setShiny(false);
        setProfileLoading(true);

        let species: PokemonSpecies | undefined;
        try {
          species = await client.getPokemonSpeciesById(selectedPokemonId);
        } catch (error) {
          console.error('Could not fetch species data for selected Pokemon.', error);
          setErrorFetchingPokemonDetails(true);
        }

        setSelectedPokemonSpecies(species);
        setProfileLoading(false);
        console.log('species done: ', selectedPokemonSpecies);
      })();
  }, [selectedPokemonId]);

  // details
  useEffect(() => {
    selectedPokemonId &&
      (async () => {
        setShiny(false);
        setProfileLoading(true);

        let details: PokemonDetails | undefined;
        try {
          const id =
            pokemonForm?.type === 'variety' && pokemonForm.name !== 'default'
              ? pokemonForm.name
              : selectedPokemonId.toString();
          details = await client.getPokemonDetailsByNameOrId(id);

          if (pokemonForm?.type === 'form') {
            const formDetails = await client.getPokemonForm(pokemonForm.name);
            details = {
              ...details,
              ...formDetails
            };
          }
        } catch (error) {
          console.error('Could not fetch details for selected Pokemon.', error);
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
  }, [selectedPokemonId, pokemonForm]);

  useEffect(() => {
    function buildPokemonFormsArray(id: number, varieties: string[], altForms: string[]): PokemonForm[] {
      const forms: PokemonForm[] = [{ type: 'variety', id, name: 'default' }];
      varieties.forEach((variety) => {
        forms.push({
          id,
          type: 'variety',
          name: variety
        });
      });
      altForms.forEach((form) => {
        forms.push({
          id,
          type: 'form',
          name: form
        });
      });
      return forms;
    }

    selectedPokemonDetails &&
      selectedPokemonSpecies &&
      (() => {
        const pokemon: Pokemon = {
          ...selectedPokemonSpecies,
          ...selectedPokemonDetails,
          forms: buildPokemonFormsArray(
            selectedPokemonSpecies.id,
            selectedPokemonSpecies.varieties,
            selectedPokemonDetails.altForms
          )
        };
        setSelectedPokemon(pokemon);
        console.log('selected pokemon is: ', selectedPokemon);
      })();
  }, [selectedPokemonDetails, selectedPokemonSpecies]);

  // useEffect(() => {
  //   // only make the API call once a pokemon has been selected
  //   selectedPokemon &&
  //     (async () => {
  //       // when the selected pokemon changes, reset details, form, and shininess
  //       setSelectedPokemonDetails(undefined);
  //       setPokemonForm(undefined);
  //       setShiny(false);
  //       setProfileLoading(true);
  //       let details: Pokemon | undefined;
  //       try {
  //         details = await client.getPokemonByName(selectedPokemon);
  //         setErrorFetchingPokemonDetails(false);
  //       } catch (error) {
  //         console.error('Could not fetch information for selected Pokemon.', error);
  //         setErrorFetchingPokemonDetails(true);
  //       }

  //       let typeIconUrls: string[] = [];
  //       if (details) {
  //         for (const type of details.types) {
  //           try {
  //             const typeUrl = await client.getTypeIconUrl(type);
  //             typeIconUrls.push(typeUrl);
  //           } catch (error) {
  //             console.warn('Could not fetch type icon URL for selected Pokemon.', error);
  //           }
  //         }
  //         if (typeIconUrls.length) details.typeIconUrls = typeIconUrls;
  //       }

  //       setSelectedPokemonDetails(details);
  //       setProfileLoading(false);
  //     })();
  // }, [selectedPokemon]);

  // // form change
  // useEffect(() => {
  //   selectedPokemon &&
  //     (async () => {
  //       // when the pokemon form changes, reset shininess
  //       setShiny(false);
  //       setProfileLoading(true);
  //       let details: Pokemon | undefined;
  //       try {
  //         details = await client.getPokemonByName(selectedPokemon, pokemonForm);
  //         setErrorFetchingPokemonDetails(false);
  //       } catch (error) {
  //         console.error('Could not fetch information for selected Pokemon.', error);
  //         setErrorFetchingPokemonDetails(true);
  //       }

  //       let typeIconUrls: string[] = [];
  //       if (details) {
  //         for (const type of details.types) {
  //           try {
  //             const typeUrl = await client.getTypeIconUrl(type);
  //             typeIconUrls.push(typeUrl);
  //           } catch (error) {
  //             console.warn('Could not fetch type icon URL for selected Pokemon.', error);
  //           }
  //         }
  //         if (typeIconUrls.length) details.typeIconUrls = typeIconUrls;
  //       }

  //       setSelectedPokemonDetails(details);
  //       setProfileLoading(false);
  //     })();
  // }, [pokemonForm]);
  // TODO: React hook useEffect has a missingDependancy: selectedPokemon

  return (
    <div>
      <WebsiteHeader selectedRegion={region} setRegion={setRegion} />
      <div className={style.pokedex}>
        <Directory
          pokemon={pokemon}
          loading={loading}
          selectedPokemonId={selectedPokemonId}
          setSelectedPokemonId={setSelectedPokemonId}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          error={errorFetchingPokemonNames}
        />
        <Profile
          pokemon={selectedPokemon}
          loading={profileLoading}
          error={errorFetchingPokemonDetails}
          formIdx={formIdx}
          setFormIdx={setFormIdx}
          setForm={setPokemonForm}
          shiny={shiny}
          setShiny={setShiny}
        />
      </div>
    </div>
  );
}
