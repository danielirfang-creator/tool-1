import { ToolMeta } from './types';

export const gardenTools: ToolMeta[] = [
  {
    id: 'gravel-calculator',
    slug: 'gravel-calculator',
    name: 'Gravel Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Calculate gravel and crushed stone in tons, cubic yards, and 50lb bags for driveways, paths, and drainage.',
    metaTitle: 'Gravel Calculator - Tons & Cubic Yards Estimator',
    metaDescription: 'Free gravel calculator. Calculate tons, cubic yards, and 50lb bags of gravel, pea gravel, crushed stone, and road base.',
    keywords: ['gravel calculator', 'how much gravel do i need', 'tons of gravel calculator', 'pea gravel calculator'],
    formula: 'Cubic Yards = (L ft × W ft × Depth ft) ÷ 27 | Tons = Cubic Yards × 1.4',
    formulaDescription: 'Calculate cubic yards and multiply by material density factor (typically 1.4 tons per cubic yard for crushed gravel).',
    methodology: ['Measure length and width in feet', 'Convert depth in inches to feet', 'Compute cubic yards', 'Multiply by 1.4 for tons'],
    limitations: ['Dense graded aggregate compacts by 15-20% when rolled.'],
    workedExample: {
      title: '10 ft × 25 ft Driveway Section at 3 Inches Deep',
      scenario: 'Installing #57 crushed limestone gravel for a 10×25 ft parking pad at 3 inches deep.',
      inputs: [{ label: 'Size', value: '10 ft × 25 ft × 3 in deep' }],
      steps: [
        { step: '1. Volume in Cu Yds', calculation: '(10 × 25 × 0.25) ÷ 27', result: '2.315 cu yds' },
        { step: '2. Weight in Tons', calculation: '2.315 × 1.4 = 3.24 → ⌈3.5⌉', result: '3.5 Tons' }
      ],
      finalAnswer: 'Order 3.5 tons (approx 2.5 cubic yards) of crushed gravel.',
      proTip: 'Install a commercial-grade woven geotextile fabric beneath the gravel to prevent stone from sinking into subsoil.'
    },
    decisionSupport: {
      title: 'Gravel Material Densities & Applications',
      description: 'Density conversion factors.',
      headers: ['Gravel Type', 'Average Size', 'Tons / Cubic Yard', 'Best Application'],
      rows: [
        ['Pea Gravel (#8)', '3/8 inch', '1.40 tons', 'Walkways, dog runs, patio accents'],
        ['Crushed Stone (#57)', '3/4 inch', '1.40 tons', 'French drains, driveway surface, concrete'],
        ['Road Base / Crush & Run', '3/4" down to stone dust', '1.50 tons', 'Driveway sub-base, paver patio base'],
        ['River Rock', '1 - 3 inches', '1.35 tons', 'Decorative garden beds, swales, borders']
      ],
      notes: ['1 ton of gravel spread at 2 inches deep covers approximately 100 square feet.']
    },
    faqs: [
      {
        question: 'How many tons is 1 cubic yard of gravel?',
        answer: 'One cubic yard of standard crushed gravel or pea gravel weighs approximately 1.4 tons (2,800 lbs).'
      }
    ],
    relatedToolSlugs: ['soil-calculator', 'mulch-calculator', 'patio-calculator'],
    status: 'live'
  },
  {
    id: 'soil-calculator',
    slug: 'soil-calculator',
    name: 'Soil Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Calculate topsoil, garden soil, and compost in cubic yards and 1 cu ft/2 cu ft bags for raised beds and lawns.',
    metaTitle: 'Soil Calculator - Topsoil & Raised Bed Dirt Estimator',
    metaDescription: 'Calculate topsoil, compost, and raised garden bed soil in cubic yards, cubic feet, and bagged quantities.',
    keywords: ['soil calculator', 'topsoil calculator', 'raised bed soil calculator', 'how much soil do i need'],
    formula: 'Cubic Yards = (L × W × Depth in ft) ÷ 27 | Bags (2 cu ft) = (L × W × Depth in ft) ÷ 2',
    formulaDescription: 'Computes total soil volume needed for raised garden planters, grading, or lawn topdressing.',
    methodology: ['Measure bed dimensions', 'Convert depth to feet', 'Calculate cubic yards and bags'],
    limitations: ['New soil settles by 10-15% after initial watering.'],
    workedExample: {
      title: 'Two 4 ft × 8 ft Raised Garden Beds at 12 Inches Deep',
      scenario: 'Filling two 4x8 ft raised garden planter boxes (64 sq ft total) to a depth of 12 inches.',
      inputs: [{ label: 'Planters', value: '2 Beds @ 4 ft × 8 ft × 12 in (64 cu ft total)' }],
      steps: [
        { step: '1. Total Volume', calculation: '64 cu ft ÷ 27', result: '2.37 cu yds' },
        { step: '2. Bagged Option (2 cu ft bags)', calculation: '64 ÷ 2', result: '32 Bags' }
      ],
      finalAnswer: 'Purchase 2.5 cubic yards bulk soil mix OR 32 bags (2 cu ft each) of organic garden soil.',
      proTip: 'Use Mel\'s Mix for raised beds: 1/3 coarse vermiculite, 1/3 peat moss or coco coir, and 1/3 blended compost.'
    },
    decisionSupport: {
      title: 'Soil Depth Guidelines by Plant Type',
      description: 'Recommended root depths.',
      headers: ['Plant Category', 'Minimum Soil Depth', 'Recommended Soil Mix'],
      rows: [
        ['Lawn Overseeding / Topdress', '1/4 - 1/2 inch', 'Screened topsoil + fine compost'],
        ['Shallow Greens (Lettuce, Herbs)', '6 inches', 'Garden soil + 20% compost'],
        ['Deep Vegetables (Tomatoes, Carrots)', '12 - 18 inches', 'Rich organic loam + perlite + compost'],
        ['Fruit Trees & Large Shrubs', '24+ inches', '50% native topsoil + 50% compost blend']
      ],
      notes: ['Never use straight potting soil in large outdoor garden beds as it dries out too rapidly.']
    },
    faqs: [
      {
        question: 'How many bags of soil are in a cubic yard?',
        answer: 'One cubic yard (27 cu ft) equals 27 bags of 1 cu ft soil, 13.5 bags of 2 cu ft soil, or 9 bags of 3 cu ft compressed peat.'
      }
    ],
    relatedToolSlugs: ['mulch-calculator', 'turf-calculator', 'gravel-calculator'],
    status: 'live'
  },
  {
    id: 'mulch-calculator',
    slug: 'mulch-calculator',
    name: 'Mulch Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Estimate wood chip mulch, bark nuggets, and pine straw in cubic yards and 2 cu ft bags.',
    metaTitle: 'Mulch Calculator - Bags & Bulk Cubic Yards Estimator',
    metaDescription: 'Calculate mulch in cubic yards and 2 cu ft bags for landscape beds, tree rings, and weed suppression.',
    keywords: ['mulch calculator', 'how many bags of mulch', 'bulk mulch calculator'],
    formula: 'Mulch Cubic Yards = (Bed Sq Ft × Depth in Inches) ÷ 324',
    formulaDescription: 'Formula shortcut: 1 cubic yard covers 324 square feet at 1 inch deep (or 108 sq ft at standard 3 inches deep).',
    methodology: ['Measure bed area', 'Select depth (2" for refreshing, 3" for new beds)', 'Compute yards and bags'],
    limitations: ['Do not pile mulch against tree trunks to prevent bark rot.'],
    workedExample: {
      title: '500 sq ft Landscape Bed at 3 Inches Deep',
      scenario: 'Mulching 500 sq ft of flower beds with shredded hardwood mulch at 3 inches depth.',
      inputs: [{ label: 'Area', value: '500 sq ft' }, { label: 'Depth', value: '3 inches' }],
      steps: [
        { step: '1. Cubic Yards', calculation: '(500 × 3) ÷ 324 = 4.63 → ⌈5⌉', result: '5.0 Cubic Yards' },
        { step: '2. Bagged Option (2 cu ft)', calculation: '(4.63 × 27) ÷ 2 = 62.5 → ⌈63⌉', result: '63 Bags' }
      ],
      finalAnswer: 'Order 5.0 cubic yards of bulk mulch OR purchase 63 bags (2 cu ft each).',
      proTip: 'Apply a 3-inch depth for optimal weed suppression; depths over 4 inches can suffocate plant root systems.'
    },
    decisionSupport: {
      title: 'Mulch Coverage Table (1 Cubic Yard)',
      description: 'Square footage covered per yard by depth.',
      headers: ['Depth (Inches)', 'Coverage Per Cu Yard (Sq Ft)', 'Bags (2 cu ft) Needed Per 100 Sq Ft'],
      rows: [
        ['1 inch', '324 sq ft', '4.2 bags'],
        ['2 inches', '162 sq ft', '8.4 bags'],
        ['3 inches (Standard)', '108 sq ft', '12.5 bags'],
        ['4 inches', '81 sq ft', '16.7 bags']
      ],
      notes: ['Shredded hardwood mulch knits together on slopes better than large pine bark nuggets.']
    },
    faqs: [
      {
        question: 'How deep should mulch be applied?',
        answer: 'The ideal depth is 2 to 3 inches. Applying 3 inches provides excellent weed suppression and moisture retention without choking plant roots.'
      }
    ],
    relatedToolSlugs: ['soil-calculator', 'turf-calculator', 'gravel-calculator'],
    status: 'live'
  },
  {
    id: 'turf-calculator',
    slug: 'turf-calculator',
    name: 'Turf & Sod Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Calculate sod pallets, turf rolls, square feet, and grass seed pounds for lawn installations.',
    metaTitle: 'Turf & Sod Calculator - Sod Pallets & Grass Rolls Estimator',
    metaDescription: 'Calculate sod rolls and pallets (450-500 sq ft/pallet), grass seed pounds, and fertilizer for new lawns.',
    keywords: ['turf calculator', 'sod calculator', 'how many pallets of sod do i need'],
    formula: 'Sod Pallets = ⌈(L ft × W ft × 1.05) ÷ 450 sq ft per pallet⌉',
    formulaDescription: 'Calculate lawn area, add 5% waste for edge trimming, and divide by pallet yield (standard 450 or 500 sq ft).',
    methodology: ['Measure lawn boundaries', 'Add 5% cut waste', 'Divide by 450 sq ft/pallet'],
    limitations: ['Sod is perishable and must be laid within 24 hours of delivery.'],
    workedExample: {
      title: '40 ft × 50 ft Backyard Lawn (2,000 sq ft)',
      scenario: 'Installing Bermuda or Kentucky Bluegrass sod on a 2,000 sq ft backyard.',
      inputs: [{ label: 'Area', value: '2,000 sq ft' }, { label: 'Waste', value: '5%' }],
      steps: [
        { step: '1. Gross Area', calculation: '2,000 × 1.05', result: '2,100 sq ft' },
        { step: '2. Pallets (450 sq ft/pallet)', calculation: '2,100 ÷ 450 = 4.67 → ⌈5⌉', result: '5 Pallets' }
      ],
      finalAnswer: 'Order 5 pallets of fresh sod (2,250 sq ft total).',
      proTip: 'Water new sod immediately until the subsoil beneath the sod is thoroughly soaked at least 4 inches deep.'
    },
    decisionSupport: {
      title: 'Sod Pallet Specifications',
      description: 'Standard sod farm pallet sizes.',
      headers: ['Pallet Format', 'Piece Dimensions', 'Pieces Per Pallet', 'Total Pallet Sq Ft'],
      rows: [
        ['Standard Small Rolls', '2 ft × 5 ft (10 sq ft)', '45 - 50 rolls', '450 - 500 sq ft'],
        ['Standard Slabs', '16 in × 24 in (2.67 sq ft)', '150 - 180 slabs', '400 - 480 sq ft'],
        ['Big Rolls (Commercial)', '42 in × 100 ft', '1 master roll', '350 sq ft']
      ],
      notes: ['One pallet of fresh sod weighs between 1,500 to 2,500 lbs depending on moisture content.']
    },
    faqs: [
      {
        question: 'How many square feet are on a standard pallet of sod?',
        answer: 'Most turf farms stack pallets with 450 or 500 square feet of sod (approx 50 rolls of 2×5 ft or 170 slabs).'
      }
    ],
    relatedToolSlugs: ['soil-calculator', 'mulch-calculator', 'patio-calculator'],
    status: 'live'
  },
  {
    id: 'fence-calculator',
    slug: 'fence-calculator',
    name: 'Fence Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Calculate fence posts, rails, pickets, gate kits, and concrete bags for privacy and post-and-rail fences.',
    metaTitle: 'Fence Calculator - Posts, Rails, Pickets & Concrete Estimator',
    metaDescription: 'Calculate fence posts (6ft or 8ft spacing), 2x4 rails, individual pickets, gate hardware, and post hole concrete.',
    keywords: ['fence calculator', 'how many fence pickets do i need', 'fence post calculator', 'fence material calculator'],
    formula: 'Posts = ⌈Length ÷ Post Spacing⌉ + 1 + Gate Posts | Pickets = (Length in inches ÷ Picket Width) × 1.05',
    formulaDescription: 'Divides total fence run by post spacing (typically 8ft or 6ft), calculates horizontal rails, and calculates pickets.',
    methodology: ['Measure total linear feet', 'Choose post spacing (6ft or 8ft)', 'Select fence height (6ft privacy vs 4ft)', 'Calculate concrete (2 bags/post)'],
    limitations: ['Sloped yards require stepping or racking panels, which alters picket lengths.'],
    workedExample: {
      title: '150 Linear Feet of 6ft Privacy Fence',
      scenario: 'Building a 150 ft wood privacy fence with 8ft post spacing, 3 rails, 5.5" pickets, and 1 walk gate.',
      inputs: [{ label: 'Fence Run', value: '150 linear feet' }, { label: 'Picket Width', value: '5.5 inch dog-ear pickets' }],
      steps: [
        { step: '1. Line Posts', calculation: '⌈150 ÷ 8⌉ + 1', result: '20 4x4 Posts' },
        { step: '2. 2x4 Rails (3 per section)', calculation: '19 sections × 3 rails', result: '57 8-ft 2x4s' },
        { step: '3. Pickets (5.5" width)', calculation: '(150 × 12) ÷ 5.5 = 327.2 × 1.05', result: '344 Pickets' },
        { step: '4. Concrete (2 bags/post)', calculation: '20 posts × 2 bags', result: '40 Bags (50lb/60lb)' }
      ],
      finalAnswer: 'Purchase 20 4x4 posts (8ft or 9ft), 57 2x4 rails (8ft), 344 dog-ear pickets, and 40 bags of concrete.',
      proTip: 'Use 3 horizontal 2x4 rails on all 6ft privacy fences to prevent pickets from warping and bowing.'
    },
    decisionSupport: {
      title: 'Fence Post Spacing & Rail Guidelines',
      description: 'Engineering standards for wood fencing.',
      headers: ['Fence Height', 'Post Spacing', 'Rails Per Section', 'Min Post Depth in Ground'],
      rows: [
        ['4 ft Picket Fence', '8 ft on center', '2 rails (top/bottom)', '24 inches (2 ft)'],
        ['6 ft Privacy Fence', '8 ft on center (6ft in windy areas)', '3 rails', '30 - 36 inches (below frost line)'],
        ['8 ft Commercial Fence', '6 ft on center', '4 rails', '36 - 48 inches']
      ],
      notes: ['Always call 811 to locate underground utility lines before digging any post holes.']
    },
    faqs: [
      {
        question: 'How deep should fence posts be set in the ground?',
        answer: 'Fence posts should be buried at least 1/3 of their total length, or a minimum of 30 to 36 inches (below the local winter frost line).'
      }
    ],
    relatedToolSlugs: ['concrete-bags-calculator', 'patio-calculator', 'turf-calculator'],
    status: 'live'
  },
  {
    id: 'patio-calculator',
    slug: 'patio-calculator',
    name: 'Paver Patio Calculator',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    clusterHref: '/calculators/garden',
    benefit: 'Calculate patio pavers, crushed stone road base, bedding sand, edge restraints, and polymeric sand.',
    metaTitle: 'Paver Patio Calculator - Pavers, Sand, Base & Edging Estimator',
    metaDescription: 'Calculate concrete patio pavers, square feet, polymeric joint sand, 4" crushed stone base tons, and snap edge restraint.',
    keywords: ['patio calculator', 'paver calculator', 'how many pavers do i need', 'paver patio cost calculator'],
    formula: 'Pavers = ⌈(Patio Sq Ft × 1.10) ÷ Paver Sq Ft⌉ | Base Tons = (Patio Sq Ft × 0.333 ÷ 27) × 1.5',
    formulaDescription: 'Calculates total paver units plus 10% cut waste, 4" to 6" compacted gravel subbase tons, 1" bedding sand tons, and polymeric joint sand bags.',
    methodology: ['Measure patio length and width', 'Select paver dimensions', 'Calculate 4" road base tons', 'Calculate 1" screed sand tons'],
    limitations: ['Excavation depth must be total base thickness + 1" sand + paver thickness.'],
    workedExample: {
      title: '12 ft × 16 ft Paver Patio (192 sq ft)',
      scenario: 'Building a 192 sq ft patio using standard 6" × 9" Holland pavers (0.375 sq ft each).',
      inputs: [{ label: 'Patio Dimensions', value: '12 ft × 16 ft (192 sq ft)' }, { label: 'Paver Size', value: '6" × 9" (0.375 sq ft)' }],
      steps: [
        { step: '1. Gross Paver Area (10% waste)', calculation: '192 × 1.10', result: '211.2 sq ft' },
        { step: '2. Pavers Count', calculation: '211.2 ÷ 0.375 = 563.2 → ⌈564⌉', result: '564 Pavers' },
        { step: '3. 4" Gravel Base', calculation: '(192 × 0.333 ÷ 27) × 1.5', result: '3.55 Tons Road Base' },
        { step: '4. 1" Bedding Sand', calculation: '(192 × 0.083 ÷ 27) × 1.4', result: '0.83 Tons (1 Ton) Sand' },
        { step: '5. Polymeric Sand', calculation: '192 ÷ 75 sq ft/bag', result: '3 Bags (50lb each)' }
      ],
      finalAnswer: 'Purchase 564 6x9 pavers, 3.6 tons of gravel base, 1 ton of coarse bedding sand, 3 bags of polymeric sand, and 56 linear ft of snap edging.',
      proTip: 'Never use fine play sand for the 1-inch bedding layer; use ASTM C33 coarse concrete sand so water can drain.'
    },
    decisionSupport: {
      title: 'Paver Patio Layer Specifications',
      description: 'Standard cross-section layers from subgrade to surface.',
      headers: ['Layer', 'Standard Thickness', 'Material Specification', 'Compaction Method'],
      rows: [
        ['Subgrade Soil', 'Native depth', 'Undisturbed native soil + geotextile', 'Plate compactor'],
        ['Gravel Subbase', '4 - 6 inches', 'Crushed 3/4" minus road base', 'Plate compactor in 2" lifts'],
        ['Bedding Sand', '1 inch (uncompacted)', 'ASTM C33 coarse concrete sand', 'Screed pipes (do not pre-compact)'],
        ['Pavers', '2 - 2-3/8 inches', 'Interlocking concrete pavers', 'Plate compactor with rubber mat'],
        ['Joint Filler', 'Full joint depth', 'Polymeric joint sand', 'Vibrate and sweep clean']
      ],
      notes: ['Pitch the patio at a slope of 1/4" per foot away from the house foundation to ensure proper water runoff.']
    },
    faqs: [
      {
        question: 'How deep do I need to dig for a paver patio?',
        answer: 'Dig approximately 7 to 8 inches deep (4" gravel base + 1" bedding sand + 2-3/8" paver thickness) so the final paver surface sits flush with adjacent turf.'
      }
    ],
    relatedToolSlugs: ['gravel-calculator', 'soil-calculator', 'concrete-calculator'],
    status: 'live'
  }
];
