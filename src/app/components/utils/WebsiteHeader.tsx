import doge from '../../../../public/doge_head.png';
import style from './websiteHeader.module.css';

export default function WebsiteHeader() {
  return (
    <div className={style.stickyHeader}>
      <div className={style.pokeball} />
      Pokedex
    </div>);
}