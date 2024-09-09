export interface Pokemon {
  id: number;
  name: string;
  abilities: string[];
  types: string[];
  spriteUrl: string;
  eggGroups: string[];
  stats: Stats;
  height: number;
  weight: number;
  genderRate: number;
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