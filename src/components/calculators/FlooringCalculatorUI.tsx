'use client';

import React, { useState } from 'react';
import { UnitSelector } from '@/components/tools/UnitSelector';
import { WasteFactorSelector } from '@/components/tools/WasteFactorSelector';
import { ResultsDisplay, ResultMetric } from '@/components/tools/ResultsDisplay';
import { calculateFlooring, FlooringInput } from '@/lib/calculations/flooring';
import { formatCurrency, formatNumber } from '@/lib/calculations/units';
import { RotateCcw, Calculator, ArrowRight, DollarSign } from 'lucide-react';

export function FlooringCalculatorUI() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [length, setLength] = useState<number>(15);
  const [width, setWidth] = useState<number>(20);
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [sqFtPerBox, setSqFtPerBox] = useState<number>(20);
  const [costPerUnit, setCostPerUnit] = useState<number>(4.50);

  // Compute live result
  const input: FlooringInput = {
    length: length || 0,
    width: width || 0,
    unit,
    wastePercent,
    sqFtPerBox: sqFtPerBox || 20,
    costPerUnit: costPerUnit || 0,
  };

  const result = calculateFlooring(input);

  const handleReset = () => {
    setLength(15);
    setWidth(20);
    setWastePercent(10);
    setSqFtPerBox(20);
    setCostPerUnit(4.50);
  };

  const secondaryMetrics: ResultMetric[] = [
    {
      label: 'Boxes to Purchase',
      value: `${result.totalBoxesNeeded} Boxes`,
      subtext: `${formatNumber(result.purchasedAreaSqFt)} sq ft total coverage`,
      highlight: true,
    },
    {
      label: 'Net Room Area',
      value: unit === 'imperial' ? `${result.netAreaSqFt} sq ft` : `${result.netAreaSqM} m²`,
      subtext: unit === 'imperial' ? `(${result.netAreaSqM} m²)` : `(${result.netAreaSqFt} sq ft)`,
    },
    {
      label: `Waste Buffer (+${wastePercent}%)`,
      value: unit === 'imperial' ? `+${result.wasteAreaSqFt} sq ft` : `+${result.wasteAreaSqM} m²`,
      subtext: 'Offcut allowance',
    },
    {
      label: 'Estimated Material Cost',
      value: costPerUnit > 0 ? formatCurrency(result.estimatedMaterialCost) : '$0.00',
      subtext: costPerUnit > 0 ? `At ${formatCurrency(costPerUnit)}/${unit === 'imperial' ? 'sq ft' : 'm²'}` : 'Enter price above',
      highlight: costPerUnit > 0,
    },
    {
      label: 'Underlayment Rolls',
      value: `${result.underlaymentRolls} Roll${result.underlaymentRolls > 1 ? 's' : ''}`,
      subtext: 'Standard 100 sq ft roll',
    },
    {
      label: 'Baseboard / Perimeter',
      value: `${result.perimeterFt} ft`,
      subtext: `(${result.perimeterM} meters)`,
    },
  ];

  const assumptions = [
    `Net floor calculation based on ${length} × ${width} ${unit === 'imperial' ? 'feet' : 'meters'}.`,
    `Waste buffer of ${wastePercent}% added for cutting, obstacles, and pattern offsets.`,
    `Box coverage standard: ${sqFtPerBox} sq ft per carton (always rounded up to next whole carton).`,
    `Underlayment assumes standard 100 sq ft rolls; adhesive assumes 1 tube per 50 sq ft.`,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Input Panel Form (Left Column) */}
      <div className="lg:col-span-6 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Step 1: Input Room Dimensions
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
                value={length || ''}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="15"
              />
              <span className="absolute right-3.5 top-3.5 text-xs font-semibold text-slate-400">
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
                value={width || ''}
                onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="20"
              />
              <span className="absolute right-3.5 top-3.5 text-xs font-semibold text-slate-400">
                {unit === 'imperial' ? 'ft' : 'm'}
              </span>
            </div>
          </div>
        </div>

        {/* Waste Percentage Selector */}
        <WasteFactorSelector value={wastePercent} onChange={setWastePercent} />

        {/* Box Coverage & Price per Sq Ft */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label htmlFor="box-coverage" className="block text-xs font-bold text-slate-700 mb-1.5">
              Carton / Box Coverage
            </label>
            <div className="relative">
              <input
                id="box-coverage"
                type="number"
                min="1"
                step="0.5"
                inputMode="decimal"
                value={sqFtPerBox || ''}
                onChange={(e) => setSqFtPerBox(parseFloat(e.target.value) || 20)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="20"
              />
              <span className="absolute right-3.5 top-3 text-xs font-medium text-slate-400">
                sq ft / box
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="cost-per-unit" className="block text-xs font-bold text-slate-700 mb-1.5">
              Price per {unit === 'imperial' ? 'Sq Ft' : 'Sq Meter'} (Optional)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-xs font-bold text-slate-400">
                $
              </span>
              <input
                id="cost-per-unit"
                type="number"
                min="0"
                step="0.10"
                inputMode="decimal"
                value={costPerUnit || ''}
                onChange={(e) => setCostPerUnit(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                placeholder="4.50"
              />
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2 px-3 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            ✓ Live Calculation Updated
          </div>
        </div>
      </div>

      {/* Output Results Panel (Right Column) */}
      <div className="lg:col-span-6">
        <ResultsDisplay
          primaryTitle="Total Material to Order (with waste)"
          primaryValue={unit === 'imperial' ? `${result.grossAreaSqFt} sq ft` : `${result.grossAreaSqM} m²`}
          primarySubtext={`(${result.totalBoxesNeeded} Boxes)`}
          secondaryMetrics={secondaryMetrics}
          assumptions={assumptions}
        />
      </div>
    </div>
  );
}
