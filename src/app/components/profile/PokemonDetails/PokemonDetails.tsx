import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import { metersToFeetInches } from '@/app/utils/metersToFeetInches';
import ExperienceChart from './ExperienceChart';
import GenderChart from './GenderChart';
import style from './pokemonDetails.module.css';

interface Props {
  pokemon: Pokemon;
  typeColor: string | undefined;
}

function sanitizeAbilityName(abilityName: string) {
  const sanitizedNames: string[] = [];
  sanitizedNames.push(
    abilityName
      .split('-')
      .map((s) => capitalizeFirstLetterOfString(s))
      .join(' ')
  );
  return sanitizedNames;
}

export default function PokemonDetails({ pokemon, typeColor }: Props) {
  return (
    <div className={style.detailsContainer}>
      <div className={style.detailsInfoBox}>
        <div>
          <b>{`Species: `}</b>
          {pokemon.genus}
        </div>
        <div>
          <b>Height:</b>
          {` ${pokemon.height} m (${metersToFeetInches(pokemon.height)})`}
        </div>
        <div>
          <b>Weight:</b>
          {` ${pokemon.weight} kg (${(pokemon.weight / 2.2).toFixed(2)} lb)`}
        </div>
        <div>
          <b>Capture Rate:</b>
          {` ${pokemon.captureRate} (~${((pokemon.captureRate / 255) * 100).toFixed(1)}%)`}
        </div>
        <div>
          <b>{`Abilities: `}</b>
          {pokemon.abilities.map((ability, index) => {
            return (
              <span key={`ability-${index}`}>
                <>{sanitizeAbilityName(ability)}</>
                {index === pokemon.abilities.length - 1 ? '' : ', '}
              </span>
            );
          })}
        </div>
        <div>
          {/* TODO: sanitize egg group names */}
          <b>{`Egg Group(s): `}</b>
          {pokemon.eggGroups.map((egg, index) => {
            return (
              <span key={`egg-group-${index}`}>
                <>{egg}</>
                {index === pokemon.eggGroups.length - 1 ? '' : ', '}
              </span>
            );
          })}
        </div>
        {pokemon.evolvesFrom ? (
          <div>
            <b>{`Evolves From: `}</b>
            {capitalizeFirstLetterOfString(pokemon.evolvesFrom)}
          </div>
        ) : undefined}
      </div>
      <GenderChart genderRate={pokemon.genderRate} />
      <ExperienceChart growthRate={pokemon.growthRate} typeColor={typeColor ?? 'green'} />
    </div>
  );
}
