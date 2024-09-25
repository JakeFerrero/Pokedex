import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/stringSanitization';
import { Dispatch, SetStateAction } from 'react';
import avatar from '../../../../../public/avatar.png';
import TypePill from '../PokemonTypes/TypePill';
import HeaderButton from './HeaderButton';
import style from './profileHeader.module.css';

interface Props {
  pokemon: Pokemon;
  shiny: boolean;
  setShiny: Dispatch<SetStateAction<boolean>>;
  currentForm: string | undefined;
  setForm: Dispatch<SetStateAction<string | undefined>>;
  typeColor?: string;
}

export default function profileHeader({ pokemon, shiny, setShiny, typeColor, currentForm, setForm }: Props) {
  const imageSrc = !shiny ? pokemon.spriteUrl ?? avatar.src : pokemon.shinySpriteUrl ?? avatar.src;
  return (
    <div className={style.profileHeader}>
      {/* Wrapper here for shadow because pfpContainer uses clip-path */}
      <div className={style.pfpContainerWrapper}> 
        <div className={style.pfpContainer}>
          <div className={style.pfpTopDecorations}>
            <div className={style.topButton} />
            <div className={style.topButton} />
          </div>
          <img
            src={imageSrc}
            alt={pokemon.name}
            className={style.pfp}
            onError={(e) => (e.currentTarget.src = avatar.src)}
          />
          <div className={style.pfpBottomDecorations}>
            <div className={style.pfpBottomButtonContainer}>
              <button className={style.pfpBottomButton} />
            </div>
            {/* TODO: make all of these complicated decorations modules */}
            <div className={style.pfpBottomMicContainer}>
              <div className={style.speaker}>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
                <div className={style.line}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.middleHeaderContainer}>
        <div className={style.profileHeaderText}>
          {/* TODO: number is wrong with different forms */}
          <h5 style={{ color: 'grey', margin: '0px' }}>#000{pokemon.id}</h5>
          <div className={style.headerNameContainer}>
            <h2>{capitalizeFirstLetterOfString(pokemon.name)}</h2>
            {shiny && <div className={style.star}></div>}
          </div>
          <div style={{ display: 'flex' }}>
            {pokemon.types.map((type, index) => (
              <TypePill key={`type-${index + 1}`} type={type} />
            ))}
          </div>
          <p>
            <i>{pokemon.flavorText}</i>
          </p>
        </div>
        <div className={style.headerButtons}>
          <HeaderButton
            label={'Form'}
            onClick={() => {
              // Poke API guarantees that there will always be one form,
              // the default form, which is just the pokemon's name
              let newFormIndex = pokemon.forms.indexOf(currentForm ?? pokemon.name.toLowerCase()) + 1;
              if (newFormIndex > pokemon.forms.length - 1) newFormIndex = 0;
              setForm(pokemon.forms[newFormIndex]);
            }}
            disabled={pokemon.forms.length <= 1 ? true : false}
          />
          <HeaderButton label={'Shiny'} onClick={() => setShiny(!shiny)} />
        </div>
      </div>
      <div className={style.pokeballContainer}>
        <div className={style.pokeball} />
      </div>
      {/* TODO: Maybe d-pad that controls form and "speaker" lines on bottom right? */}
    </div>
  );
}
