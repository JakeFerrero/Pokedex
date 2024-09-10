import { TYPE_COLOR_MAP } from "@/app/types/Colors";
import { Type } from "@/app/types/Pokemon";
import style from './typeEffectivenessPill.module.css'
import { capitalizeFirstLetterOfString } from "@/app/utils/capitalizeFirstLetterOfString";

interface Props {
  type: Type;
}

export default function TypeEffectivenessPill({ type }: Props) {
  return (
    <div
      className={style.typeEffectivenessPill}
      style={{
        backgroundColor: TYPE_COLOR_MAP[type]
      }}
    >
      <div className={style.effectivenessBubble}>1x</div>
      <div className={style.typeText}>{capitalizeFirstLetterOfString(type)}</div>
    </div>
  );
}