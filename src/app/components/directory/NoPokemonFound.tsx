import style from './directory.module.css';

export default function NoPokemonFound() {
  return (
    <div className={style.noPokemonFound}>
      No pokemon found
    </div>
  );
}