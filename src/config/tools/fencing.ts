import { ToolMeta } from './types';

export const fencingTools: ToolMeta[] = [
  {
    id: 'fence-calculator',
    slug: 'fence-calculator',
    name: 'Fence Calculator',
    cluster: 'fencing-decking',
    clusterName: 'Fencing & Decking',
    clusterHref: '/calculators/fencing-decking',
    benefit: 'Calculate posts, rails, pickets, gate hardware, and post-hole concrete bags for privacy and wood fences.',
    metaTitle: 'Fence Calculator - Posts, Rails, Pickets & Concrete',
    metaDescription: 'Free fence material calculator. Calculate 4x4 posts, 2x4 rails (2 or 3 rail), pickets, gate kits, and 50lb/80lb concrete bags for 6ft and 8ft post spacing with waste.',
    keywords: ['fence calculator', 'how many fence pickets do i need', 'wood fence calculator', 'fence post calculator', 'privacy fence calculator'],
    formula: 'Posts = (Fence Length ÷ Post Spacing) + 1 | Rails = Sections × 2 (or 3) | Pickets = (Length in ÷ (Picket Width in + Gap in)) × 1.05',
    formulaDescription: 'Divides total fence perimeter by post span (6ft or 8ft on-center), computes 2 or 3 horizontal 2x4 rails per section, calculates 3.5" (1x4) or 5.5" (1x6) pickets with 5% waste, and calculates 1.5 to 2 bags of concrete per post hole.',
    methodology: [
      'Input total fence run length in feet',
      'Select post spacing (6 ft vs standard 8 ft on-center)',
      'Choose 2-rail (4ft-5ft fence) or 3-rail (6ft privacy fence)',
      'Select picket width (3.5" standard 1x4 or 5.5" privacy 1x6)',
      'Add gate openings and calculate concrete bags (2 bags of 50lb fast-setting concrete per post)'
    ],
    limitations: ['Sloped ground racking or step-down terracing may require extra post length (9ft or 10ft posts).'],
    workedExample: {
      title: '150 Linear Feet 6 ft Privacy Fence with 1 Gate',
      scenario: 'Building a 150 ft wood privacy fence using 8ft post spacing, 3 horizontal 2x4 rails, 5.5" dog-ear pickets, and 1 standard 4ft walk gate.',
      inputs: [
        { label: 'Fence Run Length', value: '150 Linear Feet' },
        { label: 'Post Spacing', value: '8 ft On-Center' },
        { label: 'Rail Style', value: '3 Rails (Top, Middle, Bottom)' },
        { label: 'Pickets', value: '1x6 Dog Ear (5.5" actual width)' }
      ],
      steps: [
        { step: '1. Sections & Line Posts', calculation: '150 ÷ 8 = 18.75 → 19 Sections + 1 End Post + 1 Gate Post', result: '21 Posts (4x4x8 ft)' },
        { step: '2. 2x4 Rails (3 per section)', calculation: '19 sections × 3 rails', result: '57 Rails (2x4x8 ft)' },
        { step: '3. 5.5" Pickets (146 ft net fence)', calculation: '(146 ft × 12 in) ÷ 5.5 in = 318.5 × 1.05 waste', result: '335 Pickets (1x6x6 ft)' },
        { step: '4. Concrete Bags (50lb Fast-Setting)', calculation: '21 posts × 2 bags/hole', result: '42 Bags (50lb Fast-Setting)' },
        { step: '5. Fasteners (Screws / Nails)', calculation: '335 pickets × 6 screws = 2,010 screws', result: '1 Box (5lb) 1-5/8" Exterior Screws' }
      ],
      finalAnswer: 'Purchase 21 posts (4x4x8 treated), 57 rails (2x4x8), 335 dog-ear pickets (1x6x6), 42 bags of fast-setting concrete, and 1 heavy-duty gate hardware kit.',
      proTip: 'Set post holes at a depth equal to 1/3 to 1/2 the above-ground post height (minimum 24" to 36" deep) and extend below the local winter frost line to prevent frost heave.'
    },
    decisionSupport: {
      title: 'Fence Post Spacing & Depth Standards',
      description: 'Engineering specifications for wood, vinyl, and composite fences.',
      headers: ['Fence Height', 'Post Size', 'Max Post Spacing', 'Hole Depth', 'Rails Per Section'],
      rows: [
        ['4 ft Decorative Picket', '4×4 Treated / Cedar', '8 ft On-Center', '24 inches (60 cm)', '2 Rails (2×4)'],
        ['6 ft Standard Privacy', '4×4 Treated / Cedar', '8 ft On-Center', '30 - 36 inches (90 cm)', '3 Rails (2×4)'],
        ['6 ft High-Wind Zone (>70 mph)', '4×4 or 4×6 Post', '6 ft On-Center', '36 inches (90 cm)', '3 Rails (2×4)'],
        ['8 ft Commercial Privacy', '4×6 or 6×6 Post', '6 ft On-Center', '42 - 48 inches (120 cm)', '4 Rails (2×4)']
      ],
      notes: ['Leave a 2-inch gap between the bottom of pickets and the ground to prevent ground moisture rot.']
    },
    faqs: [
      {
        question: 'How many pickets do I need for a 100 ft fence?',
        answer: 'For a 100 ft fence using standard 5.5" wide pickets without spacing gaps, you need approximately 229 pickets, including a 5% allowance for warped or split boards (or 360 pickets if using 3.5" pickets).'
      },
      {
        question: 'How many bags of concrete do I need per fence post?',
        answer: 'For a standard 4x4 post in a 10-inch diameter hole 30 inches deep, you need 2 bags of 50lb fast-setting concrete (or 1.5 bags of 80lb concrete) per hole.'
      },
      {
        question: 'Should I use 2 or 3 horizontal rails on a 6ft fence?',
        answer: 'Always use 3 horizontal 2x4 rails on a 6ft fence (top, middle, and bottom). 2 rails will cause 6ft pickets to warp, twist, and bow outward within the first summer season.'
      }
    ],
    relatedToolSlugs: ['decking-calculator', 'concrete-bags-calculator', 'concrete-calculator'],
    status: 'live'
  },
  {
    id: 'decking-calculator',
    slug: 'decking-calculator',
    name: 'Decking Calculator',
    cluster: 'fencing-decking',
    clusterName: 'Fencing & Decking',
    clusterHref: '/calculators/fencing-decking',
    benefit: 'Calculate deck surface boards (5/4x6 wood vs composite), framing joists (12" vs 16" OC), ledger board, and hidden fastener boxes.',
    metaTitle: 'Decking Calculator - Deck Boards, Joists & Screws',
    metaDescription: 'Free deck material calculator. Calculate 5/4x6 wood and composite deck boards, linear footage, 2x8/2x10 framing joists, ledger boards, and hidden fasteners with waste.',
    keywords: ['decking calculator', 'how many deck boards do i need', 'deck material calculator', 'deck joist calculator', 'composite decking calculator'],
    formula: 'Boards = (Deck Width in ÷ 5.5 in) × (1 + Waste%) | Joists = (Deck Length ft ÷ (Spacing in ÷ 12)) + 1',
    formulaDescription: 'Computes total deck square footage, calculates deck board count based on 5.5" actual board width (5/4x6 or 2x6), adds framing joists based on 12" or 16" on-center spacing, and estimates hidden fasteners/screws.',
    methodology: [
      'Input deck length (along house) and projection width (outward)',
      'Select decking material (Pressure Treated Wood, Cedar, or Trex/Composite)',
      'Select joist spacing (16" OC for wood boards vs 12" OC required for composite/diagonal boards)',
      'Add 10% cutting waste for straight decking (15% for diagonal herringbone)',
      'Calculate joist hangers, hidden fastener clips, and ledger board flashing'
    ],
    limitations: ['Multi-level decks, stair stringers, and structural concrete support footings should be calculated separately.'],
    workedExample: {
      title: '16 ft × 20 ft Backyard Attached Deck',
      scenario: 'Building a 320 sq ft attached deck using 16ft composite deck boards (5.5" width) at 12" on-center joist spacing.',
      inputs: [
        { label: 'Deck Dimensions', value: '20 ft Length (along wall) × 16 ft Projection' },
        { label: 'Board Type', value: 'Composite / Trex (5.5" actual width)' },
        { label: 'Joist Spacing', value: '12" On-Center (Required for composite)' }
      ],
      steps: [
        { step: '1. Deck Area', calculation: '20 ft × 16 ft', result: '320 sq ft' },
        { step: '2. Deck Boards (16ft run)', calculation: '(20 ft × 12 in) ÷ 5.5 in = 43.6 × 1.10 waste', result: '48 Boards (16 ft length)' },
        { step: '3. Total Linear Footage', calculation: '48 boards × 16 ft', result: '768 Lineal Feet' },
        { step: '4. Framing Joists (12" OC)', calculation: '(20 ft ÷ 1.0 ft) + 1 joist', result: '21 Joists (2x8x16 ft)' },
        { step: '5. Ledger & Rim Joist', calculation: '20 ft ledger + 20 ft outer rim', result: '2 Boards (2x8x20 ft treated)' },
        { step: '6. Hidden Fastener Clips', calculation: '320 sq ft × 2.5 clips/sq ft', result: '800 Clips (9 Boxes of 90ct)' }
      ],
      finalAnswer: 'Purchase 48 composite deck boards (16ft), 21 framing joists (2x8x16ft), 2 ledger/rim boards (2x8x20ft), 21 joist hangers, and 9 boxes of hidden fastener clips.',
      proTip: 'Apply butyl joist tape to the top of all framing joists and ledger boards before installing deck boards to prevent water from rotting the top grain of joists.'
    },
    decisionSupport: {
      title: 'Deck Board & Joist Span Engineering Matrix',
      description: 'Maximum joist spans and required joist spacing.',
      headers: ['Decking Material', 'Board Thickness', 'Max Joist Spacing (Perpendicular)', 'Max Joist Spacing (Diagonal 45°)'],
      rows: [
        ['Standard Pressure Treated Pine', '5/4" × 6" (1" actual)', '16 inches On-Center', '12 inches On-Center'],
        ['Heavy Duty Wood (2×6)', '1-1/2" × 5-1/2"', '24 inches On-Center', '16 inches On-Center'],
        ['Composite / PVC Decking', '1" × 5-1/2" (Trex/TimberTech)', '16 inches (12" recommended)', '12 inches On-Center'],
        ['Commercial Composite', '1-1/4" × 5-1/2"', '24 inches On-Center', '16 inches On-Center']
      ],
      notes: ['Composite decking expands and contracts along its length; leave 1/8" to 3/16" end-to-end butt joint gaps.']
    },
    faqs: [
      {
        question: 'How do you calculate linear feet of decking?',
        answer: 'To find linear feet of 5.5" wide deck boards, multiply your total deck square footage by 2.2 (e.g., 300 sq ft × 2.2 = 660 linear feet of deck boards).'
      },
      {
        question: 'What joist spacing is required for composite decking?',
        answer: 'Most composite manufacturers (like Trex and TimberTech) allow 16" on-center for residential straight decking, but strongly recommend 12" on-center for a rock-solid, non-bouncy feel. 12" on-center is strictly mandatory if boards are laid diagonally at 45 degrees.'
      },
      {
        question: 'How many screws/fasteners do I need for a deck?',
        answer: 'Estimate 350 screws or hidden fastener clips for every 100 square feet of deck surface (approximately 2 fasteners per board at each joist intersection).'
      }
    ],
    relatedToolSlugs: ['fence-calculator', 'concrete-bags-calculator', 'concrete-slab-calculator'],
    status: 'live'
  }
];
