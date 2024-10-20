export function capitalizeFirstLetterOfString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * The Poke API returns some odd names for some pokemon, particularly those with
 * multiple forms. As such, this function will take the id of the pokemon, and if it
 * corresponds to one of the pokemon with an odd name, it will return the correct name.
 */
export function sanitizePokemonName(name: string, id?: number) {
  if (id === 29) return 'Nidoran ♀';
  if (id === 32) return 'Nidoran ♂';
  if (id === 122) return 'Mr. Mime';
  if (id === 386) return 'Deoxys';
  if (id === 413) return 'Wormadam';
  if (id === 439) return 'Mime Jr.';
  if (id === 474) return 'Porygon-Z';
  if (id === 487) return 'Giratina';
  if (id === 492) return 'Shaymin';
  return sanitizeName(capitalizeFirstLetterOfString(name));
}

function sanitizeName(name: string): string {
  if (name.includes('-gmax')) {
    return name.split('-gmax')[0] + ' (G-Max)'
  }
  if (name.includes('-mega')) {
    const splitNameArr = name.split('-mega');
    if (!splitNameArr[1].length) return `Mega ${splitNameArr[0]}`;
    // some pokemon have multiple mega evolutions, i.e. Charizard
    // if this is the case, splitNameArr will be something like "-x"
    return `Mega ${splitNameArr[0]} ` + splitNameArr[1][1].toUpperCase();
  }
  return name;
}

export function sanitizePokemonNumber(num: number): string {
  return num.toString().padStart(4, '0');
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
