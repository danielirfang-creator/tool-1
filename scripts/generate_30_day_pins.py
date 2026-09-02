import os
import sys
import csv
from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont

BASE_URL = "https://tool-1-pied.vercel.app"

# Full 30-Day Content Matrix across 33 Calculators & Guides
MONTH_CONTENT = [
    # Day 1
    {
        "day": 1,
        "id": "day01_flooring_boxes",
        "title": "Flooring Calculator: How Many Boxes Do You REALLY Need?",
        "hook": "Stop Guessing Your Flooring Boxes!",
        "subtitle": "Includes 10% Waste Factor + Full Carton Rounding",
        "category": "Flooring & DIY",
        "link": f"{BASE_URL}/calculators/flooring/flooring-calculator",
        "features": ["Room Sq Ft to Exact Carton Count", "Cost Budget Estimator", "5% to 20% Waste Slider", "Client-Side & 100% Free"],
        "keywords": ["flooring calculator", "hardwood floor cost", "how many boxes of flooring", "diy flooring"],
        "color": (5, 150, 105), "accent": (16, 185, 129)
    },
    # Day 2
    {
        "day": 2,
        "id": "day02_tile_grout_mortar",
        "title": "Tile & Grout Calculator: Large Format & Subway Tile Estimator",
        "hook": "Tile Projects Made Effortless!",
        "subtitle": "Calculates 12x24, 3x6 Subway + Thinset & Grout Bags",
        "category": "Bathroom & Kitchen Tiling",
        "link": f"{BASE_URL}/calculators/flooring/tile-calculator",
        "features": ["12x24 & 3x6 Subway Formulas", "50lb Thinset Mortar Bag Estimates", "10lb Grout Bag Breakdown", "Diagonal / Pattern Waste Allowance"],
        "keywords": ["tile calculator", "bathroom remodel", "diy backsplash", "how much grout do i need"],
        "color": (37, 99, 235), "accent": (59, 130, 246)
    },
    # Day 3
    {
        "day": 3,
        "id": "day03_laminate_underlayment",
        "title": "Laminate Plank & Underlayment Roll Calculator",
        "hook": "Calculate Laminate in 10 Seconds",
        "subtitle": "Includes Foam Rolls & 3/8\" Expansion Gap Perimeter",
        "category": "Laminate & Vinyl",
        "link": f"{BASE_URL}/calculators/flooring/laminate-calculator",
        "features": ["Exact Box Rounding Formula", "100 Sq Ft Underlayment Rolls", "Quarter-Round Trim Pieces", "Instant Imperial / Metric Toggle"],
        "keywords": ["laminate flooring calculator", "cheap flooring ideas", "underlayment rolls", "diy laminate"],
        "color": (217, 119, 6), "accent": (245, 158, 11)
    },
    # Day 4
    {
        "day": 4,
        "id": "day04_paint_gallons",
        "title": "Interior Paint Calculator: Exact Gallons for Walls & Ceilings",
        "hook": "Never Run Out of Paint Mid-Wall!",
        "subtitle": "Deducts Doors & Windows + 2-Coat 350 Sq Ft Formula",
        "category": "Painting & Drywall",
        "link": f"{BASE_URL}/calculators/painting",
        "features": ["Wall & Ceiling Surface Area", "Door & Window Deductions", "1 or 2 Coat Coverage Rules", "Primer / PVA Sealer Estimates"],
        "keywords": ["paint calculator", "how many gallons of paint", "bedroom makeover", "best paint colors"],
        "color": (99, 102, 241), "accent": (129, 140, 248)
    },
    # Day 5
    {
        "day": 5,
        "id": "day05_concrete_yards_bags",
        "title": "Concrete Calculator: Cubic Yards & 80lb/60lb Bags Estimator",
        "hook": "Don't Overpay For Ready-Mix Concrete!",
        "subtitle": "Slabs, Footings, Steps & 10% Subgrade Spillage Buffer",
        "category": "Concrete & Masonry",
        "link": f"{BASE_URL}/calculators/concrete-masonry",
        "features": ["Cubic Yards to 80lb/60lb Bags", "Slab Thickness Compaction Buffer", "Rebar Grid & Gravel Base", "Fast Contractor-Verified Math"],
        "keywords": ["concrete calculator", "how many bags of concrete", "diy concrete slab", "patio building"],
        "color": (75, 85, 99), "accent": (107, 114, 128)
    },
    # Day 6
    {
        "day": 6,
        "id": "day06_gravel_driveway",
        "title": "Gravel & Pea Stone Calculator: Tons & Yards Estimator",
        "hook": "Calculate Driveway & French Drain Gravel",
        "subtitle": "Compaction Factor + Accurate Tons to Cubic Yards",
        "category": "Landscaping & Garden",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Tons & Cubic Yard Output", "Pea Gravel, Crushed Stone & Base", "Depth Compaction Factoring", "Budget Price Calculator"],
        "keywords": ["gravel calculator", "pea gravel patio", "driveway gravel tons", "diy landscaping"],
        "color": (13, 148, 136), "accent": (20, 184, 166)
    },
    # Day 7
    {
        "day": 7,
        "id": "day07_paver_patio_sand",
        "title": "Paver Patio & Base Sand Calculator",
        "hook": "Building a Backyard Patio? Calculate Materials First!",
        "subtitle": "4\" Road Base + 1\" Screed Sand + Snap Edging Restraints",
        "category": "Outdoor Living",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Total Interlocking Paver Count", "Crushed Gravel Subbase Yards", "Bedding Sand & Polymeric Grout", "Perimeter Snap Edging Linear Ft"],
        "keywords": ["paver patio calculator", "how to build a paver patio", "diy backyard ideas", "stone pavers"],
        "color": (180, 83, 9), "accent": (217, 119, 6)
    },
    # Day 8
    {
        "day": 8,
        "id": "day08_room_sqft_area",
        "title": "Room Square Footage & Perimeter Calculator",
        "hook": "Measure Any Room Shape Accurately",
        "subtitle": "L-Shaped Spaces, Closets, Alcoves & HVAC Cubic Volume",
        "category": "Home Planning",
        "link": f"{BASE_URL}/calculators/rooms",
        "features": ["Rectangle & L-Shape Support", "Wall Perimeter for Baseboard Trim", "Cubic Feet for HVAC Sizing", "Instant Sq Ft & M2 Output"],
        "keywords": ["room square footage calculator", "how to measure room sq ft", "square footage formula"],
        "color": (147, 51, 234), "accent": (168, 85, 247)
    },
    # Day 9
    {
        "day": 9,
        "id": "day09_mulch_garden_beds",
        "title": "Mulch & Topsoil Calculator: Bags & Bulk Yards",
        "hook": "How Many Bags of Mulch Do You Need?",
        "subtitle": "2\" Weed Suppression & 3\" Moisture Retention Depth Rules",
        "category": "Garden & Outdoors",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Cubic Yards to 2 Cu Ft Bags", "Raised Garden Bed Volume", "Bark, Wood Chips & Straw", "Spring Garden Refresh Planner"],
        "keywords": ["mulch calculator", "how many bags of mulch", "raised garden bed soil", "diy gardening"],
        "color": (22, 101, 52), "accent": (34, 197, 94)
    },
    # Day 10
    {
        "day": 10,
        "id": "day10_wood_fence_materials",
        "title": "Privacy Fence Calculator: Posts, Rails & Pickets",
        "hook": "DIY Privacy Fence Material List Estimator",
        "subtitle": "6ft & 8ft Panels with 4x4 Posts & Concrete Hole Bags",
        "category": "Outdoor Carpentry",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Total 4x4 Post Count", "2x4 Stringer Rails Required", "1x6 Dog-Ear Pickets Count", "Fast-Setting Concrete Bags"],
        "keywords": ["fence calculator", "how to build a wood fence", "diy privacy fence", "backyard privacy"],
        "color": (120, 53, 15), "accent": (180, 83, 9)
    },
    # Day 11
    {
        "day": 11,
        "id": "day11_vinyl_plank_lvp",
        "title": "Luxury Vinyl Plank (LVP) Flooring Calculator",
        "hook": "Waterproof Vinyl Plank Box Estimator",
        "subtitle": "Click-Lock Planks with 8% Staggered Seam Waste",
        "category": "Flooring & DIY",
        "link": f"{BASE_URL}/calculators/flooring",
        "features": ["LVP Box Carton Calculator", "Integrated Pad Requirements", "Staggered End-Joint Offsets", "T-Molding & Reducer Counts"],
        "keywords": ["lvp calculator", "vinyl plank flooring cost", "waterproof flooring", "diy lvp installation"],
        "color": (15, 118, 110), "accent": (20, 184, 166)
    },
    # Day 12
    {
        "day": 12,
        "id": "day12_brick_mortar_wall",
        "title": "Brick & Mortar Estimator: Modular & Standard Bricks",
        "hook": "How Many Bricks For Your Garden Wall?",
        "subtitle": "Standard 3/8\" Mortar Joints + 7 Bricks/Sq Ft Rule",
        "category": "Concrete & Masonry",
        "link": f"{BASE_URL}/calculators/concrete-masonry",
        "features": ["Modular & King Size Bricks", "Type N & S Mortar Bags", "Single & Double Wythe Walls", "Waste Cutting Allowance"],
        "keywords": ["brick calculator", "how many bricks do i need", "diy brick patio", "masonry mortar"],
        "color": (185, 28, 28), "accent": (239, 68, 68)
    },
    # Day 13
    {
        "day": 13,
        "id": "day13_sod_turf_lawn",
        "title": "Turf & Sod Lawn Calculator: Rolls & Pallets",
        "hook": "Measure Your Lawn For Fresh Sod Pallets",
        "subtitle": "Standard 450-500 Sq Ft Pallets + 5% Curved Border Buffer",
        "category": "Garden & Outdoors",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Total Lawn Square Footage", "Standard 10 Sq Ft Roll Count", "Full 500 Sq Ft Pallet Rounding", "Starter Fertilizer Amounts"],
        "keywords": ["sod calculator", "how much sod do i need", "new lawn installation", "diy landscaping"],
        "color": (21, 128, 61), "accent": (34, 197, 94)
    },
    # Day 14
    {
        "day": 14,
        "id": "day14_wallpaper_repeat_rolls",
        "title": "Wallpaper Calculator: Double Rolls & Pattern Repeats",
        "hook": "Never Botch a Wallpaper Match Again!",
        "subtitle": "Calculates Pattern Repeat Drop Waste & Window Deductions",
        "category": "Rooms & Walls",
        "link": f"{BASE_URL}/calculators/rooms",
        "features": ["Double Roll vs Single Roll", "Vertical Pattern Repeat Loss", "Net Drywall Surface Area", "Paste & Primer Estimates"],
        "keywords": ["wallpaper calculator", "how many rolls of wallpaper", "wallpaper pattern repeat", "accent wall ideas"],
        "color": (190, 24, 93), "accent": (236, 72, 153)
    },
    # Day 15
    {
        "day": 15,
        "id": "day15_drywall_wall_area",
        "title": "Drywall & Net Wall Area Calculator",
        "hook": "Net Wall Area Minus Windows & Doors",
        "subtitle": "4x8 and 4x12 Sheet Breakdown for Fast Hanging",
        "category": "Painting & Drywall",
        "link": f"{BASE_URL}/calculators/rooms",
        "features": ["Door & Window Cutout Deduction", "4x8 & 4x12 Drywall Sheets", "Joint Compound & Tape Rolls", "Screw Fastener Counts"],
        "keywords": ["drywall calculator", "how many sheets of drywall", "diy drywall hanging", "room remodel"],
        "color": (67, 56, 202), "accent": (99, 102, 241)
    },
    # Day 16
    {
        "day": 16,
        "id": "day16_cinder_block_cmu",
        "title": "CMU Cinder Block & Foundation Calculator",
        "hook": "8x8x16 Cinder Block Estimator",
        "subtitle": "Retaining Walls, Foundations & Core Grout Fill",
        "category": "Concrete & Masonry",
        "link": f"{BASE_URL}/calculators/concrete-masonry",
        "features": ["Standard 8x8x16 Block Counts", "Corner & Half-Block Allowances", "Mortar Bag Calculations", "Core-Fill Concrete Yards"],
        "keywords": ["cinder block calculator", "cmu wall estimator", "diy retaining wall", "concrete blocks"],
        "color": (51, 65, 85), "accent": (71, 85, 105)
    },
    # Day 17
    {
        "day": 17,
        "id": "day17_carpet_square_yards",
        "title": "Carpet & Padding Calculator: Square Yards & Seams",
        "hook": "Convert Room Sq Ft to Carpet Square Yards",
        "subtitle": "12ft & 15ft Broadloom Roll Cut Width Optimization",
        "category": "Flooring & DIY",
        "link": f"{BASE_URL}/calculators/flooring",
        "features": ["Sq Ft to Square Yards (SY)", "12ft & 15ft Roll Seam Cuts", "Rebond Foam Cushion Padding", "Tackless Gripper Strip Length"],
        "keywords": ["carpet calculator", "how to measure carpet", "carpet square yards", "diy carpet padding"],
        "color": (161, 98, 7), "accent": (202, 138, 4)
    },
    # Day 18
    {
        "day": 18,
        "id": "day18_skirting_baseboard_trim",
        "title": "Baseboard & Skirting Board Linear Footage Calculator",
        "hook": "Calculate Baseboard Trim & 45° Miter Waste",
        "subtitle": "Perimeter Minus Doorways + 10% Scarf Joint Allowance",
        "category": "Carpentry & Trim",
        "link": f"{BASE_URL}/calculators/rooms",
        "features": ["Net Wall Perimeter Linear Ft", "8ft, 12ft & 16ft Board Lengths", "Miter & Scarf Joint Buffer", "Finish Nail Fastener Count"],
        "keywords": ["baseboard calculator", "how much trim do i need", "diy baseboard installation", "miter cuts"],
        "color": (14, 116, 144), "accent": (6, 182, 212)
    },
    # Day 19
    {
        "day": 19,
        "id": "day19_ceiling_paint_sloped",
        "title": "Ceiling Paint Calculator: Flat & Vaulted Angles",
        "hook": "Calculate Ceiling Paint in Seconds",
        "subtitle": "Flat White Coverage + Cathedral/Vaulted Slope Factors",
        "category": "Painting & Drywall",
        "link": f"{BASE_URL}/calculators/painting",
        "features": ["Vaulted & Cathedral Pitch Pitch Multipliers", "1 or 2 Coat Flat Ceiling Formulas", "Recessed Light Cutouts", "Gallons & Quarts Output"],
        "keywords": ["ceiling paint calculator", "how to paint a ceiling", "vaulted ceiling square footage", "best ceiling paint"],
        "color": (79, 70, 229), "accent": (99, 102, 241)
    },
    # Day 20
    {
        "day": 20,
        "id": "day20_flooring_waste_guide",
        "title": "Flooring Waste Percentage Guide & Cheat Sheet",
        "hook": "Why 10% Waste Factor is Non-Negotiable!",
        "subtitle": "Straight (10%), Diagonal (15%) & Herringbone (20%) Rules",
        "category": "Flooring Tips & Guides",
        "link": f"{BASE_URL}/guides/flooring-waste-percentage-guide",
        "features": ["Pattern Waste Multipliers", "Defective Board Allowances", "Room Shape Complexity Factors", "Free Printable Cheat Sheet"],
        "keywords": ["flooring waste percentage", "herringbone flooring waste", "how much extra flooring to buy"],
        "color": (4, 120, 87), "accent": (16, 185, 129)
    },
    # Day 21
    {
        "day": 21,
        "id": "day21_tile_trowel_thinset",
        "title": "Tile Trowel Notch Size & Thinset Coverage Guide",
        "hook": "Picking The Right Trowel Notch Size!",
        "subtitle": "1/4x3/8 for Subway vs 1/2x1/2 for Large Format 12x24",
        "category": "Tiling Guides",
        "link": f"{BASE_URL}/guides/tile-trowel-size-thinset-guide",
        "features": ["Square vs U-Notch Profiles", "80% to 95% Mortar Contact Rules", "Large Format Tile Back-Buttering", "50lb Bag Coverage Chart"],
        "keywords": ["trowel notch size for 12x24", "tile thinset coverage", "how to tile like a pro", "diy bathroom tile"],
        "color": (29, 78, 216), "accent": (37, 99, 235)
    },
    # Day 22
    {
        "day": 22,
        "id": "day22_sqft_to_m2_converter",
        "title": "Square Feet to Square Metres (m²) Converter",
        "hook": "Instant Metric to Imperial Surface Area Converter",
        "subtitle": "Accurate 0.092903 Multiplier for Global Building Materials",
        "category": "Trade Conversions",
        "link": f"{BASE_URL}/calculators/conversions",
        "features": ["Sq Ft ↔ M2 Instant Switch", "Meters / Cm / Mm Dimensions", "Material Box Packaging Comparison", "100% Client-Side Fast Math"],
        "keywords": ["sq ft to m2 converter", "square feet to square meters", "metric flooring converter"],
        "color": (109, 40, 217), "accent": (139, 92, 246)
    },
    # Day 23
    {
        "day": 23,
        "id": "day23_topsoil_raised_bed",
        "title": "Raised Garden Bed & Topsoil Soil Volume Calculator",
        "hook": "How Much Soil For Your Raised Garden Beds?",
        "subtitle": "Length x Width x Depth in Cubic Feet & 40lb Soil Bags",
        "category": "Garden & Outdoors",
        "link": f"{BASE_URL}/calculators/garden",
        "features": ["Cubic Feet & Cubic Yards Output", "Compost & Topsoil Ratio Mixes", "40lb & 1 Cu Ft Bag Breakdown", "Spring Planting Soil Planner"],
        "keywords": ["raised garden bed soil calculator", "topsoil calculator", "how much dirt do i need", "diy gardening"],
        "color": (20, 83, 45), "accent": (34, 197, 94)
    },
    # Day 24
    {
        "day": 24,
        "id": "day24_laminate_acclimation_guide",
        "title": "Laminate Acclimation & Expansion Gap Guide",
        "hook": "Stop Laminate Floors From Buckling!",
        "subtitle": "48-Hour Acclimation & 3/8\" Wall Gap Perimeter Rules",
        "category": "Flooring Guides",
        "link": f"{BASE_URL}/guides/laminate-acclimation-expansion-gap-guide",
        "features": ["HVAC Temperature Stabilization", "Subfloor Moisture Testing", "T-Molding Runs Over 30 Feet", "Contractor Checklist"],
        "keywords": ["laminate acclimation time", "why is my laminate floor buckling", "expansion gap laminate", "diy flooring guide"],
        "color": (180, 83, 9), "accent": (217, 119, 6)
    },
    # Day 25
    {
        "day": 25,
        "id": "day25_primer_sealer_paint",
        "title": "Primer & PVA Sealer Estimator for Fresh Drywall",
        "hook": "Never Skip Primer On Fresh Drywall!",
        "subtitle": "PVA Sealer, Stain-Blocking Shellac & Tinted Primers",
        "category": "Painting & Drywall",
        "link": f"{BASE_URL}/calculators/painting",
        "features": ["PVA Drywall Sealer Gallons", "Stain-Blocking Primer Amounts", "Porosity Absorption Multipliers", "Total Project Paint Savings"],
        "keywords": ["primer calculator", "pva drywall primer", "how much primer do i need", "painting tips"],
        "color": (88, 28, 135), "accent": (147, 51, 234)
    },
    # Day 26
    {
        "day": 26,
        "id": "day26_hardwood_flooring_boxes",
        "title": "Solid Hardwood Flooring Estimator: Bundles & Fasteners",
        "hook": "Calculate Solid Hardwood Bundles Accurately",
        "subtitle": "Random-Length Planks + Cleat / Staple Fastener Counts",
        "category": "Flooring & DIY",
        "link": f"{BASE_URL}/calculators/flooring/flooring-calculator",
        "features": ["Bundle Sq Ft Packaging Rules", "Flooring Cleats / Staples Count", "Rosin Paper Underlayment", "Hardwood Acclimation Advice"],
        "keywords": ["hardwood floor calculator", "solid oak flooring cost", "diy hardwood floor", "flooring installation"],
        "color": (120, 53, 15), "accent": (180, 83, 9)
    },
    # Day 27
    {
        "day": 27,
        "id": "day27_subway_tile_backsplash",
        "title": "Subway Tile Backsplash Estimator: 3x6 & Herringbone",
        "hook": "DIY Kitchen Backsplash Tile Calculator",
        "subtitle": "3x6 Subway Tiles + Outlet Deductions & Bullnose Trim",
        "category": "Kitchen & Bath",
        "link": f"{BASE_URL}/calculators/flooring/tile-calculator",
        "features": ["3x6 Subway Tile Multipliers", "Electrical Outlet Deductions", "Edge Bullnose / Schluter Strips", "Small Batch Grout Math"],
        "keywords": ["subway tile calculator", "kitchen backsplash tile", "diy subway tile", "backsplash cost"],
        "color": (30, 58, 138), "accent": (37, 99, 235)
    },
    # Day 28
    {
        "day": 28,
        "id": "day28_masonry_mortar_mix",
        "title": "Masonry Mortar & Cement Bag Calculator",
        "hook": "Calculate Mortar Bags For Bricks & Blocks",
        "subtitle": "Type N Above-Grade & Type S Below-Grade Specifications",
        "category": "Concrete & Masonry",
        "link": f"{BASE_URL}/calculators/concrete-masonry",
        "features": ["Type N vs Type S Selection", "Bricks per 70lb Mortar Bag", "CMU Blocks per 70lb Bag", "Masonry Sand Ratio Rules"],
        "keywords": ["mortar calculator", "how many bags of mortar", "type n mortar", "brick laying diy"],
        "color": (68, 64, 60), "accent": (120, 113, 108)
    },
    # Day 29
    {
        "day": 29,
        "id": "day29_feet_meters_trade_converter",
        "title": "Feet & Inches to Metres & Millimetres Converter",
        "hook": "Precision Trade Measurement Converter",
        "subtitle": "Converts Fractions (1/8\", 1/16\") to Exact Metric Millimetres",
        "category": "Trade Conversions",
        "link": f"{BASE_URL}/calculators/conversions",
        "features": ["Imperial Fractions to Metric MM", "Architectural Decimal Feet", "Fast Construction Blueprints", "100% Free Client-Side Tool"],
        "keywords": ["feet to meters converter", "inches to mm", "construction measurement converter"],
        "color": (15, 118, 110), "accent": (13, 148, 136)
    },
    # Day 30
    {
        "day": 30,
        "id": "day30_master_diy_hub",
        "title": "Master DIY Home Improvement Calculator Hub [33 Free Tools]",
        "hook": "All 33 Home Improvement Calculators in One Place!",
        "subtitle": "Flooring, Painting, Concrete, Garden, Rooms & Conversions",
        "category": "Master DIY Hub",
        "link": f"{BASE_URL}/calculators",
        "features": ["33 Specialized Calculation Tools", "Contractor-Verified Math", "Zero Registration Required", "Mobile & Tablet Optimized"],
        "keywords": ["home improvement calculators", "diy building calculators", "free construction tools", "renovation cost estimator"],
        "color": (2, 132, 199), "accent": (14, 165, 233)
    },
]

def generate_pin_card(item, output_path):
    width, height = 1000, 1500
    img = Image.new("RGB", (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Top Brand Bar
    header_color = item["color"]
    draw.rectangle([(0, 0), (width, 240)], fill=header_color)

    try:
        font_brand = ImageFont.truetype("arial.ttf", 36)
        font_cat = ImageFont.truetype("arialbd.ttf", 24)
        font_hook = ImageFont.truetype("arialbd.ttf", 60)
        font_sub = ImageFont.truetype("arial.ttf", 32)
        font_feat = ImageFont.truetype("arialbd.ttf", 28)
        font_btn = ImageFont.truetype("arialbd.ttf", 34)
    except:
        font_brand = font_cat = font_hook = font_sub = font_feat = font_btn = ImageFont.load_default()

    draw.text((60, 60), "CRAFTCALC  •  PRECISION TOOLS", fill=(255, 255, 255), font=font_brand)
    draw.text((60, 120), f"DAY {item['day']} OF 30  |  {item['category'].upper()}", fill=(224, 242, 254), font=font_cat)

    # Main Card
    card_m = 60
    card_top = 290
    card_bot = 1280
    draw.rounded_rectangle([(card_m, card_top), (width - card_m, card_bot)], radius=32, fill=(248, 250, 252), outline=(226, 232, 240), width=3)

    # Badge Pill
    badge_w, badge_h = 380, 54
    badge_x = (width - badge_w) // 2
    badge_y = card_top + 45
    draw.rounded_rectangle([(badge_x, badge_y), (badge_x + badge_w, badge_y + badge_h)], radius=27, fill=item["accent"])
    draw.text((badge_x + 35, badge_y + 12), "100% FREE ESTIMATOR", fill=(255, 255, 255), font=font_cat)

    # Viral Hook Headline (wrapped)
    words = item["hook"].split()
    lines = []
    curr = []
    for w in words:
        curr.append(w)
        if len(" ".join(curr)) > 17:
            lines.append(" ".join(curr))
            curr = []
    if curr:
        lines.append(" ".join(curr))

    y_t = card_top + 135
    for line in lines[:3]:
        draw.text((100, y_t), line, fill=(15, 23, 42), font=font_hook)
        y_t += 74

    # Subtitle
    draw.text((100, y_t + 18), item["subtitle"], fill=(100, 116, 139), font=font_sub)

    # Feature Value Props
    props_y = y_t + 95
    for feat in item["features"]:
        draw.text((100, props_y), f"✓ {feat}", fill=(30, 41, 59), font=font_feat)
        props_y += 52

    # Bottom Button
    btn_w, btn_h = 600, 84
    btn_x = (width - btn_w) // 2
    btn_y = card_bot - 125
    draw.rounded_rectangle([(btn_x, btn_y), (btn_x + btn_w, btn_y + btn_h)], radius=24, fill=header_color)
    draw.text((btn_x + 65, btn_y + 22), "USE FREE CALCULATOR →", fill=(255, 255, 255), font=font_btn)

    # Bottom Domain URL
    draw.text((360, 1350), "tool-1-pied.vercel.app", fill=(148, 163, 184), font=font_cat)

    img.save(output_path, quality=95)
    print(f"[OK] Generated Day {item['day']} Pin: {output_path}")

def generate_full_month_package(out_dir="pinterest_output/month_schedule"):
    os.makedirs(out_dir, exist_ok=True)
    csv_file = os.path.join(out_dir, "30_day_pinterest_schedule.csv")

    rows = []
    base_date = datetime.now()

    for item in MONTH_CONTENT:
        img_name = f"{item['id']}.jpg"
        img_path = os.path.join(out_dir, img_name)
        generate_pin_card(item, img_path)

        post_date = (base_date + timedelta(days=item["day"] - 1, hours=10)).strftime("%Y-%m-%d %H:%M")
        hashtags = " ".join([f"#{k.replace(' ', '')}" for k in item["keywords"]] + ["#DIYProjects", "#HomeImprovement", "#RenovationTips", "#BuildingCalculators"])

        desc = (
            f"Planning a {item['category']} project? {item['hook']} {item['subtitle']}. "
            f"Use our free, contractor-verified online tool with real-world material rounding and waste formulas. "
            f"\n\n{hashtags}"
        )

        rows.append({
            "Day": f"Day {item['day']}",
            "Title": item["title"],
            "Description": desc,
            "Destination_Link": item["link"],
            "Image_URL": f"https://raw.githubusercontent.com/danielirfang-creator/tool-1/main/pinterest_output/month_schedule/{img_name}",
            "Schedule_Date": post_date,
            "Board": item["category"]
        })

    with open(csv_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Day", "Title", "Description", "Destination_Link", "Image_URL", "Schedule_Date", "Board"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n[SUCCESS] Generated 30-Day Master Schedule with 30 HD Pins in: {out_dir}")

if __name__ == "__main__":
    generate_full_month_package()
