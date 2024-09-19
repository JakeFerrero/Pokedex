import style from './websiteHeader.module.css';

export default function WebsiteHeader() {
  return (
    <div className={style.stickyHeader}>
      <div className={style.leftContainer}>
        <div className={style.pokeball} />
        <span>Pokedex</span>
      </div>
      <div className={style.centerContainer}>Kanto | Johto | Hoenn</div>
      <div className={style.rightContainer}>
        <div className={style.decorativeCircle} style={{ backgroundColor: 'red' }} />
        <div className={style.decorativeCircle} style={{ backgroundColor: 'yellow' }} />
        <div className={style.decorativeCircle} style={{ backgroundColor: 'green' }} />
      </div>
    </div>
  );
}
