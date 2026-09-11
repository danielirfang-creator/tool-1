'use client';

import React, { useState, useMemo } from 'react';
import { ToolMeta } from '@/config/tools';
import { ResultsDisplay } from './ResultsDisplay';
import { WasteFactorSelector } from './WasteFactorSelector';
import { UnitSelector } from './UnitSelector';
import {
  Calculator,
  RefreshCw,
  Info,
  DollarSign,
  Layers,
  Box,
  Truck,
  ArrowRightLeft,
  CheckCircle2,
  Square,
  Shield,
  Columns
} from 'lucide-react';

interface UniversalCalculatorWidgetProps {
  tool: ToolMeta;
}

export function UniversalCalculatorWidget({ tool }: UniversalCalculatorWidgetProps) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');

  // General Inputs
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(20);
  const [depthInches, setDepthInches] = useState<number>(4);
  const [wasteFactor, setWasteFactor] = useState<number>(10);
  const [pricePerUnit, setPricePerUnit] = useState<number>(0);

  // Painting & Drywall Specific Inputs
  const [height, setHeight] = useState<number>(8);
  const [doors, setDoors] = useState<number>(2);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [sheetSize, setSheetSize] = useState<'4x8' | '4x12'>('4x8');

  // Framing & Stud Inputs
  const [studSpacing, setStudSpacing] = useState<16 | 24>(16);
  const [corners, setCorners] = useState<number>(4);

  // Roofing & Siding Inputs
  const [pitch, setPitch] = useState<number>(6); // e.g. 6/12 pitch
  const [gables, setGables] = useState<number>(2);
  const [gableHeight, setGableHeight] = useState<number>(6);

  // Fence Specific Inputs
  const [fenceLength, setFenceLength] = useState<number>(100);
  const [postSpacing, setPostSpacing] = useState<number>(8);
  const [railsCount, setRailsCount] = useState<number>(3);
  const [picketWidth, setPicketWidth] = useState<number>(5.5); // 5.5" privacy vs 3.5" 1x4
  const [gates, setGates] = useState<number>(1);

  // Decking Specific Inputs
  const [deckMaterial, setDeckMaterial] = useState<'composite' | 'wood-54' | 'wood-2x6'>('composite');
  const [joistSpacing, setJoistSpacing] = useState<12 | 16>(12);

  // Conversion Specific Inputs
  const [convertValue, setConvertValue] = useState<number>(100);
  const [convertDirection, setConvertDirection] = useState<'forward' | 'reverse'>('forward');

  // Dynamic Calculation Engine
  const calcResults = useMemo(() => {
    const slug = tool.slug;
    const cluster = tool.cluster;

    // 1. CONVERSIONS CLUSTER
    if (cluster === 'conversions') {
      let fromUnit = '';
      let toUnit = '';
      let result = 0;
      let formulaStr = '';

      if (slug === 'feet-to-metres-converter') {
        fromUnit = convertDirection === 'forward' ? 'Feet (ft)' : 'Metres (m)';
        toUnit = convertDirection === 'forward' ? 'Metres (m)' : 'Feet (ft)';
        result = convertDirection === 'forward' ? convertValue * 0.3048 : convertValue / 0.3048;
        formulaStr = convertDirection === 'forward' ? '1 ft = 0.3048 m' : '1 m = 3.28084 ft';
      } else if (slug === 'inches-to-mm-converter') {
        fromUnit = convertDirection === 'forward' ? 'Inches (in)' : 'Millimetres (mm)';
        toUnit = convertDirection === 'forward' ? 'Millimetres (mm)' : 'Inches (in)';
        result = convertDirection === 'forward' ? convertValue * 25.4 : convertValue / 25.4;
        formulaStr = convertDirection === 'forward' ? '1 in = 25.4 mm' : '1 mm = 0.03937 in';
      } else if (slug === 'sqft-to-m2-converter') {
        fromUnit = convertDirection === 'forward' ? 'Square Feet (sq ft)' : 'Square Metres (m²)';
        toUnit = convertDirection === 'forward' ? 'Square Metres (m²)' : 'Square Feet (sq ft)';
        result = convertDirection === 'forward' ? convertValue * 0.092903 : convertValue / 0.092903;
        formulaStr = convertDirection === 'forward' ? '1 sq ft = 0.092903 m²' : '1 m² = 10.7639 sq ft';
      } else if (slug === 'litres-to-gallons-converter') {
        fromUnit = convertDirection === 'forward' ? 'Litres (L)' : 'US Gallons (gal)';
        toUnit = convertDirection === 'forward' ? 'US Gallons (gal)' : 'Litres (L)';
        result = convertDirection === 'forward' ? convertValue * 0.264172 : convertValue / 0.264172;
        formulaStr = convertDirection === 'forward' ? '1 L = 0.264172 US gal' : '1 US gal = 3.78541 L';
      } else {
        fromUnit = convertDirection === 'forward' ? 'Kilograms (kg)' : 'Pounds (lbs)';
        toUnit = convertDirection === 'forward' ? 'Pounds (lbs)' : 'Kilograms (kg)';
        result = convertDirection === 'forward' ? convertValue * 2.20462 : convertValue / 2.20462;
        formulaStr = convertDirection === 'forward' ? '1 kg = 2.20462 lbs' : '1 lb = 0.453592 kg';
      }

      return {
        type: 'conversion',
        primaryMetric: {
          label: `Converted Value (${toUnit})`,
          value: result.toFixed(2),
          subtext: formulaStr,
        },
        breakdowns: [
          { label: 'Input Value', value: `${convertValue} ${fromUnit}` },
          { label: 'Conversion Rate', value: formulaStr },
          { label: 'Precision Rounding', value: result.toFixed(4) },
        ],
        alerts: [
          {
            type: 'tip' as const,
            title: 'Precision Accuracy',
            message: 'All conversion multipliers are verified to 6 decimal places per international metrology standards.',
          },
        ],
      };
    }

    // 2. DRYWALL & FRAMING CLUSTER
    if (cluster === 'drywall-framing') {
      if (slug === 'drywall-calculator') {
        const wallPerimeter = 2 * (length + width);
        const grossWallArea = wallPerimeter * height;
        const openingsDeduction = doors * 21 + windows * 15;
        const netWallArea = Math.max(0, grossWallArea - openingsDeduction);
        const ceilingArea = includeCeiling ? length * width : 0;
        const totalDrywallArea = (netWallArea + ceilingArea) * (1 + wasteFactor / 100);

        const sheetSqFt = sheetSize === '4x8' ? 32 : 48;
        const totalSheets = Math.ceil(totalDrywallArea / sheetSqFt);
        const mudPails = Math.ceil(totalDrywallArea / 500); // 1 4.5gal/50lb bucket per 500 sq ft
        const tapeRolls = Math.ceil(totalDrywallArea / 400); // 1 250ft roll per 400 sq ft
        const screwLbs = Math.ceil((totalSheets * 32) / 300); // ~300 1-1/4" screws per lb

        return {
          type: 'standard',
          primaryMetric: {
            label: `Drywall Sheets (${sheetSize})`,
            value: `${totalSheets} Sheets`,
            subtext: `Covers ${Math.round(totalDrywallArea)} sq ft with ${wasteFactor}% cutting waste`,
          },
          secondaryMetrics: [
            { label: 'Joint Compound (Mud)', value: `${mudPails} Pails (4.5 Gal / 50lb)` },
            { label: 'Joint Tape (250ft)', value: `${tapeRolls} Roll(s)` },
            { label: '1-1/4" Drywall Screws', value: `${screwLbs} lbs (~${totalSheets * 32} screws)` },
            { label: 'Net Wall Surface', value: `${Math.round(netWallArea)} sq ft` },
            { label: 'Ceiling Surface', value: `${Math.round(ceilingArea)} sq ft` },
          ],
          breakdowns: [
            { label: 'Room Perimeter', value: `${wallPerimeter} ft` },
            { label: 'Ceiling Height', value: `${height} ft` },
            { label: 'Door & Window Deductions', value: `-${openingsDeduction} sq ft (${doors} doors, ${windows} windows)` },
            { label: 'Sheet Dimension', value: sheetSize === '4x8' ? '4 ft x 8 ft (32 sq ft)' : '4 ft x 12 ft (48 sq ft)' },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Taping Tip',
              message: 'Using 4x12 sheets instead of 4x8 reduces total taped butt joints by 25% for a smoother finish.',
            },
          ],
        };
      }

      if (slug === 'wall-stud-calculator') {
        const wallLinearFt = length;
        const spacingFt = studSpacing / 12; // 1.33 ft for 16" OC, 2.0 ft for 24" OC
        const fieldStuds = Math.ceil(wallLinearFt / spacingFt) + 1;
        const cornerStuds = corners * 2;
        const openingStuds = (doors + windows) * 2; // Jack + King studs
        const totalStuds = Math.ceil((fieldStuds + cornerStuds + openingStuds) * (1 + wasteFactor / 100));
        
        // Plates: Double top plate + single bottom sill plate = 3 plates
        const plateLinearFt = wallLinearFt * 3;
        const plateBoards10ft = Math.ceil(plateLinearFt / 10);
        const framingNailLbs = Math.ceil(totalStuds / 20); // 16d framing nails

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total Framing Studs',
            value: `${totalStuds} Studs`,
            subtext: `For ${wallLinearFt} linear ft at ${studSpacing}" On-Center with ${wasteFactor}% waste`,
          },
          secondaryMetrics: [
            { label: 'Top & Bottom Plates (10ft)', value: `${plateBoards10ft} Boards (2x4x10)` },
            { label: 'Field Studs', value: `${fieldStuds} Studs` },
            { label: 'Corner & Opening Extras', value: `${cornerStuds + openingStuds} Studs` },
            { label: 'Plate Linear Footage', value: `${plateLinearFt} Linear Ft` },
            { label: '16d Framing Nails', value: `${framingNailLbs} lbs` },
          ],
          breakdowns: [
            { label: 'Wall Length', value: `${wallLinearFt} Linear Feet` },
            { label: 'On-Center Spacing', value: `${studSpacing}" On-Center (${spacingFt.toFixed(2)} ft)` },
            { label: 'Plate Configuration', value: 'Double Top Plate + Single Sill Plate (3x length)' },
            { label: 'Corners & Intersections', value: `${corners} Corners (+${cornerStuds} studs)` },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Treated Sill Plate',
              message: 'When fastening bottom plates directly to concrete slabs or basement floors, use pressure-treated lumber.',
            },
          ],
        };
      }
    }

    // 3. ROOFING & SIDING CLUSTER
    if (cluster === 'roofing-siding') {
      if (slug === 'roof-shingle-calculator') {
        const footprintSqFt = length * width;
        // Pitch multipliers: sqrt(1 + (pitch/12)^2)
        const pitchMultiplier = Math.sqrt(1 + Math.pow(pitch / 12, 2));
        const trueRoofArea = footprintSqFt * pitchMultiplier;
        const totalRoofAreaWithWaste = trueRoofArea * (1 + wasteFactor / 100);
        const roofingSquares = totalRoofAreaWithWaste / 100;
        const shingleBundles = Math.ceil(roofingSquares * 3); // 3 bundles per square
        const underlaymentRolls = Math.ceil(roofingSquares / 10); // Synthetic underlayment = 10 squares/roll
        const starterStripFt = Math.round(2 * (length + width));
        const ridgeCapBundles = Math.ceil(length / 30); // 30 linear ft per ridge bundle

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Architectural Shingle Bundles',
            value: `${shingleBundles} Bundles`,
            subtext: `${Math.ceil(roofingSquares)} Roofing Squares (${Math.round(totalRoofAreaWithWaste)} sq ft)`,
          },
          secondaryMetrics: [
            { label: 'Roofing Squares', value: `${roofingSquares.toFixed(1)} Squares` },
            { label: 'Underlayment (10 sq rolls)', value: `${underlaymentRolls} Roll(s)` },
            { label: 'Starter Strip Length', value: `${starterStripFt} Linear Ft` },
            { label: 'Ridge Cap Bundles', value: `${ridgeCapBundles} Bundles` },
            { label: 'Roofing Coil Nails (1-1/4")', value: `${Math.ceil(roofingSquares * 320)} Nails (1 Box)` },
          ],
          breakdowns: [
            { label: 'Ground Footprint Area', value: `${footprintSqFt} sq ft` },
            { label: 'Roof Pitch / Slope', value: `${pitch}/12 (Multiplier: ${pitchMultiplier.toFixed(3)})` },
            { label: 'True Sloped Roof Area', value: `${Math.round(trueRoofArea)} sq ft` },
            { label: 'Gable & Valley Waste Buffer', value: `+${wasteFactor}%` },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Ice & Water Shield',
              message: 'Install self-adhering Ice & Water shield membrane at least 3 feet up from the eaves and in all valleys.',
            },
          ],
        };
      }

      if (slug === 'siding-calculator') {
        const wallPerimeter = length; // linear ft of exterior walls
        const grossWallArea = wallPerimeter * height;
        const gableArea = gables * (0.5 * width * gableHeight);
        const openingsDeduction = doors * 21 + windows * 15;
        const netSidingArea = Math.max(0, (grossWallArea + gableArea - openingsDeduction)) * (1 + wasteFactor / 100);
        const sidingSquares = netSidingArea / 100;
        const sidingBoxes = Math.ceil(sidingSquares / 2); // 2 squares per standard vinyl carton
        const starterPieces = Math.ceil(wallPerimeter / 10); // 10ft starter strips
        const jChannelPieces = Math.ceil((openingsDeduction * 1.5 + wallPerimeter) / 12.5); // 12.5ft pieces
        const cornerPosts = Math.ceil(corners * (height / 10));

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Vinyl Siding Cartons',
            value: `${sidingBoxes} Cartons (2 Sq/Box)`,
            subtext: `${sidingSquares.toFixed(1)} Squares (${Math.round(netSidingArea)} sq ft) with ${wasteFactor}% waste`,
          },
          secondaryMetrics: [
            { label: 'Total Siding Squares', value: `${sidingSquares.toFixed(1)} Squares` },
            { label: '10ft Starter Strips', value: `${starterPieces} Pieces` },
            { label: '12.5ft J-Channels', value: `${jChannelPieces} Pieces` },
            { label: 'Outside Corner Posts', value: `${cornerPosts} Posts` },
            { label: 'Housewrap Vapor Barrier', value: `${Math.ceil(netSidingArea / 900)} Roll(s) (9x100ft)` },
          ],
          breakdowns: [
            { label: 'Rectangular Wall Area', value: `${grossWallArea} sq ft` },
            { label: 'Gable Peak Triangular Area', value: `+${Math.round(gableArea)} sq ft (${gables} gables)` },
            { label: 'Door & Window Deductions', value: `-${openingsDeduction} sq ft (${doors} doors, ${windows} windows)` },
            { label: 'Net Siding Surface', value: `${Math.round(netSidingArea)} sq ft` },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Fastening Rule',
              message: 'Fasten nails in the center of the nailing slots without driving heads tight to allow natural thermal expansion.',
            },
          ],
        };
      }
    }

    // 4. FENCING & DECKING CLUSTER
    if (cluster === 'fencing-decking') {
      if (slug === 'fence-calculator') {
        const totalRunFt = fenceLength;
        const sections = Math.ceil(totalRunFt / postSpacing);
        const posts = sections + 1 + gates; // 1 end post + gate posts
        const rails = sections * railsCount;
        const picketWidthInches = picketWidth;
        const pickets = Math.ceil(((totalRunFt * 12) / picketWidthInches) * 1.05); // 5% waste
        const concreteBags50lb = posts * 2; // 2 bags per post hole

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total 4x4 Fence Posts',
            value: `${posts} Posts`,
            subtext: `For ${totalRunFt} linear ft at ${postSpacing}ft spacing with ${gates} gate(s)`,
          },
          secondaryMetrics: [
            { label: '2x4 Horizontal Rails', value: `${rails} Rails (${railsCount} per section)` },
            { label: `${picketWidth}" Fence Pickets`, value: `${pickets} Pickets` },
            { label: '50lb Fast-Setting Concrete', value: `${concreteBags50lb} Bags (2/hole)` },
            { label: 'Fence Sections', value: `${sections} Sections` },
            { label: '1-5/8" Exterior Screws', value: `${Math.ceil((pickets * 6) / 350)} lbs (~${pickets * 6} screws)` },
          ],
          breakdowns: [
            { label: 'Total Fence Run', value: `${totalRunFt} Linear Feet` },
            { label: 'Post Spacing', value: `${postSpacing} Feet On-Center` },
            { label: 'Rail Configuration', value: `${railsCount} Rails (Top, ${railsCount === 3 ? 'Middle, ' : ''}Bottom)` },
            { label: 'Picket Size', value: `${picketWidth}" Wide Dog-Ear Pickets` },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Post Hole Depth',
              message: 'Dig post holes to a minimum depth of 30–36 inches to stay safely below the frost line and ensure wind stability.',
            },
          ],
        };
      }

      if (slug === 'decking-calculator') {
        const deckAreaSqFt = length * width; // length along wall, width outward
        const boardWidthInches = 5.5; // Standard 5.5" for 5/4x6 and composite
        const boardsPerFt = 12 / boardWidthInches; // ~2.18 boards per ft of width
        const rawBoardRunFt = Math.ceil(width * boardsPerFt);
        const totalBoards = Math.ceil(rawBoardRunFt * (1 + wasteFactor / 100));
        const totalLinearFeet = Math.round(totalBoards * length);
        
        // Joists: length / spacing
        const joistSpacingFt = joistSpacing / 12;
        const joistsCount = Math.ceil(length / joistSpacingFt) + 1;
        const fastenerClips = Math.ceil((deckAreaSqFt * 2.5) / 90); // 90 clips per box

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Deck Surface Boards (16ft)',
            value: `${totalBoards} Boards`,
            subtext: `${totalLinearFeet} Lineal Feet for ${deckAreaSqFt} sq ft deck with ${wasteFactor}% waste`,
          },
          secondaryMetrics: [
            { label: 'Framing Joists (2x8)', value: `${joistsCount} Joists (${joistSpacing}" OC)` },
            { label: 'Total Linear Footage', value: `${totalLinearFeet} Linear Ft` },
            { label: 'Hidden Fastener Boxes', value: `${fastenerClips} Boxes (90ct/box)` },
            { label: 'Ledger Board (2x8)', value: `${length} Linear Ft` },
            { label: 'Joist Hangers', value: `${joistsCount} Hangers` },
          ],
          breakdowns: [
            { label: 'Deck Dimensions', value: `${length} ft (along house) x ${width} ft (projection)` },
            { label: 'Surface Square Footage', value: `${deckAreaSqFt} sq ft` },
            { label: 'Material Type', value: deckMaterial === 'composite' ? 'Composite / Trex (5.5" width)' : 'Treated 5/4x6 Wood' },
            { label: 'Joist Spacing', value: `${joistSpacing}" On-Center` },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Composite 12" Rule',
              message: 'Composite decking requires 12" on-center joist spacing for diagonal layouts or maximum non-flex support.',
            },
          ],
        };
      }
    }

    // 5. PAINTING CLUSTER
    if (cluster === 'painting') {
      const wallPerimeter = 2 * (length + width);
      const grossWallArea = wallPerimeter * height;
      const deductionArea = doors * 20 + windows * 15;
      const netWallArea = Math.max(0, grossWallArea - deductionArea);
      const ceilingArea = length * width;

      let totalPaintArea = netWallArea;
      if (slug === 'ceiling-paint-calculator') {
        totalPaintArea = ceilingArea;
      } else if (slug === 'paint-calculator') {
        totalPaintArea = netWallArea + ceilingArea;
      }

      const totalCoverageNeeded = totalPaintArea * coats;
      const gallonsNeeded = Math.ceil(totalCoverageNeeded / 350); // 350 sq ft/gal
      const primerGallons = Math.ceil(totalPaintArea / 300);
      const totalCost = pricePerUnit > 0 ? gallonsNeeded * pricePerUnit : 0;

      return {
        type: 'standard',
        primaryMetric: {
          label: 'Total Paint Required',
          value: `${gallonsNeeded} Gallons`,
          subtext: `Based on ${coats} coat(s) @ 350 sq ft/gallon`,
        },
        secondaryMetrics: [
          { label: 'Net Surface Area', value: `${Math.round(totalPaintArea)} sq ft` },
          { label: 'Primer Needed', value: `${primerGallons} Gallons` },
          { label: 'Coverage Volume', value: `${(gallonsNeeded * 3.785).toFixed(1)} Litres` },
          ...(totalCost > 0 ? [{ label: 'Estimated Material Cost', value: `$${totalCost.toFixed(2)}` }] : []),
        ],
        breakdowns: [
          { label: 'Gross Wall Area', value: `${grossWallArea} sq ft` },
          { label: 'Window & Door Deductions', value: `-${deductionArea} sq ft (${doors} doors, ${windows} windows)` },
          { label: 'Net Wall Area', value: `${netWallArea} sq ft` },
          { label: 'Ceiling Area', value: `${ceilingArea} sq ft` },
        ],
        alerts: [
          {
            type: 'info' as const,
            title: 'Contractor 2-Coat Rule',
            message: 'Unpainted drywall or dramatic color transitions always require 2 full coats plus 1 coat of PVA drywall primer.',
          },
        ],
      };
    }

    // 6. CONCRETE & MASONRY CLUSTER
    if (cluster === 'concrete-masonry') {
      const areaSqFt = length * width;
      const depthFeet = depthInches / 12;
      const rawCubicFeet = areaSqFt * depthFeet;
      const cubicFeetWithBuffer = rawCubicFeet * (1 + wasteFactor / 100);
      const cubicYards = (cubicFeetWithBuffer / 27);

      const bags80lb = Math.ceil(cubicFeetWithBuffer / 0.60);
      const bags60lb = Math.ceil(cubicFeetWithBuffer / 0.45);
      const rebarFeet = Math.round(areaSqFt * 1.5);
      const gravelYards = (areaSqFt * (4 / 12) / 27).toFixed(1);
      const totalCost = pricePerUnit > 0 ? bags80lb * pricePerUnit : 0;

      if (slug === 'brick-calculator') {
        const totalBricks = Math.ceil(areaSqFt * 7 * (1 + wasteFactor / 100));
        const mortarBags = Math.ceil(totalBricks / 140);
        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total Modular Bricks Needed',
            value: `${totalBricks.toLocaleString()} Bricks`,
            subtext: `Includes ${wasteFactor}% cutting and breakage buffer`,
          },
          secondaryMetrics: [
            { label: 'Type N Mortar Bags (70lb)', value: `${mortarBags} Bags` },
            { label: 'Wall Surface Area', value: `${areaSqFt} sq ft` },
            { label: 'Masonry Sand Required', value: `${(mortarBags * 0.15).toFixed(1)} Tons` },
          ],
          breakdowns: [
            { label: 'Net Wall Area', value: `${areaSqFt} sq ft` },
            { label: 'Base Brick Multiplier', value: '7 Modular Bricks / Sq Ft' },
            { label: 'Cutting Waste Allowance', value: `+${wasteFactor}%` },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Standard 3/8" Mortar Joints',
              message: 'Calculation accounts for standard 3/8-inch mortar bedding and vertical head joints.',
            },
          ],
        };
      }

      if (slug === 'block-calculator') {
        const totalBlocks = Math.ceil(areaSqFt * 1.125 * (1 + wasteFactor / 100));
        const mortarBags = Math.ceil(totalBlocks / 30);
        return {
          type: 'standard',
          primaryMetric: {
            label: 'Standard 8x8x16 CMU Blocks',
            value: `${totalBlocks.toLocaleString()} Blocks`,
            subtext: `Includes ${wasteFactor}% cutting and corner waste`,
          },
          secondaryMetrics: [
            { label: 'Type S Mortar Bags (80lb)', value: `${mortarBags} Bags` },
            { label: 'Core-Fill Grout Volume', value: `${((totalBlocks * 0.86) / 100).toFixed(2)} Cu Yds` },
            { label: 'Wall Surface Area', value: `${areaSqFt} sq ft` },
          ],
          breakdowns: [
            { label: 'Wall Surface Area', value: `${areaSqFt} sq ft` },
            { label: 'Block Density', value: '1.125 Blocks / Sq Ft (8x8x16)' },
            { label: 'Mortar Yield', value: '30 Blocks Per 80lb Bag' },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Below Grade Specification',
              message: 'Use Type S high-strength mortar (minimum 1,800 PSI) for structural retaining and foundation block walls.',
            },
          ],
        };
      }

      if (slug === 'mortar-calculator') {
        const mortarBags = Math.ceil(areaSqFt / 30);
        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total Mortar Bags (80lb)',
            value: `${mortarBags} Bags`,
            subtext: 'Type N (Above Grade) or Type S (Below Grade)',
          },
          secondaryMetrics: [
            { label: 'Masonry Sand Volume', value: `${(mortarBags * 0.12).toFixed(1)} Tons` },
            { label: 'Water Requirement', value: `${(mortarBags * 1.2).toFixed(1)} Gallons` },
          ],
          breakdowns: [
            { label: 'Square Footage Covered', value: `${areaSqFt} sq ft` },
            { label: 'Yield Rule', value: '~30 sq ft coverage per 80lb bag @ 3/8" joint' },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Mortar Pot Life',
              message: 'Once mixed with water, mortar has a working pot life of approximately 90 minutes before setting.',
            },
          ],
        };
      }

      return {
        type: 'standard',
        primaryMetric: {
          label: 'Total Ready-Mix Concrete',
          value: `${cubicYards.toFixed(2)} Cubic Yards`,
          subtext: `Or ${bags80lb} Bags (80lb) / ${bags60lb} Bags (60lb)`,
        },
        secondaryMetrics: [
          { label: '80lb Pre-Mixed Bags', value: `${bags80lb} Bags` },
          { label: '60lb Pre-Mixed Bags', value: `${bags60lb} Bags` },
          { label: 'Total Cubic Feet', value: `${cubicFeetWithBuffer.toFixed(1)} Cu Ft` },
          { label: 'Crushed Gravel Subbase (4")', value: `${gravelYards} Cu Yds` },
          { label: 'Rebar / Wire Mesh', value: `${rebarFeet} Linear Ft` },
          ...(totalCost > 0 ? [{ label: 'Estimated Bag Cost', value: `$${totalCost.toFixed(2)}` }] : []),
        ],
        breakdowns: [
          { label: 'Slab Dimensions', value: `${length} ft x ${width} ft (${areaSqFt} sq ft)` },
          { label: 'Pour Depth', value: `${depthInches} inches (${depthFeet.toFixed(3)} ft)` },
          { label: 'Subgrade Waste Margin', value: `+${wasteFactor}%` },
        ],
        alerts: [
          {
            type: 'tip' as const,
            title: 'Truck Delivery Threshold',
            message: 'If your project exceeds 1.5 cubic yards (~65 bags), ordering a ready-mix truck delivery saves hours of mixing labor.',
          },
        ],
      };
    }

    // 7. FLOORING & GARDEN & ROOMS CLUSTER
    const areaSqFt = length * width;
    if (cluster === 'flooring') {
      const totalAreaWithWaste = areaSqFt * (1 + wasteFactor / 100);
      const boxSize = slug.includes('vinyl') ? 24 : slug.includes('tile') ? 15 : 20;
      const totalBoxes = Math.ceil(totalAreaWithWaste / boxSize);
      const totalCost = pricePerUnit > 0 ? totalAreaWithWaste * pricePerUnit : 0;

      return {
        type: 'standard',
        primaryMetric: {
          label: 'Flooring Material Required',
          value: `${Math.ceil(totalAreaWithWaste)} Sq Ft`,
          subtext: `${totalBoxes} Boxes (${boxSize} sq ft/box) with ${wasteFactor}% waste`,
        },
        secondaryMetrics: [
          { label: 'Net Room Area', value: `${areaSqFt} sq ft` },
          { label: 'Cartons / Boxes', value: `${totalBoxes} Boxes` },
          { label: 'Waste Allowance', value: `${Math.round(totalAreaWithWaste - areaSqFt)} sq ft` },
          ...(totalCost > 0 ? [{ label: 'Estimated Material Cost', value: `$${totalCost.toFixed(2)}` }] : []),
        ],
        breakdowns: [
          { label: 'Room Dimensions', value: `${length} ft x ${width} ft` },
          { label: 'Box Coverage Spec', value: `${boxSize} sq ft per carton` },
          { label: 'Waste Factor', value: `+${wasteFactor}%` },
        ],
        alerts: [
          {
            type: 'tip' as const,
            title: 'Subfloor Acclimation',
            message: 'Allow flooring planks to acclimate in the installation room for 48 hours prior to installation.',
          },
        ],
      };
    }

    // Garden Cluster
    if (cluster === 'garden') {
      const depthFeet = depthInches / 12;
      const rawCubicFeet = areaSqFt * depthFeet;
      const cubicYards = (rawCubicFeet / 27) * (1 + wasteFactor / 100);
      const tonsGravel = cubicYards * 1.4;

      return {
        type: 'standard',
        primaryMetric: {
          label: slug.includes('gravel') ? 'Total Gravel Needed' : 'Total Material Volume',
          value: slug.includes('gravel') ? `${tonsGravel.toFixed(1)} Tons` : `${cubicYards.toFixed(1)} Cubic Yards`,
          subtext: `Covers ${areaSqFt} sq ft at ${depthInches}" depth with ${wasteFactor}% buffer`,
        },
        secondaryMetrics: [
          { label: 'Cubic Yards', value: `${cubicYards.toFixed(1)} Cu Yds` },
          { label: 'Total Cubic Feet', value: `${rawCubicFeet.toFixed(1)} Cu Ft` },
          { label: 'Coverage Area', value: `${areaSqFt} sq ft` },
        ],
        breakdowns: [
          { label: 'Area Dimensions', value: `${length} ft x ${width} ft` },
          { label: 'Layer Depth', value: `${depthInches} inches` },
        ],
        alerts: [],
      };
    }

    // Rooms & Walls Cluster
    const perimeter = 2 * (length + width);
    const wallArea = Math.max(0, perimeter * height - (doors * 20 + windows * 15));
    const baseboardFeet = Math.ceil(perimeter * 1.10);

    return {
      type: 'standard',
      primaryMetric: {
        label: 'Room Floor Area',
        value: `${areaSqFt} Square Feet`,
        subtext: `${(areaSqFt * 0.092903).toFixed(1)} Square Metres (m²)`,
      },
      secondaryMetrics: [
        { label: 'Wall Surface Area', value: `${wallArea} sq ft` },
        { label: 'Room Perimeter', value: `${perimeter} Linear Ft` },
        { label: 'Baseboard Trim', value: `${baseboardFeet} Linear Ft` },
      ],
      breakdowns: [
        { label: 'Room Dimensions', value: `${length} ft x ${width} ft x ${height} ft H` },
      ],
      alerts: [],
    };
  }, [
    tool,
    length,
    width,
    depthInches,
    wasteFactor,
    pricePerUnit,
    height,
    doors,
    windows,
    coats,
    includeCeiling,
    sheetSize,
    studSpacing,
    corners,
    pitch,
    gables,
    gableHeight,
    fenceLength,
    postSpacing,
    railsCount,
    picketWidth,
    gates,
    deckMaterial,
    joistSpacing,
    convertValue,
    convertDirection,
  ]);

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 sm:p-8">
      {/* Header & Mode Switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{tool.name.split('(')[0].trim()} Estimator</h2>
            <p className="text-xs text-slate-500 font-medium">Real-time dynamic contractor formulas</p>
          </div>
        </div>

        {tool.cluster !== 'conversions' && (
          <UnitSelector unit={unit} onChange={setUnit} />
        )}
      </div>

      {/* Dynamic Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tool.cluster === 'conversions' ? (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Value to Convert
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={convertValue || ''}
                onChange={(e) => setConvertValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter number..."
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-sm font-bold text-slate-700">Conversion Direction</span>
              <button
                type="button"
                onClick={() => setConvertDirection((d) => (d === 'forward' ? 'reverse' : 'forward'))}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Switch Direction</span>
              </button>
            </div>
          </>
        ) : tool.slug === 'drywall-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Room Length (Feet)</label>
              <input
                type="number"
                min="1"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Room Width (Feet)</label>
              <input
                type="number"
                min="1"
                value={width || ''}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ceiling Height (Feet)</label>
              <input
                type="number"
                min="1"
                value={height || ''}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Sheet Dimensions</label>
              <select
                value={sheetSize}
                onChange={(e) => setSheetSize(e.target.value as '4x8' | '4x12')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="4x8">4 ft × 8 ft (32 sq ft - Standard)</option>
                <option value="4x12">4 ft × 12 ft (48 sq ft - Pro Large)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Doors (Deduct 21 sq ft)</label>
              <input
                type="number"
                min="0"
                value={doors}
                onChange={(e) => setDoors(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Windows (Deduct 15 sq ft)</label>
              <input
                type="number"
                min="0"
                value={windows}
                onChange={(e) => setWindows(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                id="includeCeiling"
                checked={includeCeiling}
                onChange={(e) => setIncludeCeiling(e.target.checked)}
                className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="includeCeiling" className="text-sm font-bold text-slate-800 cursor-pointer">
                Include Ceiling Drywall Calculation (+{length * width} sq ft)
              </label>
            </div>
            <div className="md:col-span-2">
              <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
            </div>
          </>
        ) : tool.slug === 'wall-stud-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Total Wall Length (Linear Feet)</label>
              <input
                type="number"
                min="1"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Stud Spacing (On-Center)</label>
              <select
                value={studSpacing}
                onChange={(e) => setStudSpacing(parseInt(e.target.value, 10) as 16 | 24)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={16}>16 Inches On-Center (Standard Structural)</option>
                <option value={24}>24 Inches On-Center (Advanced Framing)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Corners & Wall Intersections</label>
              <input
                type="number"
                min="0"
                value={corners}
                onChange={(e) => setCorners(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Door & Window Openings</label>
              <input
                type="number"
                min="0"
                value={doors + windows}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setDoors(val);
                  setWindows(0);
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
            </div>
          </>
        ) : tool.slug === 'roof-shingle-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Roof Base Length (Feet)</label>
              <input
                type="number"
                min="1"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Roof Base Width (Feet)</label>
              <input
                type="number"
                min="1"
                value={width || ''}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Roof Pitch / Slope</label>
              <select
                value={pitch}
                onChange={(e) => setPitch(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={0}>Flat Roof (0/12)</option>
                <option value={3}>Low Pitch (3/12)</option>
                <option value={4}>4/12 Conventional</option>
                <option value={5}>5/12 Medium</option>
                <option value={6}>6/12 Standard Gable (Common)</option>
                <option value={8}>8/12 Steep</option>
                <option value={10}>10/12 High Wind & Snow</option>
                <option value={12}>12/12 45-Degree Severe</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
            </div>
          </>
        ) : tool.slug === 'siding-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Total Wall Length (Linear Feet)</label>
              <input
                type="number"
                min="1"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Wall Height (Feet)</label>
              <input
                type="number"
                min="1"
                value={height || ''}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Gable Peaks (Count)</label>
              <input
                type="number"
                min="0"
                value={gables}
                onChange={(e) => setGables(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Gable Peak Height (Feet)</label>
              <input
                type="number"
                min="0"
                value={gableHeight}
                onChange={(e) => setGableHeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Doors (Deduct 21 sq ft)</label>
              <input
                type="number"
                min="0"
                value={doors}
                onChange={(e) => setDoors(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Windows (Deduct 15 sq ft)</label>
              <input
                type="number"
                min="0"
                value={windows}
                onChange={(e) => setWindows(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="md:col-span-2">
              <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
            </div>
          </>
        ) : tool.slug === 'fence-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Total Fence Length (Feet)
              </label>
              <input
                type="number"
                min="1"
                value={fenceLength || ''}
                onChange={(e) => setFenceLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Post Spacing (Feet on-center)
              </label>
              <select
                value={postSpacing}
                onChange={(e) => setPostSpacing(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={6}>6 Feet Spacing (High Wind)</option>
                <option value={8}>8 Feet Standard Spacing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Horizontal Rails</label>
              <select
                value={railsCount}
                onChange={(e) => setRailsCount(parseInt(e.target.value, 10))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={2}>2 Rails (4ft - 5ft fence)</option>
                <option value={3}>3 Rails (6ft privacy fence - Recommended)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Picket Width</label>
              <select
                value={picketWidth}
                onChange={(e) => setPicketWidth(parseFloat(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={5.5}>5.5 Inches (1x6 Dog-Ear Privacy)</option>
                <option value={3.5}>3.5 Inches (1x4 Standard)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Gate Openings (Count)</label>
              <input
                type="number"
                min="0"
                value={gates}
                onChange={(e) => setGates(parseInt(e.target.value, 10) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </>
        ) : tool.slug === 'decking-calculator' ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Deck Length along House (Feet)</label>
              <input
                type="number"
                min="1"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Deck Projection Width (Feet)</label>
              <input
                type="number"
                min="1"
                value={width || ''}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Decking Material</label>
              <select
                value={deckMaterial}
                onChange={(e) => setDeckMaterial(e.target.value as 'composite' | 'wood-54' | 'wood-2x6')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="composite">Composite / Trex (5.5" width)</option>
                <option value="wood-54">Treated 5/4×6 Wood</option>
                <option value="wood-2x6">Heavy 2×6 Wood</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Joist Spacing (On-Center)</label>
              <select
                value={joistSpacing}
                onChange={(e) => setJoistSpacing(parseInt(e.target.value, 10) as 12 | 16)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value={12}>12 Inches OC (Required for Composite & Diagonal)</option>
                <option value={16}>16 Inches OC (Standard Wood)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Length ({unit === 'imperial' ? 'Feet' : 'Metres'})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Width ({unit === 'imperial' ? 'Feet' : 'Metres'})
              </label>
              <input
                type="number"
                min="0.1"
                step="any"
                value={width || ''}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Depth Input for Concrete, Gravel, Mulch */}
            {(tool.cluster === 'concrete-masonry' || tool.cluster === 'garden') &&
              tool.slug !== 'brick-calculator' &&
              tool.slug !== 'block-calculator' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Layer Thickness / Depth (Inches)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={depthInches || ''}
                    onChange={(e) => setDepthInches(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

            {/* Height & Openings for Painting & Rooms */}
            {(tool.cluster === 'painting' || tool.cluster === 'rooms') && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Ceiling Height ({unit === 'imperial' ? 'Feet' : 'Metres'})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={height || ''}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Doors (Deduct 20 sq ft each)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={doors}
                    onChange={(e) => setDoors(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Windows (Deduct 15 sq ft each)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={windows}
                    onChange={(e) => setWindows(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {tool.cluster === 'painting' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Number of Paint Coats
                    </label>
                    <select
                      value={coats}
                      onChange={(e) => setCoats(parseInt(e.target.value, 10))}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={1}>1 Coat (Touch-up / Same Color)</option>
                      <option value={2}>2 Coats (Standard Contractor Spec)</option>
                      <option value={3}>3 Coats (Bold Color Transformation)</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Waste Factor Selector */}
            {tool.cluster !== 'painting' && (
              <div className="md:col-span-2">
                <WasteFactorSelector value={wasteFactor} onChange={setWasteFactor} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Real-time Output Intelligence Card */}
      <ResultsDisplay
        primaryTitle={calcResults.primaryMetric.label}
        primaryValue={calcResults.primaryMetric.value}
        primarySubtext={calcResults.primaryMetric.subtext}
        secondaryMetrics={calcResults.secondaryMetrics || []}
        assumptions={(calcResults.breakdowns || []).map((b) => `${b.label}: ${b.value}`)}
      />
    </div>
  );
}
