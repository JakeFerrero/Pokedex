/* eslint-disable @next/next/no-img-element */
import ErrorTriangle from '@/app/components/utils/ErrorTriangle';
import { TYPE_COLOR_MAP } from '@/app/types/Colors';
import { Pokemon, PokemonForm } from '@/app/types/Pokemon';
import { calculateTypeWeaknesses } from '@/app/utils/calculateTypeWeaknesses';
import { Dispatch, SetStateAction, useState } from 'react';
import ExpandableDivHeader from '../utils/ExpandableDivHeader';
import LoadingSpinner from '../utils/LoadingSpinner';
import TypeEffectiveness from './PokemonTypes/TypeEffectiveness';
import style from './profile.module.css';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import SplashPage from './SplashPage';
import StatsTable from './StatsTable/StatsTable';
import PokemonDetails from './PokemonDetails/PokemonDetails';

interface Props {
  pokemon: Pokemon | undefined;
  loading: boolean;
  error: boolean;
  shiny: boolean;
  setShiny: Dispatch<SetStateAction<boolean>>;
  formIdx: number;
  setFormIdx: Dispatch<SetStateAction<number>>;
  setForm: Dispatch<SetStateAction<PokemonForm | undefined>>;
}

export default function Profile({ pokemon, loading, error, formIdx, setFormIdx, setForm, shiny, setShiny }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

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
        <div key={pokemon.id}>
          {/* Profile Header */}
          <ProfileHeader
            pokemon={pokemon}
            shiny={shiny}
            setShiny={setShiny}
            formIdx={formIdx}
            setFormIdx={setFormIdx}
            setForm={setForm}
          />

          {/* Profile Body */}
          <div className={style.depressedDiv}>
            <div>
              <ExpandableDivHeader label="Details" isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
              <div className={`${style.expandableContainer} ${isExpanded ? style.expandableContainerOpen : ''}`}>
                <PokemonDetails pokemon={pokemon} typeColor={typeColor} />
              </div>
              <div className={style.expandableContainerBottom} />
            </div>

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
