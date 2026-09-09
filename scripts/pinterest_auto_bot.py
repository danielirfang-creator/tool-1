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
    board_name = row.get("Board", "DIY & Construction Tools")

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

            # 1. Upload media file
            upload_input = page.locator('input[type="file"], input[data-test-id="storyboard-upload-input"]').first
            if upload_input.count() > 0:
                upload_input.set_input_files(media_path)
                print("   ✔ 1. Media uploaded successfully")
                page.wait_for_timeout(5000)
            else:
                print("   [!] Upload input not detected")

            # 2. Fill Title with exact placeholder
            title_box = page.locator('input[placeholder*="Tell everyone" i], input[placeholder*="title" i]').first
            if title_box.count() > 0:
                title_box.fill(title)
                print("   ✔ 2. Title filled")
            page.wait_for_timeout(1000)

            # 3. Fill Description
            desc_area = page.locator('div:has-text("Describe your Pin")').last
            if desc_area.count() > 0:
                desc_area.click(force=True)
                page.keyboard.type(description)
                print("   ✔ 3. Description typed")
            page.wait_for_timeout(1000)

            # 4. Fill Link
            link_box = page.locator('input[placeholder*="Add a link" i], input[placeholder*="link" i]').first
            if link_box.count() > 0:
                link_box.fill(destination_link)
                print("   ✔ 4. Link filled")
            page.wait_for_timeout(1000)

            # 5. Select Board
            board_btn = page.locator('div[data-test-id="board-dropdown-select-button"]')
            for _ in range(15):
                if board_btn.get_attribute("aria-disabled") != "true":
                    print("   ✔ Board dropdown is enabled!")
                    break
                page.wait_for_timeout(1000)

            board_btn.click(force=True)
            print("   ✔ 5. Clicked Board dropdown")
            page.wait_for_timeout(2000)

            # Click existing board or create
            boards = page.locator('div[data-test-id="board-row"], div[role="option"], div[title]')
            if boards.count() > 0:
                boards.first.click()
                print(f"   ✔ 6. Selected board: {boards.first.inner_text().strip()}")
            else:
                create_b = page.locator('button:has-text("Create board"), div:has-text("Create board")').first
                if create_b.count() > 0:
                    create_b.click()
                    page.wait_for_timeout(1000)
                    page.locator('input[id*="board-name"]').first.fill(board_name)
                    page.locator('button:has-text("Create")').first.click()
                    print(f"   ✔ 6. Created board: {board_name}")
            page.wait_for_timeout(3000)

            # 6. Click Top Right Publish Button
            publish_btn = page.locator('button:has-text("Publish")').first
            for _ in range(20):
                if not publish_btn.is_disabled():
                    break
                page.wait_for_timeout(500)

            publish_btn.click(force=True)
            print("   🚀 7. CLICKED PUBLISH BUTTON SUCCESSFULLY!")
            page.wait_for_timeout(15000)
            
            # Record success in history
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
            
            print(f"🎉 SUCCESS! Pin #{pin_id} published to Pinterest.")
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
            print("🏁 All scheduled pins have been published! Recycling queue for continuous posting...")
            history["posted_ids"] = []
            save_history(history)
            next_pin = schedule_rows[0]

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
