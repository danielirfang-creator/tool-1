import { ToolMeta } from './types';

export const drywallTools: ToolMeta[] = [
  {
    id: 'drywall-calculator',
    slug: 'drywall-calculator',
    name: 'Drywall Calculator',
    cluster: 'drywall-framing',
    clusterName: 'Drywall & Framing',
    clusterHref: '/calculators/drywall-framing',
    benefit: 'Calculate 4x8 and 4x12 drywall sheets, joint compound mud pails, tape rolls, and drywall screws.',
    metaTitle: 'Drywall Calculator - Sheets, Mud, Tape & Screws',
    metaDescription: 'Free contractor drywall calculator. Calculate 4x8 and 4x12 drywall sheet count, joint compound buckets, paper/mesh tape rolls, and screw pounds with waste factor.',
    keywords: ['drywall calculator', 'how many sheets of drywall do i need', 'drywall sheet calculator', 'sheetrock calculator', 'drywall mud calculator'],
    formula: 'Sheets (4x8) = Wall + Ceiling Area ÷ 32 sq ft × (1 + Waste%) | Mud = Area × 0.053 lbs | Screws = Sheets × 32',
    formulaDescription: 'Computes total room surface area (walls + ceiling), divides by sheet square footage (32 sq ft for 4x8, 48 sq ft for 4x12), and adds 10% cutting waste.',
    methodology: [
      'Measure perimeter and wall height to compute wall area',
      'Add ceiling area (Length × Width)',
      'Deduct standard door (21 sq ft) and window (15 sq ft) openings',
      'Divide by sheet area and add 10% cutting waste',
      'Compute joint compound pails (approx 1 bucket per 500 sq ft) and tape'
    ],
    limitations: ['Complex vaulted ceilings or arched walls may require up to 15-20% waste allowance.'],
    workedExample: {
      title: '12 ft × 15 ft Room with 8 ft Ceilings',
      scenario: 'Hanging drywall on 4 walls and ceiling with 2 doors and 2 windows using 4x8 standard 1/2" sheets.',
      inputs: [
        { label: 'Room Dimensions', value: '12 ft W × 15 ft L × 8 ft H' },
        { label: 'Openings', value: '2 Doors, 2 Windows' },
        { label: 'Sheet Size', value: '4 ft × 8 ft (32 sq ft)' }
      ],
      steps: [
        { step: '1. Gross Wall Area', calculation: '2 × (12 + 15) × 8', result: '432 sq ft' },
        { step: '2. Openings Deduction', calculation: '(2 × 21) + (2 × 15)', result: '-72 sq ft' },
        { step: '3. Ceiling Area', calculation: '12 × 15', result: '+180 sq ft' },
        { step: '4. Net Area + 10% Waste', calculation: '(360 + 180) × 1.10', result: '594 sq ft' },
        { step: '5. 4x8 Sheets', calculation: '594 ÷ 32 = 18.56 → ⌈19⌉', result: '19 Sheets (4x8)' },
        { step: '6. Joint Compound (Mud)', calculation: '594 sq ft ÷ 500 sq ft/pail', result: '2 Pails (4.5 gal / 50lb each)' },
        { step: '7. Drywall Tape & Screws', calculation: '19 sheets × 32 screws = 608 screws', result: '1 Roll Tape (250 ft) + 5 lb Screws' }
      ],
      finalAnswer: 'Purchase 19 sheets (4x8), 2 pails (4.5 gal) of all-purpose joint compound, 1 roll tape (250 ft), and a 5lb box of 1-1/4" coarse-thread drywall screws.',
      proTip: 'Hang drywall horizontally on walls across studs to create stronger seams and reduce visible joint lines at eye level.'
    },
    decisionSupport: {
      title: 'Drywall Thickness & Sheet Size Guide',
      description: 'Standard residential drywall application guidelines.',
      headers: ['Application', 'Recommended Thickness', 'Sheet Size', 'Max Stud Spacing'],
      rows: [
        ['Standard Interior Walls', '1/2 inch (12.7 mm)', '4x8 or 4x12', '16" or 24" On-Center'],
        ['Standard Ceilings (16" OC)', '1/2 inch (12.7 mm)', '4x8 or 4x12', '16" On-Center'],
        ['Ceilings (24" OC / Heavy Texture)', '5/8 inch (15.9 mm) or Sag-Resistant', '4x8 or 4x12', '24" On-Center'],
        ['Garage / Fire Separation Walls', '5/8 inch Type X (Fire Rated)', '4x8 or 4x12', '16" or 24" On-Center'],
        ['Bathrooms / Moisture Areas', '1/2 inch Greenboard / Mold-Resistant', '4x8', '16" On-Center'],
        ['Curved Walls / Archways', '1/4 inch (6.4 mm) Double Layered', '4x8', '12" or 16" On-Center']
      ],
      notes: ['Use 4x12 sheets for large open spaces to eliminate up to 25% of butt joint taping.']
    },
    faqs: [
      {
        question: 'How many sheets of drywall do I need for a 12x12 room?',
        answer: 'A standard 12x12 room with 8ft ceilings and ceiling drywall requires approximately 18 sheets of 4x8 drywall (or 12 sheets of 4x12 drywall), including 10% cutting waste.'
      },
      {
        question: 'How much joint compound (mud) is needed per sheet of drywall?',
        answer: 'You need approximately 0.053 gallons (or 2.5 lbs) of all-purpose joint compound per square foot, which equates to about 1 standard 4.5-gallon (50lb) bucket for every 10 to 12 sheets (4x8) of drywall across 3 taping coats.'
      },
      {
        question: 'What length drywall screws should I use for 1/2" drywall?',
        answer: 'For 1/2" drywall into standard wood studs, use 1-1/4" coarse-thread drywall screws spaced 12 inches apart on ceilings and 16 inches apart on walls.'
      }
    ],
    relatedToolSlugs: ['wall-stud-calculator', 'wall-paint-calculator', 'room-sqft-calculator'],
    status: 'live'
  },
  {
    id: 'wall-stud-calculator',
    slug: 'wall-stud-calculator',
    name: 'Wall Stud & Framing Calculator',
    cluster: 'drywall-framing',
    clusterName: 'Drywall & Framing',
    clusterHref: '/calculators/drywall-framing',
    benefit: 'Calculate 2x4 and 2x6 wall studs, top/bottom plates, corner studs, and headers for partition and load-bearing walls.',
    metaTitle: 'Wall Stud Calculator - 2x4 & 2x6 Framing',
    metaDescription: 'Free wall stud calculator. Calculate exact 2x4 and 2x6 framing studs, top plates, bottom sill plates, corner assemblies, and waste allowance for 16" and 24" OC framing.',
    keywords: ['wall stud calculator', 'how many studs do i need', '2x4 framing calculator', 'stud spacing calculator', 'framing calculator'],
    formula: 'Studs = (Wall Length ft ÷ (Spacing in ÷ 12)) + 1 + Extra (2 per corner, 2 per opening) × 1.10',
    formulaDescription: 'Divides wall length by on-center spacing (1.33 ft for 16" OC, 2.0 ft for 24" OC), adds start/end studs, 2 extra studs for each corner/intersection, and adds top/bottom plate linear footage.',
    methodology: [
      'Input total linear footage of walls to frame',
      'Select stud spacing (16" OC standard vs 24" OC advanced framing)',
      'Add top plate (double plate standard) and bottom plate lineal footage',
      'Add 2 additional studs per corner and 2 king/jack studs per door/window opening',
      'Include 10% allowance for warped, bowed, or culled studs'
    ],
    limitations: ['Engineered structural shear walls may require specific doubled hold-down post assemblies.'],
    workedExample: {
      title: '30 ft Basement Partition Wall with 1 Door',
      scenario: 'Framing a 30 ft long non-load-bearing partition wall with 1 interior doorway at 16" On-Center stud spacing.',
      inputs: [
        { label: 'Wall Length', value: '30 ft' },
        { label: 'Stud Spacing', value: '16" On-Center (1.33 ft)' },
        { label: 'Doors / Windows', value: '1 Door Opening' },
        { label: 'Corners', value: '2 Wall Corners' }
      ],
      steps: [
        { step: '1. Field Studs', calculation: '(30 ÷ 1.33) + 1 = 22.5 + 1', result: '24 Studs' },
        { step: '2. Corner & Opening Extras', calculation: '(2 corners × 2) + (1 door × 2 jack/king studs)', result: '6 Extra Studs' },
        { step: '3. Total Studs + 10% Waste', calculation: '(24 + 6) × 1.10 = 33 studs', result: '33 Studs (92-5/8" precut)' },
        { step: '4. Plates (Double Top + Bottom)', calculation: '30 ft × 3 plates = 90 linear ft ÷ 10 ft boards', result: '9 Plates (2x4x10 ft)' }
      ],
      finalAnswer: 'Purchase 33 precut 2x4 studs (92-5/8") and 9 pieces of 2x4x10 ft lumber for top and bottom plates.',
      proTip: 'Use a treated 2x4 (pressure treated) for the bottom sill plate if fastening directly to concrete basement floors to prevent moisture absorption.'
    },
    decisionSupport: {
      title: 'Framing Lumber Sizes & Spacing Standards',
      description: 'International Residential Code (IRC) wall framing guidelines.',
      headers: ['Wall Type', 'Stud Size', 'On-Center Spacing', 'Plate Configuration', 'Max Wall Height'],
      rows: [
        ['Interior Non-Bearing Partition', '2×4 (1.5"×3.5")', '16" or 24" OC', 'Single Top / Single Bottom', '14 ft'],
        ['Exterior Load-Bearing (1 Story)', '2×4 (1.5"×3.5")', '16" OC', 'Double Top / Single Bottom', '10 ft'],
        ['Exterior Load-Bearing (2 Stories)', '2×6 (1.5"×5.5")', '16" OC', 'Double Top / Single Bottom', '12 ft'],
        ['Plumbing Wet Wall (Pipes > 2")', '2×6 (1.5"×5.5")', '16" OC', 'Double Top / Single Bottom', '12 ft']
      ],
      notes: ['Precut studs are 92-5/8" for standard 8ft finished ceiling height, and 104-5/8" for 9ft ceilings.']
    },
    faqs: [
      {
        question: 'How do you calculate the number of studs in a wall?',
        answer: 'A reliable contractor rule of thumb for 16" on-center framing is: multiply wall length in feet by 0.75, add 1 for the end stud, add 4 for corners/doors, and multiply by 1.10 (1 stud per linear foot covers studs, plates, and waste).'
      },
      {
        question: 'What is the difference between 16" and 24" on-center stud spacing?',
        answer: '16" on-center is the standard for residential construction offering maximum structural strength and rigid drywall support. 24" on-center (advanced framing) reduces lumber consumption by up to 25% and improves thermal insulation performance.'
      }
    ],
    relatedToolSlugs: ['drywall-calculator', 'room-sqft-calculator', 'insulation-calculator'],
    status: 'live'
  }
];
