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
            viewport={"width": 1280, "height": 850},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = browser_context.new_page()
        try:
            page.goto("https://www.pinterest.com/login/", timeout=60000, wait_until="domcontentloaded")
        except Exception:
            pass
        
        input("\n👉 Pinterest par login karne ke baad yahan ENTER press karein: ")
        
        # Save storage state for cloud runner (cookies + tokens)
        try:
            browser_context.storage_state(path=str(STORAGE_STATE_FILE))
            print(f"✅ Session File Saved: {STORAGE_STATE_FILE}")
        except Exception as e:
            print(f"[!] Could not save storage state: {e}")
        
        browser_context.close()
        print("🎉 Login setup complete! Ab aapka Pinterest Bot tayyar hai.")

def get_browser_context(p, headless=False):
    if USER_DATA_DIR.exists():
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        return context, None
    elif STORAGE_STATE_FILE.exists():
        browser = p.chromium.launch(
            headless=headless,
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"]
        )
        context = browser.new_context(
            storage_state=str(STORAGE_STATE_FILE),
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
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
    ensure_dirs()
    media_path, media_type = resolve_local_media(row)
    if not media_path or not os.path.exists(media_path):
        print(f"[ERROR] No valid media found for Pin ID {row.get('ID')}")
        return False

    pin_id = str(row.get("ID", ""))
    title = str(row.get("Title", ""))[:100]
    description = str(row.get("Description", ""))[:500]
    destination_link = str(row.get("Destination_Link", "https://tool-1-pied.vercel.app"))
    board_name = str(row.get("Board", "DIY & Construction Tools"))

    print(f"\n" + "=" * 60)
    print(f"📌 PROCESSING PIN #{pin_id}: {title}")
    print(f"🎬 Media: {Path(media_path).name} ({media_type.upper()})")
    print(f"🔗 Link: {destination_link}")
    print(f"📋 Board: {board_name}")
    print("=" * 60)

    with sync_playwright() as p:
        context, browser = get_browser_context(p, headless=headless)
        page = context.new_page()
        
        try:
            print("⏳ 1. Loading Pinterest Pin Creator...")
            navigated = False
            for url in ["https://www.pinterest.com/pin-creation-tool/", "https://www.pinterest.com/pin-builder/"]:
                try:
                    page.goto(url, timeout=60000, wait_until="domcontentloaded")
                    page.wait_for_timeout(4000)
                    navigated = True
                    break
                except Exception as ex:
                    print(f"   [!] Retrying navigation ({url}): {ex}")
                    continue
            
            if not navigated:
                print("[ERROR] Could not load Pinterest Pin Creation page. Network timed out.")
                context.close()
                if browser: browser.close()
                return False

            # Check if login expired or missing
            if "login" in page.url.lower() or "signin" in page.url.lower():
                print("[WARNING] User is not logged into Pinterest! Please run '1_LOGIN_PINTEREST.bat' first.")
                context.close()
                if browser: browser.close()
                return False

            # 1. Upload media file
            print("⏳ 2. Uploading media file...")
            upload_input = page.locator('input[type="file"], input[data-test-id="storyboard-upload-input"]').first
            if upload_input.count() > 0:
                upload_input.set_input_files(media_path)
                print("   ✔ Media file selected successfully")
            else:
                print("   [!] Upload input not detected directly, searching dropzone...")
                dropzone = page.locator('[data-test-id="media-uploader"], div[aria-label*="upload" i]').first
                if dropzone.count() > 0:
                    with page.expect_file_chooser() as fc_info:
                        dropzone.click()
                    file_chooser = fc_info.value
                    file_chooser.set_files(media_path)
                    print("   ✔ Media file uploaded via dropzone")

            # Allow video processing / transcoding time
            if media_type == "video":
                print("⏳ 3. Waiting for video processing (15-20s)...")
                for sec in range(15):
                    page.wait_for_timeout(1000)
            else:
                page.wait_for_timeout(3000)

            # 2. Fill Title
            print("⏳ 4. Entering Title...")
            title_box = page.locator('input[placeholder*="Tell everyone" i], input[placeholder*="title" i], [data-test-id="editor-title-input"], input[id*="title" i]').first
            if title_box.count() > 0:
                title_box.click(force=True)
                title_box.fill(title)
                print("   ✔ Title filled")
            else:
                print("   [!] Title field not found, continuing...")
            page.wait_for_timeout(1000)

            # 3. Fill Description
            print("⏳ 5. Entering Description...")
            desc_area = page.locator('div[contenteditable="true"][aria-label*="description" i], div:has-text("Describe your Pin"), textarea[placeholder*="description" i], [data-test-id="editor-description-input"]').first
            if desc_area.count() > 0:
                desc_area.click(force=True)
                page.keyboard.type(description, delay=5)
                print("   ✔ Description typed")
            else:
                print("   [!] Description area not found, continuing...")
            page.wait_for_timeout(1000)

            # 4. Fill Link
            print("⏳ 6. Entering Destination Link...")
            link_box = page.locator('input[placeholder*="Add a link" i], input[placeholder*="link" i], [data-test-id="editor-link-input"], input[id*="WebsiteField" i]').first
            if link_box.count() > 0:
                link_box.click(force=True)
                link_box.fill(destination_link)
                print("   ✔ Link filled")
            page.wait_for_timeout(1500)

            # 5. Select Board
            print("⏳ 7. Selecting Board...")
            board_btn = page.locator('div[data-test-id="board-dropdown-select-button"], button[data-test-id="board-dropdown-select-button"], div[aria-label*="board" i]').first
            
            # Wait until board dropdown is enabled
            for _ in range(15):
                if board_btn.count() > 0 and board_btn.get_attribute("aria-disabled") != "true":
                    break
                page.wait_for_timeout(1000)

            if board_btn.count() > 0:
                board_btn.click(force=True)
                page.wait_for_timeout(2000)

                # Look for matching board or any board option
                boards = page.locator('div[data-test-id="board-row"], div[role="option"], div[title]')
                if boards.count() > 0:
                    boards.first.click()
                    print(f"   ✔ Selected board: {boards.first.inner_text().strip()}")
                else:
                    create_b = page.locator('button:has-text("Create board"), div:has-text("Create board")').first
                    if create_b.count() > 0:
                        create_b.click()
                        page.wait_for_timeout(1000)
                        page.locator('input[id*="board-name"]').first.fill(board_name)
                        page.locator('button:has-text("Create")').first.click()
                        print(f"   ✔ Created board: {board_name}")
            page.wait_for_timeout(2000)

            # 6. Click Publish Button
            print("⏳ 8. Submitting Pin (Publishing)...")
            publish_btn = page.locator('button:has-text("Publish"), button[data-test-id="storyboard-creation-publish-button"], button[data-test-id="board-dropdown-save-button"]').first
            for _ in range(25):
                if publish_btn.count() > 0 and not publish_btn.is_disabled():
                    break
                page.wait_for_timeout(500)

            if publish_btn.count() > 0:
                publish_btn.click(force=True)
                print("   🚀 Clicked Publish button!")
            else:
                print("   [!] Publish button not found directly, pressing Save...")
                page.keyboard.press("Control+Enter")

            # 7. Verification: Wait for Pinterest to confirm publication
            print("⏳ 9. Verifying live publication on Pinterest...")
            is_confirmed = False
            pin_url = None
            
            for check in range(25):
                page.wait_for_timeout(2000)
                
                # Check for success banners or view links
                view_link = page.locator('a:has-text("See your Pin"), a:has-text("View"), a[href*="/pin/"]').first
                if view_link.count() > 0:
                    is_confirmed = True
                    pin_url = view_link.get_attribute("href")
                    if pin_url and not pin_url.startswith("http"):
                        pin_url = f"https://www.pinterest.com{pin_url}"
                    print(f"   🎉 Live Pin URL Detected: {pin_url}")
                    break
                
                # Check for success toast text
                if page.locator('div:has-text("Saved to"), div:has-text("Your Pin has been published"), div:has-text("You created a Pin")').count() > 0:
                    is_confirmed = True
                    print("   🎉 Pinterest confirmed: Pin Saved & Live!")
                    break

                # Check if redirected to Pin page
                if "/pin/" in page.url and "creation" not in page.url:
                    is_confirmed = True
                    pin_url = page.url
                    print(f"   🎉 Redirected to live Pin: {pin_url}")
                    break

            # Save screenshot for proof
            screenshot_path = BOT_DIR / "last_publish_result.png"
            page.screenshot(path=str(screenshot_path))
            print(f"📸 Screenshot saved: {screenshot_path}")

            if is_confirmed:
                # Record in history
                history = load_history()
                if pin_id not in history["posted_ids"]:
                    history["posted_ids"].append(pin_id)
                history["logs"].append({
                    "id": pin_id,
                    "title": title,
                    "link": destination_link,
                    "pinterest_url": pin_url or "Live on Profile",
                    "media": Path(media_path).name,
                    "timestamp": datetime.now().isoformat(),
                    "status": "SUCCESS"
                })
                save_history(history)
                print(f"✅ SUCCESS: Pin #{pin_id} officially published to Pinterest!")
                context.close()
                if browser: browser.close()
                return True
            else:
                print("⚠️ [WARNING] Publish button was clicked, but Pinterest did not show final confirmation within 50s. Please check 'last_publish_result.png'.")
                context.close()
                if browser: browser.close()
                return False

        except Exception as e:
            print(f"[ERROR] Failed to post pin #{pin_id}: {e}")
            try:
                page.screenshot(path=str(BOT_DIR / "last_publish_error.png"))
            except Exception:
                pass
            context.close()
            if browser: browser.close()
            return False

def run_schedule(interval_hours=2.4, headless=False):
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
            print(f"\n⏳ Waiting {interval_hours} hours until next scheduled post...")
            time.sleep(int(interval_hours * 3600))
        else:
            print("\n⚠️ Failed to confirm publication. Waiting 10 minutes before retrying...")
            time.sleep(600)

def main():
    parser = argparse.ArgumentParser(description="CraftCalc Pinterest Automated Posting Bot")
    parser.add_argument("mode", choices=["login", "post_one", "schedule", "batch"], help="Action to perform")
    parser.add_argument("--interval", type=float, default=2.4, help="Interval in hours for scheduler (default: 2.4)")
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
        if not next_pin and schedule_rows:
            next_pin = schedule_rows[0]
        if next_pin:
            post_single_pin(next_pin, headless=args.headless)
        else:
            print("No pins found in schedule!")
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
