'use client';

import React, { useState } from 'react';
import { UnitSelector } from '@/components/tools/UnitSelector';
import { WasteFactorSelector } from '@/components/tools/WasteFactorSelector';
import { ResultsDisplay, ResultMetric } from '@/components/tools/ResultsDisplay';
import { calculateLaminate, LaminateInput } from '@/lib/calculations/flooring';
import { formatCurrency, formatNumber } from '@/lib/calculations/units';
import { RotateCcw } from 'lucide-react';

export function LaminateCalculatorUI() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [roomLength, setRoomLength] = useState<number>(14);
  const [roomWidth, setRoomWidth] = useState<number>(18);
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [sqFtPerBox, setSqFtPerBox] = useState<number>(19.5);
  const [costPerSqUnit, setCostPerSqUnit] = useState<number>(2.89);
  const [includeUnderlayment, setIncludeUnderlayment] = useState<boolean>(true);

  const input: LaminateInput = {
    roomLength: roomLength || 0,
    roomWidth: roomWidth || 0,
    unit,
    wastePercent,
    sqFtPerBox: sqFtPerBox || 19.5,
    costPerSqUnit: costPerSqUnit || 0,
    includeUnderlayment,
  };

  const result = calculateLaminate(input);

  const handleReset = () => {
    setRoomLength(14);
    setRoomWidth(18);
    setWastePercent(10);
    setSqFtPerBox(19.5);
    setCostPerSqUnit(2.89);
    setIncludeUnderlayment(true);
  };

  const secondaryMetrics: ResultMetric[] = [
    {
      label: 'Laminate Boxes to Buy',
      value: `${result.totalBoxesNeeded} Boxes`,
      subtext: `${formatNumber(result.totalSqFtPurchased)} sq ft coverage`,
      highlight: true,
    },
    {
      label: 'Net Floor Area',
      value: unit === 'imperial' ? `${result.netAreaSqFt} sq ft` : `${result.netAreaSqM} m²`,
      subtext: `+${result.wasteAreaSqFt} sq ft waste buffer`,
    },
    {
      label: 'Underlayment Rolls',
      value: `${result.underlaymentRolls} Roll${result.underlaymentRolls > 1 ? 's' : ''}`,
      subtext: '100 sq ft rolls with moisture barrier',
      highlight: true,
    },
    {
      label: 'Quarter-Round Molding',
      value: `${result.quarterRoundPieces} Pieces (8ft)`,
      subtext: `${result.perimeterFt} ft perimeter + 10% miter waste`,
    },
    {
      label: 'Transition T-Moldings',
      value: `${result.transitionStripsEstimate} Doorway`,
      subtext: 'Between adjoining rooms',
    },
    {
      label: 'Estimated Laminate Cost',
      value: costPerSqUnit > 0 ? formatCurrency(result.estimatedMaterialCost) : '$0.00',
      subtext: costPerSqUnit > 0 ? `At ${formatCurrency(costPerSqUnit)}/sq ft` : 'Enter price above',
      highlight: costPerSqUnit > 0,
    },
  ];

  const assumptions = [
    `Room dimension: ${roomLength} × ${roomWidth} ${unit === 'imperial' ? 'ft' : 'm'} (${result.netAreaSqFt} sq ft net).`,
    `Waste percentage: +${wastePercent}% for staggered plank start/end cuts.`,
    `Box coverage: ${sqFtPerBox} sq ft per carton. Total purchase: ${result.totalBoxesNeeded} full cartons.`,
    `Perimeter expansion gap: 3/8" allowance covered by ${result.quarterRoundPieces} lengths of 8ft shoe molding.`,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Input Form Column */}
      <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 1: Input Room & Plank Specifications
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
                placeholder="14"
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
                placeholder="18"
              />
              <span className="absolute right-3.5 top-3 text-xs font-semibold text-slate-400">
                {unit === 'imperial' ? 'ft' : 'm'}
              </span>
            </div>
          </div>
        </div>

        {/* Waste Factor Selector */}
        <WasteFactorSelector value={wastePercent} onChange={setWastePercent} />

        {/* Carton Coverage & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label htmlFor="box-coverage" className="block text-xs font-bold text-slate-700 mb-1.5">
              Carton Coverage (Sq Ft per Box)
            </label>
            <div className="relative">
              <input
                id="box-coverage"
                type="number"
                min="1"
                step="0.5"
                inputMode="decimal"
                value={sqFtPerBox || ''}
                onChange={(e) => setSqFtPerBox(parseFloat(e.target.value) || 19.5)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="19.5"
              />
              <span className="absolute right-3.5 top-3 text-xs font-medium text-slate-400">
                sq ft
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="cost-per-unit" className="block text-xs font-bold text-slate-700 mb-1.5">
              Price per {unit === 'imperial' ? 'Sq Ft' : 'Sq Meter'} (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-400">$</span>
              <input
                id="cost-per-unit"
                type="number"
                min="0"
                step="0.10"
                inputMode="decimal"
                value={costPerSqUnit || ''}
                onChange={(e) => setCostPerSqUnit(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="2.89"
              />
            </div>
          </div>
        </div>

        {/* Reset Actions */}
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
          primaryTitle="Total Laminate to Purchase (with waste)"
          primaryValue={unit === 'imperial' ? `${result.grossAreaSqFt} sq ft` : `${result.grossAreaSqM} m²`}
          primarySubtext={`(${result.totalBoxesNeeded} Full Boxes)`}
          secondaryMetrics={secondaryMetrics}
          assumptions={assumptions}
        />
      </div>
    </div>
  );
}
