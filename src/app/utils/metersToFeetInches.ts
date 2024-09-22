export function metersToFeetInches(meters: number): string {
  // Convert meters to feet
  const totalFeet = meters * 3.28084;

  // Extract feet and inches
  let feet = Math.floor(totalFeet);
  const inches = (totalFeet - feet) * 12;

  // Round inches to the nearest whole number
  let roundedInches = Math.round(inches);

  if (roundedInches === 12) {
    feet++;
    roundedInches = 0;
  }

  return `${feet}' ${roundedInches}"`;
}
