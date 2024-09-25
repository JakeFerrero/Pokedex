import { determineStatColor } from '@/app/types/Colors';
import { Pokemon } from '@/app/types/Pokemon';
import style from './statsTable.module.css';
import { sanitizeStatName } from '@/app/utils/stringSanitization';

interface Props {
  pokemon: Pokemon;
  bgColor?: string;
}

export default function StatsTable({ pokemon, bgColor }: Props) {
  let statTotal = 0;

  return (
    <div className={style.statsTableContainer}>
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
    </div>
  );
}
