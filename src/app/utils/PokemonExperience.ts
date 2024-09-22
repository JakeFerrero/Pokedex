/**
 * The Poke API has odd names for the experience groups, at least compared
 * to Bulbapedia. The function names, as well as the text shown to the user,
 * are the better, more concise Bulbapedia names. So this map reprsents the
 * Poke API name of the exp group -> function name (final exp group name)
 */
export const GROWTH_RATE_FUNCTION_MAP: Record<string, (x: number) => number> = {
  'medium-slow': mediumSlow,
  slow,
  medium: mediumFast,
  fast,
  'fast-then-very-slow': fluctuating,
  'slow-then-very-fast': erratic
};

function mediumSlow(x: number) {
  return (6 / 5) * Math.pow(x, 3) - 15 * Math.pow(x, 2) + 100 * x - 140;
}

function slow(x: number) {
  return (5 * Math.pow(x, 3)) / 4;
}

function mediumFast(x: number) {
  return Math.pow(x, 3);
}

function fast(x: number) {
  return (4 * Math.pow(x, 3)) / 5;
}

function fluctuating(x: number) {
  if (x < 15) {
    return (Math.pow(x, 3) * (Math.floor((x + 1) / 3) + 24)) / 50;
  } else if (x >= 15 && x < 36) {
    return (Math.pow(x, 3) * (x + 14)) / 50;
  } else {
    return (Math.pow(x, 3) * (Math.floor(x / 2) + 32)) / 50;
  }
}

function erratic(x: number) {
  if (x < 50) {
    return (Math.pow(x, 3) * (100 - x)) / 50;
  } else if (x >= 50 && x < 68) {
    return (Math.pow(x, 3) * (150 - x)) / 100;
  } else if (x >= 68 && x < 98) {
    return (Math.pow(x, 3) * Math.floor((1911 - 10 * x) / 3)) / 500;
  } else {
    return (Math.pow(x, 3) * (160 - x)) / 100;
  }
}
