import { Pokemon } from '@/app/types/Pokemon';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  pokemon: Pokemon;
  currentForm: string | undefined;
  setForm: Dispatch<SetStateAction<string | undefined>>;
}

export default function FromChanger({ pokemon, currentForm, setForm }: Props) {
  return (
    <div>
      <button
        id="formChanger"
        disabled={pokemon.forms.length <= 1 ? true : false}
        onClick={() => {
          // Poke API guarantees that there will always be one form,
          // the default form, which is just the pokemon's name
          let newFormIndex = pokemon.forms.indexOf(currentForm ?? pokemon.name.toLowerCase()) + 1;
          if (newFormIndex > pokemon.forms.length - 1) newFormIndex = 0;
          setForm(pokemon.forms[newFormIndex]);
        }}
      >
        Change Forms
      </button>
    </div>
  );
}
