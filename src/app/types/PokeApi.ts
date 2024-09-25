export interface ListPokemonResult {
  name: string;
  url: string;
}

export interface GetPokemonResult {
  id: number;
  name: string;
  abilities: Ability[];
  sprites: Sprites;
  types: Type[];
  stats: Stat[];
  height: number;
  weight: number;
}

export interface GetSpeciesResponse {
  id: number;
  egg_groups: EggGroup[];
  flavor_text_entries: FlavorTextEntry[];
  evolves_from_species?: {
    name: string;
    url: string;
  };
  genera: Genera[];
  gender_rate: number;
  growth_rate: {
    name: string;
    url: string;
  };
  capture_rate: number;
  hatch_counter: number;
  base_happiness: number
  varieties: Variety[];
}

interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

export interface Genera {
  genus: string;
  language: {
    name: string;
    url: string;
  };
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
  effort: number; // ev yield
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

interface Sprites {
  front_default: string;
  front_shiny: string;
  other: {
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
  };
}
