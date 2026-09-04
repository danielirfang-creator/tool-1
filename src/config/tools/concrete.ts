import { ToolMeta } from './types';

export const concreteTools: ToolMeta[] = [
  {
    id: 'concrete-calculator',
    slug: 'concrete-calculator',
    name: 'Concrete Calculator',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Calculate cubic yards, cubic feet, cubic meters, and 60lb/80lb pre-mixed bags for slabs, footings, and post holes.',
    metaTitle: 'Concrete Calculator - Cubic Yards & Bags',
    metaDescription: 'Free concrete calculator. Calculate cubic yards, cubic meters, and 60lb/80lb bags for slabs, footings, columns, and foundations.',
    keywords: ['concrete calculator', 'how many bags of concrete', 'cubic yards concrete calculator', 'concrete slab calculator'],
    formula: 'Cubic Yards = (Length ft × Width ft × Depth ft) ÷ 27 | 80lb Bags = Cubic Yards × 45',
    formulaDescription: 'Multiply length by width by thickness (in feet) to find cubic feet, then divide by 27 for cubic yards. Add 10% for uneven subgrade.',
    methodology: ['Measure length and width in feet', 'Convert thickness in inches to feet (inches ÷ 12)', 'Compute cubic feet', 'Divide by 27 for cubic yards'],
    limitations: ['Subgrade must be compacted; soft or un-level ground can increase concrete demand by 10-15%.'],
    workedExample: {
      title: '10 ft × 12 ft Patio Slab at 4 Inches Thick',
      scenario: 'Pouring a 10 ft by 12 ft backyard patio slab 4 inches thick (0.333 ft) with a 10% safety margin.',
      inputs: [{ label: 'Dimensions', value: '10 ft L × 12 ft W × 4 in Thick' }, { label: 'Waste Buffer', value: '10%' }],
      steps: [
        { step: '1. Volume in Cu Ft', calculation: '10 × 12 × (4 ÷ 12)', result: '40.00 cu ft' },
        { step: '2. Volume in Cu Yds', calculation: '40 ÷ 27', result: '1.481 cu yds' },
        { step: '3. 10% Margin', calculation: '1.481 × 1.10', result: '1.63 cu yds' },
        { step: '4. 80lb Bags Option', calculation: '1.63 × 45 = 73.35 → ⌈74⌉', result: '74 Bags (80lb each)' }
      ],
      finalAnswer: 'Order 1.75 cubic yards from a ready-mix truck OR purchase 74 bags (80lb each) of pre-mixed concrete.',
      proTip: 'For pours exceeding 1.5 cubic yards (~65+ bags), ordering a ready-mix delivery truck saves immense labor and guarantees uniform strength.'
    },
    decisionSupport: {
      title: 'Concrete Slab Thickness Standards',
      description: 'Standard engineering thicknesses for residential concrete.',
      headers: ['Application', 'Recommended Thickness', 'Rebar / Mesh', 'Min PSI Strength'],
      rows: [
        ['Sidewalks & Walkways', '4 inches (100 mm)', 'Welded wire mesh (6×6)', '3,000 PSI'],
        ['Patio & Shed Floors', '4 inches (100 mm)', '#3 Rebar on 18" centers', '3,500 PSI'],
        ['Standard Car Driveway', '4 - 5 inches (125 mm)', '#4 Rebar on 16" grid', '4,000 PSI'],
        ['Heavy Truck / RV Pad', '6 inches (150 mm)', '#4 Rebar on 12" grid', '4,500 PSI']
      ],
      notes: ['Always install control joints at a spacing no greater than 2 to 3 times the slab thickness in feet.']
    },
    faqs: [
      {
        question: 'How many 80lb bags of concrete make a cubic yard?',
        answer: 'It takes 45 bags of 80lb pre-mixed concrete (or 60 bags of 60lb concrete) to make 1 cubic yard (27 cubic feet).'
      }
    ],
    relatedToolSlugs: ['concrete-slab-calculator', 'concrete-bags-calculator', 'mortar-calculator'],
    status: 'live'
  },
  {
    id: 'concrete-slab-calculator',
    slug: 'concrete-slab-calculator',
    name: 'Concrete Slab Calculator',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Calculate slab volume, rebar grid footage, gravel base tons, and ready-mix yardage.',
    metaTitle: 'Concrete Slab Calculator - Yards & Bags',
    metaDescription: 'Calculate concrete slab volume in cubic yards, rebar quantities, gravel base tons, and expansion joints.',
    keywords: ['concrete slab calculator', 'how much concrete for a slab', 'slab yardage calculator'],
    formula: 'Yards = (L × W × Thickness) ÷ 27 × 1.10',
    formulaDescription: 'Computes slab volume plus 10% subgrade buffer, gravel base subbase, and steel reinforcement grid.',
    methodology: ['Measure dimensions', 'Convert depth to feet', 'Calculate yards and rebar grid'],
    limitations: ['Thickened edges or footings must be added separately.'],
    workedExample: {
      title: '20 ft × 20 ft Garage Slab (4" thick)',
      scenario: 'Pouring a 400 sq ft garage floor slab with 4" crushed gravel base.',
      inputs: [{ label: 'Size', value: '20 ft × 20 ft × 4 in' }],
      steps: [
        { step: '1. Concrete Yards', calculation: '(20 × 20 × 0.333) ÷ 27 × 1.10', result: '5.43 cu yds' },
        { step: '2. Gravel Base (4")', calculation: '(20 × 20 × 0.333) ÷ 27 × 1.4 tons/yd', result: '6.9 tons gravel' }
      ],
      finalAnswer: 'Order 5.5 to 6.0 cubic yards of 4,000 PSI concrete and 7 tons of crushed gravel base.',
      proTip: 'Place a 10-mil vapor barrier under interior slabs to prevent moisture from destroying future floor coatings.'
    },
    decisionSupport: {
      title: 'Slab Reinforcement Spacing Matrix',
      description: 'Rebar sizes and spacing.',
      headers: ['Slab Thickness', 'Rebar Size', 'Grid Spacing', 'Chair Height'],
      rows: [
        ['4 inch slab', '#3 (3/8") or #4 (1/2")', '18" × 18"', '2 inch chairs'],
        ['5 inch slab', '#4 (1/2")', '16" × 16"', '2.5 inch chairs'],
        ['6 inch slab', '#4 or #5 (5/8")', '12" × 12"', '3 inch chairs']
      ],
      notes: ['Rebar must be suspended in the middle-to-upper third of the slab using concrete rebar chairs.']
    },
    faqs: [
      {
        question: 'What is the minimum thickness for a concrete driveway slab?',
        answer: 'Standard residential driveways require a minimum of 4 inches of 4,000 PSI concrete over a compacted 4-inch gravel base; 5 to 6 inches is recommended for heavy SUVs and trucks.'
      }
    ],
    relatedToolSlugs: ['concrete-calculator', 'concrete-bags-calculator', 'brick-calculator'],
    status: 'live'
  },
  {
    id: 'concrete-bags-calculator',
    slug: 'concrete-bags-calculator',
    name: 'Concrete Bags Calculator',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Find the exact number of 40lb, 50lb, 60lb, or 80lb pre-mixed bags for any DIY project.',
    metaTitle: 'Concrete Bags Calculator - 80lb & 60lb',
    metaDescription: 'Calculate how many 80lb, 60lb, or 50lb bags of Quikrete or Sakrete concrete you need for slabs, posts, and footings.',
    keywords: ['concrete bags calculator', 'how many 80lb bags of concrete', 'how many 60lb bags of concrete'],
    formula: 'Bags = Total Cubic Feet ÷ Bag Yield (0.60 cu ft for 80lb, 0.45 cu ft for 60lb)',
    formulaDescription: 'Divides total cubic volume by the exact manufacturer yield of each bag size.',
    methodology: ['Input length, width, depth', 'Choose bag weight', 'Compute bag count'],
    limitations: ['Fast-setting post concrete has lower structural compression rating than standard 4,000 PSI concrete.'],
    workedExample: {
      title: 'Post Hole 10" Diameter × 36" Deep',
      scenario: 'Setting a 4x4 fence post in a 10-inch diameter hole 36 inches deep.',
      inputs: [{ label: 'Hole Size', value: '10" Dia × 36" Depth' }, { label: 'Post', value: '4x4 Post (3.5"×3.5")' }],
      steps: [
        { step: '1. Hole Volume', calculation: 'π × (5/12)² × 3', result: '1.636 cu ft' },
        { step: '2. Post Displacement', calculation: '(3.5/12)² × 3', result: '-0.255 cu ft' },
        { step: '3. Net Volume', calculation: '1.636 - 0.255', result: '1.38 cu ft' },
        { step: '4. 80lb Bags', calculation: '1.38 ÷ 0.60', result: '2.3 → ⌈3⌉ Bags' }
      ],
      finalAnswer: 'Use 3 bags (80lb each) of concrete per post hole.',
      proTip: 'Pour 3 to 4 inches of crushed gravel into the bottom of post holes to allow water drainage and prevent wood rot.'
    },
    decisionSupport: {
      title: 'Concrete Bag Yield & Coverage Chart',
      description: 'Standard bag yields.',
      headers: ['Bag Weight', 'Cubic Foot Yield', 'Cubic Yard Yield', 'Bags Per Cubic Yard'],
      rows: [
        ['40 lb Bag', '0.30 cu ft', '0.011 cu yd', '90 Bags'],
        ['50 lb Bag', '0.375 cu ft', '0.014 cu yd', '72 Bags'],
        ['60 lb Bag', '0.45 cu ft', '0.017 cu yd', '60 Bags'],
        ['80 lb Bag', '0.60 cu ft', '0.022 cu yd', '45 Bags']
      ],
      notes: ['Always mix with the exact amount of water specified on the bag; excess water severely weakens concrete.']
    },
    faqs: [
      {
        question: 'How much water do I add to an 80lb bag of concrete?',
        answer: 'Add approximately 2.5 to 3.0 quarts (2.4 to 2.8 liters) of clean water per 80lb bag. Concrete should have the consistency of thick oatmeal.'
      }
    ],
    relatedToolSlugs: ['concrete-calculator', 'concrete-slab-calculator', 'block-calculator'],
    status: 'live'
  },
  {
    id: 'brick-calculator',
    slug: 'brick-calculator',
    name: 'Brick Calculator',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Estimate standard modular bricks, mortar bags, and sand for walls, veneers, and brick patios.',
    metaTitle: 'Brick Calculator - Bricks & Mortar',
    metaDescription: 'Calculate standard modular, king, and queen size bricks, mortar bags, and masonry sand for single and double wythe walls.',
    keywords: ['brick calculator', 'how many bricks do i need', 'brick wall calculator', 'masonry calculator'],
    formula: 'Bricks = Wall Sq Ft × Bricks Per Sq Ft (Modular = 6.86) × 1.05',
    formulaDescription: 'Calculates wall area, multiplies by brick density per sq ft (with 3/8" mortar joints), and adds 5% for breakage.',
    methodology: ['Measure wall length and height', 'Select brick format', 'Add 5% cut waste', 'Calculate Type N or S mortar bags'],
    limitations: ['Does not include rebar lintels for window heads.'],
    workedExample: {
      title: '6 ft High × 20 ft Long Brick Garden Wall',
      scenario: 'Building a single-wythe decorative brick wall (120 sq ft) using standard modular bricks.',
      inputs: [{ label: 'Wall Dimensions', value: '20 ft L × 6 ft H (120 sq ft)' }, { label: 'Brick Type', value: 'Modular (6.86 bricks/sq ft)' }],
      steps: [
        { step: '1. Raw Bricks', calculation: '120 × 6.86', result: '823.2 bricks' },
        { step: '2. 5% Breakage Allowance', calculation: '823.2 × 1.05 = 864.3 → ⌈865⌉', result: '865 Bricks' },
        { step: '3. Mortar Bags (Type N)', calculation: '865 ÷ 140 bricks/bag', result: '6.2 → ⌈7⌉ Bags' }
      ],
      finalAnswer: 'Purchase 865 modular bricks and 7 bags (70lb each) of Type N masonry cement mortar.',
      proTip: 'Order bricks in full cube pallets (typically 500 bricks per cube) to save on delivery fees and avoid color mismatches.'
    },
    decisionSupport: {
      title: 'Brick Sizes & Coverage Specifications',
      description: 'Standard North American brick sizes.',
      headers: ['Brick Format', 'Nominal Dimensions (D×H×L)', 'Bricks Per Sq Ft', 'Bricks Per 100 Sq Ft'],
      rows: [
        ['Standard Modular', '4" × 2-2/3" × 8"', '6.86', '686 bricks'],
        ['Standard Queen', '3-5/8" × 3-1/8" × 9-5/8"', '5.20', '520 bricks'],
        ['Standard King', '3" × 3" × 10"', '4.75', '475 bricks'],
        ['Utility / Commercial', '4" × 4" × 12"', '3.00', '300 bricks']
      ],
      notes: ['Figures include standard 3/8-inch mortar joint allowances.']
    },
    faqs: [
      {
        question: 'How many standard bricks are in a square foot of wall?',
        answer: 'There are approximately 6.86 standard modular bricks per square foot of wall surface, including standard 3/8" mortar joints.'
      }
    ],
    relatedToolSlugs: ['block-calculator', 'mortar-calculator', 'concrete-calculator'],
    status: 'live'
  },
  {
    id: 'block-calculator',
    slug: 'block-calculator',
    name: 'Block Calculator (CMU)',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Calculate 8x8x16 cinder blocks, concrete masonry units (CMU), core fill grout, and mortar bags.',
    metaTitle: 'Block Calculator - Cinder Block & CMU',
    metaDescription: 'Calculate standard 8x8x16 CMU cinder blocks, foundation blocks, core-fill grout, and mortar bags for retaining and basement walls.',
    keywords: ['block calculator', 'cinder block calculator', 'cmu calculator'],
    formula: 'Blocks = Wall Sq Ft × 1.125 × 1.05',
    formulaDescription: 'One standard 8×8×16 CMU block covers exactly 0.889 square feet (1.125 blocks per sq ft) with standard 3/8" mortar joint.',
    methodology: ['Measure wall length and height', 'Calculate square feet', 'Multiply by 1.125 blocks/sq ft', 'Add 5% cut waste'],
    limitations: ['Core fill grout volume must be calculated if filling vertical rebar cavities.'],
    workedExample: {
      title: '8 ft High × 30 ft Long Garage Wall',
      scenario: 'Building a 240 sq ft concrete block wall with 8×8×16 standard two-core CMU blocks.',
      inputs: [{ label: 'Wall Dimensions', value: '30 ft L × 8 ft H (240 sq ft)' }],
      steps: [
        { step: '1. Raw Blocks Needed', calculation: '240 × 1.125', result: '270 blocks' },
        { step: '2. 5% Cut Waste', calculation: '270 × 1.05 = 283.5 → ⌈284⌉', result: '284 Blocks' },
        { step: '3. Mortar Bags', calculation: '284 ÷ 30 blocks/bag', result: '9.5 → ⌈10⌉ Bags (Type S)' }
      ],
      finalAnswer: 'Purchase 284 standard 8×8×16 CMU blocks and 10 bags of Type S masonry mortar.',
      proTip: 'Use Type S masonry mortar (minimum 1,800 PSI) for structural and below-grade foundation block walls.'
    },
    decisionSupport: {
      title: 'CMU Block Dimensions & Core Fill Volume',
      description: 'Standard concrete block specifications.',
      headers: ['Block Size (Nominal)', 'Actual Dimensions', 'Blocks / Sq Ft', 'Core Fill Grout (Cu Yds / 100 Blocks)'],
      rows: [
        ['6" × 8" × 16" CMU', '5-5/8" × 7-5/8" × 15-5/8"', '1.125', '0.62 cu yd'],
        ['8" × 8" × 16" CMU', '7-5/8" × 7-5/8" × 15-5/8"', '1.125', '0.86 cu yd'],
        ['10" × 8" × 16" CMU', '9-5/8" × 7-5/8" × 15-5/8"', '1.125', '1.10 cu yd'],
        ['12" × 8" × 16" CMU', '11-5/8" × 7-5/8" × 15-5/8"', '1.125', '1.34 cu yd']
      ],
      notes: ['Core fill values assume 100% solid filled cores.']
    },
    faqs: [
      {
        question: 'How many 8x8x16 blocks are in a square foot?',
        answer: 'It takes 1.125 blocks per square foot of wall (or approximately 113 blocks per 100 square feet).'
      }
    ],
    relatedToolSlugs: ['brick-calculator', 'mortar-calculator', 'concrete-calculator'],
    status: 'live'
  },
  {
    id: 'mortar-calculator',
    slug: 'mortar-calculator',
    name: 'Mortar Calculator',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    benefit: 'Calculate mortar bags, masonry cement, and sand ratios for brick, block, and stone masonry.',
    metaTitle: 'Mortar Calculator - Mortar Bags & Sand',
    metaDescription: 'Calculate pre-mixed mortar bags, masonry cement, and sand for bricks, cinder blocks, and cultured stone veneer.',
    keywords: ['mortar calculator', 'how much mortar do i need', 'type s mortar calculator', 'type n mortar calculator'],
    formula: 'Mortar Bags = Total Units ÷ Units Covered Per Bag',
    formulaDescription: 'Calculates required pre-mixed 70lb/80lb bags or sand/cement proportions by masonry unit type.',
    methodology: ['Select masonry type (brick vs block)', 'Input total quantity', 'Calculate bags'],
    limitations: ['Stone masonry mortar varies significantly based on stone irregularity.'],
    workedExample: {
      title: 'Mortar for 500 Standard Bricks',
      scenario: 'Laying 500 standard modular bricks with 3/8" joints using pre-mix Type N mortar.',
      inputs: [{ label: 'Brick Count', value: '500 Bricks' }],
      steps: [
        { step: '1. Bags Calculation', calculation: '500 ÷ 140 bricks/bag = 3.57 → ⌈4⌉', result: '4 Bags (80lb each)' }
      ],
      finalAnswer: 'Purchase 4 bags (80lb each) of Type N pre-mixed mortar cement.',
      proTip: 'Type N mortar is ideal for non-structural exterior above-grade walls; Type S is required for retaining walls.'
    },
    decisionSupport: {
      title: 'Mortar Type ASTM Standards',
      description: 'M, S, N, O Mortar specification table.',
      headers: ['Mortar Type', 'Min Compressive Strength (28-day)', 'Standard Mix Ratio (Cement : Lime : Sand)', 'Best Use Case'],
      rows: [
        ['Type M', '2,500 PSI', '1 : 1/4 : 3-3/4', 'Heavy structural foundations, retaining walls'],
        ['Type S', '1,800 PSI', '1 : 1/2 : 4-1/2', 'Below grade, block foundations, seismic areas'],
        ['Type N', '750 PSI', '1 : 1 : 6', 'Above grade brick veneers, chimneys, interior walls'],
        ['Type O', '350 PSI', '1 : 2 : 9', 'Historic restoration, soft antique brick repointing']
      ],
      notes: ['Remember the mnemonic "MaSoNWOrK" for descending mortar strength (M > S > N > O).']
    },
    faqs: [
      {
        question: 'What is the difference between Type N and Type S mortar?',
        answer: 'Type N (750 PSI) is an all-purpose mortar for exterior and interior above-grade walls. Type S (1,800 PSI) has higher compressive strength for load-bearing walls and foundations.'
      }
    ],
    relatedToolSlugs: ['brick-calculator', 'block-calculator', 'concrete-calculator'],
    status: 'live'
  }
];
