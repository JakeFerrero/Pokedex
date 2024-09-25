import { capitalizeFirstLetterOfString } from "./stringSanitization";

export function sanitizeStatName(name: string): string {
  if (name === 'hp') return 'HP';
  if (name === 'special-attack') return 'Sp. Atk';
  if (name === 'special-defense') return 'Sp. Def';
  return capitalizeFirstLetterOfString(name);
}