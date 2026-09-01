import { sqFtToSqMeters, sqMetersToSqFt, roundTo } from './units';

export interface FlooringInput {
  length: number;
  width: number;
  unit: 'imperial' | 'metric';
  wastePercent: number;
  costPerUnit?: number;
  sqFtPerBox?: number;
}

export interface FlooringResult {
  netAreaSqFt: number;
  netAreaSqM: number;
  wasteAreaSqFt: number;
  wasteAreaSqM: number;
  grossAreaSqFt: number;
  grossAreaSqM: number;
  totalBoxesNeeded: number;
  purchasedAreaSqFt: number;
  estimatedMaterialCost: number;
  underlaymentRolls: number;
  adhesiveTubes: number;
  perimeterFt: number;
  perimeterM: number;
}

export function calculateFlooring(input: FlooringInput): FlooringResult {
  const { length, width, unit, wastePercent, costPerUnit = 0, sqFtPerBox = 20 } = input;
  
  let netSqFt = 0;
  let netSqM = 0;
  let perimeterFt = 0;
  let perimeterM = 0;

  if (unit === 'imperial') {
    netSqFt = length * width;
    netSqM = sqFtToSqMeters(netSqFt);
    perimeterFt = 2 * (length + width);
    perimeterM = perimeterFt * 0.3048;
  } else {
    netSqM = length * width;
    netSqFt = sqMetersToSqFt(netSqM);
    perimeterM = 2 * (length + width);
    perimeterFt = perimeterM / 0.3048;
  }

  const wasteMultiplier = 1 + (wastePercent / 100);
  const grossSqFt = netSqFt * wasteMultiplier;
  const grossSqM = netSqM * wasteMultiplier;
  const wasteSqFt = grossSqFt - netSqFt;
  const wasteSqM = grossSqM - netSqM;

  const boxCoverage = sqFtPerBox > 0 ? sqFtPerBox : 20;
  const totalBoxesNeeded = Math.ceil(grossSqFt / boxCoverage);
  const purchasedAreaSqFt = totalBoxesNeeded * boxCoverage;

  let estimatedMaterialCost = 0;
  if (costPerUnit > 0) {
    if (unit === 'imperial') {
      estimatedMaterialCost = purchasedAreaSqFt * costPerUnit;
    } else {
      const purchasedAreaSqM = sqFtToSqMeters(purchasedAreaSqFt);
      estimatedMaterialCost = purchasedAreaSqM * costPerUnit;
    }
  }

  const underlaymentRolls = Math.ceil(grossSqFt / 100);
  const adhesiveTubes = Math.ceil(grossSqFt / 50);

  return {
    netAreaSqFt: roundTo(netSqFt, 2),
    netAreaSqM: roundTo(netSqM, 2),
    wasteAreaSqFt: roundTo(wasteSqFt, 2),
    wasteAreaSqM: roundTo(wasteSqM, 2),
    grossAreaSqFt: roundTo(grossSqFt, 2),
    grossAreaSqM: roundTo(grossSqM, 2),
    totalBoxesNeeded: Math.max(1, totalBoxesNeeded),
    purchasedAreaSqFt: roundTo(purchasedAreaSqFt, 2),
    estimatedMaterialCost: roundTo(estimatedMaterialCost, 2),
    underlaymentRolls: Math.max(1, underlaymentRolls),
    adhesiveTubes: Math.max(1, adhesiveTubes),
    perimeterFt: roundTo(perimeterFt, 2),
    perimeterM: roundTo(perimeterM, 2),
  };
}

export interface TileInput {
  roomLength: number;
  roomWidth: number;
  tileLength: number;
  tileWidth: number;
  unit: 'imperial' | 'metric';
  groutGapInches: number;
  wastePercent: number;
  tilesPerBox?: number;
  costPerSqUnit?: number;
}

export interface TileResult {
  netAreaSqFt: number;
  netAreaSqM: number;
  grossAreaSqFt: number;
  grossAreaSqM: number;
  singleTileAreaSqInches: number;
  singleTileAreaSqFt: number;
  exactTilesNeeded: number;
  totalTilesWithWaste: number;
  totalBoxesNeeded: number;
  thinsetMortarBags: number;
  groutBagsNeeded: number;
  estimatedCost: number;
}

export function calculateTile(input: TileInput): TileResult {
  const {
    roomLength,
    roomWidth,
    tileLength,
    tileWidth,
    unit,
    wastePercent,
    tilesPerBox = 10,
    costPerSqUnit = 0,
  } = input;

  let netSqFt = 0;
  let tileLInches = tileLength;
  let tileWInches = tileWidth;

  if (unit === 'imperial') {
    netSqFt = roomLength * roomWidth;
  } else {
    const netSqM = roomLength * roomWidth;
    netSqFt = sqMetersToSqFt(netSqM);
    tileLInches = tileLength / 2.54;
    tileWInches = tileWidth / 2.54;
  }

  const singleTileAreaSqInches = tileLInches * tileWInches;
  const singleTileAreaSqFt = singleTileAreaSqInches / 144;

  const wasteMultiplier = 1 + (wastePercent / 100);
  const grossSqFt = netSqFt * wasteMultiplier;
  const grossSqM = sqFtToSqMeters(grossSqFt);

  const exactTilesNeeded = singleTileAreaSqFt > 0 ? Math.ceil(netSqFt / singleTileAreaSqFt) : 0;
  const totalTilesWithWaste = singleTileAreaSqFt > 0 ? Math.ceil(grossSqFt / singleTileAreaSqFt) : 0;

  const validTilesPerBox = tilesPerBox > 0 ? tilesPerBox : 10;
  const totalBoxesNeeded = Math.ceil(totalTilesWithWaste / validTilesPerBox);

  const thinsetMortarBags = Math.ceil(grossSqFt / 45);
  const groutBagsNeeded = Math.ceil(grossSqFt / 100);

  let estimatedCost = 0;
  if (costPerSqUnit > 0) {
    if (unit === 'imperial') {
      estimatedCost = grossSqFt * costPerSqUnit;
    } else {
      estimatedCost = grossSqM * costPerSqUnit;
    }
  }

  return {
    netAreaSqFt: roundTo(netSqFt, 2),
    netAreaSqM: roundTo(sqFtToSqMeters(netSqFt), 2),
    grossAreaSqFt: roundTo(grossSqFt, 2),
    grossAreaSqM: roundTo(grossSqM, 2),
    singleTileAreaSqInches: roundTo(singleTileAreaSqInches, 2),
    singleTileAreaSqFt: roundTo(singleTileAreaSqFt, 4),
    exactTilesNeeded,
    totalTilesWithWaste,
    totalBoxesNeeded: Math.max(1, totalBoxesNeeded),
    thinsetMortarBags: Math.max(1, thinsetMortarBags),
    groutBagsNeeded: Math.max(1, groutBagsNeeded),
    estimatedCost: roundTo(estimatedCost, 2),
  };
}

export interface LaminateInput {
  roomLength: number;
  roomWidth: number;
  unit: 'imperial' | 'metric';
  plankLengthInches?: number;
  plankWidthInches?: number;
  wastePercent: number;
  sqFtPerBox: number;
  costPerSqUnit?: number;
  includeUnderlayment: boolean;
}

export interface LaminateResult {
  netAreaSqFt: number;
  netAreaSqM: number;
  grossAreaSqFt: number;
  grossAreaSqM: number;
  wasteAreaSqFt: number;
  totalBoxesNeeded: number;
  totalSqFtPurchased: number;
  underlaymentRolls: number;
  perimeterFt: number;
  perimeterM: number;
  transitionStripsEstimate: number;
  quarterRoundPieces: number;
  estimatedMaterialCost: number;
}

export function calculateLaminate(input: LaminateInput): LaminateResult {
  const {
    roomLength,
    roomWidth,
    unit,
    wastePercent,
    sqFtPerBox = 19.5,
    costPerSqUnit = 0,
  } = input;

  let netSqFt = 0;
  let perimeterFt = 0;

  if (unit === 'imperial') {
    netSqFt = roomLength * roomWidth;
    perimeterFt = 2 * (roomLength + roomWidth);
  } else {
    const netSqM = roomLength * roomWidth;
    netSqFt = sqMetersToSqFt(netSqM);
    const perimeterM = 2 * (roomLength + roomWidth);
    perimeterFt = perimeterM / 0.3048;
  }

  const wasteMultiplier = 1 + (wastePercent / 100);
  const grossSqFt = netSqFt * wasteMultiplier;
  const grossSqM = sqFtToSqMeters(grossSqFt);
  const wasteAreaSqFt = grossSqFt - netSqFt;

  const validBoxCoverage = sqFtPerBox > 0 ? sqFtPerBox : 19.5;
  const totalBoxesNeeded = Math.ceil(grossSqFt / validBoxCoverage);
  const totalSqFtPurchased = totalBoxesNeeded * validBoxCoverage;

  const underlaymentRolls = Math.ceil(grossSqFt / 100);
  const quarterRoundPieces = Math.ceil((perimeterFt * 1.1) / 8);
  const transitionStripsEstimate = 1;

  let estimatedMaterialCost = 0;
  if (costPerSqUnit && costPerSqUnit > 0) {
    if (unit === 'imperial') {
      estimatedMaterialCost = totalSqFtPurchased * costPerSqUnit;
    } else {
      estimatedMaterialCost = sqFtToSqMeters(totalSqFtPurchased) * costPerSqUnit;
    }
  }

  return {
    netAreaSqFt: roundTo(netSqFt, 2),
    netAreaSqM: roundTo(sqFtToSqMeters(netSqFt), 2),
    grossAreaSqFt: roundTo(grossSqFt, 2),
    grossAreaSqM: roundTo(grossSqM, 2),
    wasteAreaSqFt: roundTo(wasteAreaSqFt, 2),
    totalBoxesNeeded: Math.max(1, totalBoxesNeeded),
    totalSqFtPurchased: roundTo(totalSqFtPurchased, 2),
    underlaymentRolls: Math.max(1, underlaymentRolls),
    perimeterFt: roundTo(perimeterFt, 2),
    perimeterM: roundTo(perimeterFt * 0.3048, 2),
    transitionStripsEstimate,
    quarterRoundPieces: Math.max(1, quarterRoundPieces),
    estimatedMaterialCost: roundTo(estimatedMaterialCost, 2),
  };
}
