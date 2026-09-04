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
    title: 'Flooring Waste Percentage Guide',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'A complete contractor guide to calculating waste percentages for straight, diagonal, herringbone, and multi-room flooring jobs.',
    readTime: '6 min read',
    publishedDate: '2026-08-15',
    keywords: ['how much extra flooring to order', 'flooring waste percentage', 'herringbone waste factor', 'tile waste calculation'],
    relatedToolSlug: 'flooring-calculator',
    keyTakeaways: [
      'Standard rectangular rooms require 10% extra for straight-lay installations.',
      'Diagonal patterns require 15% extra due to 45-degree triangle perimeter cuts.',
      'Herringbone and chevron patterns demand a minimum of 18% to 20% waste buffer.',
      'Rooms with multiple doorways, radiators, or fireplaces need an extra 2% to 3% buffer.',
      'Retailers sell flooring exclusively in full cartons; always round up after applying waste.',
      'Keep at least 1 unopened carton stored flat for future plumbing or board damage repairs.'
    ],
    content: [
      'Ordering the correct square footage of flooring is the single most critical financial and operational decision in any residential renovation project. Running short mid-installation frequently leads to severe project delays, dye-lot mismatches between production runs, and unexpected freight shipping fees. Conversely, over-ordering excessive quantities ties up renovation capital unnecessarily in unreturnable materials.',
      'When calculating waste factors, first evaluate room geometry and layout complexity. A simple open rectangular bedroom with a single closet generates minimal scrap cuts because offcut planks from one wall can often start the opposite row. In contrast, complex hallways, open floor plans with angled stairwells, bay window alcoves, and kitchen island perimeters generate extensive scrap pieces that cannot be repurposed elsewhere in the home.',
      'Installation patterns significantly alter cutting geometry. Straight plank installation produces offcuts that can be utilized as starter boards for subsequent rows, provided each piece meets the minimum 8-inch length requirement mandated by flooring manufacturers. Diagonal patterns rotate the installation by 45 degrees, creating triangular end cuts along every single perimeter wall that cannot be reused on opposite sides, increasing waste to at least 15%.',
      'Herringbone and chevron parquet installations present the highest waste requirements in modern remodeling. Because every single plank terminates in a precise 45-degree or 90-degree miter cut, end pieces cannot be flipped or repositioned. Experienced trade contractors consistently order an 18% to 20% waste allowance to account for pattern alignment adjustments, perimeter framing borders, and precision squaring during layout setup.',
      'Finally, always factor in commercial carton packaging rules. Even if your net calculation with waste equals 342 square feet, packaging sizes (such as 23.8 sq ft per carton) dictate that you must purchase 15 whole cartons (357 sq ft). Never round down to whole cartons, as material shortfalls under 10 square feet are among the most expensive mistakes in interior carpentry.',
      'Preserve spare planks after project completion. Subfloor settling, appliance water leaks, and heavy furniture impact can cause isolated board damage years down the road. Storing one to two sealed cartons in a climate-controlled closet ensures you will have exact color-matched replacement planks ready without needing a full floor replacement.'
    ]
  },
  {
    id: 'tile-trowel-size-thinset-guide',
    slug: 'tile-trowel-size-thinset-guide',
    title: 'Tile Trowel Size & Thinset Guide',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'How to select the right notch trowel size (1/4", 3/8", 1/2") and estimate 50lb bags of polymer-modified thinset mortar.',
    readTime: '7 min read',
    publishedDate: '2026-08-18',
    keywords: ['tile trowel size guide', 'thinset mortar coverage', 'what size trowel for 12x24 tile', 'polymer modified thinset'],
    relatedToolSlug: 'tile-calculator',
    keyTakeaways: [
      'Use a 1/4" × 3/8" square-notch trowel for standard 12"×12" floor tiles (yields ~45 sq ft/50lb bag).',
      'Large format tiles (12"×24" and larger) require a 1/2" × 1/2" notch trowel plus directional back-buttering.',
      'Subway tiles (3"×6") on walls should be set with a 1/4" × 1/4" square-notch trowel.',
      'Trowel thinset in straight, parallel ridges perpendicular to the long edge of the tile.',
      'Always achieve at least 80% mortar coverage for dry floors and 95% for wet shower areas.',
      'Use polymer-modified ANSI A118.4 or ANSI A118.15 mortar for porcelain and dense stone tiles.'
    ],
    content: [
      'Thinset mortar is the primary structural bonding agent that permanently adheres ceramic, porcelain, and natural stone tiles to concrete slabs or cementitious backer boards. Selecting the incorrect trowel notch depth or tooth geometry is the leading cause of hollow-sounding tiles, cracked grout lines, and complete debonding under everyday foot traffic and temperature cycles.',
      'The physical dimensions and flatness of your tile directly determine the required trowel notch dimension. Smaller wall tiles such as 3x6 inch subway tiles require a 1/4" × 1/4" square notch trowel, which provides approximately 85 to 95 square feet of coverage per 50-pound bag. Medium floor tiles (8x8 up to 12x12 inches) require a 1/4" × 3/8" square notch, yielding between 45 and 55 square feet per bag.',
      'Large format tiles (defined by ANSI standards as any tile with at least one edge exceeding 15 inches, such as 12x24 or 24x48 porcelain planks) require heavy-bed medium mortars and a 1/2" × 1/2" square or U-notch trowel. These large tiles necessitate a thicker mortar bed to compensate for slight manufacturing warpage (crowns or dips) across the length of each rectified tile.',
      'Directional troweling technique is essential for achieving proper mortar collapse and full surface coverage. Always comb thinset ridges in one straight, parallel direction rather than swirling or sweeping in arcs. When the tile is pressed into place and shifted back and forth across the ridges, straight air channels allow trapped air to escape freely, preventing voids that compromise structural strength.',
      'Contractors must also practice flat back-buttering on all large format and exterior installations. Applying a thin, continuous skim coat of mortar to the backside of each tile immediately prior to setting ensures 100% mechanical contact and eliminates dry pockets that lead to impact cracking when heavy furniture or appliances are placed on the finished floor.',
      'Always observe ambient temperature and open-time limitations on the mortar bag. Applying thinset in high-heat or drafty rooms can cause the mortar surface to "skin over" within minutes. Periodically pull up a newly placed tile during installation to visually confirm that mortar covers at least 85% of the back surface in living areas and 95% in wet bathroom showers.'
    ]
  },
  {
    id: 'laminate-acclimation-expansion-gap-guide',
    slug: 'laminate-acclimation-expansion-gap-guide',
    title: 'Laminate Acclimation & Gap Guide',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'Why laminate flooring buckles without proper 48-hour acclimation and 3/8" perimeter expansion gaps.',
    readTime: '5 min read',
    publishedDate: '2026-08-20',
    keywords: ['laminate acclimation time', 'expansion gap for laminate flooring', 'how to prevent laminate buckling', 'floating floor installation'],
    relatedToolSlug: 'laminate-calculator',
    keyTakeaways: [
      'Acclimate laminate boxes flat in the installation room for a minimum of 48 hours at 65°F-75°F.',
      'Leave a 3/8" to 1/2" expansion gap around all vertical walls, cabinets, posts, and pipes.',
      'Never run continuous laminate over 30 linear feet without a doorway T-molding transition.',
      'Do not fasten baseboards into the flooring planks; nail directly into wall studs above the floor.',
      'Verify concrete subfloor moisture with a calcium chloride or relative humidity probe before laying underlayment.',
      'Use 6-mil polyethylene vapor barriers over all concrete subfloors to prevent bottom-up moisture absorption.'
    ],
    content: [
      'Laminate flooring consists of high-density fiberboard (HDF) cores made from compressed natural wood fibers bonded with synthetic resins. Because natural wood fibers are hygroscopic, they continuously absorb and release ambient moisture in response to seasonal indoor humidity and temperature shifts. Failing to prepare for this natural thermal expansion is the number one cause of peaked joints and floor buckling.',
      'The acclimation process allows laminate planks to reach thermal and moisture equilibrium with your home’s living environment. Unopened cartons should be stacked flat in the center of the installation room for at least 48 to 72 hours with the home heating/air conditioning system running between 65°F and 75°F (18°C–24°C) and relative humidity maintained between 35% and 55%. Never store boxes vertically or in unheated garages or porches.',
      'A floating floor functions as an unattached, monolithic sheet that must freely expand and contract across its entire surface area. Installers must maintain a consistent 3/8-inch to 1/2-inch perimeter expansion gap along every vertical obstruction, including drywall partitions, door casings, radiator pipes, plumbing supply lines, and structural support posts.',
      'Common DIY fastening errors can inadvertently anchor a floating floor and cause immediate buckling. Heavy permanent installations, such as kitchen center islands, built-in library cabinetry, or heavy floor-mounted safes, should never be installed on top of floating laminate. Install cabinetry first and run the floating floor up to the cabinet toe kicks with appropriate expansion spacing.',
      'When installing across large open layouts, obey the 30-foot continuous run threshold. Floors extending beyond 30 linear feet in length or width must be divided with expansion transition T-moldings at doorways or room thresholds. Conceal perimeter gaps with standard baseboards and matching shoe moldings nailed strictly into the vertical wall studs, never into the horizontal floor planks.',
      'Perform subfloor flatness testing before laying underlayment. Subfloors must be flat within 3/16 inch over a 10-foot radius. High spots should be sanded or ground down, and low spots filled with self-leveling underlayment compound. A rigid subfloor prevents vertical plank deflection that breaks delicate click-lock tongue-and-groove joints.'
    ]
  },
  {
    id: 'paint-sheen-selection-guide',
    slug: 'paint-sheen-selection-guide',
    title: 'Paint Sheen Selection Guide',
    cluster: 'painting',
    clusterName: 'Painting',
    summary: 'How to pick the right interior paint sheen for bedrooms, bathrooms, ceilings, trim, and high-traffic hallways.',
    readTime: '6 min read',
    publishedDate: '2026-08-22',
    keywords: ['paint sheen guide', 'eggshell vs satin paint', 'best paint sheen for bathrooms', 'interior paint finishes'],
    relatedToolSlug: 'paint-calculator',
    keyTakeaways: [
      'Flat/Matte (0-5% gloss): Best for ceilings and low-traffic areas; hides drywall imperfections completely.',
      'Eggshell (10-25% gloss): The standard for living rooms and bedrooms; soft luster with moderate wipeability.',
      'Satin (25-35% gloss): Best for kitchens, bathrooms, and laundry rooms; resists moisture, grease, and scrubbing.',
      'Semi-Gloss (35-70% gloss): Required for baseboards, interior doors, window casings, and bathroom vanities.',
      'High-Gloss (70-90% gloss): Maximum durability for architectural millwork and cabinetry; requires pristine surface prep.',
      'Higher sheen levels reflect more light, amplifying underlying drywall bumps, drywall tape seams, and patches.'
    ],
    content: [
      'Selecting the appropriate paint sheen is just as critical to a room’s final appearance and durability as choosing the pigment color. Paint sheen refers to the percentage of light reflectivity produced by the cured acrylic or latex resin once the water evaporates from the paint film. Higher sheen levels contain greater resin concentration, yielding harder, more washable, and stain-resistant surfaces.',
      'Flat and matte finishes reflect virtually no light (0% to 5% gloss), making them the superior choice for ceiling applications, master bedrooms, and formal dining rooms. Their non-reflective nature visually conceals minor drywall imperfections, joist sagging, and seam flashing. However, flat paints are porous and prone to burnishing (developing shiny friction spots) when wiped with wet sponges, making them unsuitable for active households with children or pets.',
      'Eggshell finish represents the balanced industry standard for general living areas, hallways, and guest bedrooms. It provides a soft, warm velvet luster with improved stain resistance compared to flat paints. Everyday scuffs, fingerprints, and dust can be gently wiped with damp microfiber cloths without damaging the sheen consistency or causing pigment discoloration.',
      'Satin and semi-gloss sheens deliver maximum moisture protection and scrub resistance for humid or high-contact zones. Kitchens, master bathrooms, powder rooms, and children’s playrooms require satin finishes to prevent cooking oils and shower condensation from penetrating the porous gypsum drywall core and generating mold growth behind paint layers.',
      'For architectural wood trim, baseboards, crown molding, interior doors, and custom wainscoting, semi-gloss and high-gloss enamels provide the necessary impact resistance against vacuum cleaner bumps, shoes, and hand oils. Because high sheens spotlight every surface imperfection, sand trim thoroughly and apply a high-build bonding primer before applying your finish coats.',
      'Calculate spread rates realistically when planning coat counts. While quality paints boast coverage of up to 400 square feet per gallon on pre-primed drywall, textured or porous raw surfaces consume significantly more paint (averaging 250 to 300 sq ft per gallon). Always budget for two full finish coats plus appropriate primer for optimal color depth and longevity.'
    ]
  },
  {
    id: 'concrete-curing-compressive-strength-guide',
    slug: 'concrete-curing-compressive-strength-guide',
    title: 'Concrete Curing Strength Guide',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    clusterHref: '/calculators/concrete-masonry',
    summary: 'The science of concrete hydration, curing blankets, chemical sealers, and avoiding surface spalling.',
    readTime: '8 min read',
    publishedDate: '2026-08-25',
    keywords: ['how to cure concrete', 'concrete compressive strength', 'prevent concrete cracking', 'curing blankets hydration'],
    relatedToolSlug: 'concrete-calculator',
    keyTakeaways: [
      'Concrete does not dry by evaporation; it hardens via an exothermic chemical hydration reaction with water.',
      'Keeping concrete continuously moist for the first 7 days achieves approximately 70% of its 28-day design strength.',
      'Never pour concrete when ambient temperatures are forecast to drop below 35°F within 48 hours.',
      'Cut control joints at a depth equal to 1/4 of the slab thickness within 12 to 24 hours of pouring.',
      'Premature water evaporation causes rapid shrinkage and unsightly surface map cracking (crazing).',
      'Apply an ASTM C309 curing compound immediately after surface finishing to lock in internal mixing moisture.'
    ],
    content: [
      'Concrete curing is the deliberate maintenance of satisfactory moisture content and temperature in freshly placed concrete for a defined duration after placement. Contrary to widespread homeowner misconception, concrete does not harden by drying out; rather, it solidifies through hydration—a complex chemical reaction between Portland cement crystals and water molecules.',
      'The speed and quality of the hydration process dictate the slab’s ultimate compressive strength, abrasion resistance, and freeze-thaw durability. When exposed to hot sun, low humidity, or high winds, mixing water evaporates rapidly from the surface before the cement matrix can crystallize, resulting in dusty, crumbly surface layers known as spalling and scaling.',
      'The critical curing window occurs within the first 7 days after placement. Under standard conditions (70°F/21°C), concrete achieves approximately 45% of its compressive rating at 3 days, 70% at 7 days, and reaches its full rated design strength (such as 3,000 to 4,500 PSI) at 28 days. Interrupting the moist curing cycle permanently halts strength development and leaves the slab permanently weakened.',
      'Contractors employ several proven moisture retention methods. Water curing (via continuous sprinkler soaking or saturated burlap coverings) is the gold standard for high-strength driveway slabs. Alternatively, membrane curing utilizing spray-applied chemical curing sealers (ASTM C309 compliant) creates an impermeable moisture barrier across the surface, trapping internal water without requiring constant misting.',
      'Proper control joint placement is equally vital for structural slab integrity. Because all concrete contracts as it cures, tensile stress naturally builds up within the slab. Saw-cut or hand-tooled control joints spaced at intervals equal to 2 to 3 times the slab thickness in feet (for example, 8 to 10 feet apart for a 4-inch slab) ensure that inevitable shrinkage cracks occur cleanly along planned grooves rather than across visible surface faces.',
      'Protect fresh pours against thermal shock and sub-freezing conditions. If concrete freezes while it still contains uncombined free water (within the first 24 to 48 hours), expanding ice crystals destroy the forming crystalline structure, reducing overall compressive strength by more than 50%. Insulated curing blankets and heated enclosures are essential whenever pouring below 40°F (4°C).'
    ]
  },
  {
    id: 'paver-patio-subbase-compaction-guide',
    slug: 'paver-patio-subbase-compaction-guide',
    title: 'Paver Patio Subbase Guide',
    cluster: 'garden',
    clusterName: 'Garden & Outdoors',
    summary: 'Why patios sink and how to install a 4"-6" crushed stone base with ASTM C33 sand and polymeric joints.',
    readTime: '9 min read',
    publishedDate: '2026-08-28',
    keywords: ['how to build a paver patio base', 'paver patio depth', 'polymeric sand installation', 'crushed stone base compaction'],
    relatedToolSlug: 'patio-calculator',
    keyTakeaways: [
      'Excavate 7 to 8 inches deep to allow for 4" gravel base, 1" bedding sand, and paver thickness.',
      'Compact crushed aggregate in 2-inch lifts using a heavy vibratory plate compactor.',
      'Screed exactly 1 inch of uncompacted coarse concrete sand (ASTM C33) using metal conduit rails.',
      'Pitch the patio surface at 1/4" drop per linear foot away from home foundation walls for drainage.',
      'Lay a non-woven geotextile stabilization fabric over native soil before adding gravel base.',
      'Lock joints with high-performance polymeric sand and edge restraints to prevent weed intrusion and shifting.'
    ],
    content: [
      'Over ninety percent of residential paver patio, walkway, and driveway failures are caused by inadequate subgrade preparation and improper aggregate compaction rather than defects in the concrete paving stones themselves. When subbases shift or settle unevenly, pavers develop dangerous tripping hazards, pooling water, and sunken tire tracks.',
      'The foundation profile begins with proper excavation depth calculation. To achieve a stable walking patio, excavate 7 to 8 inches below final grade. This profile accommodates 4 to 6 inches of compacted dense-graded aggregate (such as road base or 3/4-inch minus crushed gravel), 1 inch of uncompacted bedding sand, and standard 2-3/8 inch (60mm) concrete pavers.',
      'Soil stabilization begins with geotextile fabric installation. Laying a heavy-duty non-woven geotextile cloth over the excavated native subsoil prevents the crushed stone aggregate from migrating downward into softer clay or loam over multiple winter freeze-thaw cycles while allowing groundwater to percolate freely downward into deep soil horizons.',
      'Base aggregate compaction must be executed in progressive 2-inch lifts. Attempting to compact 6 inches of loose gravel in a single pass leaves the bottom layers porous and loose. Lightly mist each 2-inch layer with water to achieve optimum moisture content, then run a gas-powered vibratory plate compactor (minimum 3,000 lbs centrifugal force) across the area in perpendicular overlapping passes.',
      'The bedding layer must consist of clean, coarse concrete sand meeting ASTM C33 specifications, never fine mason sand or stone dust. Screed the bedding sand to a uniform 1-inch thickness using 1-inch metal conduit pipes as height guides. Once pavers are laid, install heavy-duty plastic edge restraints spiked into the crushed base, sweep polymeric sand into the joint lines, and compact the surface to vibrate sand deep into the interlocking channels.',
      'Establish positive slope away from residential structures. Every hardscape installation should maintain a minimum grade pitch of 1/4 inch per linear foot (approximately a 2% slope) directed away from basement foundations, exterior walls, and neighboring boundary lines to prevent basement seepage and water damage.'
    ]
  },
  {
    id: 'how-to-calculate-room-square-footage-odd-shapes',
    slug: 'how-to-calculate-room-square-footage-odd-shapes',
    title: 'Room Square Footage Guide',
    cluster: 'rooms',
    clusterName: 'Rooms & Walls',
    summary: 'How to calculate square footage for L-shaped rooms, bay windows, circular spaces, and stairways.',
    readTime: '5 min read',
    publishedDate: '2026-08-29',
    keywords: ['how to calculate square footage of l shaped room', 'room square footage odd shapes', 'subdividing complex floor plans'],
    relatedToolSlug: 'room-area-calculator',
    keyTakeaways: [
      'Subdivide complex room floor plans into simple geometric rectangles (Block A, Block B, Block C).',
      'Calculate each rectangle area individually (Length × Width) and sum them together for total net area.',
      'For triangular bay windows and angled nooks, use the standard formula: Area = 1/2 × Base × Height.',
      'For circular rooms or semicircular arches, calculate: Area = π × (Radius)² or 1/2 × π × r².',
      'Measure stairways as (Step Tread Depth + Step Riser Height) × Step Width × Total Number of Steps.',
      'Always add 10% to 15% extra material buffer for irregularly shaped spaces due to higher perimeter cut scrap.'
    ],
    content: [
      'Very few residential rooms in modern or historic architecture are simple, pristine rectangles. Professional remodelers and DIY homeowners frequently encounter L-shaped living-dining combos, octagonal bay window bump-outs, rounded alcoves, and angled hallway corridors. Accurately determining the total square footage of these spaces is crucial for purchasing exact volumes of flooring, drywall, paint, and ceiling tiles.',
      'The most reliable method for calculating complex rooms is the geometric decomposition technique. Rather than attempting to measure perimeter lines in one continuous polygon, sketch the floor plan on graph paper and draw dotted lines to divide the room into separate, easily measurable rectangular blocks labeled Section A, Section B, and Section C.',
      'Measure the maximum length and width of each individual sub-block using a laser distance measurer or steel tape. For example, in an L-shaped room measuring 20 feet by 15 feet with a 6-foot by 8-foot cutout, divide the space into one 14x15 ft rectangle (210 sq ft) and one 6x7 ft rectangle (42 sq ft), yielding a total net area of 252 square feet.',
      'For angled features such as bay windows, breakfast nooks, and corner fireplaces, treat the angled section as a right-angled triangle. Measure the base along the main wall and the height perpendicular to the furthest apex. Calculate area using Area = 0.5 × Base × Height, then add this figure to your main rectangular room total.',
      'When calculating stairway square footage for carpet or hardwood runner replacement, measure the sum of one horizontal tread depth plus one vertical riser height, multiply by the stair width, and multiply by the total step count. Add an additional 15% waste allowance for stairs due to nosing wraps, stringer trim cuts, and pattern alignment along the staircase run.',
      'Keep meticulous records of ceiling height variations and wall cutouts. Vaulted, cathedral, or tray ceilings require separate trigonometric slope calculations to determine actual square footage. Always double-check laser measurement points at multiple heights along walls to identify non-plumb structural framing before finalizing your material orders.'
    ]
  },
  {
    id: 'imperial-vs-metric-construction-conversions',
    slug: 'imperial-vs-metric-construction-conversions',
    title: 'Construction Conversions Guide',
    cluster: 'conversions',
    clusterName: 'Conversions',
    summary: 'Fast mental math rules and exact conversion tolerances for international building plans.',
    readTime: '4 min read',
    publishedDate: '2026-08-30',
    keywords: ['feet to meters construction conversion', 'inches to mm carpentry cheat sheet', 'metric building plan takeoff'],
    relatedToolSlug: 'feet-to-metres',
    keyTakeaways: [
      '1 foot = 0.3048 meters | 1 meter = 3.28084 feet (approx 3 feet 3-3/8 inches).',
      '1 inch = 25.4 millimeters exactly | 1 millimeter = 0.03937 inches.',
      '1 square foot = 0.092903 square meters | 1 square meter = 10.7639 square feet.',
      'Nominal 2x4 framing lumber measures 1.5" × 3.5" (38mm × 89mm actual).',
      'Standard drywall sheets in imperial are 4ft × 8ft (1219mm × 2438mm) vs metric 1200mm × 2400mm.',
      'Always convert measurements at the highest decimal precision before rounding for final material purchases.'
    ],
    content: [
      'As modern architectural blueprints, building product specifications, and imported fixture dimensions increasingly mix imperial (US Customary) and metric (SI) measurement units, construction professionals and trade estimators must master precise unit conversion tolerances. Converting rounding errors on large commercial takeoffs can easily lead to severe dimensional discrepancies and costly structural misfits.',
      'Linear conversions require understanding exact mathematical factors versus rough on-site approximations. While calculating 1 meter as roughly 3.3 feet is useful for quick mental estimates, finished trim carpentry and framing require the exact statutory factor: 1 inch = 25.40 millimeters and 1 foot = 0.3048 meters. Over a 100-foot commercial corridor, relying on rough estimates introduces an error of over 2.4 inches.',
      'Area calculations introduce exponential scaling differences between square feet and square meters. One square meter equals approximately 10.764 square feet, while one square foot equals 0.0929 square meters. When ordering flooring from European or Asian manufacturers packaged in square meters, multiply your net imperial square footage by 0.0929 and add standard trade waste before converting to total box counts.',
      'Understanding nominal versus actual lumber dimensions is equally critical when converting structural plans. In North American construction, a "2x4" stud is nominally 2 inches by 4 inches rough-sawn, but surfaced four sides (S4S) to an actual dimension of 1-1/2 inches by 3-1/2 inches (38mm × 89mm). Similarly, a "2x6" measures 1-1/2" × 5-1/2" (38mm × 140mm).',
      'When converting architectural volume takeoffs for concrete, gravel, and topsoil, remember that 1 cubic yard (27 cubic feet) equals 0.764555 cubic meters. When ordering bulk aggregate batches, round up to the nearest half-yard or metric ton to account for dynamic material compaction under roller equipment.',
      'Maintain mathematical consistency across multi-trade trade packages. When converting plumbing pipe sizing, note that European DN (Diameter Nominal) metric pipe standards do not always mate directly with North American NPT (National Pipe Taper) or IPS fittings without specialized transition adapters. Always verify fitting thread pitch before running pressurized supply lines.'
    ]
  }
];

export function getGuideBySlug(slug: string): GuideMeta | undefined {
  return guidesRegistry.find((g) => g.slug === slug);
}

export function getGuidesByCluster(cluster: string): GuideMeta[] {
  return guidesRegistry.filter((g) => g.cluster === cluster);
}
