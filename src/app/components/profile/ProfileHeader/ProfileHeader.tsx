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
      <img
        src={pokemon.spriteUrl ?? avatar.src}
        alt={pokemon.name}
        className={style.pfp}
        onError={(e) => (e.currentTarget.src = avatar.src)}
        style={{
          border: `4px solid ${typeColor}`
        }}
      />
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
    </div>
  );
}
