/* eslint-disable @next/next/no-img-element */
import doge from '../../../../public/doge_head.png';
import style from './websiteHeader.module.css';

export default function WebsiteHeader() {
  return (
    <div className={style.stickyHeader}>
      <img src={doge.src} alt='Pokedex' className={style.logo} />
      Pokedex
    </div>);
}