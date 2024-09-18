import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import avatar from '../../../../../public/avatar.png';
import TypePill from '../PokemonTypes/TypePill';
import style from './profileHeader.module.css';

interface Props {
  pokemon: Pokemon;
  typeColor?: string;
}

export default function profileHeader({ pokemon, typeColor }: Props) {
  return (
    <div className={style.profileHeader}>
      <div className={style.pfpContainer}>
        <img
          src={pokemon.spriteUrl ?? avatar.src}
          alt={pokemon.name}
          className={style.pfp}
          onError={(e) => (e.currentTarget.src = avatar.src)}
        />
      </div>
      <div className={style.profileHeaderText}>
        <h2>{capitalizeFirstLetterOfString(pokemon.name)}</h2>
        <div style={{ display: 'flex' }}>
          {pokemon.types.map((type, index) => (
            <TypePill key={`type-${index + 1}`} type={type} />
          ))}
        </div>
        <p>
          <i>{pokemon.flavorText}</i>
        </p>
      </div>
      <div className={style.pokeballContainer}>
        <div className={style.pokeball} />
      </div>
      {/* Maybe d-pad that controls form and "speaker" lines on bottom right */}
    </div>
  );
}
