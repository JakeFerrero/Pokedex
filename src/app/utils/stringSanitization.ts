export function capitalizeFirstLetterOfString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function sanitizeAbilityName(abilityName: string): string {
  const sanitizedNames = abilityName
    .split('-')
    .map((s) => capitalizeFirstLetterOfString(s))
    .join(' ');
  return sanitizedNames;
}

export function sanitizeEggGroup(eggGroup: string): string {
  switch (eggGroup) {
    case 'humanshape':
      return 'Human-Like';
    case 'indeterminate':
      return 'Gender Unkown';
    case 'no-eggs':
      return 'No Eggs Discovered';
    case 'water1':
      return 'Water 1';
    case 'water2':
      return 'Water 2';
    case 'water3':
      return 'Water 3';
    default:
      return capitalizeFirstLetterOfString(eggGroup);
  }
}

export function sanitizeStatName(name: string): string {
  if (name === 'hp') return 'HP';
  if (name === 'special-attack') return 'Sp. Atk';
  if (name === 'special-defense') return 'Sp. Def';
  return capitalizeFirstLetterOfString(name);
}

export function sanitizeGrowthRate(growthRate: string): string {
  if (growthRate ==='medium-slow') return 'Medium Slow';
  if (growthRate ==='medium') return 'Medium Fast';
  if (growthRate ==='fast-then-very-slow') return 'Fluctuating';
  if (growthRate ==='slow-then-very-fast') return 'Eratic';
  return capitalizeFirstLetterOfString(growthRate);
};
