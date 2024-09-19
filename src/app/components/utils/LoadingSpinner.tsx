import style from './loadingSpinner.module.css';

export default function LoadingSpinner() {
  return <div className={style.pokeball} id="spinner" role="loading" />;
}
