/* eslint-disable @next/next/no-img-element */
import ErrorTriangle from '@/app/components/utils/ErrorTriangle';
import { TYPE_COLOR_MAP } from '@/app/types/Colors';
import { Pokemon } from '@/app/types/Pokemon';
import { calculateTypeWeaknesses } from '@/app/utils/calculateTypeWeaknesses';
import { Dispatch, SetStateAction } from 'react';
import LoadingSpinner from '../utils/LoadingSpinner';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import TypeEffectiveness from './PokemonTypes/TypeEffectiveness';
import style from './profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import SplashPage from './SplashPage';
import StatsTable from './StatsTable/StatsTable';

interface Props {
  pokemon: Pokemon | undefined;
  loading: boolean;
  error: boolean;
  currentForm: string | undefined;
  setForm: Dispatch<SetStateAction<string | undefined>>;
}

export default function Profile({ pokemon, loading, error, currentForm, setForm }: Props) {
  let typeColor: string | undefined;
  if (pokemon) typeColor = TYPE_COLOR_MAP[pokemon.types[0]];

  return error ? (
    <ErrorTriangle size="large" message="Failed to fetch Pokemon's details" />
  ) : (
    <div className={style.profile}>
      {!pokemon ? (
        !loading ? (
          // if no selected pokemon and we are not loading, show splash page
          <SplashPage />
        ) : (
          // if no selected pokemon and we are loading, show spinner
          <div className={style.profileSpinnerContainer}>
            <LoadingSpinner />
          </div>
        )
      ) : (
        // otherwise, show profile for selected pokemon
        // unique key is needed so this div with animation is redrawn every time the pokemon changes
        <div key={pokemon.id} className={style.fadeInRight}>
          {/* Profile Header */}
          <ProfileHeader pokemon={pokemon} typeColor={typeColor} />

          {/* Profile Body */}
          <div className={style.depressedDiv}>
            {pokemon.forms.length === 1 ? (
              <></> // if there is only the default form, don't display the form section
            ) : (
              <div>
                <h4>Forms</h4>
                <hr className={style.profileHr} />
                <button
                  id="formChanger"
                  onClick={() => {
                    // Poke API guarantees that there will always be one form,
                    // the default form, which is just the pokemon's name
                    let newFormIndex = pokemon.forms.indexOf(currentForm ?? pokemon.name.toLowerCase()) + 1;
                    if (newFormIndex > pokemon.forms.length - 1) newFormIndex = 0;
                    setForm(pokemon.forms[newFormIndex]);
                  }}
                >
                  Change Forms
                </button>
              </div>
            )}
            <h4>Details</h4>
            <hr className={style.profileHr} />
            <PokemonDetails pokemon={pokemon} />
            <h4>Stats</h4>
            <hr className={style.profileHr} />
            <StatsTable pokemon={pokemon} bgColor={typeColor} />
            <h4>Type Effectiveness</h4>
            <hr className={style.profileHr} />
            <TypeEffectiveness typeEffectivenessMap={calculateTypeWeaknesses(pokemon.types)} color={typeColor} />
          </div>
        </div>
      )}
    </div>
  );
}
