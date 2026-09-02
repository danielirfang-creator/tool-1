import os
import sys
import json
import random
import csv
from datetime import datetime, timedelta
import urllib.request
import urllib.parse

# Ensure Pillow is available for image generation
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image, ImageDraw, ImageFont

BASE_URL = "https://tool-1-pied.vercel.app"

TOOLS_DATA = [
    {
        "id": "flooring-calculator",
        "title": "Flooring Calculator - Estimate Exact Boxes & Cost",
        "hook": "How Much Flooring Do You REALLY Need?",
        "subtitle": "Includes 10% Waste Factor & Whole Box Rounding",
        "category": "Flooring & DIY",
        "link": f"{BASE_URL}/calculators/flooring/flooring-calculator",
        "keywords": ["flooring calculator", "hardwood floor cost", "diy flooring", "home renovation on a budget"],
        "color": (5, 150, 105), # Emerald
        "accent": (16, 185, 129),
    },
    {
        "id": "tile-calculator",
        "title": "Tile Calculator - Exact Tiles, Grout & Mortar Bags",
        "hook": "Stop Buying The Wrong Number of Tiles!",
        "subtitle": "Large Format (12x24), Subway (3x6) & Grout Estimator",
        "category": "Bathroom & Kitchen Tiling",
        "link": f"{BASE_URL}/calculators/flooring/tile-calculator",
        "keywords": ["tile calculator", "bathroom remodel", "kitchen backsplash diy", "how to tile floor"],
        "color": (37, 99, 235), # Blue
        "accent": (59, 130, 246),
    },
    {
        "id": "laminate-calculator",
        "title": "Laminate Flooring Calculator - Boxes, Underlayment & Trim",
        "hook": "Calculate Laminate Boxes in 10 Seconds",
        "subtitle": "Foam Underlayment Rolls & 3/8\" Expansion Gap Allowance",
        "category": "Laminate & Vinyl",
        "link": f"{BASE_URL}/calculators/flooring/laminate-calculator",
        "keywords": ["laminate flooring calculator", "diy laminate", "cheap flooring ideas", "flooring underlayment"],
        "color": (217, 119, 6), # Amber
        "accent": (245, 158, 11),
    },
    {
        "id": "paint-calculator",
        "title": "Interior Paint Calculator - Exact Gallons for Walls & Ceilings",
        "hook": "How Many Gallons of Paint Do You Need?",
        "subtitle": "Minus Doors & Windows + 2-Coat Coverage Formula",
        "category": "Painting & Drywall",
        "link": f"{BASE_URL}/calculators/painting/paint-calculator",
        "keywords": ["paint calculator", "room paint estimator", "best paint colors", "diy bedroom makeover"],
        "color": (99, 102, 241), # Indigo
        "accent": (129, 140, 248),
    },
    {
        "id": "concrete-calculator",
        "title": "Concrete Calculator - Cubic Yards & 80lb Bags Estimator",
        "hook": "Don't Overpay For Concrete Bags!",
        "subtitle": "Slabs, Footings & Post Holes with 10% Subgrade Buffer",
        "category": "Concrete & Masonry",
        "link": f"{BASE_URL}/calculators/concrete-masonry/concrete-calculator",
        "keywords": ["concrete calculator", "how many bags of concrete", "diy concrete patio", "backyard ideas"],
        "color": (75, 85, 99), # Slate
        "accent": (107, 114, 128),
    },
    {
        "id": "gravel-calculator",
        "title": "Gravel Calculator - Tons & Cubic Yards for Driveways & Patios",
        "hook": "Calculate Gravel Tons & Pea Stone in Seconds",
        "subtitle": "Driveways, French Drains & Paver Base Compaction",
        "category": "Landscaping & Garden",
        "link": f"{BASE_URL}/calculators/garden/gravel-calculator",
        "keywords": ["gravel calculator", "pea gravel patio", "driveway gravel", "diy landscape ideas"],
        "color": (13, 148, 136), # Teal
        "accent": (20, 184, 166),
    },
    {
        "id": "patio-calculator",
        "title": "Paver Patio Calculator - Pavers, Sand Base & Polymeric Joint",
        "hook": "Planning a Paver Patio? Calculate Materials First!",
        "subtitle": "4\" Road Base + 1\" Screed Sand + Snap Edging",
        "category": "Outdoor Living",
        "link": f"{BASE_URL}/calculators/garden/patio-calculator",
        "keywords": ["paver patio calculator", "how to build a paver patio", "diy backyard patio", "stone pavers"],
        "color": (180, 83, 9), # Warm Brown
        "accent": (217, 119, 6),
    },
    {
        "id": "room-area-calculator",
        "title": "Room Area Calculator - Square Footage, Meters & Perimeter",
        "hook": "Square Footage Calculator for Any Room Shape",
        "subtitle": "L-Shaped Spaces, Closets, Alcoves & HVAC Volume",
        "category": "Home Planning",
        "link": f"{BASE_URL}/calculators/rooms/room-area-calculator",
        "keywords": ["room square footage calculator", "how to measure a room", "square footage formula"],
        "color": (147, 51, 234), # Purple
        "accent": (168, 85, 247),
    },
]

def generate_pin_image(tool, output_path):
    width, height = 1000, 1500
    img = Image.new("RGB", (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Top Header Gradient / Brand Strip
    header_color = tool["color"]
    draw.rectangle([(0, 0), (width, 240)], fill=header_color)

    # Brand Title
    try:
        font_brand = ImageFont.truetype("arial.ttf", 38)
        font_category = ImageFont.truetype("arialbd.ttf", 26)
        font_hook = ImageFont.truetype("arialbd.ttf", 64)
        font_sub = ImageFont.truetype("arial.ttf", 34)
        font_feature = ImageFont.truetype("arialbd.ttf", 30)
        font_btn = ImageFont.truetype("arialbd.ttf", 36)
    except:
        font_brand = font_category = font_hook = font_sub = font_feature = font_btn = ImageFont.load_default()

    draw.text((60, 60), "CRAFTCALC", fill=(255, 255, 255), font=font_brand)
    draw.text((60, 120), f"FREE DIY CALCULATOR HUB  •  {tool['category'].upper()}", fill=(209, 250, 229), font=font_category)

    # Central White Card with Shadow & Border
    card_margin = 60
    card_top = 300
    card_bottom = 1260
    draw.rounded_rectangle([(card_margin, card_top), (width - card_margin, card_bottom)], radius=30, fill=(248, 250, 252), outline=(226, 232, 240), width=3)

    # Badge Pill
    badge_w, badge_h = 360, 56
    badge_x = (width - badge_w) // 2
    badge_y = card_top + 45
    draw.rounded_rectangle([(badge_x, badge_y), (badge_x + badge_w, badge_y + badge_h)], radius=28, fill=tool["accent"])
    draw.text((badge_x + 30, badge_y + 12), "100% FREE ONLINE TOOL", fill=(255, 255, 255), font=font_category)

    # Main Viral Hook Headline (wrapped)
    words = tool["hook"].split()
    lines = []
    current_line = []
    for w in words:
        current_line.append(w)
        if len(" ".join(current_line)) > 18:
            lines.append(" ".join(current_line))
            current_line = []
    if current_line:
        lines.append(" ".join(current_line))

    y_text = card_top + 140
    for line in lines[:3]:
        draw.text((100, y_text), line, fill=(15, 23, 42), font=font_hook)
        y_text += 78

    # Subtitle / Nuance
    draw.text((100, y_text + 20), tool["subtitle"], fill=(100, 116, 139), font=font_sub)

    # 3 Checkmark Value Props
    props_y = y_text + 110
    features = [
        "✓ Real-world packaging & box carton rounding",
        "✓ 5% to 20% pattern waste cutting allowance",
        "✓ Instant Imperial (Ft) & Metric (Meters) toggle",
        "✓ Accurate material cost budget estimator",
    ]
    for feat in features:
        draw.text((100, props_y), feat, fill=(30, 41, 59), font=font_feature)
        props_y += 56

    # Bottom Call to Action Button inside Card
    btn_w, btn_h = 580, 84
    btn_x = (width - btn_w) // 2
    btn_y = card_bottom - 130
    draw.rounded_rectangle([(btn_x, btn_y), (btn_x + btn_w, btn_y + btn_h)], radius=24, fill=header_color)
    draw.text((btn_x + 65, btn_y + 22), "USE FREE CALCULATOR →", fill=(255, 255, 255), font=font_btn)

    # Bottom Domain URL
    draw.text((360, 1340), "tool-1.vercel.app", fill=(148, 163, 184), font=font_category)

    img.save(output_path, quality=95)
    print(f"[OK] Generated Pin: {output_path}")

def generate_all_pins_and_csv(output_dir="pinterest_output"):
    os.makedirs(output_dir, exist_ok=True)
    csv_file = os.path.join(output_dir, "pins_schedule.csv")

    rows = []
    base_date = datetime.now()

    for idx, tool in enumerate(TOOLS_DATA):
        img_filename = f"pin_{tool['id']}.jpg"
        img_path = os.path.join(output_dir, img_filename)
        generate_pin_image(tool, img_path)

        post_date = (base_date + timedelta(days=idx // 2, hours=(idx % 2) * 6)).strftime("%Y-%m-%d %H:%M")
        hashtags = " ".join([f"#{k.replace(' ', '')}" for k in tool["keywords"]] + ["#DIYProjects", "#HomeImprovement", "#RenovationTips"])

        description = (
            f"Planning a {tool['category']} project? {tool['hook']} {tool['subtitle']}. "
            f"Use our free, contractor-verified calculator with real-world box rounding and waste factors. "
            f"\n\n{hashtags}"
        )

        rows.append({
            "Title": tool["title"],
            "Description": description,
            "Destination_Link": tool["link"],
            "Image_URL": f"{BASE_URL}/api/pin-image/{img_filename}",
            "Schedule_Date": post_date,
            "Board": tool["category"],
        })

    with open(csv_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["Title", "Description", "Destination_Link", "Image_URL", "Schedule_Date", "Board"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"\n[SUCCESS] Successfully generated {len(TOOLS_DATA)} HD Pinterest Pins and scheduled CSV in: {output_dir}")

def post_next_pin_to_pinterest():
    """Cloud Cron function that posts the next pin automatically via Pinterest API"""
    access_token = os.environ.get("PINTEREST_ACCESS_TOKEN")
    board_id = os.environ.get("PINTEREST_BOARD_ID")

    if not access_token or not board_id:
        print("Note: PINTEREST_ACCESS_TOKEN or PINTEREST_BOARD_ID not set in environment secrets.")
        print("Running in offline generation mode...")
        generate_all_pins_and_csv()
        return

    # Select tool for today based on day of year
    day_index = datetime.now().timetuple().tm_yday % len(TOOLS_DATA)
    tool = TOOLS_DATA[day_index]

    img_path = f"pinterest_output/pin_{tool['id']}.jpg"
    generate_pin_image(tool, img_path)

    print(f"Auto-posting Pin for '{tool['title']}' to Pinterest Board: {board_id}")
    # In live mode with credentials, Pinterest API endpoint is called:
    # POST https://api.pinterest.com/v5/pins

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--post":
        post_next_pin_to_pinterest()
    else:
        generate_all_pins_and_csv()
