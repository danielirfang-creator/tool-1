import { ToolMeta } from './types';

export const roofingTools: ToolMeta[] = [
  {
    id: 'roof-shingle-calculator',
    slug: 'roof-shingle-calculator',
    name: 'Roof Shingle Calculator',
    cluster: 'roofing-siding',
    clusterName: 'Roofing & Siding',
    clusterHref: '/calculators/roofing-siding',
    benefit: 'Calculate roof pitch multiplier, roofing squares, shingle bundles, underlayment rolls, and ridge caps.',
    metaTitle: 'Roof Shingle Calculator - Squares, Bundles & Pitch',
    metaDescription: 'Calculate roof squares (100 sq ft), architectural/3-tab shingle bundles (3 bundles/square), pitch multipliers, underlayment rolls, and ridge caps with waste.',
    keywords: ['roof shingle calculator', 'how many bundles of shingles do i need', 'roof square calculator', 'roofing calculator', 'roof pitch calculator'],
    formula: 'Roof Area = Footprint Area × Pitch Multiplier | Squares = Area ÷ 100 | Bundles = Squares × 3 × (1 + Waste%)',
    formulaDescription: 'Multiplies flat roof base footprint by roof pitch slope multiplier (e.g., 1.118 for 6/12 pitch) to find actual pitched surface area, divides by 100 for roofing squares, and computes 3 bundles per square with 10–15% waste.',
    methodology: [
      'Calculate ground footprint area (Length × Width including overhang eave and gable rakes)',
      'Multiply by roof pitch multiplier to determine true sloped roof surface area',
      'Convert square footage into roofing squares (1 Square = 100 sq ft)',
      'Calculate shingle bundles (3 bundles per square for architectural/dimensional shingles)',
      'Add 10% waste for gable roofs or 15% for complex hips and valleys',
      'Calculate starter strip shingles (perimeter eave + rake length) and ridge cap shingles'
    ],
    limitations: ['Mansard roofs or roofs with multiple intersecting dormers require custom valley geometry calculations.'],
    workedExample: {
      title: '2,000 sq ft Roof Footprint with 6/12 Pitch',
      scenario: 'Replacing architectural shingles on a standard gable roof with 6/12 slope and 10% waste factor.',
      inputs: [
        { label: 'Roof Base Footprint', value: '2,000 sq ft (incl. 1 ft overhangs)' },
        { label: 'Roof Pitch / Slope', value: '6/12 (Multiplier = 1.118)' },
        { label: 'Roof Style', value: 'Standard Gable (10% Waste)' }
      ],
      steps: [
        { step: '1. True Pitched Roof Area', calculation: '2,000 × 1.118', result: '2,236 sq ft' },
        { step: '2. Roofing Squares', calculation: '2,236 ÷ 100', result: '22.36 Squares' },
        { step: '3. 10% Waste Addition', calculation: '22.36 × 1.10 = 24.60 → ⌈25⌉ Squares', result: '25 Squares' },
        { step: '4. Shingle Bundles (3 per square)', calculation: '25 × 3', result: '75 Bundles' },
        { step: '5. Underlayment (Synthetic 10 sq/roll)', calculation: '25 ÷ 10', result: '3 Rolls (Synthetic Underlayment)' },
        { step: '6. Ridge Cap Shingles (50 ft ridge)', calculation: '50 ft ÷ 30 linear ft/bundle', result: '2 Bundles Ridge Cap' }
      ],
      finalAnswer: 'Purchase 75 bundles of architectural shingles (25 squares), 3 rolls of synthetic underlayment, and 2 bundles of hip & ridge caps.',
      proTip: 'Install Ice & Water Shield membrane along the first 3 to 6 feet of all eaves and in all valleys to prevent winter ice dam roof leaks.'
    },
    decisionSupport: {
      title: 'Roof Pitch Multiplier & Slope Standards',
      description: 'Standard roof slope pitch multiplier lookup chart.',
      headers: ['Roof Pitch', 'Slope Angle (Degrees)', 'Area Multiplier', 'Typical Roof Type'],
      rows: [
        ['Flat / Low Slope (1/12 - 2/12)', '4.8° - 9.5°', '1.003 - 1.014', 'Commercial, modern flat, membrane only'],
        ['Low Pitch (3/12)', '14.0°', '1.031', 'Ranch homes, requires double underlayment'],
        ['Conventional Pitch (4/12)', '18.4°', '1.054', 'Standard residential single story'],
        ['Medium Pitch (5/12)', '22.6°', '1.083', 'Standard residential two story'],
        ['Common Gable Pitch (6/12)', '26.6°', '1.118', 'Most popular US gable roof'],
        ['Steep Pitch (8/12)', '33.7°', '1.202', 'Colonial, Cape Cod architecture'],
        ['Very Steep (10/12)', '39.8°', '1.302', 'High wind & heavy snow regions'],
        ['Severe Pitch (12/12 - 45°)', '45.0°', '1.414', 'A-Frame & Victorian homes (steep fee applies)']
      ],
      notes: ['Asphalt shingles must not be installed on slopes under 2/12 without specialized self-adhering membranes.']
    },
    faqs: [
      {
        question: 'How many bundles of shingles make 1 square of roof?',
        answer: 'There are exactly 3 bundles of standard 3-tab or architectural shingles in 1 roofing square (100 square feet of roof area). Heavyweight designer shingles may require 4 to 5 bundles per square.'
      },
      {
        question: 'What is a "Square" in roofing?',
        answer: 'In the roofing industry, a "Square" is a unit of measurement equal to 100 square feet of roof surface area (10 ft × 10 ft).'
      },
      {
        question: 'How much extra waste should I calculate for a roof?',
        answer: 'Add 10% waste for standard gable roofs, and 15% to 20% waste for hip roofs, valleys, dormers, and roofs with chimneys.'
      }
    ],
    relatedToolSlugs: ['siding-calculator', 'drywall-calculator', 'concrete-slab-calculator'],
    status: 'live'
  },
  {
    id: 'siding-calculator',
    slug: 'siding-calculator',
    name: 'Siding Calculator',
    cluster: 'roofing-siding',
    clusterName: 'Roofing & Siding',
    clusterHref: '/calculators/roofing-siding',
    benefit: 'Calculate siding squares, vinyl siding boxes, J-channel lengths, starter strips, and corner posts.',
    metaTitle: 'Siding Calculator - Vinyl Siding & Squares',
    metaDescription: 'Free siding calculator. Estimate vinyl, fiber cement, and wood lap siding squares (100 sq ft), starter strips, J-channel, outside/inside corner posts with waste factor.',
    keywords: ['siding calculator', 'how much siding do i need', 'vinyl siding calculator', 'siding square calculator', 'hardie board calculator'],
    formula: 'Net Area = (Wall Area + Gable Triangular Area) - Openings | Squares = Net Area ÷ 100 × (1 + Waste%)',
    formulaDescription: 'Computes exterior wall rectangular surfaces plus gable triangle peak areas (0.5 × Base × Gable Height), deducts door/window openings, and converts to 100 sq ft siding squares.',
    methodology: [
      'Measure length and height of each rectangular exterior wall',
      'Add gable end triangles (0.5 × Width × Gable Peak Height)',
      'Deduct doors (21 sq ft each) and windows (15 sq ft each)',
      'Divide by 100 to find siding squares',
      'Add 10% cutting waste for standard horizontal lap siding (15% for diagonal or dutch lap)',
      'Calculate accessories: J-channel for perimeter of all windows/doors/soffit lines, starter strips for bottom perimeter, and corner posts'
    ],
    limitations: ['Does not include under-eave soffit and fascia coil wrap.'],
    workedExample: {
      title: '1,500 sq ft Exterior Wall Surface (2 Gables)',
      scenario: 'Installing double 4" vinyl siding on a single-story home with 1,500 sq ft of wall area, 2 entry doors, and 8 windows.',
      inputs: [
        { label: 'Gross Wall & Gable Area', value: '1,500 sq ft' },
        { label: 'Openings', value: '2 Doors (42 sq ft) + 8 Windows (120 sq ft)' },
        { label: 'Siding Type', value: 'Standard Vinyl (2 Squares per Carton/Box)' }
      ],
      steps: [
        { step: '1. Net Wall Area', calculation: '1,500 - 162 sq ft openings', result: '1,338 sq ft' },
        { step: '2. 10% Cutting Waste', calculation: '1,338 × 1.10', result: '1,472 sq ft' },
        { step: '3. Siding Squares', calculation: '1,472 ÷ 100 = 14.72 → ⌈15⌉ Squares', result: '15 Squares' },
        { step: '4. Siding Cartons / Boxes (2 sq/box)', calculation: '15 ÷ 2 = 7.5 → ⌈8⌉ Boxes', result: '8 Boxes (16 Squares)' },
        { step: '5. Starter Strip (140 ft perimeter)', calculation: '140 ft ÷ 10 ft pieces', result: '14 Pieces Starter Strip' },
        { step: '6. J-Channel (Openings & eaves)', calculation: '240 linear ft ÷ 12.5 ft pieces', result: '20 Pieces J-Channel' }
      ],
      finalAnswer: 'Purchase 8 cartons/boxes (16 squares) of vinyl siding, 14 pieces of 10ft starter strip, and 20 pieces of 12.5ft J-channel.',
      proTip: 'Never nail vinyl siding tightly; leave a 1/32" gap (thickness of a dime) between the nail head and siding flange so panels can expand and contract with temperature changes without buckling.'
    },
    decisionSupport: {
      title: 'Siding Material Comparison & Lifespan',
      description: 'Popular residential siding material specifications.',
      headers: ['Siding Material', 'Cost / Sq Ft (Installed)', 'Lifespan', 'Maintenance Level', 'Fire Rating'],
      rows: [
        ['Vinyl Siding (0.042" - 0.046")', '$4.50 - $8.00', '25 - 40 Years', 'Low (Annual wash)', 'Class A / B'],
        ['Fiber Cement (James Hardie)', '$9.00 - $15.00', '50+ Years', 'Medium (Repaint 12-15 yrs)', 'Class A (Non-combustible)'],
        ['Engineered Wood (LP SmartSide)', '$7.00 - $12.00', '30 - 50 Years', 'Medium (Repaint 10-12 yrs)', 'Treated against rot'],
        ['Natural Cedar Bevel Siding', '$10.00 - $18.00', '30 - 60 Years', 'High (Stain/seal 3-5 yrs)', 'Combustible (Requires treatment)'],
        ['Aluminum / Steel Siding', '$6.00 - $11.00', '40+ Years', 'Low', 'Class A (Fireproof)']
      ],
      notes: ['Always install a high-permeability weather-resistive barrier (Housewrap / Tyvek) beneath all siding installations.']
    },
    faqs: [
      {
        question: 'How many square feet of siding are in a box/carton?',
        answer: 'Most standard residential vinyl siding boxes/cartons contain 2 Squares (200 square feet) of coverage, typically packed as 22 to 24 pieces of 12ft or 12.5ft panels.'
      },
      {
        question: 'How do you calculate gable triangle siding area?',
        answer: 'Calculate the gable end area by multiplying the width of the wall base by the height from the ceiling plate to the roof ridge peak, then divide by 2: Area = 0.5 × Base × Peak Height.'
      }
    ],
    relatedToolSlugs: ['roof-shingle-calculator', 'wall-paint-calculator', 'drywall-calculator'],
    status: 'live'
  }
];
