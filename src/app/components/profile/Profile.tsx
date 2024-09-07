/* eslint-disable @next/next/no-img-element */
import ErrorTriangle from '@/app/components/utils/ErrorTriangle';
import { determineStatColor, TYPE_COLOR_MAP } from '@/app/types/Colors';
import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import avatar from '../../../../public/avatar.png';
import LoadingSpinner from '../utils/LoadingSpinner';
import TypePill from '../utils/TypePill';
import style from './profile.module.css';
import SplashPage from './SplashPage';

interface Props {
  pokemon: Pokemon | undefined;
  loading: boolean;
  error: boolean;
}

function sanitizeAbilityName(abilityName: string) {
  const sanitizedNames: string[] = [];
  sanitizedNames.push(
    abilityName
      .split('-')
      .map((s) => capitalizeFirstLetterOfString(s))
      .join(' ')
  );
  return sanitizedNames;
}

function sanitizeStatName(name: string): string {
  if (name === 'hp') return 'HP';
  if (name === 'special-attack') return 'Sp. Atk';
  if (name === 'special-defense') return 'Sp. Def';
  return capitalizeFirstLetterOfString(name);
}

export default function Profile({ pokemon, loading, error }: Props) {
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
          <div className={style.profileHeader}>
            <img
              src={pokemon.spriteUrl ?? avatar.src}
              alt={pokemon.name}
              className={style.pfp}
              onError={(e) => (e.currentTarget.src = avatar.src)}
              style={{
                border: `4px solid ${typeColor}`
              }}
            />
            <div className={style.profileHeaderText}>
              <h2>{capitalizeFirstLetterOfString(pokemon.name)}</h2>
              {pokemon.types.map((type, index) => (
                <TypePill key={`type-${index + 1}`} type={type} />
              ))}
              <p>
                <i>{pokemon.flavorText}</i>
              </p>
            </div>
          </div>

          {/* Profile Body */}
          <div>
            <h4>Details</h4>
            <hr className={style.profileHr} />
            <div>
              <b>{`Species: `}</b>
              {pokemon.genus}
            </div>
            <div>
              <b>Height:</b> {pokemon.height} m
            </div>
            <div>
              <b>Weight:</b> {pokemon.weight} kg
            </div>
            {pokemon.evolvesFrom ? (
              <div>
                <b>{`Evolves From: `}</b>
                {capitalizeFirstLetterOfString(pokemon.evolvesFrom)}
              </div>
            ) : undefined}
            <div>
              <b>{`Abilities: `}</b>
              {pokemon.abilities.map((ability, index) => {
                return (
                  <span key={`ability-${index}`}>
                    <>{sanitizeAbilityName(ability)}</>
                    {index === pokemon.abilities.length - 1 ? '' : ', '}
                  </span>
                );
              })}
            </div>
            <div>
              <b>{`Egg Group(s): `}</b>
              {pokemon.eggGroups.map((egg, index) => {
                return (
                  <span key={`egg-group-${index}`}>
                    <>{egg}</>
                    {index === pokemon.eggGroups.length - 1 ? '' : ', '}
                  </span>
                );
              })}
            </div>

            <h4>Stats</h4>
            <hr className={style.profileHr} />
            <table
              className={style.statsTable}
              style={{
                backgroundColor: typeColor
              }}
            >
              {Object.entries(pokemon.stats).map(([statName, statValue]) => (
                <tr
                  key={statName}
                  style={{
                    backgroundColor: determineStatColor(statName, 'bg')
                  }}
                >
                  <td className={style.statsTableCell}>
                    {/* {sanitizeStatName(statName)}: {statValue} */}
                    <span style={{ float: 'left', marginRight: '1rem' }}>{sanitizeStatName(statName)}:</span>
                    <span style={{ float: 'right' }}>{statValue}</span>
                  </td>
                  <td className={`${style.statsTableCell} ${style.statsBarContainerCell}`}>
                    <div
                      className={style.horizontalBar}
                      style={{
                        backgroundColor: determineStatColor(statName),
                        borderColor: determineStatColor(statName, 'border'),
                        width: `${statValue}px`
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
