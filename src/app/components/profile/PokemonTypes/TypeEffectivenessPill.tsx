import { TYPE_COLOR_MAP } from '@/app/types/Colors';
import { Type } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/stringSanitization';
import style from './typeEffectivenessPill.module.css';

interface Props {
  type: Type;
  effectiveness?: number;
}

function determineEffectivenessText(effectiveness: number): string {
  if (effectiveness === 0.25) return '1/4';
  if (effectiveness === 0.5) return '1/2';
  return '' + effectiveness;
}

export default function TypeEffectivenessPill({ type, effectiveness }: Props) {
  return (
    <div
      className={style.typeEffectivenessPill}
      style={{
        backgroundColor: TYPE_COLOR_MAP[type]
      }}
    >
      {(effectiveness || effectiveness === 0) && (
        <div className={style.effectivenessBubble}>{`${determineEffectivenessText(effectiveness)}x`}</div>
      )}
      <div className={style.typeText}>{capitalizeFirstLetterOfString(type)}</div>
    </div>
  );
}
