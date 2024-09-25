import { Dispatch, SetStateAction } from "react";
import style from './headerButton.module.css';

interface Props {
  label: string;
  onClick: Dispatch<SetStateAction<any>>;
  disabled?: boolean
}
export default function HeaderButton({label, onClick, disabled = false}: Props) {
  return (
    <button
      className={style.headerButton}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}