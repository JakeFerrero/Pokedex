import { TYPE_COLOR_MAP } from '@/app/types/Colors';
import style from './typePill.module.css';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';

interface Props {
  type: string;
}

export default function TypePill({ type }: Props) {
  return (
    <span
      className={`badge badge-pill ${style.typePill}`}
      style={{
        backgroundColor: TYPE_COLOR_MAP[type]
      }}
    >
      {capitalizeFirstLetterOfString(type)}
    </span>
  );
}
