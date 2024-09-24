import { Pokemon } from '@/app/types/Pokemon';
import { metersToFeetInches } from '@/app/utils/metersToFeetInches';
import {
  capitalizeFirstLetterOfString,
  sanitizeAbilityName,
  sanitizeEggGroup
} from '../../../utils/stringSanitization';
import ExperienceChart from './ExperienceChart';
import GenderChart from './GenderChart';
import style from './pokemonDetails.module.css';

interface Props {
  pokemon: Pokemon;
  typeColor: string | undefined;
}

export default function PokemonDetails({ pokemon, typeColor }: Props) {
  return (
    <div className={style.detailsContainer}>
      <div className={style.detailsBox}>
        <div className={style.textContainer}>
          <p>
            <b>{`Species: `}</b>
            {pokemon.genus}
          </p>
          <p>
            <b>Height:</b>
            {` ${pokemon.height} m (${metersToFeetInches(pokemon.height)})`}
          </p>
          <p>
            <b>Weight:</b>
            {` ${pokemon.weight} kg (${(pokemon.weight / 2.2).toFixed(2)} lb)`}
          </p>
          <p>
            <b>Capture Rate:</b>
            {` ${pokemon.captureRate} (~${((pokemon.captureRate / 255) * 100).toFixed(1)}%)`}
          </p>
          <p>
            <b>{`Abilities: `}</b>
            {pokemon.abilities.map((ability, index) => {
              return (
                <span key={`ability-${index}`}>
                  {sanitizeAbilityName(ability)}
                  {index === pokemon.abilities.length - 1 ? '' : ', '}
                </span>
              );
            })}
          </p>
          <p>
            <b>{`Egg Group(s): `}</b>
            {pokemon.eggGroups.map((egg, index) => {
              return (
                <span key={`egg-group-${index}`}>
                  {sanitizeEggGroup(egg)}
                  {index === pokemon.eggGroups.length - 1 ? '' : ', '}
                </span>
              );
            })}
          </p>
          {pokemon.evolvesFrom ? (
            <p>
              <b>{`Evolves From: `}</b>
              {capitalizeFirstLetterOfString(pokemon.evolvesFrom)}
            </p>
          ) : undefined}
        </div>
        <GenderChart genderRate={pokemon.genderRate} />
        <ExperienceChart growthRate={pokemon.growthRate} typeColor={typeColor ?? 'green'} />
      </div>
    </div>
  );
}
