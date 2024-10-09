import { determineStatColor } from '@/app/types/Colors';
import { Pokemon } from '@/app/types/Pokemon';
import { calculateMaxHp, calculateMaxStat, calculateMinHp, calculateMinStat } from '@/app/utils/calculateStats';
import { sanitizeStatName } from '@/app/utils/stringSanitization';
import style from './statsTable.module.css';

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
      style={{ backgroundColor: bgColor }}
      >
        <tr>
          <td className={style.statsTableCell} rowSpan={2} colSpan={2} style={{ textAlign: 'center' }}>
            Stat
          </td>
          <td className={style.statsTableCell} colSpan={2}>
            Range
          </td>
        </tr>
        <tr>
          <td className={style.statsTableCell}>Lv. 50</td>
          <td className={style.statsTableCell}>Lv. 100</td>
        </tr>
        {Object.entries(pokemon.stats).map(([statName, statValue]) => {
          const minStatValueFifty = statName === 'hp' ? calculateMinHp(statValue, 50) : calculateMinStat(statValue, 50);
          const maxStatValueFifty = statName === 'hp' ? calculateMaxHp(statValue, 50) : calculateMaxStat(statValue, 50);
          const minStatValueHundred =
            statName === 'hp' ? calculateMinHp(statValue, 100) : calculateMinStat(statValue, 100);
          const maxStatValueHundred =
            statName === 'hp' ? calculateMaxHp(statValue, 100) : calculateMaxStat(statValue, 100);
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
              <td className={style.statsTableCell}>
                <span style={{ textAlign: 'center' }}>
                  {minStatValueFifty} - {maxStatValueFifty}
                </span>
              </td>
              <td className={style.statsTableCell}>
                <span style={{ textAlign: 'center' }}>
                  {minStatValueHundred} - {maxStatValueHundred}
                </span>
              </td>
            </tr>
          );
        })}
        <tr>
          <td className={style.statsTableCell} style={{ backgroundColor: 'lightgrey' }}>
            <span style={{ float: 'left', marginRight: '1rem' }}>Total:</span>
            <span style={{ float: 'right' }}>{statTotal}</span>
          </td>
          <td className={style.statsTableCell} colSpan={3} style={{ fontSize: '10px' }}>
            Min stats are calculated with 0 EVs, 0 IVs and a hindering nature.
            <br />
            Max stats are calculated with 252 EVs, 31 IVs and a helpful nature.
          </td>
        </tr>
      </table>
    </div>
  );
}
