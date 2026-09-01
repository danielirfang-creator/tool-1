export interface GuideMeta {
  id: string;
  slug: string;
  title: string;
  cluster: 'flooring' | 'painting' | 'concrete-masonry' | 'garden' | 'rooms' | 'conversions';
  clusterName: string;
  clusterHref?: string;
  summary: string;
  readTime: string;
  publishedDate: string;
  keywords: string[];
  relatedToolSlug: string;
  keyTakeaways: string[];
  content: string[];
}

export const guidesRegistry: GuideMeta[] = [
  {
    id: 'flooring-waste-percentage-guide',
    slug: 'flooring-waste-percentage-guide',
    title: 'How Much Extra Flooring to Order: Waste Factors by Pattern',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'A complete contractor guide to calculating waste percentages for straight, diagonal, herringbone, and multi-room flooring jobs.',
    readTime: '6 min read',
    publishedDate: '2026-08-15',
    keywords: ['how much extra flooring to order', 'flooring waste percentage', 'herringbone waste factor'],
    relatedToolSlug: 'flooring-calculator',
    keyTakeaways: [
      'Standard rectangular rooms require 10% extra for straight-lay installations.',
      'Diagonal patterns require 15% extra due to 45-degree triangle perimeter cuts.',
      'Herringbone and chevron patterns demand a minimum of 18% to 20% waste buffer.',
      'Always store at least 1 unopened box in your home for future water or board damage repairs.'
    ],
    content: [
      'Ordering the correct square footage of flooring is the single most critical decision in any DIY renovation. Running short mid-installation frequently leads to dye-lot mismatches, shipping delays, or discontinued inventory.',
      'When calculating waste, start by assessing room geometry. Rectangular spaces with few doors generate minimal offcut scrap. Rooms with bump-out closets, alcoves, and radiators require extensive cutting around obstacles.',
      'Pattern physics also dictate waste. Straight plank installation allows cut end-pieces from one row to start the next row (provided the piece is at least 8 inches long). Herringbone patterns, however, require 45-degree angle miter cuts along every single perimeter wall, creating triangular offcuts that cannot be reused on opposite sides.'
    ]
  },
  {
    id: 'tile-trowel-size-thinset-guide',
    slug: 'tile-trowel-size-thinset-guide',
    title: 'Tile Trowel Size & Thinset Mortar Coverage Guide',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'How to select the right notch trowel size (1/4", 3/8", 1/2") and estimate 50lb bags of polymer-modified thinset mortar.',
    readTime: '7 min read',
    publishedDate: '2026-08-18',
    keywords: ['tile trowel size guide', 'thinset mortar coverage', 'what size trowel for 12x24 tile'],
    relatedToolSlug: 'tile-calculator',
    keyTakeaways: [
      'Use a 1/4" × 3/8" square-notch trowel for standard 12"×12" floor tiles (yields ~45 sq ft/50lb bag).',
      'Large format tiles (12"×24" and larger) require a 1/2" × 1/2" notch trowel plus directional back-buttering.',
      'Subway tiles (3"×6") on walls should be set with a 1/4" × 1/4" square-notch trowel.',
      'Always achieve at least 80% mortar coverage for dry floors and 95% for wet shower areas.'
    ],
    content: [
      'Thinset mortar is the structural glue that permanently bonds tile to subfloors. Selecting an incorrect trowel notch size leads to hollow tiles, cracked grout lines, and loose floor tiles under foot traffic.',
      'For large format tiles where any edge exceeds 15 inches, standard thinset can slump under the tile\'s weight. Use a medium-bed polymer-modified mortar and trowel ridges in straight, parallel lines rather than circular swirls to allow air channels to escape.'
    ]
  },
  {
    id: 'laminate-acclimation-expansion-gap-guide',
    slug: 'laminate-acclimation-expansion-gap-guide',
    title: 'Laminate Acclimation & Expansion Gap Best Practices',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'Why laminate flooring buckles without proper 48-hour acclimation and 3/8" perimeter expansion gaps.',
    readTime: '5 min read',
    publishedDate: '2026-08-20',
    keywords: ['laminate acclimation time', 'expansion gap for laminate flooring', 'how to prevent laminate buckling'],
    relatedToolSlug: 'laminate-calculator',
    keyTakeaways: [
      'Acclimate laminate boxes flat in the installation room for a minimum of 48 hours at 65°F-75°F.',
      'Leave a 3/8" to 1/2" expansion gap around all vertical walls, cabinets, and pipes.',
      'Never run continuous laminate over 30 linear feet without a doorway T-molding transition.',
      'Do not fasten baseboards into the flooring planks; nail directly into wall studs above the floor.'
    ],
    content: [
      'Laminate flooring is composed of high-density wood fibers that expand when atmospheric humidity rises and contract during dry winter heating cycles.',
      'A floating floor must be free to move as a unified blanket. Fastening heavy kitchen islands on top of floating laminate or pinching planks against door jambs causes explosive peaking and cracked tongue-and-groove joints.'
    ]
  },
  {
    id: 'paint-sheen-selection-guide',
    slug: 'paint-sheen-selection-guide',
    title: 'Paint Sheen Selection Guide: Flat vs Eggshell vs Satin vs Semi-Gloss',
    cluster: 'painting',
    clusterName: 'Painting',
    summary: 'How to pick the right interior paint sheen for bedrooms, bathrooms, ceilings, trim, and high-traffic hallways.',
    readTime: '6 min read',
    publishedDate: '2026-08-22',
    keywords: ['paint sheen guide', 'eggshell vs satin paint', 'best paint sheen for bathrooms'],
    relatedToolSlug: 'paint-calculator',
    keyTakeaways: [
      'Flat/Matte: Best for ceilings and low-traffic areas; hides drywall imperfections.',
      'Eggshell: The standard for living rooms and bedrooms; soft luster with moderate wipeability.',
      'Satin: Best for kitchens, bathrooms, and laundry rooms; resists moisture and scrubbing.',
      'Semi-Gloss: Required for baseboards, interior doors, window casings, and cabinets.'
    ],
    content: [
      'Choosing the right paint sheen is just as important as picking the color. Higher gloss levels contain more resin, making them harder and more washable, but they reflect light and accentuate drywall lumps and patch lines.',
      'In moisture-prone rooms like master bathrooms, use satin or specialized mold-resistant bath enamels to prevent steam penetration into the drywall core.'
    ]
  },
  {
    id: 'concrete-curing-compressive-strength-guide',
    slug: 'concrete-curing-compressive-strength-guide',
    title: 'How to Cure Concrete for Maximum 4,000+ PSI Compressive Strength',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    summary: 'The science of concrete hydration, curing blankets, chemical sealers, and avoiding surface spalling.',
    readTime: '8 min read',
    publishedDate: '2026-08-25',
    keywords: ['how to cure concrete', 'concrete compressive strength', 'prevent concrete cracking'],
    relatedToolSlug: 'concrete-calculator',
    keyTakeaways: [
      'Concrete does not dry by evaporation; it hardens via a chemical hydration reaction with water.',
      'Keeping concrete continuously moist for the first 7 days achieves approximately 70% of its 28-day design strength.',
      'Never pour concrete when temperatures are forecast to drop below 35°F within 48 hours.',
      'Cut control joints at a depth equal to 1/4 of the slab thickness within 12 to 24 hours of pouring.'
    ],
    content: [
      'Premature drying is the number one cause of dusty, weak, and cracked concrete slabs. When water evaporates too rapidly from the surface, the cement particles cannot fully hydrate, resulting in severe surface scaling.',
      'Apply a curing compound or cover freshly finished slabs with wet burlap and poly sheeting for at least 5 to 7 days to reach full structural integrity.'
    ]
  },
  {
    id: 'paver-patio-subbase-compaction-guide',
    slug: 'paver-patio-subbase-compaction-guide',
    title: 'Paver Patio Subbase & Compaction: The Step-by-Step Foundation',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    summary: 'Why patios sink and how to install a 4"-6" crushed stone base with ASTM C33 sand and polymeric joints.',
    readTime: '9 min read',
    publishedDate: '2026-08-28',
    keywords: ['how to build a paver patio base', 'paver patio depth', 'polymeric sand installation'],
    relatedToolSlug: 'patio-calculator',
    keyTakeaways: [
      'Excavate 7 to 8 inches deep to allow for 4" gravel base, 1" bedding sand, and paver thickness.',
      'Compact gravel in 2-inch lifts with a vibratory plate compactor.',
      'Screed 1 inch of uncompacted coarse concrete sand using 1-inch conduit pipes.',
      'Pitch the patio surface at 1/4" drop per linear foot away from home foundation walls.'
    ],
    content: [
      'Ninety percent of paver patio failures are caused by improper base excavation and soil compaction rather than the pavers themselves.',
      'Always line the native subgrade with a woven geotextile fabric to keep the crushed stone base from sinking into wet subsoils over seasonal freeze-thaw cycles.'
    ]
  },
  {
    id: 'how-to-calculate-room-square-footage-odd-shapes',
    slug: 'how-to-calculate-room-square-footage-odd-shapes',
    title: 'Calculating Room Square Footage for Odd Shapes, Closets & Alcoves',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    summary: 'How to calculate square footage for L-shaped rooms, bay windows, circular spaces, and stairways.',
    readTime: '5 min read',
    publishedDate: '2026-08-29',
    keywords: ['how to calculate square footage of l shaped room', 'room square footage odd shapes'],
    relatedToolSlug: 'room-area-calculator',
    keyTakeaways: [
      'Subdivide complex room floor plans into simple geometric rectangles (A, B, C).',
      'Calculate each rectangle\'s area individually (Length × Width) and sum them together.',
      'For triangular bay windows, use Area = 1/2 × Base × Height.',
      'Measure stairways as (Step Tread Depth + Step Riser Height) × Step Width × Number of Steps.'
    ],
    content: [
      'Few real-world residential rooms are perfect squares. Learning how to subdivide floor plans into geometric blocks prevents severe material shortages during renovation projects.'
    ]
  },
  {
    id: 'imperial-vs-metric-construction-conversions',
    slug: 'imperial-vs-metric-construction-conversions',
    title: 'Imperial vs Metric Construction Conversions: Trade Tolerances',
    cluster: 'conversions',
    clusterName: 'Conversions',
    summary: 'Fast mental math rules and exact conversion tolerances for international building plans.',
    readTime: '4 min read',
    publishedDate: '2026-08-30',
    keywords: ['feet to meters construction conversion', 'inches to mm carpentry cheat sheet'],
    relatedToolSlug: 'feet-to-metres',
    keyTakeaways: [
      '1 foot = 0.3048 m | 1 meter = 3.28084 ft.',
      '1 inch = 25.4 mm | 1 mm = 0.03937 in.',
      '1 square foot = 0.0929 sq meters | 1 sq meter = 10.764 sq ft.',
      'Standard 2x4 lumber actually measures 1.5" × 3.5" (38mm × 89mm).'
    ],
    content: [
      'Working across international architectural drawings requires understanding nominal versus actual dimensions. This guide details practical trade tolerances for framing, tiling, and cabinetry.'
    ]
  }
];

export function getGuideBySlug(slug: string): GuideMeta | undefined {
  return guidesRegistry.find((g) => g.slug === slug);
}

export function getGuidesByCluster(cluster: string): GuideMeta[] {
  return guidesRegistry.filter((g) => g.cluster === cluster);
}
