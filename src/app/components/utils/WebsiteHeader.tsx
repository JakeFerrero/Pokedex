import { Region } from '@/app/types/Regions';
import { Dispatch, SetStateAction } from 'react';
import style from './websiteHeader.module.css';

const regions: Region[] = ['Kanto', 'Johto', 'Hoenn'];

interface Props {
  selectedRegion: Region;
  setRegion: Dispatch<SetStateAction<Region>>;
}

export default function WebsiteHeader({ selectedRegion, setRegion }: Props) {
  return (
    <div className={style.stickyHeader}>
      <div className={style.leftContainer}>
        <div className={style.pokeball} />
        <span>Pokedex</span>
      </div>
      <div className={style.centerContainer}>
        {regions.map((region) => {
          return (
              <button
                key={region}
                id={region}
                className={style.regionButton}
                onClick={() => setRegion(region)}
                style={{ color: selectedRegion === region ? 'white' : '' }}
              >
                {region}
              </button>
          );
        })}
      </div>
      <div className={style.rightContainer}>
        <div className={style.decorativeCircle} style={{ backgroundColor: 'red' }} />
        <div className={style.decorativeCircle} style={{ backgroundColor: 'yellow' }} />
        <div className={style.decorativeCircle} style={{ backgroundColor: 'green' }} />
      </div>
    </div>
  );
}
