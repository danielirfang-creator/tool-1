import { ToolMeta } from './types';

export const roomTools: ToolMeta[] = [
  {
    id: 'room-area-calculator',
    slug: 'room-area-calculator',
    name: 'Room Area Calculator',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    clusterHref: '/calculators/rooms',
    benefit: 'Calculate square footage, square meters, perimeter, and cubic volume for rectangular and L-shaped rooms.',
    metaTitle: 'Room Area Calculator - Square Footage, Square Meters & Perimeter',
    metaDescription: 'Free room area calculator. Calculate square footage (sq ft), square meters (sq m), perimeter, and volume for standard and irregular rooms.',
    keywords: ['room area calculator', 'how to calculate room square footage', 'square feet of a room', 'room size calculator'],
    formula: 'Area = Length × Width | Perimeter = 2 × (Length + Width) | Volume = Area × Ceiling Height',
    formulaDescription: 'Computes flat floor area, perimeter boundary length for trim, and total 3D cubic air volume for HVAC sizing.',
    methodology: ['Measure length and width in feet or meters', 'Multiply for area', 'Add height for volume'],
    limitations: ['Complex multi-angled rooms should be divided into individual rectangular sub-sections.'],
    workedExample: {
      title: '15 ft × 22 ft Great Room with 9 ft Ceilings',
      scenario: 'Calculating dimensions for flooring, baseboards, and air conditioning unit sizing.',
      inputs: [{ label: 'Dimensions', value: '15 ft L × 22 ft W × 9 ft H' }],
      steps: [
        { step: '1. Floor Area', calculation: '15 × 22', result: '330.00 sq ft (30.66 m²)' },
        { step: '2. Room Perimeter', calculation: '2 × (15 + 22)', result: '74.00 linear ft (22.56 m)' },
        { step: '3. Air Volume', calculation: '330 × 9', result: '2,970 cubic ft' }
      ],
      finalAnswer: 'Floor area is 330 sq ft (30.66 m²), perimeter is 74 linear ft, and total room volume is 2,970 cu ft.',
      proTip: 'Measure along the floor molding line with a laser distance measure for maximum precision in furnished rooms.'
    },
    decisionSupport: {
      title: 'Standard US Residential Room Sizes',
      description: 'Typical dimensions and square footage.',
      headers: ['Room Type', 'Typical Dimensions', 'Average Sq Ft', 'Average Sq Meters'],
      rows: [
        ['Half Bathroom / Powder', '5 ft × 5 ft', '25 sq ft', '2.3 m²'],
        ['Full Guest Bathroom', '5 ft × 8 ft', '40 sq ft', '3.7 m²'],
        ['Standard Bedroom', '10 ft × 12 ft', '120 sq ft', '11.1 m²'],
        ['Master Bedroom', '14 ft × 16 ft', '224 sq ft', '20.8 m²'],
        ['Standard 2-Car Garage', '20 ft × 20 ft', '400 sq ft', '37.2 m²']
      ],
      notes: ['Use these benchmarks to sanity check your on-site tape measurements.']
    },
    faqs: [
      {
        question: 'How do I calculate square feet of a room?',
        answer: 'Measure the length of the room in feet and the width of the room in feet, then multiply them together (Length × Width = Square Footage).'
      }
    ],
    relatedToolSlugs: ['wall-area-calculator', 'square-metres-calculator', 'flooring-calculator'],
    status: 'coming-soon'
  },
  {
    id: 'wall-area-calculator',
    slug: 'wall-area-calculator',
    name: 'Wall Area Calculator',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    clusterHref: '/calculators/rooms',
    benefit: 'Calculate gross and net vertical wall surface area minus windows, doors, and fireplaces.',
    metaTitle: 'Wall Area Calculator - Net Wall Square Footage Minus Openings',
    metaDescription: 'Calculate vertical wall surface area for paint, drywall, wallpaper, and insulation, subtracting all doors and windows.',
    keywords: ['wall area calculator', 'wall square footage calculator', 'how to calculate wall area'],
    formula: 'Wall Area = Perimeter × Height - (Doors + Windows)',
    formulaDescription: 'Multiplies total room perimeter by ceiling height and subtracts total cutout square footage.',
    methodology: ['Measure perimeter', 'Measure ceiling height', 'Deduct openings'],
    limitations: ['Gable wall triangular areas require 1/2 × Base × Height calculation.'],
    workedExample: {
      title: '10×12 ft Room with 8ft Ceiling, 1 Door, 2 Windows',
      scenario: 'Calculating exact drywall and insulation area.',
      inputs: [{ label: 'Dimensions', value: '10×12 ft room, 8ft ceiling, 1 door (21 sq ft), 2 windows (30 sq ft)' }],
      steps: [
        { step: '1. Gross Area', calculation: '2 × (10 + 12) × 8', result: '352 sq ft' },
        { step: '2. Net Wall Area', calculation: '352 - 21 - 30', result: '301 sq ft' }
      ],
      finalAnswer: 'Net wall surface area is 301 square feet.',
      proTip: 'For drywall hanging, order based on gross square footage (352 sq ft) as cutouts cannot be pieced back together.'
    },
    decisionSupport: {
      title: '4x8 vs 4x12 Drywall Sheet Matrix',
      description: 'Sheets needed by wall area.',
      headers: ['Wall Area (Sq Ft)', '4×8 Sheets (32 sq ft/sheet)', '4×12 Sheets (48 sq ft/sheet)'],
      rows: [
        ['200 sq ft', '7 sheets', '5 sheets'],
        ['350 sq ft', '11 sheets', '8 sheets'],
        ['500 sq ft', '16 sheets', '11 sheets'],
        ['750 sq ft', '24 sheets', '16 sheets']
      ],
      notes: ['Using 4×12 sheets reduces vertical taped seams by 25%, resulting in a faster, smoother drywall finish.']
    },
    faqs: [
      {
        question: 'Do I subtract windows when ordering drywall?',
        answer: 'Generally no. Drywall is hung over window openings and routed out on-site; subtracting windows often leaves you short of full sheets.'
      }
    ],
    relatedToolSlugs: ['room-area-calculator', 'paint-calculator', 'wallpaper-calculator'],
    status: 'coming-soon'
  },
  {
    id: 'square-metres-calculator',
    slug: 'square-metres-calculator',
    name: 'Square Metres Calculator (m²)',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    clusterHref: '/calculators/rooms',
    benefit: 'Calculate square metres from metres, centimetres, or millimetres with instant imperial sq ft conversion.',
    metaTitle: 'Square Metres Calculator - Calculate m² from Metres, CM, or MM',
    metaDescription: 'Free square metres calculator. Calculate m² area from metres, centimetres, or millimetres with instant conversion to square feet.',
    keywords: ['square metres calculator', 'how to calculate m2', 'sqm calculator', 'm2 to sq ft calculator'],
    formula: 'Area (m²) = Length (m) × Width (m) | Square Feet = Area (m²) × 10.7639',
    formulaDescription: 'Multiplies metric dimensions in meters to compute square meters (m²), with automatic live conversion to square feet.',
    methodology: ['Input length and width in meters/cm/mm', 'Multiply to get m²', 'Convert to sq ft'],
    limitations: ['Ensure all input measurements are converted to meters before multiplying.'],
    workedExample: {
      title: '4.5 Metre × 3.2 Metre Bedroom',
      scenario: 'Calculating room area in metric and imperial units.',
      inputs: [{ label: 'Dimensions', value: '4.5 m Length × 3.2 m Width' }],
      steps: [
        { step: '1. Square Metres', calculation: '4.5 × 3.2', result: '14.40 m²' },
        { step: '2. Square Feet Conversion', calculation: '14.40 × 10.7639', result: '155.00 sq ft' }
      ],
      finalAnswer: 'Room area is 14.40 m² (155.00 square feet).',
      proTip: 'To quickly convert cm to meters, divide by 100 (e.g. 450 cm = 4.5 m).'
    },
    decisionSupport: {
      title: 'Metric to Imperial Area Conversion Chart',
      description: 'Quick conversion reference.',
      headers: ['Square Metres (m²)', 'Square Feet (sq ft)', 'Square Yards (sq yd)'],
      rows: [
        ['10 m²', '107.64 sq ft', '11.96 sq yd'],
        ['20 m²', '215.28 sq ft', '23.92 sq yd'],
        ['50 m²', '538.20 sq ft', '59.80 sq yd'],
        ['100 m²', '1,076.39 sq ft', '119.60 sq yd']
      ],
      notes: ['1 m² is approximately 10% larger than 1 sq yard.']
    },
    faqs: [
      {
        question: 'How do I calculate square metres?',
        answer: 'Multiply the length in metres by the width in metres. For example, 5m × 4m = 20 m².'
      }
    ],
    relatedToolSlugs: ['room-area-calculator', 'square-feet-to-m2', 'flooring-calculator'],
    status: 'coming-soon'
  },
  {
    id: 'wallpaper-calculator',
    slug: 'wallpaper-calculator',
    name: 'Wallpaper Calculator',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    clusterHref: '/calculators/rooms',
    benefit: 'Calculate single and double wallpaper rolls factoring pattern repeat drop and match waste.',
    metaTitle: 'Wallpaper Calculator - Single & Double Roll Estimator',
    metaDescription: 'Calculate wallpaper rolls needed factoring wall dimensions, pattern repeat drops (0" to 25"), and doors/windows.',
    keywords: ['wallpaper calculator', 'how many rolls of wallpaper do i need', 'wallpaper roll calculator'],
    formula: 'Rolls = ⌈Total Net Wall Area ÷ Usable Roll Area (factoring pattern repeat)⌉',
    formulaDescription: 'Calculates roll requirements accounting for standard roll dimensions (typically 20.5" × 33ft = 56 sq ft) and pattern repeat drop loss (10-25%).',
    methodology: ['Measure wall perimeter and height', 'Input pattern repeat (0" for solid, 12-24" for geometric/floral)', 'Compute rolls'],
    limitations: ['Always purchase all rolls from the exact same run/dye-lot number.'],
    workedExample: {
      title: '8 ft High × 12 ft Wide Accent Wall with 18" Pattern Repeat',
      scenario: 'Hanging patterned wallpaper on a 96 sq ft accent wall using standard double rolls (56 sq ft).',
      inputs: [{ label: 'Wall', value: '12 ft W × 8 ft H (96 sq ft)' }, { label: 'Pattern Repeat', value: '18 inches' }],
      steps: [
        { step: '1. Usable Area per Roll (18" repeat loss ~20%)', calculation: '56 sq ft × 0.80', result: '44.8 sq ft/roll' },
        { step: '2. Rolls Required', calculation: '96 ÷ 44.8 = 2.14 → ⌈3⌉', result: '3 Double Rolls' }
      ],
      finalAnswer: 'Purchase 3 double rolls of wallpaper from the same run number.',
      proTip: 'Order 1 extra roll if hanging peel-and-stick wallpaper on freshly painted drywall to allow for re-positioning errors.'
    },
    decisionSupport: {
      title: 'Pattern Repeat Waste Factors',
      description: 'Waste by repeat height.',
      headers: ['Pattern Repeat Distance', 'Pattern Type', 'Average Waste Multiplier'],
      rows: [
        ['0 inches (Random Match)', 'Textures, solid grasscloth, vertical stripes', '10% waste'],
        ['1 - 12 inches (Straight Match)', 'Small geometrics, dots', '15% waste'],
        ['13 - 24 inches (Drop Match)', 'Large florals, damasks, murals', '20% - 25% waste']
      ],
      notes: ['Drywall must be primed with an acrylic wallpaper sizing primer before hanging to allow future damage-free removal.']
    },
    faqs: [
      {
        question: 'What is the difference between a single roll and a double roll of wallpaper?',
        answer: 'Most residential wallpaper is priced by the single roll (approx 28 sq ft) but packaged and shipped as continuous double rolls (approx 56 sq ft) to reduce cutting waste.'
      }
    ],
    relatedToolSlugs: ['wall-area-calculator', 'room-area-calculator', 'paint-calculator'],
    status: 'coming-soon'
  },
  {
    id: 'skirting-board-calculator',
    slug: 'skirting-board-calculator',
    name: 'Skirting Board & Baseboard Calculator',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    clusterHref: '/calculators/rooms',
    benefit: 'Calculate linear footage, board lengths (8ft, 12ft, 16ft), miter corner cut waste, and nail counts.',
    metaTitle: 'Baseboard & Skirting Board Calculator - Linear Feet & Board Count',
    metaDescription: 'Calculate linear feet, meterage, and board counts (8ft, 12ft, 16ft) for baseboards, skirting boards, and shoe molding.',
    keywords: ['skirting board calculator', 'baseboard calculator', 'how much baseboard do i need'],
    formula: 'Linear Feet = (Room Perimeter - Doorway Openings) × 1.10 | Boards = ⌈Linear Feet ÷ Board Length⌉',
    formulaDescription: 'Measures net wall perimeter, deducts door openings, adds 10% for 45-degree miter and scarf joint cuts, and calculates boards.',
    methodology: ['Measure room perimeter', 'Subtract door widths (typically 3ft per door)', 'Add 10% miter waste', 'Divide by board length'],
    limitations: ['Inside corners should be coped rather than simple 45-degree miters for long-lasting tight joints.'],
    workedExample: {
      title: '14 ft × 18 ft Room with 2 Doorways',
      scenario: 'Installing 5-1/4" colonial baseboard using 12ft primed MDF boards.',
      inputs: [{ label: 'Perimeter', value: '2 × (14 + 18) = 64 ft' }, { label: 'Doorways', value: 'Two 3-ft doors (-6 ft)' }],
      steps: [
        { step: '1. Net Wall Run', calculation: '64 - 6', result: '58.00 linear ft' },
        { step: '2. 10% Miter Cut Waste', calculation: '58 × 1.10', result: '63.80 linear ft' },
        { step: '3. 12ft Boards Count', calculation: '63.8 ÷ 12 = 5.31 → ⌈6⌉', result: '6 Boards (12ft each)' }
      ],
      finalAnswer: 'Purchase 6 12-foot lengths of baseboard (72 linear feet total).',
      proTip: 'Always nail baseboards into wall studs using 2-1/2" 15-gauge or 16-gauge finish nails, placing 2 nails per stud.'
    },
    decisionSupport: {
      title: 'Baseboard Material Comparison',
      description: 'MDF vs Solid Pine vs Polyurethane.',
      headers: ['Material', 'Standard Lengths', 'Best Application', 'Moisture Resistance'],
      rows: [
        ['Primed MDF', '8ft, 12ft, 16ft', 'Living rooms, bedrooms, dry areas', 'Low (swells if soaked)'],
        ['Solid Finger-Joint Pine', '8ft, 12ft, 16ft', 'Whole house, paint-grade', 'Medium'],
        ['Solid Hardwood (Oak/Maple)', '8ft, 10ft', 'Stain-grade luxury homes', 'High'],
        ['PVC / Polystyrene', '8ft, 12ft', 'Bathrooms, laundry rooms, basements', '100% Waterproof']
      ],
      notes: ['Use 16-foot lengths where possible to eliminate unsightly scarf joints on long continuous walls.']
    },
    faqs: [
      {
        question: 'How much extra baseboard should I order for miter cuts?',
        answer: 'Order 10% extra for rooms with standard 4 inside corners, or 15% extra for rooms with multiple alcoves, bay windows, or bumped-out closets.'
      }
    ],
    relatedToolSlugs: ['room-area-calculator', 'flooring-calculator', 'laminate-calculator'],
    status: 'coming-soon'
  }
];
