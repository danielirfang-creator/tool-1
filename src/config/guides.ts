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
  },
  {
    id: 'how-to-calculate-concrete-slab-yardage',
    slug: 'how-to-calculate-concrete-slab-yardage',
    title: 'How to Calculate Concrete Slab Yardage & Premix Bags',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    summary: 'Contractor formulas for calculating cubic yards, 80lb/60lb pre-mix bag counts, subbase gravel tonnage, and rebar grids for concrete slabs.',
    readTime: '8 min read',
    publishedDate: '2026-09-05',
    keywords: ['how to calculate concrete slab yardage', 'concrete slab calculator formulas', 'how many 80lb bags for 10x10 slab', 'concrete rebar grid sizing'],
    relatedToolSlug: 'concrete-slab-calculator',
    keyTakeaways: [
      'Standard formula: Cubic Yards = (Length ft × Width ft × Thickness ft) ÷ 27.',
      'Always convert slab thickness from inches to feet by dividing by 12 (e.g. 4 inches = 0.333 ft).',
      'Add a mandatory 10% waste buffer for uneven grade, edge thickening, and form deflection.',
      'It takes exactly 45 bags of 80lb concrete (or 60 bags of 60lb concrete) to equal 1 cubic yard.',
      'For slabs exceeding 1.5 cubic yards (~65 bags), ready-mix truck delivery is faster and more economical.',
      'Install #3 or #4 rebar on 16" to 18" centers elevated on concrete chairs at the mid-depth of the slab.'
    ],
    content: [
      'Pouring a residential concrete slab—whether for a backyard patio, storage shed foundation, hot tub pad, or driveway—requires zero margin for mathematical error. Ordering too little concrete creates cold joints that permanently weaken the structural slab, while over-ordering ready-mix trucks leads to expensive surplus disposal charges.',
      'The foundational formula for concrete volume is Length (feet) × Width (feet) × Thickness (feet) divided by 27. Because slab thickness is almost universally measured in inches (such as 4 inches for sidewalks or 6 inches for heavy vehicle pads), you must first convert inches into decimal feet by dividing by 12. For example, a 4-inch slab is 4 ÷ 12 = 0.333 feet thick.',
      'To calculate a 12 ft by 20 ft patio slab at 4 inches thick: Multiply 12 × 20 × 0.333 = 79.92 cubic feet. Divide 79.92 by 27 to obtain 2.96 cubic yards. Always add a 10% subgrade allowance (2.96 × 1.10 = 3.26 cubic yards). On rough-graded excavations, subsoil variations and form bowing will consume this extra volume completely.',
      'When deciding between bagged concrete and ready-mix truck delivery, evaluate physical labor limits. One cubic yard of concrete weighs approximately 4,050 pounds. Mixing 3.26 cubic yards by hand requires handling 147 eighty-pound bags (nearly 6 tons of material). As a general trade standard, any pour exceeding 1.5 to 2.0 cubic yards is far more cost-effective when ordered from a local ready-mix supplier.',
      'Subbase preparation and steel reinforcement dictate the lifespan of the slab. Excavate down to undisturbed subsoil and install a minimum 4-inch layer of compacted crushed gravel (such as 3/4" road base). Place welded wire mesh or a rebar grid (#3 rebar on 18-inch centers) supported on polymer rebar chairs so the steel sits exactly in the middle third of the poured slab.',
      'Control joint placement prevents unsightly cracking as the concrete cures and shrinks. Score or saw-cut control joints to a depth of at least 1/4 the slab thickness (1 inch deep for a 4-inch slab) spaced no further apart than 24 to 30 times the slab thickness in inches (a maximum of 8 to 10 feet apart for a 4-inch slab).'
    ]
  },
  {
    id: 'interior-paint-coverage-primer-guide',
    slug: 'interior-paint-coverage-primer-guide',
    title: 'Interior Paint Coverage & Primer Estimation Guide',
    cluster: 'painting',
    clusterName: 'Painting',
    summary: 'How to calculate net wall square footage minus doors and windows, account for dry drywall absorption, and select between 1 vs 2 finish coats.',
    readTime: '6 min read',
    publishedDate: '2026-09-06',
    keywords: ['how many gallons of paint for room', 'paint coverage per gallon', 'when to use drywall primer', 'how much paint to subtract for windows'],
    relatedToolSlug: 'paint-calculator',
    keyTakeaways: [
      'One standard gallon of quality interior latex paint covers approximately 350 to 400 square feet.',
      'Deduct 21 sq ft for each standard interior door and 15 sq ft for each standard window.',
      'Unpainted new drywall or patched plaster requires 1 dedicated coat of PVA sealing primer.',
      'Drastic color transitions (dark to light) require a high-hiding white primer coat to prevent 3+ paint coats.',
      'Always apply 2 full finish coats for uniform sheen, accurate color depth, and scrubbable durability.',
      'Store leftover touch-up paint in an airtight glass jar labeled with room name and paint formula.'
    ],
    content: [
      'Estimating interior paint quantities requires balancing total wall surface area against surface porosity, color transition contrast, and application method. Running out of paint mid-wall forces a trip back to the paint counter where subtle tint formula variations between batches can create noticeable color banding on prominent walls.',
      'To calculate gross wall area, measure the room perimeter (sum of all four wall lengths) and multiply by the ceiling height. In a 12 ft by 15 ft room with 8 ft ceilings: Perimeter = (12 + 15) × 2 = 54 ft. Gross wall area = 54 × 8 = 432 square feet. Next, subtract openings: deduct 21 sq ft for each standard interior door and 15 sq ft for each window.',
      'If the room has two doors (42 sq ft) and two windows (30 sq ft), your net paintable area is 432 - 72 = 360 square feet. Because one gallon covers approximately 350 to 400 sq ft on previously painted smooth surfaces, one coat will consume nearly 1 full gallon. For standard two-coat coverage, purchase 2 full gallons.',
      'Understanding when a separate primer coat is mandatory saves time and money. Self-priming "paint and primer in one" formulas work well on sound, existing paint in similar color shades. However, brand-new drywall, skim-coated joints, bare wood, or water-damaged stains require dedicated specialty primers such as PVA primer for drywall or shellac-based stain blockers.',
      'Surface texture dramatically alters paint absorption rates. Heavily textured walls (such as knockdown, orange peel, or popcorn plaster) increase total surface area by 20% to 30%. Porous, unsealed masonry or concrete block walls absorb liquid rapidly and may yield only 150 to 200 sq ft of coverage per gallon on the initial prime coat.',
      'Maintain proper application thickness and roller nap sizing. Use a 3/8" microfiber roller sleeve for smooth drywall, 1/2" for light orange peel textures, and 3/4" for masonry or stucco. Rolling too thin to "stretch" a gallon compromises dry film thickness (DFT), resulting in poor washability and premature sheen burnishing.'
    ]
  },
  {
    id: 'gravel-and-crushed-stone-depth-guide',
    slug: 'gravel-and-crushed-stone-depth-guide',
    title: 'Gravel, Crushed Stone & Mulch Depth Guide',
    cluster: 'garden',
    clusterName: 'Garden & Landscaping',
    summary: 'How to calculate cubic yards and tonnage for driveways, French drains, paver bases, and garden flowerbed weed suppression.',
    readTime: '7 min read',
    publishedDate: '2026-09-06',
    keywords: ['how much gravel do i need', 'gravel depth calculator', 'crushed stone tons per cubic yard', 'mulch bag coverage depth'],
    relatedToolSlug: 'gravel-calculator',
    keyTakeaways: [
      'Formula: Cubic Yards = (Length ft × Width ft × Depth in) ÷ 324.',
      'Gravel driveway bases require a minimum of 4 to 6 inches of 3/4" crushed stone road base.',
      'Decorative walkways and patio stone toppings require 2 to 3 inches of pea gravel or crushed granite.',
      '1 cubic yard of crushed stone/gravel weighs approximately 1.4 to 1.5 tons (2,800 to 3,000 lbs).',
      'Always install heavy-duty woven geotextile fabric beneath gravel to prevent subsoil migration.',
      'Factor in 15% to 20% volume loss for compacted crushed aggregate base layers.'
    ],
    content: [
      'Purchasing bulk landscape materials—including crushed gravel, pea stone, river rock, and shredded hardwood mulch—requires converting square foot surface measurements into cubic yards and freight tonnage. Ordering the wrong depth can result in premature driveway rutting, water drainage failures, or excessive weed penetration.',
      'The contractor shortcut formula for calculating landscape volume is: Area (sq ft) × Depth (inches) ÷ 324 = Cubic Yards. For example, a 10-foot by 50-foot gravel walkway (500 sq ft) at a 3-inch depth requires: 500 × 3 ÷ 324 = 4.63 cubic yards. Always add a 10% settling allowance, bringing the total order to 5.1 cubic yards.',
      'Converting cubic yards to delivery weight in tons is essential because commercial quarries sell crushed rock by the ton. Standard 3/4-inch crushed gravel with stone dust (dense grade base) has a compacted density of approximately 1.45 tons per cubic yard. Multiplying 5.1 cubic yards by 1.45 gives 7.4 tons of gravel.',
      'Match the aggregate gradation to the engineering function. For structural driveway and patio subbases, choose 3/4" crushed stone with stone fines (road base / Crusher Run) because the angular particles interlock tightly when compacted with a plate compactor. For French drains and septic drainage fields, use clean washed 3/4" stone without fines to allow unrestricted water flow.',
      'Decorative ground cover requires careful depth moderation. Pea gravel and decorative river pebbles should be installed at a depth of 2 to 3 inches. Installing pea gravel deeper than 3 inches creates a spongy, shifting surface that is difficult to walk on or push lawn equipment across.',
      'For garden flowerbed mulching, maintain a consistent 2-to-3-inch layer of organic bark or hardwood mulch. Avoid "mulch volcanoes" piled directly against tree trunks and shrub stems, as trapped moisture promotes fungal rot and insect infestation. One cubic yard of mulch covers 108 square feet at 3 inches deep.'
    ]
  },
  {
    id: 'lvp-vs-hardwood-flooring-waste-guide',
    slug: 'lvp-vs-hardwood-flooring-waste-guide',
    title: 'Luxury Vinyl Plank (LVP) Installation & Box Count Guide',
    cluster: 'flooring',
    clusterName: 'Flooring',
    summary: 'Step-by-step contractor guide for calculating LVP cartons, staggered end-joint overlaps, perimeter expansion gaps, and cutting waste.',
    readTime: '6 min read',
    publishedDate: '2026-09-06',
    keywords: ['how many boxes of vinyl plank flooring', 'lvp waste factor', 'vinyl plank stagger spacing', 'lvp expansion gap requirement'],
    relatedToolSlug: 'vinyl-flooring-calculator',
    keyTakeaways: [
      'Order 10% extra for standard straight LVP runs and 15% for multi-room open floor plans.',
      'Maintain a minimum 1/4" to 3/8" expansion gap around all perimeter walls, cabinets, and doorframes.',
      'Stagger plank end-joints by at least 8 to 12 inches to ensure mechanical click-lock strength.',
      'Never install planks shorter than 8 inches at the beginning or end of any row.',
      'Verify whether your LVP features an attached acoustic underlayment pad before buying foam rolls.',
      'Keep room temperature between 65°F and 85°F (18°C-29°C) during and after installation.'
    ],
    content: [
      'Luxury Vinyl Plank (LVP) and Rigid Core SPC (Stone Plastic Composite) flooring have become the dominant residential flooring choices due to their 100% waterproof construction, realistic timber embossing, and floating click-lock installation. However, accurate material ordering and proper layout planning are critical to preventing joint separation and edge buckling.',
      'When calculating LVP requirements, measure total square footage and add a 10% waste buffer for simple rectangular rooms or 15% for installations running continuously through multiple adjoining rooms and closets without transition moldings. Divide total gross area by carton coverage (commonly 20 to 24 sq ft per box) and round up to the nearest whole carton.',
      'Layout geometry dictates end-joint stagger spacing. Avoid repeating identical "H-patterns" or stair-step joints across adjacent rows. Maintain a minimum distance of 8 to 12 inches between end joints in neighboring rows to distribute structural rigidity and prevent click-lock tongues from unlocking under heavy point loads.',
      'Perimeter expansion gaps are non-negotiable for floating LVP floors. Although rigid core SPC planks experience minimal thermal expansion compared to traditional laminate, building walls and subfloors continuously expand and contract with seasonal humidity. Place 1/4" to 3/8" plastic spacers along all walls, kitchen islands, and vertical door jambs.',
      'Underlayment compatibility is essential. The vast majority of modern SPC vinyl planks come manufactured with an integrated 1mm or 1.5mm IXPE acoustic backing pad. Adding a second layer of soft foam underlayment under pre-padded planks introduces excess vertical deflection, causing the fragile click-lock locking mechanisms to snap under foot pressure.',
      'Subfloor preparation standards must meet manufacturer tolerances: the substrate must be flat within 3/16" over a 10-foot radius. Grind down high concrete ridges and fill low dips with self-leveling underlayment compound before laying the first plank to ensure a quiet, completely solid floor.'
    ]
  },
  {
    id: 'cinder-block-and-mortar-calculation-guide',
    slug: 'cinder-block-and-mortar-calculation-guide',
    title: 'CMU Cinder Block & Mortar Estimation Guide',
    cluster: 'concrete-masonry',
    clusterName: 'Concrete & Masonry',
    summary: 'Complete engineering guide for calculating 8x8x16 concrete masonry units (CMU), Type S mortar bags, and core-fill grout for retaining walls.',
    readTime: '7 min read',
    publishedDate: '2026-09-07',
    keywords: ['how many cinder blocks for retaining wall', '8x8x16 block calculator', 'mortar bags per 100 blocks', 'core fill grout volume'],
    relatedToolSlug: 'block-calculator',
    keyTakeaways: [
      'Standard 8×8×16 CMU blocks cover 0.89 square feet per block (including 3/8" mortar joint).',
      'Rule of thumb: Multiply total wall square footage by 1.125 to determine total block count.',
      'Add 5% to 8% extra blocks for corner cuts, half-blocks, and on-site transit breakage.',
      'It takes approximately three 80lb bags of Type S masonry mortar per 100 standard CMU blocks.',
      'Retaining walls over 4 feet tall require structural engineering, rebar reinforcement, and gravel backfill.',
      'Fill hollow CMU cores with coarse grout and #4 or #5 vertical rebar every 16 to 32 inches.'
    ],
    content: [
      'Concrete Masonry Units (CMU), commonly called cinder blocks or concrete blocks, are the foundation of residential basement walls, landscaping retaining walls, garage foundations, and fire-resistant partitions. Accurately estimating block counts, mortar batches, and core-fill grout prevents costly construction stoppages.',
      'A standard nominal 8x8x16 CMU block actually measures 7-5/8" high × 7-5/8" wide × 15-5/8" long. When laid with standard 3/8-inch mortar bedding joints, each unit occupies exactly 8 inches in height by 16 inches in length (128 square inches, or 0.8889 square feet). Therefore, 100 square feet of wall area requires exactly 112.5 blocks (order 120 blocks with 6% cutting reserve).',
      'Mortar estimation requires factoring bed joints and head joints. For standard face-shell bedding on 8x8x16 hollow blocks, plan on approximately 3 bags of 80lb pre-mixed Type S mortar per 100 blocks (or 1 bag per 33 blocks). For structural below-grade foundations or retaining walls with full-width mortar bedding, increase mortar requirements to 4.5 bags per 100 blocks.',
      'Structural retaining walls require vertical and horizontal steel rebar reinforcement. Place #4 (1/2") or #5 (5/8") vertical rebar dowels embedded in the concrete footing and extended upward through the hollow block cells at 16", 24", or 32" intervals depending on soil surcharge and wall height.',
      'Core-fill grout volume must be calculated separately from mortar. Filling hollow block cells with coarse pea gravel concrete grout consolidates the wall into a solid structural monolith. One cubic yard of grout fills approximately 80 to 90 hollow cells in standard 8-inch CMU blocks.',
      'Adequate drainage prevents hydrostatic pressure buildup behind retaining walls. Always install a perforated 4-inch drain pipe surrounded by washed 3/4" crushed stone wrapped in non-woven filter fabric along the base of the wall, and backfill with granular gravel rather than expansive clay soils.'
    ]
  },
  {
    id: 'wallpaper-roll-repeat-calculation-guide',
    slug: 'wallpaper-roll-repeat-calculation-guide',
    title: 'Wallpaper Roll & Pattern Drop Calculation Guide',
    cluster: 'rooms',
    clusterName: 'Rooms & Conversions',
    summary: 'How to measure walls, deduct openings, and account for straight vs drop match pattern repeats when purchasing single vs double wallpaper rolls.',
    readTime: '6 min read',
    publishedDate: '2026-09-07',
    keywords: ['how many rolls of wallpaper do i need', 'wallpaper pattern repeat calculation', 'double roll vs single roll wallpaper', 'wallpaper waste margin'],
    relatedToolSlug: 'wallpaper-calculator',
    keyTakeaways: [
      'Standard "double rolls" (US) cover approximately 56 to 60 gross square feet (use 50 sq ft usable).',
      'European standard metric rolls (Euro rolls) cover approximately 57 sq ft (use 45 sq ft usable).',
      'Straight match patterns generate 10% to 15% cutting waste.',
      'Half-drop match patterns with large repeats (18"-24"+) require an additional 20% to 25% waste buffer.',
      'Deduct only large openings (over 30 sq ft); ignore small standard windows to preserve pattern alignment.',
      'Always order all wallpaper rolls from the same dye-lot batch number to prevent color shading differences.'
    ],
    content: [
      'Wallpaper installation combines accurate surface geometry with vertical pattern alignment math. Running short by half a roll often results in a completely wasted project, as wallpaper manufacturers print in discrete dye-lot runs where background inks and pigment tones shift noticeably between print batches.',
      'Understand commercial wallpaper packaging standards before ordering. In North America, wallpaper is priced by the "single roll" but almost exclusively packaged and shipped as continuous "double rolls" (typically 20.5 inches wide by 33 feet long, yielding ~56 sq ft) or "bolt lengths". European metric rolls measure 0.53m wide by 10.05m long (~57 sq ft).',
      'Pattern repeat depth dictates actual usable roll square footage. A solid texture or random match pattern has 0" repeat, allowing full utilization of offcuts. However, large damask, botanical, or geometric patterns with a 20-inch straight match or half-drop repeat generate significant scrap cuts at the top of each new strip to align the horizontal motifs.',
      'To calculate strips needed: Measure total room perimeter in inches and divide by the roll width (e.g. 20.5"). Round up to the next whole number of vertical strips. Then determine how many strips can be cut from a single double roll based on ceiling height plus pattern repeat allowance.',
      'Do not subtract small windows or doors from wallpaper takeoffs unless the opening exceeds 30 square feet (such as large French doors or bay windows). Cutting around standard doors and windows interrupts continuous vertical strips, and the offcut pieces cannot be reused for full-height ceiling-to-floor drops.',
      'Always order 1 extra double roll beyond your net calculation. Having a spare roll from the identical dye-lot protects you against trimming errors during installation and provides perfect replacement material if wall damage or water leaks occur in the future.'
    ]
  }
];

export function getGuideBySlug(slug: string): GuideMeta | undefined {
  return guidesRegistry.find((g) => g.slug === slug);
}

export function getGuidesByCluster(cluster: string): GuideMeta[] {
  return guidesRegistry.filter((g) => g.cluster === cluster);
}
