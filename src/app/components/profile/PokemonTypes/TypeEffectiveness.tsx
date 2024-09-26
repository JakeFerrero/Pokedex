import { TypeEffectivenessMap } from '@/app/utils/calculateTypeWeaknesses';
import TypeEffectivenessPill from './TypeEffectivenessPill';
import style from './typeEffectiveness.module.css';

interface Props {
  typeEffectivenessMap: TypeEffectivenessMap;
  color: string | undefined;
}

export default function TypeEffectiveness({ typeEffectivenessMap, color }: Props) {
  return (
    <div className={style.typeEffectivenessContainer}>
      <div className={style.typeEffectivenessChart} style={{ backgroundColor: color }}>
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Damaged normally by: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {typeEffectivenessMap[1].map((type) => {
              return <TypeEffectivenessPill key={`1x-${type}`} type={type} effectiveness={1} />;
            })}
          </div>
        </div>
        <hr />
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Weak to: </div>
          <div className={style.typeEffectivenessPillsContainer}>
          {!typeEffectivenessMap[2].length && !typeEffectivenessMap[4].length && (
              <div className={style.typeEffectivenessPillsContainer}>
                <TypeEffectivenessPill key={`weak-none`} type={'none'} />
              </div>
            )}
            {typeEffectivenessMap[2].map((type) => {
              return <TypeEffectivenessPill key={`2x-weak-${type}`} type={type} effectiveness={2} />;
            })}
            {typeEffectivenessMap[4].map((type) => {
              return <TypeEffectivenessPill key={`4x-weak-${type}`} type={type} effectiveness={4} />;
            })}
          </div>
        </div>
        <hr />
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Resists: </div>
          <div className={style.typeEffectivenessPillsContainer}>
            {!typeEffectivenessMap[0.5].length && !typeEffectivenessMap[0.25].length && (
              <div className={style.typeEffectivenessPillsContainer}>
                <TypeEffectivenessPill key={`resists-none`} type={'none'} />
              </div>
            )}
            {typeEffectivenessMap[0.5].map((type) => {
              return <TypeEffectivenessPill key={`.5x-resists-${type}`} type={type} effectiveness={0.5} />;
            })}
            {typeEffectivenessMap[0.25].map((type) => {
              return <TypeEffectivenessPill key={`.25x-resists-${type}`} type={type} effectiveness={0.25} />;
            })}
          </div>
        </div>
        <hr />
        <div className={style.typeEffectivenessRow}>
          <div className={style.typeEffectivenessTextContainer}>Immune to: </div>
          {!typeEffectivenessMap[0].length ? (
            <div className={style.typeEffectivenessPillsContainer}>
              <TypeEffectivenessPill key={`immune-none`} type={'none'} />
            </div>
          ) : (
            <div className={style.typeEffectivenessPillsContainer}>
              {typeEffectivenessMap[0].map((type) => {
                return <TypeEffectivenessPill key={`immune-${type}`} type={type} effectiveness={0} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
