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
CSV_VIDEOS_FILE = BASE_DIR / "public" / "pinterest_180_videos_schedule.csv"
CSV_IMAGES_FILE = BASE_DIR / "public" / "pinterest_300_pins.csv"
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

def load_schedule(pin_type="all"):
    """
    Loads pins based on requested pin_type:
    - 'video': Only 180 video pins
    - 'image': Only 300 static/infographic image pins
    - 'all': Interleaved alternating queue (1 Video, 1 Image, 1 Video, 1 Image...)
    """
    video_rows = []
    if CSV_VIDEOS_FILE.exists():
        with open(CSV_VIDEOS_FILE, "r", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                raw_id = str(r.get("ID", "")).strip()
                r["unique_id"] = f"v_{raw_id}"
                r["legacy_id"] = raw_id
                r["media_type_hint"] = "video"
                video_rows.append(r)

    image_rows = []
    if CSV_IMAGES_FILE.exists():
        with open(CSV_IMAGES_FILE, "r", encoding="utf-8-sig") as f:
            for r in csv.DictReader(f):
                raw_id = str(r.get("ID", "")).strip()
                r["unique_id"] = f"img_{raw_id}"
                r["legacy_id"] = None
                r["media_type_hint"] = "image"
                image_rows.append(r)

    if pin_type == "video":
        return video_rows
    elif pin_type == "image":
        return image_rows
    else:
        # Interleave alternating: 1 Image, 1 Video, 1 Image, 1 Video...
        mixed = []
        max_len = max(len(image_rows), len(video_rows))
        for i in range(max_len):
            if i < len(image_rows):
                mixed.append(image_rows[i])
            if i < len(video_rows):
                mixed.append(video_rows[i])
        return mixed

def is_pin_already_posted(row, posted_ids):
    uid = row.get("unique_id", "")
    legacy_id = row.get("legacy_id")
    
    # Check new unique ID (e.g. img_1 or v_1)
    if uid and uid in posted_ids:
        return True
        
    # Check legacy ID if it was a video previously posted with pure integer ID (e.g. "1")
    if legacy_id and str(legacy_id) in posted_ids:
        return True
        
    return False

def resolve_local_media(row):
    hint = row.get("media_type_hint", "")
    
    # 1. If explicitly an image or has image URL fields
    img_url = (
        row.get("Image URL") or 
        row.get("Cover_Image_URL") or 
        row.get("Image_URL") or 
        row.get("Image") or 
        ""
    ).strip()

    video_url = (
        row.get("Video_URL") or 
        row.get("video_url") or 
        row.get("Video") or 
        ""
    ).strip()

    # If row is marked as image (from 300_pins.csv)
    if hint == "image" and img_url:
        img_name = img_url.split("/")[-1]
        local_img = PUBLIC_DIR / "pins" / img_name
        if local_img.exists():
            return str(local_img), "image"

    # If row is marked as video (from 180_videos.csv)
    if hint == "video" and video_url:
        video_name = video_url.split("/")[-1]
        local_video = PUBLIC_DIR / "video_pins" / video_name
        if local_video.exists():
            return str(local_video), "video"

    # Generic checks based on URLs provided
    if video_url:
        video_name = video_url.split("/")[-1]
        local_video = PUBLIC_DIR / "video_pins" / video_name
        if local_video.exists():
            return str(local_video), "video"

    if img_url:
        img_name = img_url.split("/")[-1]
        local_img = PUBLIC_DIR / "pins" / img_name
        if local_img.exists():
            return str(local_img), "image"

    # Fallback based on hint
    if hint == "image":
        all_pins = list((PUBLIC_DIR / "pins").glob("*.jpg"))
        if all_pins:
            return str(all_pins[0]), "image"
    else:
        all_videos = list((PUBLIC_DIR / "video_pins").glob("*.mp4"))
        if all_videos:
            return str(all_videos[0]), "video"

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
        print(f"[ERROR] No valid media found for Pin ID {row.get('unique_id') or row.get('ID')}")
        return False

    pin_id = str(row.get("unique_id") or row.get("ID") or "")
    title = str(row.get("Title", ""))[:100]
    description = str(row.get("Description", ""))[:500]
    destination_link = str(
        row.get("Destination_Link") or 
        row.get("Link") or 
        row.get("link") or 
        "https://tool-1-pied.vercel.app"
    )
    board_name = str(row.get("Board") or "DIY Flooring & Tile Ideas")

    print(f"\n" + "=" * 60)
    print(f"📌 PROCESSING PIN #{pin_id}: {title}")
    print(f"🎨 Media: {Path(media_path).name} ({media_type.upper()})")
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

            # 1. Upload media file (Works for both .mp4 videos and .jpg images)
            print(f"⏳ 2. Uploading {media_type.upper()} file ({Path(media_path).name})...")
            upload_input = page.locator('input[type="file"], input[data-test-id="storyboard-upload-input"]').first
            if upload_input.count() > 0:
                upload_input.set_input_files(media_path)
                print(f"   ✔ {media_type.capitalize()} selected successfully")
            else:
                dropzone = page.locator('[data-test-id="media-uploader"], div[aria-label*="upload" i]').first
                if dropzone.count() > 0:
                    with page.expect_file_chooser() as fc_info:
                        dropzone.click()
                    file_chooser = fc_info.value
                    file_chooser.set_files(media_path)
                    print(f"   ✔ {media_type.capitalize()} uploaded via dropzone")
                else:
                    print("   [!] Fallback input search...")
                    page.set_input_files('input[type="file"]', media_path)

            # Wait for upload processing
            if media_type == "video":
                print("⏳ 3. Waiting for video processing (15s)...")
                for sec in range(15):
                    page.wait_for_timeout(1000)
            else:
                print("⏳ 3. Waiting for image preview (4s)...")
                page.wait_for_timeout(4000)

            # 2. Fill Title
            print("⏳ 4. Entering Title...")
            title_box = page.locator('input[placeholder*="title" i], textarea[placeholder*="title" i], #storyboard-selector-title, input[placeholder*="Tell everyone" i], [data-test-id="editor-title-input"]').first
            for _ in range(15):
                if title_box.count() > 0 and not title_box.is_disabled():
                    break
                page.wait_for_timeout(1000)

            if title_box.count() > 0:
                try:
                    title_box.click(force=True)
                    title_box.fill(title)
                except Exception:
                    page.evaluate(f"""(val) => {{
                        const el = document.querySelector('#storyboard-selector-title') || document.querySelector('input[placeholder*="title" i]');
                        if (el) {{
                            el.value = val;
                            el.dispatchEvent(new Event('input', {{ bubbles: true }}));
                            el.dispatchEvent(new Event('change', {{ bubbles: true }}));
                        }}
                    }}""", title)
                print("   ✔ Title filled")
            else:
                print("   [!] Title field not enabled or found, continuing...")
            page.wait_for_timeout(1000)

            # 3. Fill Description
            print("⏳ 5. Entering Description...")
            desc_area = page.locator('div[data-test-id="pin-draft-description"] [contenteditable="true"], div[contenteditable="true"][aria-label*="description" i], div:has-text("Describe your Pin"), textarea[placeholder*="description" i], [data-test-id="editor-description-input"]').first
            if desc_area.count() > 0:
                try:
                    desc_area.click(force=True)
                    page.keyboard.type(description, delay=5)
                    print("   ✔ Description typed")
                except Exception as ex:
                    print(f"   [!] Description fill warning: {ex}")
            else:
                print("   [!] Description area not found, continuing...")
            page.wait_for_timeout(1000)

            # 4. Fill Link
            print("⏳ 6. Entering Destination Link...")
            link_box = page.locator('input[placeholder*="link" i], input[placeholder*="destination" i], input[placeholder*="Add a link" i], [data-test-id="editor-link-input"], input[id*="WebsiteField" i]').first
            if link_box.count() > 0:
                try:
                    link_box.click(force=True)
                    link_box.fill(destination_link)
                    print(f"   ✔ Link filled: {destination_link}")
                except Exception:
                    page.evaluate(f"""(val) => {{
                        const el = document.querySelector('#WebsiteField') || document.querySelector('input[placeholder*="link" i]');
                        if (el) {{
                            el.value = val;
                            el.dispatchEvent(new Event('input', {{ bubbles: true }}));
                            el.dispatchEvent(new Event('change', {{ bubbles: true }}));
                        }}
                    }}""", destination_link)
                    print(f"   ✔ Link set via DOM: {destination_link}")
            page.wait_for_timeout(1500)

            # 5. Select Board
            print("⏳ 7. Selecting Board...")
            board_btn = page.locator('[data-test-id="board-dropdown-select-button"]')
            
            # Wait until board dropdown is enabled
            for _ in range(15):
                if board_btn.count() > 0 and board_btn.get_attribute("aria-disabled") != "true":
                    break
                page.wait_for_timeout(1000)

            if board_btn.count() > 0:
                board_btn.click(force=True)
                page.wait_for_timeout(2000)

                # Click first board option in dropdown
                board_option = page.locator('div[data-test-id="board-row"], div[role="option"]').filter(has_not_text="Select all").first
                if board_option.count() > 0 and board_option.is_visible():
                    board_option.click(force=True)
                    print(f"   ✔ Board selected")
                else:
                    # Fallback click
                    page.locator('div:has-text("DIY Home Improvement")').first.click(force=True)
                    print("   ✔ Board selected via text fallback")
            page.wait_for_timeout(1500)

            # 6. Click Publish Button (Specifically the top-right red Publish button)
            print("⏳ 8. Submitting Pin (Publishing)...")
            publish_btn = page.locator('button[data-test-id="storyboard-creation-publish-button"], button:has-text("Publish")').filter(has_not_text="draft").first
            for _ in range(25):
                if publish_btn.count() > 0 and not publish_btn.is_disabled():
                    break
                page.wait_for_timeout(500)

            # If drafts checkbox got selected, ensure we target active publish button
            active_red_buttons = page.locator('button:has-text("Publish")').all()
            target_pub = None
            for b in active_red_buttons:
                if b.is_visible() and not b.is_disabled():
                    target_pub = b

            if target_pub:
                target_pub.click(force=True)
                print("   🚀 Clicked Red Publish button!")
            elif publish_btn.count() > 0:
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
                history = load_history()
                if pin_id not in history["posted_ids"]:
                    history["posted_ids"].append(pin_id)
                history["logs"].append({
                    "id": pin_id,
                    "media_type": media_type,
                    "title": title,
                    "link": destination_link,
                    "pinterest_url": pin_url or "Live on Profile",
                    "media": Path(media_path).name,
                    "timestamp": datetime.now().isoformat(),
                    "status": "SUCCESS"
                })
                save_history(history)
                print(f"✅ SUCCESS: {media_type.upper()} Pin #{pin_id} officially published to Pinterest!")
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

def run_schedule(interval_hours=2.4, headless=False, pin_type="all"):
    print("=" * 60)
    print(f"🤖 CRAFTCALC PINTEREST BOT RUNNING")
    print(f"🎯 Mode: {pin_type.upper()} PINS (Videos & Images)")
    print(f"⏰ Interval: 1 Pin every {interval_hours} hours")
    print("=" * 60)

    schedule_rows = load_schedule(pin_type=pin_type)
    if not schedule_rows:
        print("[ERROR] No pins found in schedule!")
        return

    while True:
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        
        next_pin = None
        for row in schedule_rows:
            if not is_pin_already_posted(row, posted_ids):
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
    parser.add_argument("--type", choices=["all", "image", "video"], default="all", help="Type of pins to post: 'image', 'video', or 'all' (default: alternating mixed)")
    parser.add_argument("--interval", type=float, default=2.4, help="Interval in hours for scheduler (default: 2.4)")
    parser.add_argument("--count", type=int, default=1, help="Number of pins to post in batch mode")
    parser.add_argument("--headless", action="store_true", help="Run browser in background (headless)")

    args = parser.parse_args()

    if args.mode == "login":
        do_login()
    elif args.mode == "post_one":
        schedule_rows = load_schedule(pin_type=args.type)
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        next_pin = next((r for r in schedule_rows if not is_pin_already_posted(r, posted_ids)), None)
        if not next_pin and schedule_rows:
            next_pin = schedule_rows[0]
        if next_pin:
            post_single_pin(next_pin, headless=args.headless)
        else:
            print("No pins found in schedule!")
    elif args.mode == "schedule":
        run_schedule(interval_hours=args.interval, headless=args.headless, pin_type=args.type)
    elif args.mode == "batch":
        schedule_rows = load_schedule(pin_type=args.type)
        history = load_history()
        posted_ids = set(str(x) for x in history.get("posted_ids", []))
        to_post = [r for r in schedule_rows if not is_pin_already_posted(r, posted_ids)][:args.count]
        for pin in to_post:
            post_single_pin(pin, headless=args.headless)
            time.sleep(30)

if __name__ == "__main__":
    main()
