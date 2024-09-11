import { TypeEffectivenessMap } from '@/app/utils/calculateTypeWeaknesses';
import TypeEffectivenessPill from './TypeEffectivenessPill';
import style from './typeEffectiveness.module.css';

interface Props {
  typeEffectivenessMap: TypeEffectivenessMap;
  color: string | undefined;
}

export default function TypeEffectiveness({ typeEffectivenessMap, color }: Props) {
  return (
    <div>
      <h4>Type Effectiveness</h4>
      <hr className={style.profileHr} />
      <div
        style={{
          backgroundColor: color,
          borderRadius: '10px',
          border: '1px solid black'
        }}
      >
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Damaged normally by: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {typeEffectivenessMap[1].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={1} />;
            })}
          </div>
        </div>
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Weak to: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {typeEffectivenessMap[2].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={2} />;
            })}
            {typeEffectivenessMap[4].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={4} />;
            })}
          </div>
        </div>
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Resists: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {typeEffectivenessMap[0.5].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={0.5} />;
            })}
            {typeEffectivenessMap[0.25].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={0.25} />;
            })}
          </div>
        </div>
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Immune to: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {typeEffectivenessMap[0].map((type) => {
              return <TypeEffectivenessPill type={type} effectiveness={0} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
