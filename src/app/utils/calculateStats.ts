export function calculateMinStat(baseStatValue: number, level: number): number {
  const MIN_EV = 0,
    MIN_IV = 0;
  const stat = (2 * baseStatValue + MIN_IV + MIN_EV / 4) * (level / 100) + 5;
  return Math.floor(stat - stat * 0.1);
}

export function calculateMaxStat(baseStatValue: number, level: number): number {
  const MAX_EV = 252,
    MAX_IV = 31;
  const stat = (2 * baseStatValue + MAX_IV + MAX_EV / 4) * (level / 100) + 5;
  return Math.floor(stat + stat * 0.1);
}

export function calculateMinHp(baseStatValue: number, level: number): number {
  const MAX_EV = 0,
    MAX_IV = 0;
  const stat = (2 * baseStatValue + MAX_IV + MAX_EV / 4) * (level / 100) + level + 10;
  return Math.floor(stat);
}

export function calculateMaxHp(baseStatValue: number, level: number): number {
  const MAX_EV = 252,
    MAX_IV = 31;
  const stat = (2 * baseStatValue + MAX_IV + MAX_EV / 4) * (level / 100) + level + 10;
  return Math.floor(stat);
}
