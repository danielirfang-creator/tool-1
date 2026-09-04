import { ToolMeta } from './types';

export const paintingTools: ToolMeta[] = [
  {
    id: 'paint-calculator',
    slug: 'paint-calculator',
    name: 'Paint Calculator',
    cluster: 'painting',
    clusterName: 'Painting',
    clusterHref: '/calculators/painting',
    benefit: 'Estimate gallons of wall and ceiling paint, subtract windows and doors, and calculate multi-coat coverage.',
    metaTitle: 'Paint Calculator - Gallons Needed',
    metaDescription: 'Free online paint calculator. Accurately calculate gallons of paint for walls and ceilings, minus doors and windows, for 1 or 2 coats.',
    keywords: ['paint calculator', 'how many gallons of paint do i need', 'room paint calculator', 'wall paint calculator'],
    formula: 'Wall Area = 2 × Height × (Length + Width) - Openings | Paint Gallons = ⌈(Wall Area × Coats) ÷ 350⌉',
    formulaDescription: 'Calculate perimeter wall area, subtract 21 sq ft per door and 15 sq ft per window, multiply by coats, and divide by 350 sq ft/gal.',
    methodology: ['Measure wall perimeter', 'Measure wall height', 'Subtract windows and doors', 'Select 1 or 2 coats', 'Divide by 350 sq ft/gal'],
    limitations: ['Textured drywall or raw unprimed drywall absorbs up to 25% more paint on the initial coat.'],
    workedExample: {
      title: '12 ft × 14 ft Bedroom with 8 ft Ceilings (2 Coats)',
      scenario: 'Painting a 12×14 ft room with 8ft ceiling, 2 windows, and 1 door with 2 coats of satin paint.',
      inputs: [{ label: 'Dimensions', value: '12 ft L × 14 ft W × 8 ft H' }, { label: 'Openings', value: '1 Door (21 sq ft), 2 Windows (30 sq ft)' }],
      steps: [
        { step: '1. Gross Wall Area', calculation: '2 × 8 × (12 + 14)', result: '416 sq ft' },
        { step: '2. Net Wall Area', calculation: '416 - 21 - 30', result: '365 sq ft net' },
        { step: '3. 2-Coat Total Area', calculation: '365 × 2', result: '730 sq ft total' },
        { step: '4. Gallons Calculation', calculation: '730 ÷ 350 = 2.08 → ⌈3⌉', result: '3 Gallons' }
      ],
      finalAnswer: 'Purchase 3 gallons of wall paint (approx 2.1 gallons required, leaving reserve for future touchups).',
      proTip: 'Buying two 1-gallon cans is often close in price to a 5-gallon bucket; for jobs requiring 3.5+ gallons, a 5-gallon pail is more economical.'
    },
    decisionSupport: {
      title: 'Paint Coverage by Sheen & Surface Texture',
      description: 'Average square foot coverage per 1-gallon can.',
      headers: ['Paint Sheen', 'Smooth Drywall Coverage', 'Textured / Porous Coverage', 'Best Application'],
      rows: [
        ['Flat / Matte', '380 - 400 sq ft / gal', '280 - 320 sq ft / gal', 'Ceilings, low-traffic adult bedrooms'],
        ['Eggshell', '350 - 380 sq ft / gal', '275 - 300 sq ft / gal', 'Living rooms, dining rooms, bedrooms'],
        ['Satin', '350 - 375 sq ft / gal', '270 - 300 sq ft / gal', 'Kitchens, bathrooms, hallways, kid rooms'],
        ['Semi-Gloss', '350 - 375 sq ft / gal', '300 sq ft / gal', 'Doors, trim, baseboards, cabinets']
      ],
      notes: ['Always apply a dedicated primer when painting over dark colors or bare drywall.']
    },
    faqs: [
      {
        question: 'How many square feet does 1 gallon of paint cover?',
        answer: 'One standard gallon of interior acrylic latex paint covers between 350 to 400 square feet on smooth, pre-primed drywall.'
      }
    ],
    relatedToolSlugs: ['wall-paint-calculator', 'ceiling-paint-calculator', 'primer-calculator'],
    status: 'live'
  },
  {
    id: 'wall-paint-calculator',
    slug: 'wall-paint-calculator',
    name: 'Wall Paint Calculator',
    cluster: 'painting',
    clusterName: 'Painting',
    clusterHref: '/calculators/painting',
    benefit: 'Calculate exact wall square footage and paint cans for multi-wall rooms and accent walls.',
    metaTitle: 'Wall Paint Calculator - Square Footage',
    metaDescription: 'Calculate wall-only paint coverage, excluding ceilings and trim, with precise window and door deductions.',
    keywords: ['wall paint calculator', 'how much wall paint', 'accent wall paint calculator'],
    formula: 'Net Wall Area = (Sum of Wall Widths × Ceiling Height) - Openings',
    formulaDescription: 'Multiplies total linear wall perimeter by ceiling height and deducts all openings.',
    methodology: ['Measure each individual wall', 'Subtract openings', 'Apply 2-coat standard', 'Divide by 350 sq ft'],
    limitations: ['Does not include ceiling or trim enamel.'],
    workedExample: {
      title: 'Accent Wall 10 ft × 15 ft (2 Coats)',
      scenario: 'Painting a single master bedroom accent wall measuring 10 ft high by 15 ft wide.',
      inputs: [{ label: 'Wall Size', value: '10 ft H × 15 ft W (150 sq ft)' }],
      steps: [
        { step: '1. Net Area (2 coats)', calculation: '150 × 2', result: '300 sq ft' },
        { step: '2. Gallons Needed', calculation: '300 ÷ 350 = 0.86 → ⌈1⌉', result: '1 Gallon' }
      ],
      finalAnswer: 'Purchase 1 gallon of premium accent wall paint.',
      proTip: 'Use a 3/8" microfiber roller cover for ultra-smooth wall finishes without stipple texture.'
    },
    decisionSupport: {
      title: 'Standard Opening Deductions',
      description: 'Standard architectural deduction values.',
      headers: ['Opening Type', 'Standard Dimensions', 'Area to Deduct'],
      rows: [
        ['Interior Door', '3 ft × 7 ft', '21 sq ft'],
        ['Standard Window', '3 ft × 5 ft', '15 sq ft'],
        ['Double Window', '6 ft × 5 ft', '30 sq ft'],
        ['Sliding Patio Door', '6 ft × 7 ft', '42 sq ft']
      ],
      notes: ['If you are framing or trimming the windows, do not deduct small bathroom windows.']
    },
    faqs: [
      {
        question: 'Should I do 1 coat or 2 coats of paint?',
        answer: 'Two coats are almost always required for rich color depth, uniform sheen, and durability, even when using "paint + primer in one" products.'
      }
    ],
    relatedToolSlugs: ['paint-calculator', 'ceiling-paint-calculator', 'primer-calculator'],
    status: 'live'
  },
  {
    id: 'ceiling-paint-calculator',
    slug: 'ceiling-paint-calculator',
    name: 'Ceiling Paint Calculator',
    cluster: 'painting',
    clusterName: 'Painting',
    clusterHref: '/calculators/painting',
    benefit: 'Calculate flat ceiling paint gallons, texture absorption, and vault/cathedral angle multipliers.',
    metaTitle: 'Ceiling Paint Calculator - Gallons',
    metaDescription: 'Estimate flat ceiling paint gallons for flat, sloped, and textured popcorn ceilings.',
    keywords: ['ceiling paint calculator', 'how much ceiling paint do i need', 'ceiling square footage calculator'],
    formula: 'Ceiling Area = Room Length × Room Width × Slope Multiplier',
    formulaDescription: 'Multiply length by width. For cathedral/sloped ceilings, multiply by pitch factor (e.g. 1.15 for 6/12 roof pitch).',
    methodology: ['Measure room dimensions', 'Check ceiling slope pitch', 'Factor 1 or 2 coats', 'Divide by 350 sq ft/gal'],
    limitations: ['Popcorn / acoustic textured ceilings absorb up to 50% more paint and require spray application.'],
    workedExample: {
      title: '16 ft × 20 ft Living Room Flat Ceiling (2 Coats)',
      scenario: 'Painting a smooth 16 ft by 20 ft ceiling (320 sq ft) with ultra-flat white ceiling paint.',
      inputs: [{ label: 'Ceiling Dimensions', value: '16 ft × 20 ft (320 sq ft)' }, { label: 'Coats', value: '2 Coats' }],
      steps: [
        { step: '1. Total Coverage Needed', calculation: '320 × 2', result: '640 sq ft' },
        { step: '2. Gallons Needed', calculation: '640 ÷ 350 = 1.83 → ⌈2⌉', result: '2 Gallons' }
      ],
      finalAnswer: 'Purchase 2 gallons of dead-flat white ceiling paint.',
      proTip: 'Always use ultra-flat ceiling paint to prevent light glare and hide drywall seam imperfections.'
    },
    decisionSupport: {
      title: 'Ceiling Slope Multipliers',
      description: 'Multiplier for vaulted and cathedral ceilings.',
      headers: ['Roof Pitch', 'Slope Angle', 'Area Multiplier'],
      rows: [
        ['Flat (0/12)', '0°', '1.00'],
        ['Low Pitch (4/12)', '18.4°', '1.054'],
        ['Medium Pitch (6/12)', '26.6°', '1.118'],
        ['Steep Pitch (8/12)', '33.7°', '1.202']
      ],
      notes: ['For textured popcorn ceilings, reduce paint coverage to 225 sq ft per gallon.']
    },
    faqs: [
      {
        question: 'Why is ceiling paint different from wall paint?',
        answer: 'Ceiling paint is formulated with zero-sheen (dead flat) to prevent reflection and has non-drip spatter-resistant additives.'
      }
    ],
    relatedToolSlugs: ['paint-calculator', 'wall-paint-calculator', 'primer-calculator'],
    status: 'live'
  },
  {
    id: 'primer-calculator',
    slug: 'primer-calculator',
    name: 'Primer Calculator',
    cluster: 'painting',
    clusterName: 'Painting',
    clusterHref: '/calculators/painting',
    benefit: 'Estimate stain-blocking, PVA drywall, and bonding primer gallons before topcoat application.',
    metaTitle: 'Primer Calculator - Drywall Primer',
    metaDescription: 'Calculate primer gallons for new drywall, dark color transitions, bare wood, and water stain sealing.',
    keywords: ['primer calculator', 'pva primer calculator', 'how much primer do i need'],
    formula: 'Primer Gallons = ⌈Total Net Surface Area ÷ 300⌉',
    formulaDescription: 'Primer has lower spread coverage (250-300 sq ft/gal) on bare porous substrates like raw drywall, plaster, or unpainted masonry.',
    methodology: ['Measure total surface area', 'Deduct openings', 'Divide by 300 sq ft/gal'],
    limitations: ['PVA primer is strictly for raw drywall; use oil or shellac-based primer for water and smoke stains.'],
    workedExample: {
      title: '400 sq ft New Drywall Room',
      scenario: 'Priming new drywall in a 400 sq ft net wall area room with high-build PVA drywall primer.',
      inputs: [{ label: 'Surface Area', value: '400 sq ft net' }],
      steps: [
        { step: '1. Gallons Needed', calculation: '400 ÷ 300 = 1.33 → ⌈2⌉', result: '2 Gallons' }
      ],
      finalAnswer: 'Purchase 2 gallons of PVA drywall primer sealer.',
      proTip: 'Tint your primer with 50% of the final topcoat color for flawless coverage when using deep or bright paint colors.'
    },
    decisionSupport: {
      title: 'Primer Types & Applications',
      description: 'Select the right primer chemistry for your surface.',
      headers: ['Primer Type', 'Best Surface', 'Coverage (Sq Ft/Gal)', 'Key Benefit'],
      rows: [
        ['PVA Primer', 'Bare new drywall / joint compound', '250 - 300', 'Seals porous paper and mud uniformly'],
        ['Acrylic Bonding', 'Glossy paint, laminate, tile', '350 - 400', 'Bonds to slick non-porous surfaces'],
        ['Shellac / Oil-Based', 'Water stains, smoke damage, wood knots', '350 - 400', '100% stain & tannin bleed blocking']
      ],
      notes: ['Never use water-based latex primer over active water stains or tannin-rich cedar.']
    },
    faqs: [
      {
        question: 'Do I really need primer if my paint says "Paint + Primer"?',
        answer: 'Yes, on bare drywall, bare wood, patched spackle, water stains, and when making drastic color shifts (e.g. dark navy to white).'
      }
    ],
    relatedToolSlugs: ['paint-calculator', 'wall-paint-calculator', 'paint-coverage-calculator'],
    status: 'live'
  },
  {
    id: 'paint-coverage-calculator',
    slug: 'paint-coverage-calculator',
    name: 'Paint Coverage Calculator',
    cluster: 'painting',
    clusterName: 'Painting',
    clusterHref: '/calculators/painting',
    benefit: 'Calculate exact paint volume in liters, quarts, or gallons based on custom container sizes.',
    metaTitle: 'Paint Coverage Calculator - Gallons',
    metaDescription: 'Convert wall square footage or meters into exact paint volume in gallons, quarts, and liters.',
    keywords: ['paint coverage calculator', 'paint volume calculator', 'liters of paint needed'],
    formula: 'Paint Volume = Total Area ÷ Spread Rate per Unit Volume',
    formulaDescription: 'Calculates exact liquid volume needed based on manufacturer spread rate per liter or gallon.',
    methodology: ['Input area', 'Choose unit (US Gallons / Liters)', 'Select coats', 'Compute volume'],
    limitations: ['Always round up to nearest sealed retail can size.'],
    workedExample: {
      title: '50 Square Meter Wall in Liters',
      scenario: 'Painting 50 m² with 2 coats using standard 10 m²/liter paint.',
      inputs: [{ label: 'Area', value: '50 m²' }, { label: 'Coats', value: '2' }],
      steps: [
        { step: '1. Total Coverage', calculation: '50 × 2', result: '100 m²' },
        { step: '2. Liters Needed', calculation: '100 ÷ 10', result: '10 Liters (2 × 5L cans)' }
      ],
      finalAnswer: 'Purchase two 5-liter cans of paint.',
      proTip: 'Mix all cans together into a single 5-gallon bucket (known as "boxing paint") before painting for 100% color consistency.'
    },
    decisionSupport: {
      title: 'Container Size Reference',
      description: 'Standard retail paint container capacities.',
      headers: ['Container Size', 'Fluid Ounces', 'Liters', 'Average Coverage (1 Coat)'],
      rows: [
        ['1 Sample Pot', '8 oz', '0.236 L', '20 - 25 sq ft'],
        ['1 Quart', '32 oz', '0.946 L', '90 - 100 sq ft'],
        ['1 US Gallon', '128 oz', '3.785 L', '350 - 400 sq ft'],
        ['1 UK Gallon (Imperial)', '160 oz', '4.546 L', '450 - 500 sq ft'],
        ['5-Gallon Pail', '640 oz', '18.927 L', '1,750 - 2,000 sq ft']
      ],
      notes: ['Store unopened cans in climate-controlled spaces; freezing temperatures permanently ruin latex paint emulsions.']
    },
    faqs: [
      {
        question: 'What is "boxing" paint?',
        answer: 'Boxing paint means combining multiple 1-gallon cans into a large bucket and stirring thoroughly to eliminate subtle color variances between cans.'
      }
    ],
    relatedToolSlugs: ['paint-calculator', 'wall-paint-calculator', 'ceiling-paint-calculator'],
    status: 'live'
  }
];
