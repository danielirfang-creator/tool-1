import os
import sys
import time
import csv
import json
import argparse
from datetime import datetime
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
BOT_DIR = BASE_DIR / "pinterest_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"
HISTORY_FILE = BOT_DIR / "posted_history.json"
CSV_SCHEDULE_FILE = BASE_DIR / "public" / "pinterest_180_videos_schedule.csv"
PUBLIC_DIR = BASE_DIR / "public"

def ensure_dirs():
    BOT_DIR.mkdir(parents=True, exist_ok=True)
    if not HISTORY_FILE.exists():
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump({"posted_ids": [], "logs": []}, f, indent=2)

def load_history():
    ensure_dirs()
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"posted_ids": [], "logs": []}

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def load_schedule():
    if not CSV_SCHEDULE_FILE.exists():
        print(f"[ERROR] Schedule file not found at {CSV_SCHEDULE_FILE}")
        return []
    
    rows = []
    with open(CSV_SCHEDULE_FILE, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    return rows

def resolve_local_media(row):
    # Try video first
    video_url = row.get("Video_URL", "")
    if video_url:
        video_name = video_url.split("/")[-1]
        local_video = PUBLIC_DIR / "video_pins" / video_name
        if local_video.exists():
            return str(local_video), "video"
    
    # Try image
    cover_url = row.get("Cover_Image_URL", "")
    if cover_url:
        img_name = cover_url.split("/")[-1]
        local_img = PUBLIC_DIR / "pins" / img_name
        if local_img.exists():
            return str(local_img), "image"
        
    # Fallback to any matching file
    all_videos = list((PUBLIC_DIR / "video_pins").glob("*.mp4"))
    if all_videos:
        return str(all_videos[0]), "video"
    
    all_pins = list((PUBLIC_DIR / "pins").glob("*.jpg"))
    if all_pins:
        return str(all_pins[0]), "image"
        
    return None, None

def do_login():
    ensure_dirs()
    print("=" * 60)
    print("🚀 OPENING BROWSER FOR 1-TIME PINTEREST LOGIN")
    print("=" * 60)
    print("1. Browser khul raha hai...")
    print("2. Apne Pinterest Account par Login karein.")
    print("3. Jab login mukammal ho jaye, to yahan wapis aa kar ENTER dabayein.")
    print("=" * 60)

    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=False,
            viewport={"width": 1280, "height": 800},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = browser_context.new_page()
        page.goto("https://www.pinterest.com/login/", timeout=60000)
        
        input("\n👉 Pinterest par login karne ke baad yahan ENTER press karein: ")
        
        # Save storage state for cloud runner (cookies + tokens)
        browser_context.storage_state(path=str(STORAGE_STATE_FILE))
        print(f"✅ Cloud Session File Saved: {STORAGE_STATE_FILE}")
        
        browser_context.close()
        print("🎉 Login setup complete! Ab aapka Cloud Bot tayyar hai.")

def get_browser_context(p, headless=False):
    if STORAGE_STATE_FILE.exists():
        browser = p.chromium.launch(headless=headless)
        context = browser.new_context(
            storage_state=str(STORAGE_STATE_FILE),
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        return context, browser
    else:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        return context, None

def post_single_pin(row, headless=False):
    media_path, media_type = resolve_local_media(row)
    if not media_path or not os.path.exists(media_path):
        print(f"[ERROR] No valid media found for Pin ID {row.get('ID')}")
        return False

    pin_id = row.get("ID", "")
    title = row.get("Title", "")[:100]
    description = row.get("Description", "")[:500]
    destination_link = row.get("Destination_Link", "https://tool-1-pied.vercel.app")
    board_name = row.get("Board", "DIY & Home Improvement")

    print(f"\n📌 Processing Pin #{pin_id}: {title}")
    print(f"🎬 Media: {Path(media_path).name} ({media_type.upper()})")
    print(f"🔗 Link: {destination_link}")

    with sync_playwright() as p:
        context, browser = get_browser_context(p, headless=headless)
        page = context.new_page()
        
        try:
            page.goto("https://www.pinterest.com/pin-creation-tool/", timeout=45000)
            page.wait_for_timeout(4000)

            # Check if login expired or missing
            if "login" in page.url.lower():
                print("[WARNING] User is not logged in! Please run 1_LOGIN_PINTEREST.bat first.")
                context.close()
                if browser: browser.close()
                return False

            # Upload media file
            file_input = page.locator('input[type="file"]').first
            if file_input.count() == 0:
                page.goto("https://www.pinterest.com/pin-builder/", timeout=45000)
                page.wait_for_timeout(4000)
                file_input = page.locator('input[type="file"]').first

            if file_input.count() > 0:
                file_input.set_input_files(media_path)
                print("   ✔ Media uploaded successfully")
                page.wait_for_timeout(5000)
            else:
                print("   [!] Upload input not found directly, proceeding...")

            # Fill Title
            title_selectors = [
                'input[id*="storyboard-selector-title"]',
                'textarea[id*="pin-title"]',
                'input[data-test-id="pin-draft-title"]',
                'input[placeholder*="title" i]',
                'textarea[placeholder*="title" i]'
            ]
            for sel in title_selectors:
                if page.locator(sel).count() > 0:
                    page.locator(sel).first.fill(title)
                    print("   ✔ Title filled")
                    break

            page.wait_for_timeout(1000)

            # Fill Description
            desc_selectors = [
                'div[data-test-id="pin-draft-description"] [contenteditable="true"]',
                'textarea[id*="pin-description"]',
                'textarea[data-test-id="pin-draft-description"]',
                'div[id*="storyboard-selector-description"] [contenteditable="true"]',
                'textarea[placeholder*="description" i]'
            ]
            for sel in desc_selectors:
                if page.locator(sel).count() > 0:
                    page.locator(sel).first.fill(description)
                    print("   ✔ Description filled")
                    break

            page.wait_for_timeout(1000)

            # Fill Link
            link_selectors = [
                'input[data-test-id="pin-draft-link"]',
                'input[id*="pin-link"]',
                'input[placeholder*="link" i]',
                'input[placeholder*="destination" i]'
            ]
            for sel in link_selectors:
                if page.locator(sel).count() > 0:
                    page.locator(sel).first.fill(destination_link)
                    print("   ✔ Link filled")
                    break

            page.wait_for_timeout(2000)

            # Select or Create Board (Required for Publish button to be enabled)
            try:
                board_pickers = [
                    '[data-test-id="board-dropdown-select-button"]',
                    'button[aria-label*="Board" i]',
                    'button[aria-label*="board" i]',
                    'button:has-text("Choose a board")',
                    'button:has-text("Select")',
                    '[data-test-id="board-dropdown"]'
                ]
                
                board_selected = False
                for sel in board_pickers:
                    picker = page.locator(sel)
                    if picker.count() > 0 and picker.first.is_visible():
                        picker.first.click()
                        page.wait_for_timeout(2000)
                        
                        # Look for existing boards in dropdown
                        boards = page.locator('[data-test-id="board-row"], [role="option"], div[data-test-id*="board"]')
                        if boards.count() > 0:
                            boards.first.click()
                            board_selected = True
                            print("   ✔ Board selected from list")
                            page.wait_for_timeout(1500)
                            break
                        
                        # If no boards found, try creating one
                        create_btn = page.locator('button:has-text("Create board"), [data-test-id="create-board-button"]')
                        if create_btn.count() > 0 and create_btn.first.is_visible():
                            create_btn.first.click()
                            page.wait_for_timeout(1500)
                            b_input = page.locator('input[id*="board-name"], input[placeholder*="Name" i], input[type="text"]')
                            if b_input.count() > 0:
                                b_input.first.fill(board_name)
                            b_create = page.locator('button:has-text("Create"), button[type="submit"]')
                            if b_create.count() > 0:
                                b_create.first.click()
                                board_selected = True
                                print(f"   ✔ Created & selected new board: {board_name}")
                                page.wait_for_timeout(2000)
                                break
            except Exception as b_err:
                print(f"   [!] Board selection notice: {b_err}")

            page.wait_for_timeout(3000)

            # Click Publish / Save Button
            publish_selectors = [
                'button[data-test-id="board-dropdown-save-button"]',
                'button:has-text("Publish")',
                'button:has-text("Save")',
                'div[data-test-id="board-dropdown-save-button"]'
            ]
            
            published = False
            for sel in publish_selectors:
                btn = page.locator(sel).first
                if btn.count() > 0 and btn.is_visible():
                    # Wait up to 15 seconds for button to be enabled
                    for _ in range(30):
                        if not btn.is_disabled():
                            break
                        page.wait_for_timeout(500)
                    
                    if not btn.is_disabled():
                        btn.click()
                        published = True
                        print("   ✔ Clicked Publish button")
                        break
                    else:
                        print("   [!] Publish button is still disabled, attempting click...")
                        btn.click(force=True)
                        published = True
                        break

            page.wait_for_timeout(7000)
            
            # Record success
            history = load_history()
            if pin_id not in history["posted_ids"]:
                history["posted_ids"].append(pin_id)
            history["logs"].append({
                "id": pin_id,
                "title": title,
                "link": destination_link,
                "media": Path(media_path).name,
                "timestamp": datetime.now().isoformat(),
                "status": "SUCCESS"
            })
            save_history(history)
            
            print(f"🎉 SUCCESS! Pin #{pin_id} published.")
            context.close()
            if browser: browser.close()
            return True

        except Exception as e:
            print(f"[ERROR] Failed to post pin #{pin_id}: {e}")
            context.close()
            if browser: browser.close()
            return False

def run_schedule(interval_hours=4, headless=False):
    print("=" * 60)
    print(f"🤖 CRAFTCALC PINTEREST BOT RUNNING")
    print(f"⏰ Interval: 1 Pin every {interval_hours} hours")
    print("=" * 60)

    schedule_rows = load_schedule()
    if not schedule_rows:
        print("[ERROR] No pins found in schedule CSV!")
        return

    while True:
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        
        next_pin = None
        for row in schedule_rows:
            if str(row.get("ID")) not in posted_ids:
                next_pin = row
                break

        if not next_pin:
            print("🏁 All 180 scheduled pins have been published!")
            break

        success = post_single_pin(next_pin, headless=headless)
        if success:
            print(f"\n⏳ Waiting {interval_hours} hours until the next post...")
            time.sleep(interval_hours * 3600)
        else:
            print("\n⚠️ Retry in 10 minutes...")
            time.sleep(600)

def main():
    parser = argparse.ArgumentParser(description="CraftCalc Pinterest Automated Posting Bot")
    parser.add_argument("mode", choices=["login", "post_one", "schedule", "batch"], help="Action to perform")
    parser.add_argument("--interval", type=float, default=4.0, help="Interval in hours for scheduler (default: 4)")
    parser.add_argument("--count", type=int, default=1, help="Number of pins to post in batch mode")
    parser.add_argument("--headless", action="store_true", help="Run browser in background (headless)")

    args = parser.parse_args()

    if args.mode == "login":
        do_login()
    elif args.mode == "post_one":
        schedule_rows = load_schedule()
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        next_pin = next((r for r in schedule_rows if str(r.get("ID")) not in posted_ids), None)
        if next_pin:
            post_single_pin(next_pin, headless=args.headless)
        else:
            print("All pins posted!")
    elif args.mode == "schedule":
        run_schedule(interval_hours=args.interval, headless=args.headless)
    elif args.mode == "batch":
        schedule_rows = load_schedule()
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        to_post = [r for r in schedule_rows if str(r.get("ID")) not in posted_ids][:args.count]
        for pin in to_post:
            post_single_pin(pin, headless=args.headless)
            time.sleep(30)

if __name__ == "__main__":
    main()
