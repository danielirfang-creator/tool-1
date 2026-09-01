export type LengthUnit = 'feet' | 'inches' | 'meters' | 'centimeters' | 'millimeters';
export type AreaUnit = 'sqft' | 'sqm';

export function feetToMeters(feet: number): number {
  return feet * 0.3048;
}

export function metersToFeet(meters: number): number {
  return meters / 0.3048;
}

export function inchesToMm(inches: number): number {
  return inches * 25.4;
}

export function mmToInches(mm: number): number {
  return mm / 25.4;
}

export function sqFtToSqMeters(sqft: number): number {
  return sqft * 0.092903;
}

export function sqMetersToSqFt(sqm: number): number {
  return sqm / 0.092903;
}

export function roundTo(val: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round((val + Number.EPSILON) * factor) / factor;
}

export function formatNumber(val: number, decimals: number = 2): string {
  if (isNaN(val) || !isFinite(val)) return '0';
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return '.00';
  return '$' + amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
