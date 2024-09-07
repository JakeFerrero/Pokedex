/* eslint-disable @next/next/no-img-element */
import image from '../../../../public/full_doge.png';
import style from './profile.module.css';

export default function SplashPage() {
  return (
    <div className={style.splashPage}>
      <img src={image.src} alt='Pokedex' width={200} height={200}/>
      <h2>Pokedex</h2>
      <p>Select a Pokemon!</p>
    </div>
  );
}
