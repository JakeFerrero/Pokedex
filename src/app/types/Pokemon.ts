export interface PokemonMetadata {
  id: number;
  name: string;
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: string[];
  types: Type[];
  spriteUrl: string;
  shinySpriteUrl: string;
  eggGroups: string[];
  stats: Stats;
  height: number;
  weight: number;
  genderRate: number;
  growthRate: string;
  captureRate: number;
  forms: string[];
  eggCycles: number;
  baseFriendship: number;
  evYield: Stats;
  genus?: string;
  evolvesFrom?: string;
  flavorText?: string;
  typeIconUrls?: string[];
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
