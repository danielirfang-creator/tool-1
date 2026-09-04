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

  // Painting Specific Inputs
  const [height, setHeight] = useState<number>(9);
  const [doors, setDoors] = useState<number>(2);
  const [windows, setWindows] = useState<number>(2);
  const [coats, setCoats] = useState<number>(2);

  // Fence Specific Inputs
  const [fenceLength, setFenceLength] = useState<number>(100);
  const [postSpacing, setPostSpacing] = useState<number>(8);

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
        // kg to lbs
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

    // 2. PAINTING CLUSTER
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

    // 3. CONCRETE & MASONRY CLUSTER
    if (cluster === 'concrete-masonry') {
      const areaSqFt = length * width;
      const depthFeet = depthInches / 12;
      const rawCubicFeet = areaSqFt * depthFeet;
      const cubicFeetWithBuffer = rawCubicFeet * (1 + wasteFactor / 100);
      const cubicYards = (cubicFeetWithBuffer / 27);

      const bags80lb = Math.ceil(cubicFeetWithBuffer / 0.60); // 0.60 cu ft per 80lb bag
      const bags60lb = Math.ceil(cubicFeetWithBuffer / 0.45); // 0.45 cu ft per 60lb bag
      const rebarFeet = Math.round(areaSqFt * 1.5); // Grid estimate
      const gravelYards = (areaSqFt * (4 / 12) / 27).toFixed(1); // 4" gravel base
      const totalCost = pricePerUnit > 0 ? bags80lb * pricePerUnit : 0;

      // Special handling for Brick / Block
      if (slug === 'brick-calculator') {
        const totalBricks = Math.ceil(areaSqFt * 7 * (1 + wasteFactor / 100)); // ~7 bricks/sq ft
        const mortarBags = Math.ceil(totalBricks / 140); // 1 bag per 140 bricks
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
        const totalBlocks = Math.ceil(areaSqFt * 1.125 * (1 + wasteFactor / 100)); // 1.125 blocks/sq ft (8x8x16)
        const mortarBags = Math.ceil(totalBlocks / 35); // 1 bag per 35 blocks
        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total 8x8x16 CMU Blocks',
            value: `${totalBlocks.toLocaleString()} Blocks`,
            subtext: `Includes ${wasteFactor}% cutting buffer`,
          },
          secondaryMetrics: [
            { label: 'Mortar Bags (70lb)', value: `${mortarBags} Bags` },
            { label: 'Core-Fill Concrete', value: `${(totalBlocks * 0.012).toFixed(1)} Cu Yds` },
            { label: 'Wall Area', value: `${areaSqFt} sq ft` },
          ],
          breakdowns: [
            { label: 'Wall Surface Area', value: `${areaSqFt} sq ft` },
            { label: 'Block Dimensions', value: '8" x 8" x 16" Standard CMU' },
            { label: 'Joint Buffer', value: '3/8" Mortar Bedding' },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Core Filling Requirement',
              message: 'Retaining walls and structural foundations require rebar and concrete grout core-fill every 32 to 48 inches.',
            },
          ],
        };
      }

      return {
        type: 'standard',
        primaryMetric: {
          label: 'Total Concrete Volume',
          value: `${cubicYards.toFixed(2)} Cubic Yards`,
          subtext: `Includes ${wasteFactor}% subgrade spillage & compaction buffer`,
        },
        secondaryMetrics: [
          { label: '80lb Quikrete Bags', value: `${bags80lb} Bags` },
          { label: '60lb Pre-Mix Bags', value: `${bags60lb} Bags` },
          { label: 'Rebar Grid (#4 1/2")', value: `${rebarFeet} Linear Ft` },
          { label: '4" Compacted Base', value: `${gravelYards} Cu Yds` },
          ...(totalCost > 0 ? [{ label: 'Estimated Material Cost', value: `$${totalCost.toFixed(2)}` }] : []),
        ],
        breakdowns: [
          { label: 'Slab Surface Area', value: `${areaSqFt} sq ft` },
          { label: 'Slab Thickness', value: `${depthInches} inches (${(depthInches/12).toFixed(2)} ft)` },
          { label: 'Net Volume', value: `${(rawCubicFeet / 27).toFixed(2)} Cu Yds` },
          { label: 'Spillage Buffer', value: `+${wasteFactor}%` },
        ],
        alerts: [
          {
            type: 'tip' as const,
            title: 'Truck Delivery vs Bags',
            message: 'If your project exceeds 1.5 cubic yards (~68 80lb bags), ordering ready-mix truck delivery is significantly faster and less costly.',
          },
        ],
      };
    }

    // 4. GARDEN & OUTDOORS CLUSTER
    if (cluster === 'garden') {
      const areaSqFt = length * width;

      if (slug === 'fence-calculator') {
        const posts = Math.ceil(fenceLength / postSpacing) + 1;
        const rails = (posts - 1) * 3; // 3 rails for 6ft privacy fence
        const pickets = Math.ceil((fenceLength * 12) / 5.5); // 5.5" wide pickets
        const concreteBags = (posts * 2); // 2 50lb bags per post

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total 4x4 Posts Needed',
            value: `${posts} Posts`,
            subtext: `Based on ${postSpacing}ft on-center post spacing`,
          },
          secondaryMetrics: [
            { label: '2x4 Stringer Rails', value: `${rails} Rails (3-rail fence)` },
            { label: '1x6 Pickets (5.5" wide)', value: `${pickets} Pickets` },
            { label: 'Fast-Set Concrete', value: `${concreteBags} Bags (2/hole)` },
            { label: 'Total Fence Length', value: `${fenceLength} Linear Ft` },
          ],
          breakdowns: [
            { label: 'Perimeter Length', value: `${fenceLength} ft` },
            { label: 'Post Spacing', value: `${postSpacing} ft on-center` },
            { label: 'Picket Width', value: '5.5" Dog-Ear Pine/Cedar' },
          ],
          alerts: [
            {
              type: 'info' as const,
              title: 'Post Hole Depth Rule',
              message: 'Post holes should be dug to at least 1/3 the height of the post (typically 24 to 36 inches deep) to stay below the regional frost line.',
            },
          ],
        };
      }

      if (slug === 'patio-calculator') {
        const pavers = Math.ceil(areaSqFt * 4.5 * (1 + wasteFactor / 100)); // Standard 4.5 pavers/sq ft
        const gravelSubbase = ((areaSqFt * (4 / 12)) / 27).toFixed(1); // 4" crushed stone base
        const screedSand = ((areaSqFt * (1 / 12)) / 27).toFixed(1); // 1" bedding sand
        const edgeRestraint = Math.round(2 * (length + width));

        return {
          type: 'standard',
          primaryMetric: {
            label: 'Total Pavers Required',
            value: `${pavers.toLocaleString()} Pavers`,
            subtext: `Includes ${wasteFactor}% cutting and pattern waste`,
          },
          secondaryMetrics: [
            { label: '4" Subbase Gravel', value: `${gravelSubbase} Cu Yds` },
            { label: '1" Bedding Sand', value: `${screedSand} Cu Yds` },
            { label: 'Polymeric Sand Grout', value: `${Math.ceil(areaSqFt / 75)} Bags (50lb)` },
            { label: 'Snap Edge Restraints', value: `${edgeRestraint} Linear Ft` },
          ],
          breakdowns: [
            { label: 'Patio Surface Area', value: `${areaSqFt} sq ft` },
            { label: 'Paver Coverage Density', value: '4.5 Pavers / Sq Ft' },
            { label: 'Cutting Waste Buffer', value: `+${wasteFactor}%` },
          ],
          alerts: [
            {
              type: 'tip' as const,
              title: 'Compaction Rule',
              message: 'Always use a plate compactor over the 4" road base before screeding your 1" bedding sand.',
            },
          ],
        };
      }

      // Mulch, Gravel, Topsoil, Turf
      const depthFeet = depthInches / 12;
      const rawCubicFeet = areaSqFt * depthFeet;
      const cubicYards = (rawCubicFeet / 27) * (1 + wasteFactor / 100);
      const tonsGravel = cubicYards * 1.4; // ~1.4 tons per cu yd
      const mulchBags2CuFt = Math.ceil(rawCubicFeet / 2);
      const topsoilBags40lb = Math.ceil(rawCubicFeet / 0.75);
      const turfPallets = Math.ceil(areaSqFt / 450);

      return {
        type: 'standard',
        primaryMetric: {
          label: slug.includes('gravel') ? 'Total Gravel Needed' : slug.includes('mulch') ? 'Total Mulch Volume' : 'Total Material Volume',
          value: slug.includes('gravel') ? `${tonsGravel.toFixed(1)} Tons` : `${cubicYards.toFixed(1)} Cubic Yards`,
          subtext: `Covers ${areaSqFt} sq ft at ${depthInches}" depth with ${wasteFactor}% buffer`,
        },
        secondaryMetrics: [
          { label: 'Cubic Yards', value: `${cubicYards.toFixed(1)} Cu Yds` },
          { label: '2 Cu Ft Bags (Mulch)', value: `${mulchBags2CuFt} Bags` },
          { label: '40lb Soil Bags', value: `${topsoilBags40lb} Bags` },
          { label: '500 Sq Ft Sod Pallets', value: `${turfPallets} Pallets` },
        ],
        breakdowns: [
          { label: 'Coverage Area', value: `${areaSqFt} sq ft` },
          { label: 'Layer Depth', value: `${depthInches} inches` },
          { label: 'Compaction Factor', value: `+${wasteFactor}%` },
        ],
        alerts: [
          {
            type: 'tip' as const,
            title: 'Mulch & Weed Suppression',
            message: 'A 2 to 3-inch layer is ideal for weed suppression and moisture retention without suffocating plant root systems.',
          },
        ],
      };
    }

    // 5. ROOMS & WALLS CLUSTER
    const areaSqFt = length * width;
    const perimeter = 2 * (length + width);
    const wallArea = Math.max(0, perimeter * height - (doors * 20 + windows * 15));
    const cubicVolume = areaSqFt * height;
    const drywallSheets4x8 = Math.ceil(wallArea / 32);
    const wallpaperRolls = Math.ceil(wallArea / 28); // ~28 sq ft per double roll with repeat
    const baseboardFeet = Math.ceil(perimeter * 1.10); // 10% miter buffer

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
        { label: 'Baseboard Trim (w/ Miter)', value: `${baseboardFeet} Linear Ft` },
        { label: '4x8 Drywall Sheets', value: `${drywallSheets4x8} Sheets` },
        { label: 'Wallpaper Double Rolls', value: `${wallpaperRolls} Rolls` },
        { label: 'HVAC Air Volume', value: `${cubicVolume} Cu Ft` },
      ],
      breakdowns: [
        { label: 'Room Dimensions', value: `${length} ft x ${width} ft x ${height} ft H` },
        { label: 'Door Deductions', value: `-${doors * 20} sq ft (${doors} doors)` },
        { label: 'Window Deductions', value: `-${windows * 15} sq ft (${windows} windows)` },
      ],
      alerts: [
        {
          type: 'info' as const,
          title: 'Trim Scarf & Miter Joints',
          message: 'Always add a 10% allowance to linear baseboard and crown molding for 45-degree corner miters and scarf splice joints.',
        },
      ],
    };
  }, [tool, length, width, depthInches, wasteFactor, pricePerUnit, height, doors, windows, coats, fenceLength, postSpacing, convertValue, convertDirection]);

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

      {/* Inputs Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tool.cluster === 'conversions' ? (
          <>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Value to Convert
              </label>
              <div className="relative">
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
                <option value={6}>6 Feet Spacing</option>
                <option value={8}>8 Feet Standard Spacing</option>
                <option value={10}>10 Feet Heavy Duty</option>
              </select>
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
              tool.slug !== 'fence-calculator' &&
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
