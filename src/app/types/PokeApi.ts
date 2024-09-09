export interface ListPokemonResult {
  name: string;
  url: string;
}

export interface GetPokemonResult {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: Sprite;
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
}

export interface GetSpeciesResponse {
  egg_groups: EggGroup[];
  flavor_text_entries: FlavorTextEntry[];
  evolves_from_species?: {
    name: string;
    url: string;
  };
  genera: Genera[];
  gender_rate: number;
}

export interface Genera {
  genus: string;
  language: {
    name: string;
    url: string;
  }
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed';
    url: string;
  };
}

interface EggGroup {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
}

interface Type {
  type: {
    name: string;
    url: string;
  };
}

interface Sprite {
  front_default: string;
}
