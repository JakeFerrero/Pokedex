import { Pokemon } from '@/app/types/Pokemon';
import { capitalizeFirstLetterOfString } from '@/app/utils/capitalizeFirstLetterOfString';
import style from './pokemonDetails.module.css';

interface Props {
  pokemon: Pokemon;
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

export default function PokemonDetails({ pokemon }: Props) {
  return (
    <div className={style.detailsContainer}>
      <div className={style.detailsTextBox}>
        <div>
          <b>{`Species: `}</b>
          {pokemon.genus}
        </div>
        <div>
          <b>Height:</b> {pokemon.height} m
        </div>
        <div>
          <b>Weight:</b> {pokemon.weight} kg
        </div>
        {pokemon.evolvesFrom ? (
          <div>
            <b>{`Evolves From: `}</b>
            {capitalizeFirstLetterOfString(pokemon.evolvesFrom)}
          </div>
        ) : undefined}
        <div>
          <b>{`Gender: `}</b>
          {pokemon.genderRate < 0 ? (
            <>Genderless</>
          ) : (
            <div>
              <div className={style.genderBarContainer}>
                <div className={style.genderMale} style={{ width: `${100 - pokemon.genderRate}%` }} />
                <div className={style.genderFemale} style={{ width: `${pokemon.genderRate}%` }} />
              </div>
              <>{'Male: ' + (100 - pokemon.genderRate) + '% ' + 'Female: ' + pokemon.genderRate + '%'}</>
            </div>
          )}
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
        <div>
          <b>Growth Rate:</b> {pokemon.growthRate}
        </div>
        <div>
          <b>Capture Rate:</b> {pokemon.captureRate}
        </div>
      </div>
    </div>
  );
}
