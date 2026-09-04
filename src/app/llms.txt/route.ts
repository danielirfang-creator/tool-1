import { siteConfig } from '@/config/site';

export async function GET() {
  const content = `# CraftCalc - Precision Home Improvement & DIY Calculators

> Free, contractor-verified DIY calculators. Material calculations, waste factor algorithms, and step-by-step guidance for flooring, painting, concrete, garden, and room planning.

- Website: ${siteConfig.url}
- Description: Free online estimation tools for contractors, DIYers, and homeowners.
- Calculation Rules: Independent formulas verified against international building standards.

## Calculator Categories & Tools

### 1. Flooring Calculators
- [Flooring Calculator](${siteConfig.url}/calculators/flooring/flooring-calculator): Estimate square footage, box count, and waste margins for hardwood, laminate, vinyl, and tile.
- [Tile Calculator](${siteConfig.url}/calculators/flooring/tile-calculator): Calculate total tiles, boxes, thinset mortar bags, and grout pounds needed.
- [Laminate Calculator](${siteConfig.url}/calculators/flooring/laminate-calculator): Calculate laminate planks, underlayment rolls, and expansion gaps.
- [Hardwood Calculator](${siteConfig.url}/calculators/flooring/hardwood-calculator): Calculate solid/engineered hardwood square footage and waste percentage.
- [Carpet Calculator](${siteConfig.url}/calculators/flooring/carpet-calculator): Calculate linear and square yards for carpet rolls and padding.
- [Flooring Waste Calculator](${siteConfig.url}/calculators/flooring/flooring-waste-calculator): Calculate precise waste factor allowances (5% to 20%) based on installation patterns.

### 2. Painting & Wall Finishing
- [Paint Calculator](${siteConfig.url}/calculators/painting/paint-calculator): Calculate gallons of paint for interior walls, ceilings, and trim across multiple coats.
- [Ceiling Paint Calculator](${siteConfig.url}/calculators/painting/ceiling-paint-calculator): Calculate flat ceiling paint coverage and textured surface allowances.
- [Trim Paint Calculator](${siteConfig.url}/calculators/painting/trim-paint-calculator): Calculate linear feet of baseboards, crown molding, and door frames.
- [Primer Calculator](${siteConfig.url}/calculators/painting/primer-calculator): Determine sealing primer needs for bare drywall, dark paint coverups, and stained surfaces.
- [Multi-Room Paint Calculator](${siteConfig.url}/calculators/painting/multi-room-paint-calculator): Aggregate paint requirements across entire homes and apartments.

### 3. Concrete & Masonry
- [Concrete Calculator](${siteConfig.url}/calculators/concrete-masonry/concrete-calculator): Calculate cubic yards, cubic meters, and pre-mixed bags for slabs, patios, and footings.
- [Concrete Slab Calculator](${siteConfig.url}/calculators/concrete-masonry/concrete-slab-calculator): Calculate slab volume, rebar grid, and gravel subbase.
- [Concrete Footing Calculator](${siteConfig.url}/calculators/concrete-masonry/concrete-footing-calculator): Calculate cylindrical and square post footing volumes.
- [Concrete Bag Calculator](${siteConfig.url}/calculators/concrete-masonry/concrete-bag-calculator): Determine exact counts of 80lb, 60lb, and 40lb concrete mix bags.
- [Mortar Calculator](${siteConfig.url}/calculators/concrete-masonry/mortar-calculator): Calculate mortar bags and sand volume for laying bricks and CMU blocks.
- [Brick & Block Calculator](${siteConfig.url}/calculators/concrete-masonry/brick-block-calculator): Estimate standard bricks and concrete blocks for walls with waste factors.

### 4. Garden, Landscaping & Outdoors
- [Topsoil Calculator](${siteConfig.url}/calculators/garden/topsoil-calculator): Calculate cubic yards, bulk tons, and 40lb bags of garden soil.
- [Mulch Calculator](${siteConfig.url}/calculators/garden/mulch-calculator): Determine cubic yards and 2 cu ft bags for weed barrier bedding.
- [Gravel Calculator](${siteConfig.url}/calculators/garden/gravel-calculator): Calculate gravel and crushed stone tons and cubic yards for driveways and French drains.
- [Paver & Patio Calculator](${siteConfig.url}/calculators/garden/paver-calculator): Estimate patio pavers, bedding sand, and polymeric joint sand.
- [Turf & Sod Calculator](${siteConfig.url}/calculators/garden/turf-sod-calculator): Calculate sod rolls, pallets, and square feet for lawn installation.
- [Fence Calculator](${siteConfig.url}/calculators/garden/fence-calculator): Calculate fence posts, rails, pickets, and concrete bags.

### 5. Rooms & Interior Measurements
- [Square Footage Calculator](${siteConfig.url}/calculators/rooms/square-footage-calculator): Calculate square feet and square meters for rectangular, L-shaped, and irregular rooms.
- [Square Meter Calculator](${siteConfig.url}/calculators/rooms/square-meter-calculator): Metric surface and floor area calculations.
- [Wallpaper Calculator](${siteConfig.url}/calculators/rooms/wallpaper-calculator): Calculate wallpaper rolls taking into account vertical pattern repeats.
- [Drywall Sheet Calculator](${siteConfig.url}/calculators/rooms/drywall-calculator): Determine 4x8 and 4x12 drywall sheets, joint compound, and tape.
- [Baseboard / Skirting Board Calculator](${siteConfig.url}/calculators/rooms/baseboard-calculator): Calculate perimeter linear feet minus doorways plus 10% corner waste.

### 6. Conversion Tools
- [Feet to Meters Converter](${siteConfig.url}/calculators/conversions/feet-to-meters): Instant bidirectional length conversions.
- [Square Feet to Square Meters](${siteConfig.url}/calculators/conversions/sqft-to-sqm): Area conversion with step-by-step formula.
- [Cubic Yards to Cubic Feet](${siteConfig.url}/calculators/conversions/cubic-yards-to-cubic-feet): Volume calculation for bulk aggregates.
- [Inches to Centimeters](${siteConfig.url}/calculators/conversions/inches-to-cm): Fraction and decimal dimension conversion.
- [Gallons to Liters Converter](${siteConfig.url}/calculators/conversions/gallons-to-liters): Liquid measure conversion for paints and sealers.

## Free Resources & Extensions
- [Printable Cheat Sheets & Matrices](${siteConfig.url}/resources): Free downloadable PDF reference cards.
- [CraftCalc Chrome Extension](${siteConfig.url}/craftcalc-chrome-extension.zip): Official popup extension for quick offline browser calculations.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
