import sys
import re
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

UPDATED_DESCRIPTIONS = {
    # Concrete & Masonry
    "concrete-calculator": "Free contractor concrete calculator. Calculate exact cubic yards, cubic meters, and 60lb/80lb bags for slabs, footings, post holes, and foundation pours.",
    "concrete-slab-calculator": "Free concrete slab calculator. Accurately calculate slab yardage in cubic yards, 80lb premix bags, rebar grid footage, and compacted gravel base tonnage.",
    "concrete-bags-calculator": "Calculate exactly how many 80lb, 60lb, or 50lb bags of Quikrete or Sakrete concrete you need for slabs, fence posts, deck footings, and curbs with waste.",
    "brick-calculator": "Free brick calculator. Estimate standard modular, king, and queen size bricks, mortar bags, and masonry sand for single and double wythe walls with waste.",
    "block-calculator": "Calculate standard 8x8x16 CMU cinder blocks, foundation blocks, core-fill grout, and mortar bags for retaining and basement walls with waste factor.",
    "mortar-calculator": "Calculate Type N, S, and M pre-mixed mortar bags, masonry cement, and sand volume for bricks, cinder blocks, and cultured stone veneer installations.",

    # Conversions
    "feet-to-metres": "Convert feet (ft) and inches (in) to metres (m) and centimetres (cm) instantly with precision trade decimals, fraction rounding, and reverse calculation.",
    "inches-to-mm": "Convert decimal and fractional inches (1/16, 1/8, 1/4, 1/2) to millimetres (mm) and centimetres (cm) with real-time construction precision tables.",
    "square-feet-to-m2": "Convert square feet (sq ft) to square metres (m²) instantly with reverse conversion, room dimension calculation, and price per square unit estimator.",
    "litres-to-gallons": "Convert litres (L) to US liquid gallons and UK imperial gallons for paint coverage, liquid sealers, chemical coatings, and fluid volume estimation.",
    "kg-to-pounds": "Convert kilograms (kg) to pounds (lbs) and ounces (oz) with reverse conversion for construction material weights, structural loads, and freight shipping.",

    # Flooring
    "flooring-calculator": "Free flooring calculator. Estimate total square feet, box quantities, waste factors (10-20%), and material costs for hardwood, vinyl, and tile.",
    "tile-calculator": "Free tile calculator. Calculate exact tile count, box cartons, mortar bags, and grout pounds needed based on room size and tile dimensions.",
    "laminate-calculator": "Free laminate flooring calculator. Calculate total plank boxes, foam underlayment rolls, expansion gaps, and perimeter trim molding needed.",
    "carpet-calculator": "Free carpet calculator. Calculate square yards, square feet, seam placement for 12ft and 15ft roll widths, tack strips, and carpet cushion padding.",
    "vinyl-flooring-calculator": "Calculate luxury vinyl plank (LVP) and sheet vinyl requirements, box quantities, adhesive, and 100% waterproof installation accessories.",
    "flooring-waste-calculator": "Calculate the exact flooring waste percentage for straight, diagonal, herringbone, chevron, and irregular room layouts to prevent costly shortages.",

    # Garden & Landscaping
    "gravel-calculator": "Free gravel calculator. Calculate tons, cubic yards, and 50lb bags of crushed stone, pea gravel, and road base with depth estimation and compaction.",
    "soil-calculator": "Calculate topsoil, compost, and raised garden bed soil volume in cubic yards, cubic feet, and bagged quantities with settlement margin calculations.",
    "mulch-calculator": "Calculate landscaping mulch in cubic yards and 2 cubic foot bags for garden flowerbeds, tree rings, and weed barrier suppression with depth guide.",
    "turf-calculator": "Calculate sod rolls, whole pallets (450-500 sq ft/pallet), grass seed pounds, and starter fertilizer requirements for lawn turf installations.",
    "fence-calculator": "Calculate privacy fence posts (6ft or 8ft spacing), 2x4 support rails, individual pickets, gate hardware, and post hole concrete bag requirements.",
    "patio-calculator": "Calculate concrete patio pavers, square feet, base crushed gravel depth, bedding sand, and polymeric joint sand with cutting waste factor.",

    # Painting
    "paint-calculator": "Free online paint calculator. Accurately calculate gallons of paint for walls and ceilings, minus doors and windows, for 1 or 2 coats.",
    "wall-paint-calculator": "Calculate interior wall-only paint coverage in gallons and liters, excluding ceilings and trim, with precise door and window area subtractions.",
    "ceiling-paint-calculator": "Estimate flat ceiling paint gallons for smooth drywall, sloped vaults, and textured popcorn ceilings with primer coat calculations.",
    "primer-calculator": "Calculate primer gallons for new drywall skim coats, dark color transitions, bare wood, stained surfaces, and high-adhesion stain blocking.",
    "paint-coverage-calculator": "Convert wall and ceiling square footage or square meters into exact paint volume in gallons, quarts, and liters with multi-coat multipliers.",

    # Rooms & Area
    "room-area-calculator": "Free room area calculator. Calculate square footage (sq ft), square meters (sq m), perimeter, and volume for standard and irregular rooms.",
    "wall-area-calculator": "Calculate net vertical wall surface area for paint, drywall, wallpaper, and insulation, subtracting all doors, windows, and architectural openings.",
    "square-metres-calculator": "Free square metres calculator. Calculate m² area from metres, centimetres, or millimetres with instant conversion to square feet.",
    "wallpaper-calculator": "Calculate wallpaper rolls needed factoring wall dimensions, pattern repeat drops, standard roll widths, and window or door cutout deductions.",
    "skirting-board-calculator": "Calculate linear feet, meterage, and board counts (8ft, 12ft, 16ft) for baseboards, skirting boards, shoe molding, and corner miter waste."
}

tools_dir = Path("src/config/tools")

for file_path in tools_dir.glob("*.ts"):
    if file_path.name == "types.ts":
        continue
    content = file_path.read_text(encoding="utf-8")
    
    for tool_id, new_desc in UPDATED_DESCRIPTIONS.items():
        # Regex to match the tool ID block and its specific metaDescription
        pattern = rf"(id:\s*['\"]{tool_id}['\"].*?metaDescription:\s*['\"])(.*?)(['\"])"
        
        def replace_desc(match):
            prefix = match.group(1)
            suffix = match.group(3)
            return f"{prefix}{new_desc}{suffix}"

        content, count = re.subn(pattern, replace_desc, content, flags=re.DOTALL)
        if count > 0:
            print(f"✔ Replaced [{tool_id}] with {len(new_desc)} chars")

    file_path.write_text(content, encoding="utf-8")

print("\nFinished precise replacement.")
