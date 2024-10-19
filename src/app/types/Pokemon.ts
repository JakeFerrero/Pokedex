export interface PokemonMetadata {
  id: number;
  name: string;
}

export interface PokemonSpecies {
  id: number;
  eggGroups: string[];
  genderRate: number;
  growthRate: string;
  captureRate: number;
  varieties: string[];
  eggCycles: number;
  baseFriendship: number;
  evolvesFrom: string | undefined;
  flavorText: string | undefined;
  genus: string | undefined;
}

export interface PokemonDetails {
  name: string;
  abilities: string[];
  types: Type[];
  spriteUrl: string;
  shinySpriteUrl: string;
  stats: Stats;
  height: number;
  weight: number;
  evYield: Stats;
  cry: string;
  altForms: string[];
  typeIconUrls?: string[]; // urls of the type icons we should use rather than the in-house type icons
}

export interface Pokemon extends PokemonDetails, PokemonSpecies {
  forms: PokemonForm[]
}

// TODO: comment
export interface PokemonForm {
  id: number;
  name: string;
  type: 'form' | 'variety';
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export type Type =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'none';
