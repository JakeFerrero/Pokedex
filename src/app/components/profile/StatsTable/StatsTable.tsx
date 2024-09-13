import { determineStatColor } from '@/app/types/Colors';
import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import style from './statsTable.module.css';

interface Props {
  pokemon: Pokemon;
  bgColor?: string;
}

function sanitizeStatName(name: string): string {
  if (name === 'hp') return 'HP';
  if (name === 'special-attack') return 'Sp. Atk';
  if (name === 'special-defense') return 'Sp. Def';
  return capitalizeFirstLetterOfString(name);
}

export default function StatsTable({ pokemon, bgColor }: Props) {
  let statTotal = 0;

  return (
    <table
      className={style.statsTable}
      style={{
        backgroundColor: bgColor
      }}
    >
      {Object.entries(pokemon.stats).map(([statName, statValue]) => {
        statTotal += statValue;
        return (
          <tr
            key={statName}
            style={{
              backgroundColor: determineStatColor(statName, 'bg')
            }}
          >
            <td className={style.statsTableCell}>
              <span style={{ float: 'left', marginRight: '1rem' }}>{sanitizeStatName(statName)}:</span>
              <span style={{ float: 'right' }}>{statValue}</span>
            </td>
            <td className={`${style.statsTableCell} ${style.statsBarContainerCell}`}>
              <div
                className={style.statsBar}
                style={{
                  backgroundColor: determineStatColor(statName),
                  borderColor: determineStatColor(statName, 'border'),
                  width: `${statValue}px`
                }}
              />
            </td>
          </tr>
        );
      })}
      <tr>
        <td className={style.statsTableCell} style={{ backgroundColor: 'lightgrey' }}>
          <span style={{ float: 'left', marginRight: '1rem' }}>Total:</span>
          <span style={{ float: 'right' }}>{statTotal}</span>
        </td>
      </tr>
    </table>
  );
}
