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
  eggGroups: string[];
  stats: Stats;
  height: number;
  weight: number;
  genderRate: number;
  growthRate: string;
  captureRate: number;
  genus?: string;
  evolvesFrom?: string;
  flavorText?: string;
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export type Type = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'