export const TYPE_COLOR_MAP: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  none: '#252525'
};

export function determineStatColor(statName: string, responsibility: string = 'bar'): string {
  switch (statName) {
    case 'hp':
      if (responsibility === 'border') return '#438F0C';
      if (responsibility === 'bg') return '#9EE864';
      return '#69DC12';
    case 'attack':
      if (responsibility === 'border') return '#9A8510';
      if (responsibility === 'bg') return '#F5DE69';
      return '#EFCC18';
    case 'defense':
      if (responsibility === 'border') return '#97410C';
      if (responsibility === 'bg') return '#F09A65';
      return '#E86412';
    case 'special-attack':
      if (responsibility === 'border') return '#0D7F9D';
      if (responsibility === 'bg') return '#66D8F6';
      return '#13C3F1';
    case 'special-defense':
      if (responsibility === 'border') return '#304591';
      if (responsibility === 'bg') return '#899EEA';
      return '#4A6ADF';
    default:
      if (responsibility === 'border') return '#8B1470';
      if (responsibility === 'bg') return '#E46CCA';
      return '#D51DAD';
  }
}
