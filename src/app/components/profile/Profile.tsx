/* eslint-disable @next/next/no-img-element */
import ErrorTriangle from '@/app/components/utils/ErrorTriangle';
import { Pokemon } from '@/app/types/Pokemon';
import avatar from '../../../../public/avatar.png';
import LoadingSpinner from '../utils/LoadingSpinner';
import style from './profile.module.css';
import SplashPage from './SplashPage';

const TYPE_COLOR_MAP: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

interface Props {
  pokemon: Pokemon | undefined;
  loading: boolean;
  error: boolean;
}

function determineStatColor(statName: string, responsibility: string = 'bar'): string {
  switch (statName) {
    case 'hp':
      if (responsibility === 'border') return '#438F0C';
      if (responsibility === 'bg') return '#9EE864';
      return '#69DC12';
    case 'attack':
      if (responsibility === 'border') return '#9A8510';
      if (responsibility === 'bg') return '#F5DE69';
      return '#EFCC18';
    case 'defense':
      if (responsibility === 'border') return '#97410C';
      if (responsibility === 'bg') return '#F09A65';
      return '#E86412';
    case 'special-attack':
      if (responsibility === 'border') return '#0D7F9D';
      if (responsibility === 'bg') return '#66D8F6';
      return '#13C3F1';
    case 'special-defense':
      if (responsibility === 'border') return '#304591';
      if (responsibility === 'bg') return '#899EEA';
      return '#4A6ADF';
    default:
      if (responsibility === 'border') return '#8B1470';
      if (responsibility === 'bg') return '#E46CCA';
      return '#D51DAD';
  }
}

export default function Profile({ pokemon, loading, error }: Props) {
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
            />
            <div className={style.profileHeaderText}>
              <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
              <p>{pokemon.flavorText}</p>
            </div>
          </div>

          {/* Profile Body */}
          <div>
            <h4>Details</h4>
            <hr />
            Abilities:
            {pokemon.abilities.map((ability) => (
              <>{ability}, </>
            ))}
            Egg Groups:
            {pokemon.eggGroups.map((eg) => (
              <>{eg}, </>
            ))}
            Type: 
            {pokemon.types.map((type) => (
              <span className="badge badge-pill" style={{
                backgroundColor: TYPE_COLOR_MAP[type]
              }}>{type}</span>
            ))}
            Evolves From:
            {pokemon.evolvesFrom ? <>{pokemon.evolvesFrom}</> : undefined}
            
            <h4>Stats</h4>
            <hr/>
            <table className={style.statsTable} style={{
              backgroundColor: TYPE_COLOR_MAP[pokemon.types[0]]
            }}>
              {Object.entries(pokemon.stats).map(([statName, statValue]) => (
                <tr
                  style={{
                    backgroundColor: determineStatColor(statName, 'bg')
                  }}
                >
                  <td className={style.statsTableCell}>
                    {statName}: {statValue}
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
