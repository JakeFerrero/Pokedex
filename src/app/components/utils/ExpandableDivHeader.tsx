import { Dispatch, SetStateAction } from 'react';
import style from './expandableDivHeader.module.css';

interface Props {
  label: string;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ExpandableDivHeader({ label, isExpanded, setIsExpanded }: Props) {
  return (
    <div className={style.container}>
      <div className={style.big}>
        <button className={style.button} onClick={() => setIsExpanded(!isExpanded)}>
          {label}
        </button>
      </div>
      <div className={style.small} />
    </div>
  );
}
