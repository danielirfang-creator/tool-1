import { ToolMeta } from './types';

export const flooringTools: ToolMeta[] = [
  {
    id: 'flooring-calculator',
    slug: 'flooring-calculator',
    name: 'Flooring Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Calculate total square footage, pack requirements, waste percentage, and overall material budget in seconds.',
    metaTitle: 'Flooring Calculator - Square Footage, Boxes & Cost Estimator',
    metaDescription: 'Free, professional flooring calculator. Estimate total square feet or meters, pack coverage, recommended waste buffers (10-20%), and material cost for hardwood, vinyl, and tile.',
    keywords: ['flooring calculator', 'floor square footage calculator', 'how much flooring do i need', 'flooring box calculator', 'flooring waste calculator'],
    formula: 'Total Area = Length × Width | Order Area = Total Area × (1 + Waste%) | Total Boxes = ⌈Order Area ÷ Sq Ft Per Box⌉',
    formulaDescription: 'Multiply the room length by room width to find the base square footage. Then apply a waste factor (typically 10% for rectangular straight-lay patterns, or 15-20% for diagonal, herringbone, or multi-room layouts). Finally, divide the gross area by the manufacturer coverage per carton and round up to the nearest whole box.',
    methodology: [
      'Step 1: Measure the longest length and width of the room in feet (or meters).',
      'Step 2: Add closets, alcoves, and recesses as separate rectangles and add them to the total area.',
      'Step 3: Select a waste factor based on your installation pattern (Straight: 10%, Diagonal: 15%, Herringbone/Chevron: 20%).',
      'Step 4: Check carton label coverage (commonly 18 to 24 sq ft per box) to calculate total boxes.',
      'Step 5: Account for perimeter expansion gaps (typically 1/4" to 1/2") and baseboard/skirting requirements.'
    ],
    limitations: [
      'Does not automatically subtract for small obstacles under 4 sq ft (e.g. kitchen islands or pillars) to ensure adequate reserve for pattern cuts.',
      'Assumes subfloor is level and structurally sound; subfloor repair compound or self-leveler must be estimated separately.',
      'Always retain at least 1 unopened spare box of matching dye-lot planks for future spot repairs or moisture damage.'
    ],
    workedExample: {
      title: '15 ft × 20 ft Living Room Hardwood Installation',
      scenario: 'A homeowner wants to install pre-finished engineered hardwood in a 15-foot by 20-foot living room. The flooring costs $4.50 per sq ft and comes in 20 sq ft cartons. A standard 10% waste buffer is selected for straight installation.',
      inputs: [
        { label: 'Room Dimensions', value: '15 ft Length × 20 ft Width' },
        { label: 'Waste Buffer', value: '10%' },
        { label: 'Carton Coverage', value: '20 sq ft per box' },
        { label: 'Material Cost', value: '$4.50 per sq ft' }
      ],
      steps: [
        { step: '1. Net Floor Area', calculation: '15 ft × 20 ft', result: '300.00 sq ft' },
        { step: '2. Waste Addition (10%)', calculation: '300.00 × 0.10', result: '30.00 sq ft waste' },
        { step: '3. Gross Material Needed', calculation: '300.00 + 30.00', result: '330.00 sq ft gross' },
        { step: '4. Box Rounding', calculation: '330.00 ÷ 20 sq ft = 16.5 → ⌈17⌉', result: '17 full boxes (340 sq ft total)' },
        { step: '5. Total Material Cost', calculation: '340 sq ft × $4.50', result: '$1,530.00' }
      ],
      finalAnswer: 'Order 17 boxes (340 sq ft) for a total estimated material cost of $1,530.00 (includes 10% cutting waste + 10 sq ft safety reserve).',
      proTip: 'Order all boxes from the exact same production batch/run number to avoid slight color and gloss variations between different manufacturing runs.'
    },
    decisionSupport: {
      title: 'Flooring Waste Factor & Room Sizing Guide',
      description: 'Use this reference table to choose the correct waste percentage and estimate box counts for standard residential room sizes.',
      headers: ['Room Type / Size', 'Typical Net Sq Ft', 'Straight Lay (10%)', 'Diagonal Lay (15%)', 'Herringbone (20%)', 'Avg Box Count (20 sq ft/box)'],
      rows: [
        ['Small Bedroom (10×10 ft)', '100 sq ft', '110 sq ft', '115 sq ft', '120 sq ft', '6 Boxes'],
        ['Standard Bedroom (12×12 ft)', '144 sq ft', '158 sq ft', '166 sq ft', '173 sq ft', '8 - 9 Boxes'],
        ['Master Bedroom (14×16 ft)', '224 sq ft', '246 sq ft', '258 sq ft', '269 sq ft', '13 - 14 Boxes'],
        ['Living Room (16×20 ft)', '320 sq ft', '352 sq ft', '368 sq ft', '384 sq ft', '18 - 20 Boxes'],
        ['Open Concept (20×25 ft)', '500 sq ft', '550 sq ft', '575 sq ft', '600 sq ft', '28 - 30 Boxes']
      ],
      notes: [
        'Add an extra 5% waste if your room has multiple doorways, bay windows, or circular hearth transitions.',
        'Keep 1 full box uninstalled in a dry indoor closet for warranty compliance and future board replacement.'
      ]
    },
    faqs: [
      {
        question: 'How much extra flooring should I order for waste?',
        answer: 'The industry standard recommendation is 10% extra for standard square or rectangular rooms with straight-lay planks. If installing in a diagonal pattern or in rooms with angled walls, order 15% extra. For intricate herringbone, chevron, or parquet patterns, order 20% extra to account for extensive corner end-cuts.'
      },
      {
        question: 'How do I calculate flooring for irregular or L-shaped rooms?',
        answer: 'Break the L-shaped space into two or more distinct rectangular sections. Measure the length and width of each section, calculate each rectangle area (Length × Width), sum the areas together, and then apply your 10% to 15% waste factor to the total combined area.'
      },
      {
        question: 'Why do I have to buy full boxes instead of exact square footage?',
        answer: 'Flooring retailers only sell click-lock laminate, vinyl plank, and hardwood by sealed full cartons to protect the precision tongue-and-groove edges during shipping and handling. Any partial box requirement must always be rounded up to the next full carton.'
      },
      {
        question: 'What happens if I don\'t order enough flooring?',
        answer: 'Ordering short is one of the most expensive DIY mistakes. If you run out mid-job, reordering may result in receiving planks from a different manufacturing dye lot with noticeable color, grain, or sheen differences, or finding the style out of stock.'
      }
    ],
    relatedToolSlugs: ['tile-calculator', 'laminate-calculator', 'flooring-waste-calculator'],
    status: 'live'
  },
  {
    id: 'tile-calculator',
    slug: 'tile-calculator',
    name: 'Tile Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Calculate exact tile count, cartons, thinset mortar bags, and grout volume for floors, showers, and backsplashes.',
    metaTitle: 'Tile Calculator - Tile Count, Boxes, Grout & Mortar Estimator',
    metaDescription: 'Free online tile calculator. Enter room dimensions, tile size (inches or cm), and joint width to calculate exact tiles needed, boxes to buy, mortar bags, and grout volume.',
    keywords: ['tile calculator', 'how many tiles do i need', 'tile box calculator', 'floor tile calculator', 'grout calculator', 'thinset mortar calculator'],
    formula: 'Tile Area (sq ft) = (Tile L × Tile W) ÷ 144 | Exact Tiles = ⌈Net Room Area ÷ Single Tile Area⌉ | Order Tiles = Exact Tiles × (1 + Waste%)',
    formulaDescription: 'Convert the tile length and width to square feet. Divide total room area by single tile area to get raw tile count, then factor in 10% to 15% waste for cuts around edges, drains, and door jambs. Also estimates 50lb thinset bags (coverage ~45 sq ft) and 10lb grout bags.',
    methodology: [
      'Step 1: Input room length and width to calculate total floor or wall surface area.',
      'Step 2: Enter individual tile dimensions (e.g. 12×12, 12×24, 6×24 wood-plank, or 3×6 subway).',
      'Step 3: Specify grout joint width (1/16", 1/8", 3/16", or 1/4").',
      'Step 4: Factor 10% waste for standard grid lay, 15% for brick offset, or 20% for herringbone layouts.',
      'Step 5: Review secondary estimates for thin-set mortar and grout bag requirements.'
    ],
    limitations: [
      'Tile sizes listed as nominal (e.g. "12x24") may actually measure 11.75" × 23.75" due to rectified edge calibrations.',
      'Complex shower niches, bench wraps, and multi-plane wall curves require an additional 5-10% tile margin.',
      'Thinset coverage varies depending on trowel notch size (1/4"×1/4" vs 1/2"×1/2" for large format tiles).'
    ],
    workedExample: {
      title: '8 ft × 10 ft Bathroom Floor with 12×24 Inch Porcelain Tiles',
      scenario: 'Tiling an 8 ft by 10 ft bathroom floor (80 sq ft net) using 12" × 24" large-format porcelain tiles sold in boxes of 8 tiles (16 sq ft per box). A 15% waste factor is selected due to offset layout cuts around the toilet flange and vanity.',
      inputs: [
        { label: 'Floor Dimensions', value: '8 ft Length × 10 ft Width (80 sq ft)' },
        { label: 'Tile Dimensions', value: '12 in × 24 in (2.0 sq ft per tile)' },
        { label: 'Waste Buffer', value: '15%' },
        { label: 'Tiles Per Box', value: '8 tiles per carton (16.0 sq ft)' }
      ],
      steps: [
        { step: '1. Single Tile Area', calculation: '(12 × 24) ÷ 144', result: '2.00 sq ft per tile' },
        { step: '2. Raw Tiles Needed', calculation: '80 sq ft ÷ 2.00', result: '40 exact tiles' },
        { step: '3. 15% Waste Buffer', calculation: '40 × 1.15 = 46.0', result: '46 tiles total' },
        { step: '4. Box Rounding', calculation: '46 ÷ 8 tiles/box = 5.75 → ⌈6⌉', result: '6 full boxes (48 tiles / 96 sq ft)' },
        { step: '5. Thinset Mortar & Grout', calculation: '92 gross sq ft ÷ 45 sq ft/bag', result: '2 bags (50lb) thinset & 1 bag (10lb) grout' }
      ],
      finalAnswer: 'Purchase 6 boxes (48 tiles total), 2 bags of polymer-modified thinset mortar (50lb each), and 1 bag of sanded/unsanded grout (10lb).',
      proTip: 'For tiles with any edge 15 inches or longer, use a medium-bed mortar and a 1/2" × 1/2" square notch trowel to prevent lippage.'
    },
    decisionSupport: {
      title: 'Common Tile Sizes & Coverage Matrix',
      description: 'Quick reference for common residential tile sizes, single tile square footage, and average pieces required per 100 sq ft.',
      headers: ['Nominal Tile Size', 'Area Per Tile (Sq In)', 'Area Per Tile (Sq Ft)', 'Raw Tiles Per 100 Sq Ft', 'Tiles with 10% Waste', 'Typical Box Qty'],
      rows: [
        ['4" × 4" (Square Accent)', '16 sq in', '0.111 sq ft', '900 tiles', '990 tiles', '50 - 100 pcs'],
        ['3" × 6" (Subway Tile)', '18 sq in', '0.125 sq ft', '800 tiles', '880 tiles', '40 - 80 pcs'],
        ['6" × 6" (Standard Wall)', '36 sq in', '0.250 sq ft', '400 tiles', '440 tiles', '40 pcs'],
        ['12" × 12" (Standard Floor)', '144 sq in', '1.000 sq ft', '100 tiles', '110 tiles', '10 - 12 pcs'],
        ['12" × 24" (Large Format)', '288 sq in', '2.000 sq ft', '50 tiles', '55 tiles', '7 - 8 pcs'],
        ['24" × 24" (Extra Large)', '576 sq in', '4.000 sq ft', '25 tiles', '28 tiles', '4 - 5 pcs'],
        ['6" × 36" (Wood Plank)', '216 sq in', '1.500 sq ft', '67 tiles', '74 tiles', '8 - 10 pcs']
      ],
      notes: [
        'Large format tiles (12×24 and larger) require a 33% maximum offset rather than 50% brick bond to minimize factory bowing lippage.',
        'Keep 10-15 loose spare tiles stored in the garage for future plumbing repairs behind walls.'
      ]
    },
    faqs: [
      {
        question: 'How many extra tiles should I buy?',
        answer: 'Buy at least 10% extra for straight-lay grid layouts and 15% to 20% extra for diagonal patterns, herringbone patterns, or rooms with numerous pipes, drains, and fixtures. It is virtually impossible to buy matching tile months later due to dye lot differences.'
      },
      {
        question: 'How do I calculate how much grout and thinset mortar I need?',
        answer: 'As a rule of thumb, one 50lb bag of thinset mortar covers approximately 40 to 50 square feet when using a 1/4" × 3/8" trowel. One 10lb bag of grout covers between 80 to 120 square feet for 12"×12" or larger tiles with a 1/8" joint width.'
      },
      {
        question: 'What is the difference between nominal and actual tile size?',
        answer: 'Nominal size is the rounded marketing dimension (e.g. 12" × 24"), whereas the actual manufactured size is often slightly smaller (e.g. 11.8" × 23.6") to accommodate standard grout spacing. Our calculator accurately converts dimensions.'
      },
      {
        question: 'How do I calculate tile for shower walls and niches?',
        answer: 'Measure each wall height multiplied by width to find wall area, calculate the back and returns of the niche separately, add them together, and subtract the opening area of any window. Add 15% waste for frequent edge cuts.'
      }
    ],
    relatedToolSlugs: ['flooring-calculator', 'laminate-calculator', 'flooring-waste-calculator'],
    status: 'live'
  },
  {
    id: 'laminate-calculator',
    slug: 'laminate-calculator',
    name: 'Laminate Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Estimate laminate plank cartons, underlayment rolls, transition T-moldings, and quarter-round trim.',
    metaTitle: 'Laminate Flooring Calculator - Planks, Boxes, Underlayment & Trim',
    metaDescription: 'Free laminate flooring calculator. Calculate total boxes needed, foam underlayment rolls, vapor barrier, perimeter quarter-round molding, and expansion gap allowances.',
    keywords: ['laminate calculator', 'laminate flooring calculator', 'how many boxes of laminate flooring', 'laminate underlayment calculator', 'laminate cost calculator'],
    formula: 'Gross Area = Length × Width × (1 + Waste%) | Boxes = ⌈Gross Area ÷ Box Sq Ft⌉ | Underlayment Rolls = ⌈Gross Area ÷ Roll Sq Ft⌉',
    formulaDescription: 'Calculate room area, add 10% standard waste (15% for multi-room spans or diagonal runs), divide by carton square footage, and round up. Calculates perimeter linear footage for 1/4" expansion gap trims, quarter-round shoe molding, and underlayment rolls (typically 100 sq ft per roll).',
    methodology: [
      'Step 1: Measure room length and width in feet or meters.',
      'Step 2: Add 10% waste for standard staggered plank installation (minimum 6"-8" plank offset).',
      'Step 3: Enter the manufacturer package coverage (typically 18 to 22 sq ft per carton).',
      'Step 4: Check if your chosen laminate features attached acoustic underlayment pad or requires separate rolls.',
      'Step 5: Estimate perimeter molding (baseboard / quarter round) using 2 × (Length + Width) + 10% miter cut waste.'
    ],
    limitations: [
      'Laminate flooring requires a mandatory 3/8" to 1/2" expansion gap around all vertical walls, cabinets, and pipes.',
      'Spans exceeding 30 continuous feet in length or width require expansion T-molding transition strips between rooms.',
      'Must be acclimated in the installation room for at least 48 hours prior to installation.'
    ],
    workedExample: {
      title: '14 ft × 18 ft Master Bedroom Laminate Installation',
      scenario: 'Installing 12mm AC4 laminate flooring in a 14 ft by 18 ft bedroom (252 sq ft net). Planks are packaged in 19.5 sq ft boxes at $2.89/sq ft. Separate 100 sq ft foam underlayment rolls are required.',
      inputs: [
        { label: 'Room Dimensions', value: '14 ft × 18 ft (252 sq ft net)' },
        { label: 'Waste Buffer', value: '10% (Straight staggered lay)' },
        { label: 'Carton Coverage', value: '19.5 sq ft per box' },
        { label: 'Underlayment Roll Size', value: '100 sq ft per roll' },
        { label: 'Material Cost', value: '$2.89 per sq ft' }
      ],
      steps: [
        { step: '1. Net Room Area', calculation: '14 ft × 18 ft', result: '252.00 sq ft' },
        { step: '2. 10% Waste Addition', calculation: '252.00 × 1.10', result: '277.20 sq ft gross' },
        { step: '3. Laminate Box Count', calculation: '277.20 ÷ 19.5 = 14.21 → ⌈15⌉', result: '15 full boxes (292.5 sq ft total)' },
        { step: '4. Underlayment Rolls', calculation: '277.20 ÷ 100 sq ft = 2.77 → ⌈3⌉', result: '3 rolls (300 sq ft coverage)' },
        { step: '5. Perimeter Quarter Round', calculation: '2 × (14 + 18) = 64 ft + 10% = 70.4 ft → ⌈9⌉ 8ft pieces', result: '9 pieces (8ft each)' },
        { step: '6. Flooring Cost', calculation: '292.5 sq ft × $2.89', result: '$845.33' }
      ],
      finalAnswer: 'Purchase 15 boxes of laminate (292.5 sq ft), 3 rolls of underlayment, and 9 pieces of 8-ft quarter-round molding for an estimated flooring cost of $845.33.',
      proTip: 'Never install continuous laminate over 30 feet without an expansion T-molding in doorways, or buckling may occur during humid summer months.'
    },
    decisionSupport: {
      title: 'Laminate Thickness & Underlayment Selection Guide',
      description: 'Choose the correct laminate plank thickness and underlayment type based on your subfloor and foot traffic.',
      headers: ['Plank Thickness', 'AC Rating', 'Best Room Application', 'Attached Pad?', 'Underlayment Recommendation'],
      rows: [
        ['7mm - 8mm', 'AC3', 'Guest bedrooms, light residential', 'Sometimes', '2mm Standard Foam + 6 mil Vapor Barrier (Concrete)'],
        ['10mm', 'AC3 / AC4', 'Living rooms, dining rooms, hallways', 'Common', '2mm High-Density Acoustic Underlayment'],
        ['12mm', 'AC4 / AC5', 'High traffic, kitchens, pets, kids', 'Common', 'Premium 3-in-1 Vapor/Sound/Thermal Membrane'],
        ['12mm + Pad', 'AC5', 'Commercial spaces, active family homes', 'Included', 'Moisture barrier 6-mil poly sheet on concrete only']
      ],
      notes: [
        'If installing over concrete slabs, a 6-mil polyethylene moisture barrier is mandatory to prevent warranty voiding.',
        'Allow boxes to acclimate flat in the climate-controlled room for 48 hours prior to clicking planks together.'
      ]
    },
    faqs: [
      {
        question: 'Do I need separate underlayment if my laminate has an attached pad?',
        answer: 'No. If your laminate planks come with pre-attached foam padding, do not install a second foam underlayment pad, as excessive cushion will cause locking joints to flex and snap. However, if installing over concrete, you still need a thin 6-mil poly vapor barrier.'
      },
      {
        question: 'What is the standard waste factor for laminate flooring?',
        answer: 'Plan for 10% waste for standard rectangular rooms. For diagonal layouts or installations where you want seamless flow across multiple rooms without doorway T-moldings, budget 15% waste.'
      },
      {
        question: 'How do I calculate quarter-round shoe molding for laminate?',
        answer: 'Measure the perimeter of the room (2 × Length + 2 × Width), subtract doorway openings, and add 10% for miter corner cut waste. Divide total linear feet by 8 (standard molding piece length) and round up to the next whole piece.'
      },
      {
        question: 'Why is an expansion gap required around the perimeter?',
        answer: 'Laminate core boards contain high-density wood fibers that expand and contract with seasonal humidity and temperature fluctuations. Leaving a 3/8" perimeter gap hidden beneath baseboards prevents the floor from peaking or buckling.'
      }
    ],
    relatedToolSlugs: ['flooring-calculator', 'tile-calculator', 'flooring-waste-calculator'],
    status: 'live'
  },
  {
    id: 'carpet-calculator',
    slug: 'carpet-calculator',
    name: 'Carpet Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Calculate carpet square yards, standard 12ft/15ft roll cuts, padding rolls, and seam allowances.',
    metaTitle: 'Carpet Calculator - Square Yards, Roll Cuts & Padding Estimator',
    metaDescription: 'Free carpet calculator. Calculate square yards, square feet, seam placement for 12ft and 15ft roll widths, tack strips, and carpet cushion padding.',
    keywords: ['carpet calculator', 'square yard calculator for carpet', 'carpet padding calculator', 'how much carpet do i need'],
    formula: 'Square Yards = (Length ft × Width ft) ÷ 9 | Roll Area = Roll Width × Cut Length ÷ 9',
    formulaDescription: 'Carpet is sold by the square yard and manufactured in standard 12ft and 15ft broadloom rolls.',
    methodology: ['Measure room dimensions', 'Choose standard roll width', 'Factor pile direction', 'Calculate cushion padding'],
    limitations: ['Roll cut waste can reach 15-25% in rooms narrower or wider than standard roll widths.'],
    workedExample: {
      title: '11 ft × 14 ft Bedroom Carpet Estimate',
      scenario: 'Carpet an 11x14 ft room (154 sq ft) using a 12-foot broadloom roll cut.',
      inputs: [{ label: 'Room Size', value: '11 ft × 14 ft' }, { label: 'Roll Width', value: '12 ft' }],
      steps: [
        { step: '1. Net Floor Area', calculation: '11 × 14', result: '154 sq ft (17.11 sq yd)' },
        { step: '2. 12ft Roll Cut', calculation: '12 ft × 14.5 ft cut length', result: '174 sq ft (19.33 sq yd)' }
      ],
      finalAnswer: 'Order a 12 ft × 14.5 ft cut (19.33 sq yd) plus 18 sq yd of 8lb cushion pad.',
      proTip: 'Always orient the carpet nap toward the main doorway entrance.'
    },
    decisionSupport: {
      title: 'Carpet Cushion Density & Thickness Guide',
      description: 'Match cushion density to your carpet pile.',
      headers: ['Carpet Type', 'Max Pad Thickness', 'Recommended Density', 'Application'],
      rows: [
        ['Berber / Loop Pile', '3/8 inch', '8 lb / cu ft', 'Prevents backing stretch'],
        ['Cut Pile / Plush', '7/16 - 1/2 inch', '6 - 8 lb / cu ft', 'Maximum foot comfort'],
        ['Heavy Commercial', '5/16 inch', '10+ lb / cu ft', 'Maximum durability']
      ],
      notes: ['Pads thicker than 7/16" will void the warranty of most low-profile loop carpets.']
    },
    faqs: [
      {
        question: 'How do I convert square feet to square yards for carpet?',
        answer: 'Divide total square feet by 9. For example, 180 sq ft = 20 square yards.'
      }
    ],
    relatedToolSlugs: ['flooring-calculator', 'flooring-waste-calculator', 'laminate-calculator'],
    status: 'live'
  },
  {
    id: 'vinyl-flooring-calculator',
    slug: 'vinyl-flooring-calculator',
    name: 'Vinyl Flooring Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Estimate luxury vinyl plank (LVP), sheet vinyl, and click-lock vinyl tiles for wet areas and basements.',
    metaTitle: 'Vinyl Flooring Calculator - LVP Planks, Boxes & Waste Estimator',
    metaDescription: 'Calculate luxury vinyl plank (LVP) and sheet vinyl requirements, box quantities, adhesive, and 100% waterproof installation accessories.',
    keywords: ['vinyl flooring calculator', 'lvp calculator', 'luxury vinyl plank calculator', 'sheet vinyl calculator'],
    formula: 'LVP Boxes = ⌈(Length × Width × 1.10) ÷ Sq Ft Per Box⌉',
    formulaDescription: 'Calculate net square footage, apply 10% cutting waste, and divide by box coverage.',
    methodology: ['Measure room dimensions', 'Add 10% cutting waste', 'Divide by carton coverage', 'Check for integrated pad'],
    limitations: ['Subfloor flatness must be within 3/16" over 10 feet.'],
    workedExample: {
      title: '12 ft × 16 ft Kitchen LVP Installation',
      scenario: 'Installing 20 mil wear-layer LVP in a 192 sq ft kitchen with 22 sq ft boxes.',
      inputs: [{ label: 'Area', value: '192 sq ft' }, { label: 'Waste', value: '10%' }],
      steps: [
        { step: '1. Gross Area', calculation: '192 × 1.10', result: '211.2 sq ft' },
        { step: '2. Box Count', calculation: '211.2 ÷ 22 = 9.6 → ⌈10⌉', result: '10 boxes (220 sq ft)' }
      ],
      finalAnswer: 'Order 10 boxes of LVP flooring (220 sq ft total).',
      proTip: 'For basement concrete slabs, verify that relative humidity is under 85% or use an additional 6-mil poly vapor barrier.'
    },
    decisionSupport: {
      title: 'LVP Wear Layer Thickness Comparison',
      description: 'Compare residential and commercial LVP wear layers (measured in mils).',
      headers: ['Wear Layer (Mils)', 'Expected Lifespan', 'Recommended Usage'],
      rows: [
        ['6 - 8 mil', '5 - 10 Years', 'Rental property light use / guest rooms'],
        ['12 mil', '10 - 15 Years', 'Standard residential bedrooms and living rooms'],
        ['20 mil', '20 - 25+ Years', 'Active households with large dogs, kitchens, basements'],
        ['28 - 30 mil', 'Lifetime', 'Light commercial, retail, heavy traffic']
      ],
      notes: ['1 mil = 1/1000th of an inch. Wear layer thickness is more important than total plank thickness.']
    },
    faqs: [
      {
        question: 'Is LVP 100% waterproof?',
        answer: 'Yes, the core and surface of rigid core SPC/WPC vinyl are 100% waterproof and will not swell when exposed to standing water.'
      }
    ],
    relatedToolSlugs: ['flooring-calculator', 'tile-calculator', 'laminate-calculator'],
    status: 'live'
  },
  {
    id: 'flooring-waste-calculator',
    slug: 'flooring-waste-calculator',
    name: 'Flooring Waste Calculator',
    cluster: 'flooring',
    clusterName: 'Flooring',
    clusterHref: '/calculators/flooring',
    benefit: 'Calculate the exact waste percentage needed based on your installation pattern, room angles, and installer experience.',
    metaTitle: 'Flooring Waste Calculator - Accurate Overage Buffer by Pattern',
    metaDescription: 'Calculate the exact flooring waste percentage for straight, diagonal, herringbone, chevron, and irregular room layouts.',
    keywords: ['flooring waste calculator', 'how much extra flooring to order', 'flooring overage calculator', 'herringbone waste factor'],
    formula: 'Recommended Waste % = Base Pattern (10-20%) + Room Shape Factor (0-5%) + Skill Factor (0-5%)',
    formulaDescription: 'Computes precision overage percentage by combining installation pattern physics, room geometry complexity, and obstacle density.',
    methodology: ['Select pattern type', 'Rate room complexity', 'Factor board length', 'Calculate exact safety margin'],
    limitations: ['Never order less than 1 full extra carton regardless of calculated fractional overage.'],
    workedExample: {
      title: 'Herringbone Pattern in 300 sq ft Room',
      scenario: 'Installing herringbone parquet flooring requires 45-degree angle cuts at every perimeter wall boundary.',
      inputs: [{ label: 'Net Area', value: '300 sq ft' }, { label: 'Pattern', value: 'Herringbone (18%)' }],
      steps: [
        { step: '1. Waste Multiplier', calculation: '300 × 0.18', result: '54.00 sq ft waste' },
        { step: '2. Total to Order', calculation: '300 + 54', result: '354.00 sq ft gross' }
      ],
      finalAnswer: 'Order 354 sq ft of flooring (18% pattern waste allowance).',
      proTip: 'Herringbone requires equal quantities of Left (A) and Right (B) grooved planks.'
    },
    decisionSupport: {
      title: 'Flooring Waste Matrix by Pattern & Room Layout',
      description: 'Recommended industry overage standards.',
      headers: ['Installation Pattern', 'Rectangular Room', 'L-Shaped / Angled Walls', 'Multiple Doorways / Hallways'],
      rows: [
        ['Straight Planks (Random Stagger)', '8% - 10%', '10% - 12%', '12% - 15%'],
        ['Diagonal (45-Degree Angle)', '12% - 15%', '15% - 18%', '18% - 20%'],
        ['Herringbone / Chevron', '15% - 18%', '18% - 22%', '22% - 25%'],
        ['Large Format Tile (Grid)', '10%', '12% - 15%', '15%']
      ],
      notes: ['Keep remaining uncut planks in a climate-controlled closet for future repairs.']
    },
    faqs: [
      {
        question: 'Why does herringbone flooring need 18-20% waste?',
        answer: 'Every herringbone plank that meets a straight wall must be cut at a 45-degree angle, generating triangular offcuts that frequently cannot be reused.'
      }
    ],
    relatedToolSlugs: ['flooring-calculator', 'tile-calculator', 'laminate-calculator'],
    status: 'live'
  }
];
