import { ToolMeta } from './types';

export const conversionTools: ToolMeta[] = [
  {
    id: 'feet-to-metres',
    slug: 'feet-to-metres',
    name: 'Feet to Metres Converter',
    cluster: 'conversions',
    clusterName: 'Conversions',
    clusterHref: '/calculators/conversions',
    benefit: 'Convert feet and inches to decimal metres and centimetres with precision building tolerances.',
    metaTitle: 'Feet to Metres Converter - ft to m Building Calculator',
    metaDescription: 'Convert feet (ft) and inches (in) to metres (m) and centimetres (cm) instantly with precision trade decimals.',
    keywords: ['feet to metres', 'ft to m', 'convert feet to meters', 'feet to cm calculator'],
    formula: 'Metres = Feet × 0.3048 | Feet = Metres ÷ 0.3048',
    formulaDescription: 'Exact international standard conversion: 1 foot = exactly 0.3048 metres (or 30.48 centimetres).',
    methodology: ['Input feet', 'Multiply by 0.3048'],
    limitations: ['Exact definition since 1959 international yard and pound agreement.'],
    workedExample: {
      title: '25 Feet to Metres',
      scenario: 'Converting building lot setback distance.',
      inputs: [{ label: 'Feet', value: '25 ft' }],
      steps: [{ step: '1. Multiply by 0.3048', calculation: '25 × 0.3048', result: '7.62 Metres' }],
      finalAnswer: '25 feet = 7.62 metres (762 cm).',
      proTip: 'A quick mental approximation: divide feet by 3 to get rough meters (25 ÷ 3 ≈ 8.3m, actual 7.62m).'
    },
    decisionSupport: {
      title: 'Feet to Metres Quick Reference',
      description: 'Common construction conversions.',
      headers: ['Feet (ft)', 'Inches (in)', 'Metres (m)', 'Centimetres (cm)'],
      rows: [
        ['1 ft', '12 in', '0.3048 m', '30.48 cm'],
        ['8 ft', '96 in', '2.4384 m', '243.84 cm'],
        ['10 ft', '120 in', '3.0480 m', '304.80 cm'],
        ['20 ft', '240 in', '6.0960 m', '609.60 cm'],
        ['50 ft', '600 in', '15.2400 m', '1,524.00 cm']
      ],
      notes: ['Standard 8ft ceiling height equals 2.44 metres.']
    },
    faqs: [
      {
        question: 'How do I convert feet to metres?',
        answer: 'Multiply the length in feet by 0.3048. For example, 10 ft × 0.3048 = 3.048 m.'
      }
    ],
    relatedToolSlugs: ['inches-to-mm', 'square-feet-to-m2', 'room-area-calculator'],
    status: 'live'
  },
  {
    id: 'inches-to-mm',
    slug: 'inches-to-mm',
    name: 'Inches to Millimetres Converter',
    cluster: 'conversions',
    clusterName: 'Conversions',
    clusterHref: '/calculators/conversions',
    benefit: 'Convert fractional and decimal inches to millimetres and centimetres for woodworking and tile cuts.',
    metaTitle: 'Inches to MM Converter - Fractional Inches to Millimetres',
    metaDescription: 'Convert decimal and fractional inches (1/16, 1/8, 1/4, 1/2) to millimetres (mm) and centimetres (cm).',
    keywords: ['inches to mm', 'in to mm converter', 'fractional inches to mm', 'convert inches to millimeters'],
    formula: 'Millimetres = Inches × 25.4 | Inches = MM ÷ 25.4',
    formulaDescription: 'Exact international conversion: 1 inch = exactly 25.4 millimetres (or 2.54 centimetres).',
    methodology: ['Input inches', 'Multiply by 25.4'],
    limitations: ['Exact engineering standard.'],
    workedExample: {
      title: '3-1/4 Inches to MM',
      scenario: 'Converting 3.25 inches to millimetres for cabinetry.',
      inputs: [{ label: 'Inches', value: '3.25 in' }],
      steps: [{ step: '1. Multiply by 25.4', calculation: '3.25 × 25.4', result: '82.55 mm' }],
      finalAnswer: '3.25 inches = 82.55 mm (8.255 cm).',
      proTip: 'In woodworking, 1/16 inch equals approximately 1.5875 mm; 1/8 inch equals 3.175 mm.'
    },
    decisionSupport: {
      title: 'Fractional Inches to MM Chart',
      description: 'Fractional equivalents.',
      headers: ['Fraction (Inches)', 'Decimal (Inches)', 'Millimetres (mm)'],
      rows: [
        ['1/16 in', '0.0625 in', '1.588 mm'],
        ['1/8 in', '0.1250 in', '3.175 mm'],
        ['1/4 in', '0.2500 in', '6.350 mm'],
        ['1/2 in', '0.5000 in', '12.700 mm'],
        ['3/4 in', '0.7500 in', '19.050 mm'],
        ['1 in', '1.0000 in', '25.400 mm']
      ],
      notes: ['A standard 2x4 actually measures 1.5" × 3.5" which equals 38mm × 89mm.']
    },
    faqs: [
      {
        question: 'How many mm is 1 inch?',
        answer: 'One inch is exactly 25.4 millimetres.'
      }
    ],
    relatedToolSlugs: ['feet-to-metres', 'square-feet-to-m2', 'tile-calculator'],
    status: 'live'
  },
  {
    id: 'square-feet-to-m2',
    slug: 'square-feet-to-m2',
    name: 'Square Feet to Square Metres Converter',
    cluster: 'conversions',
    clusterName: 'Conversions',
    clusterHref: '/calculators/conversions',
    benefit: 'Convert floor and property square footage to square metres and hectares with live cost per unit rate.',
    metaTitle: 'Square Feet to Square Metres Converter (sq ft to m²)',
    metaDescription: 'Convert square feet (sq ft) to square metres (m²) with reverse conversion and price per square unit calculator.',
    keywords: ['square feet to square metres', 'sq ft to m2', 'convert sq ft to sqm', 'square feet to m2 calculator'],
    formula: 'm² = Sq Ft × 0.092903 | Sq Ft = m² ÷ 0.092903',
    formulaDescription: 'One square foot = 0.09290304 square metres (or 1 m² = 10.76391 sq ft).',
    methodology: ['Input square feet', 'Multiply by 0.092903 to get square meters'],
    limitations: ['Area measurements square the linear factor (0.3048² = 0.092903).'],
    workedExample: {
      title: '1,500 Sq Ft House to Square Metres',
      scenario: 'Converting home floor plan area for international architectural plans.',
      inputs: [{ label: 'Area', value: '1,500 sq ft' }],
      steps: [{ step: '1. Multiply by 0.092903', calculation: '1,500 × 0.092903', result: '139.35 m²' }],
      finalAnswer: '1,500 sq ft = 139.35 m².',
      proTip: 'To convert price per sq ft to price per m², multiply the sq ft price by 10.764 ($5/sq ft = $53.82/m²).'
    },
    decisionSupport: {
      title: 'Area Conversion Reference Table',
      description: 'Sq Ft to Sq Metres quick lookup.',
      headers: ['Square Feet (sq ft)', 'Square Metres (m²)', 'Square Yards (sq yd)'],
      rows: [
        ['100 sq ft', '9.29 m²', '11.11 sq yd'],
        ['250 sq ft', '23.23 m²', '27.78 sq yd'],
        ['500 sq ft', '46.45 m²', '55.56 sq yd'],
        ['1,000 sq ft', '92.90 m²', '111.11 sq yd'],
        ['2,000 sq ft', '185.81 m²', '222.22 sq yd']
      ],
      notes: ['1 acre = 43,560 sq ft = 4,046.86 m² = 0.4047 hectares.']
    },
    faqs: [
      {
        question: 'How do you convert sq ft to m²?',
        answer: 'Multiply square feet by 0.092903 (or divide by 10.764).'
      }
    ],
    relatedToolSlugs: ['feet-to-metres', 'square-metres-calculator', 'flooring-calculator'],
    status: 'live'
  },
  {
    id: 'litres-to-gallons',
    slug: 'litres-to-gallons',
    name: 'Litres to Gallons Converter',
    cluster: 'conversions',
    clusterName: 'Conversions',
    clusterHref: '/calculators/conversions',
    benefit: 'Convert litres to US liquid gallons and UK imperial gallons for paint, sealers, and pool chemicals.',
    metaTitle: 'Litres to Gallons Converter (US & UK Imperial Gallons)',
    metaDescription: 'Convert litres (L) to US liquid gallons and UK imperial gallons for liquid coatings, paint, and chemicals.',
    keywords: ['litres to gallons', 'l to gal', 'convert litres to gallons', 'us gallons to litres'],
    formula: 'US Gallons = Litres ÷ 3.78541 | UK Gallons = Litres ÷ 4.54609',
    formulaDescription: '1 US liquid gallon = 3.785411784 litres; 1 UK imperial gallon = 4.54609 litres.',
    methodology: ['Input volume in litres', 'Choose US or UK gallon', 'Divide by conversion factor'],
    limitations: ['Always distinguish between US Gallon (3.785L) and UK Imperial Gallon (4.546L).'],
    workedExample: {
      title: '20 Litres of Floor Sealer to US Gallons',
      scenario: 'Converting imported epoxy floor coating volume.',
      inputs: [{ label: 'Litres', value: '20 Litres' }],
      steps: [{ step: '1. Divide by 3.7854', calculation: '20 ÷ 3.78541', result: '5.28 US Gallons' }],
      finalAnswer: '20 Litres = 5.28 US Gallons (4.40 UK Gallons).',
      proTip: 'A standard 5 US gallon paint bucket contains 18.92 litres.'
    },
    decisionSupport: {
      title: 'Liquid Volume Conversion Table',
      description: 'Litres, US Gallons, UK Gallons.',
      headers: ['Litres (L)', 'US Liquid Gallons', 'UK Imperial Gallons', 'US Quarts'],
      rows: [
        ['1 L', '0.264 gal', '0.220 gal', '1.057 qt'],
        ['5 L', '1.321 gal', '1.100 gal', '5.283 qt'],
        ['10 L', '2.642 gal', '2.200 gal', '10.567 qt'],
        ['20 L', '5.283 gal', '4.400 gal', '21.134 qt']
      ],
      notes: ['US liquid gallon is used in USA and Latin America; UK gallon is used in UK, Canada, and Australia.']
    },
    faqs: [
      {
        question: 'How many litres are in 1 US gallon?',
        answer: 'There are approximately 3.785 litres in one US liquid gallon.'
      }
    ],
    relatedToolSlugs: ['paint-calculator', 'paint-coverage-calculator', 'kg-to-pounds'],
    status: 'live'
  },
  {
    id: 'kg-to-pounds',
    slug: 'kg-to-pounds',
    name: 'Kilograms to Pounds Converter (kg to lbs)',
    cluster: 'conversions',
    clusterName: 'Conversions',
    clusterHref: '/calculators/conversions',
    benefit: 'Convert kilograms to pounds and ounces for concrete bags, mortar sand, structural load ratings, and shipping.',
    metaTitle: 'Kilograms to Pounds Converter (kg to lbs & oz)',
    metaDescription: 'Convert kilograms (kg) to pounds (lbs) and ounces (oz) with reverse conversion for construction material weights.',
    keywords: ['kg to pounds', 'kg to lbs', 'convert kg to lbs', 'kilograms to pounds calculator'],
    formula: 'Pounds (lbs) = Kilograms × 2.20462 | Kilograms = Pounds ÷ 2.20462',
    formulaDescription: 'Exact standard conversion: 1 kilogram = 2.20462262185 pounds (or 1 pound = 0.45359237 kg).',
    methodology: ['Input weight in kg', 'Multiply by 2.20462'],
    limitations: ['Standard avoirdupois mass measurement.'],
    workedExample: {
      title: '25 kg Bag of Tile Adhesive to Pounds',
      scenario: 'Converting European tile adhesive bag weight.',
      inputs: [{ label: 'Kilograms', value: '25 kg' }],
      steps: [{ step: '1. Multiply by 2.20462', calculation: '25 × 2.20462', result: '55.12 lbs' }],
      finalAnswer: '25 kg = 55.12 lbs (approx 55 lbs 2 oz).',
      proTip: 'A 50lb US bag of thinset or concrete is equal to 22.68 kg; an 80lb bag is 36.29 kg.'
    },
    decisionSupport: {
      title: 'Common Building Material Bag Weights',
      description: 'Kg to Lbs equivalents for building supplies.',
      headers: ['Material Package', 'Metric Weight (kg)', 'Imperial Weight (lbs)'],
      rows: [
        ['Small Grout Bag', '4.54 kg', '10.0 lbs'],
        ['Standard Thinset Mortar', '22.68 kg', '50.0 lbs'],
        ['European Tile Adhesive', '25.00 kg', '55.1 lbs'],
        ['Standard Concrete Bag', '27.22 kg', '60.0 lbs'],
        ['Heavy Concrete Bag', '36.29 kg', '80.0 lbs']
      ],
      notes: ['1 metric ton (tonne) = 1,000 kg = 2,204.6 lbs; 1 US short ton = 2,000 lbs = 907.18 kg.']
    },
    faqs: [
      {
        question: 'How do I convert kg to lbs quickly in my head?',
        answer: 'Double the kilogram number and add 10%. For example: 20 kg × 2 = 40; 40 + 4 = 44 lbs (exact is 44.09 lbs).'
      }
    ],
    relatedToolSlugs: ['concrete-bags-calculator', 'gravel-calculator', 'litres-to-gallons'],
    status: 'live'
  }
];
