'use client';

import React, { useState } from 'react';
import { UnitSelector } from '@/components/tools/UnitSelector';
import { WasteFactorSelector } from '@/components/tools/WasteFactorSelector';
import { ResultsDisplay, ResultMetric } from '@/components/tools/ResultsDisplay';
import { calculateTile, TileInput } from '@/lib/calculations/flooring';
import { formatCurrency, formatNumber } from '@/lib/calculations/units';
import { RotateCcw } from 'lucide-react';

export function TileCalculatorUI() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [roomLength, setRoomLength] = useState<number>(8);
  const [roomWidth, setRoomWidth] = useState<number>(10);
  const [tileLength, setTileLength] = useState<number>(12);
  const [tileWidth, setTileWidth] = useState<number>(24);
  const [groutGapInches, setGroutGapInches] = useState<number>(0.125); // 1/8"
  const [wastePercent, setWastePercent] = useState<number>(15);
  const [tilesPerBox, setTilesPerBox] = useState<number>(8);
  const [costPerSqUnit, setCostPerSqUnit] = useState<number>(5.20);

  const input: TileInput = {
    roomLength: roomLength || 0,
    roomWidth: roomWidth || 0,
    tileLength: tileLength || 12,
    tileWidth: tileWidth || 12,
    unit,
    groutGapInches,
    wastePercent,
    tilesPerBox: tilesPerBox || 10,
    costPerSqUnit: costPerSqUnit || 0,
  };

  const result = calculateTile(input);

  const handleReset = () => {
    setRoomLength(8);
    setRoomWidth(10);
    setTileLength(12);
    setTileWidth(24);
    setGroutGapInches(0.125);
    setWastePercent(15);
    setTilesPerBox(8);
    setCostPerSqUnit(5.20);
  };

  const setTilePreset = (l: number, w: number, box: number) => {
    setTileLength(l);
    setTileWidth(w);
    setTilesPerBox(box);
  };

  const secondaryMetrics: ResultMetric[] = [
    {
      label: 'Boxes to Purchase',
      value: `${result.totalBoxesNeeded} Boxes`,
      subtext: `${tilesPerBox} tiles per box`,
      highlight: true,
    },
    {
      label: 'Exact Tiles (No Waste)',
      value: `${result.exactTilesNeeded} Tiles`,
      subtext: `${result.netAreaSqFt} sq ft net area`,
    },
    {
      label: `Total Area (with +${wastePercent}% waste)`,
      value: `${result.grossAreaSqFt} sq ft`,
      subtext: `(${result.grossAreaSqM} m²)`,
    },
    {
      label: 'Thinset Mortar (50lb bags)',
      value: `${result.thinsetMortarBags} Bag${result.thinsetMortarBags > 1 ? 's' : ''}`,
      subtext: 'Polymer modified (~45 sq ft/bag)',
    },
    {
      label: 'Grout Bags (10lb bags)',
      value: `${result.groutBagsNeeded} Bag${result.groutBagsNeeded > 1 ? 's' : ''}`,
      subtext: 'Sanded/unsanded joint filler',
    },
    {
      label: 'Estimated Tile Cost',
      value: costPerSqUnit > 0 ? formatCurrency(result.estimatedCost) : '$0.00',
      subtext: costPerSqUnit > 0 ? `At ${formatCurrency(costPerSqUnit)}/sq ft` : 'Enter price above',
      highlight: costPerSqUnit > 0,
    },
  ];

  const assumptions = [
    `Room area: ${roomLength} × ${roomWidth} ${unit === 'imperial' ? 'ft' : 'm'} (${result.netAreaSqFt} sq ft net).`,
    `Tile size: ${tileLength} × ${tileWidth} ${unit === 'imperial' ? 'inches' : 'cm'} (${result.singleTileAreaSqFt} sq ft per tile).`,
    `Waste allowance: +${wastePercent}% for perimeter cutoffs, drain cuts, and corner trims.`,
    `Carton rounding: ${result.totalTilesWithWaste} tiles ordered as ${result.totalBoxesNeeded} full boxes.`,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Input Panel Form */}
      <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 1: Input Room & Tile Specifications
          </span>
          <UnitSelector unit={unit} onChange={setUnit} />
        </div>

        {/* Room Length & Width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="room-length" className="block text-xs font-bold text-slate-700 mb-1.5">
              Room Length ({unit === 'imperial' ? 'Feet' : 'Meters'})
            </label>
            <div className="relative">
              <input
                id="room-length"
                type="number"
                min="1"
                step="0.1"
                inputMode="decimal"
                value={roomLength || ''}
                onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="8"
              />
              <span className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400">
                {unit === 'imperial' ? 'ft' : 'm'}
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="room-width" className="block text-xs font-bold text-slate-700 mb-1.5">
              Room Width ({unit === 'imperial' ? 'Feet' : 'Meters'})
            </label>
            <div className="relative">
              <input
                id="room-width"
                type="number"
                min="1"
                step="0.1"
                inputMode="decimal"
                value={roomWidth || ''}
                onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="10"
              />
              <span className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400">
                {unit === 'imperial' ? 'ft' : 'm'}
              </span>
            </div>
          </div>
        </div>

        {/* Common Tile Size Presets */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Quick Tile Size Presets</label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '3"×6" Subway', l: 3, w: 6, box: 40 },
              { label: '12"×12" Floor', l: 12, w: 12, box: 10 },
              { label: '12"×24" Large Format', l: 12, w: 24, box: 8 },
              { label: '24"×24" XL', l: 24, w: 24, box: 4 },
              { label: '6"×36" Plank', l: 6, w: 36, box: 8 },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setTilePreset(preset.l, preset.w, preset.box)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Tile Dimensions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="tile-length" className="block text-xs font-bold text-slate-700 mb-1.5">
              Tile Length ({unit === 'imperial' ? 'Inches' : 'CM'})
            </label>
            <input
              id="tile-length"
              type="number"
              min="1"
              step="0.5"
              inputMode="decimal"
              value={tileLength || ''}
              onChange={(e) => setTileLength(parseFloat(e.target.value) || 12)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>

          <div>
            <label htmlFor="tile-width" className="block text-xs font-bold text-slate-700 mb-1.5">
              Tile Width ({unit === 'imperial' ? 'Inches' : 'CM'})
            </label>
            <input
              id="tile-width"
              type="number"
              min="1"
              step="0.5"
              inputMode="decimal"
              value={tileWidth || ''}
              onChange={(e) => setTileWidth(parseFloat(e.target.value) || 12)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>

          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="tiles-per-box" className="block text-xs font-bold text-slate-700 mb-1.5">
              Tiles Per Carton
            </label>
            <input
              id="tiles-per-box"
              type="number"
              min="1"
              value={tilesPerBox || ''}
              onChange={(e) => setTilesPerBox(parseInt(e.target.value) || 10)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
            />
          </div>
        </div>

        {/* Waste Factor Selector */}
        <WasteFactorSelector
          value={wastePercent}
          onChange={setWastePercent}
          options={[
            { percent: 10, label: '10% Grid Lay', desc: 'Standard square layout, minimal cuts' },
            { percent: 15, label: '15% Offset / Brick', desc: 'Running bond or rooms with fixtures' },
            { percent: 20, label: '20% Diagonal / Herringbone', desc: 'Intricate angled border cuts' },
            { percent: 25, label: '25% Mosaic / Curved', desc: 'Showers, niches, and bench wraps' },
          ]}
        />

        {/* Price Per Sq Ft */}
        <div>
          <label htmlFor="cost-per-unit" className="block text-xs font-bold text-slate-700 mb-1.5">
            Tile Price per {unit === 'imperial' ? 'Sq Ft' : 'Sq Meter'} (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">$</span>
            <input
              id="cost-per-unit"
              type="number"
              min="0"
              step="0.10"
              inputMode="decimal"
              value={costPerSqUnit || ''}
              onChange={(e) => setCostPerSqUnit(parseFloat(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              placeholder="5.20"
            />
          </div>
        </div>

        {/* Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <div className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            ✓ Live Calculation Updated
          </div>
        </div>
      </div>

      {/* Output Results Panel */}
      <div className="lg:col-span-6">
        <ResultsDisplay
          primaryTitle="Total Tiles to Purchase (with waste)"
          primaryValue={`${result.totalTilesWithWaste} Tiles`}
          primarySubtext={`(${result.totalBoxesNeeded} Full Boxes)`}
          secondaryMetrics={secondaryMetrics}
          assumptions={assumptions}
        />
      </div>
    </div>
  );
}
