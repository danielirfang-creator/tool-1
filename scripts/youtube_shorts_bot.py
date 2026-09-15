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
BOT_DIR = BASE_DIR / "youtube_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"
HISTORY_FILE = BOT_DIR / "posted_history.json"
CONFIG_FILE = BOT_DIR / "youtube_config.json"
CSV_FILE = BASE_DIR / "public" / "pinterest_180_videos_schedule.csv"
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

def load_videos_schedule():
    if not CSV_FILE.exists():
        print(f"[ERROR] Videos schedule not found at {CSV_FILE}")
        return []
    rows = []
    with open(CSV_FILE, "r", encoding="utf-8-sig") as f:
        for r in csv.DictReader(f):
            rows.append(r)
    return rows

def resolve_video_path(row):
    vid_url = (row.get("Video_URL") or "").strip()
    if vid_url:
        fname = vid_url.split("/")[-1]
        cand = PUBLIC_DIR / "video_pins" / fname
        if cand.exists():
            return str(cand)
    # Fallback to any mp4 in video_pins
    all_vids = list((PUBLIC_DIR / "video_pins").glob("*.mp4"))
    if all_vids:
        return str(all_vids[0])
    return None

def do_login():
    ensure_dirs()
    print("=" * 65)
    print("🚀 1-TIME YOUTUBE STUDIO LOGIN SETUP")
    print("=" * 65)
    print("1. Browser khul raha hai...")
    print("2. Apne Google / YouTube Channel par Login karein.")
    print("3. Jab YouTube Studio (studio.youtube.com) khul jaye, to yahan ENTER dabayein.")
    print("=" * 65)

    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=False,
            viewport={"width": 1366, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = browser_context.new_page()
        try:
            page.goto("https://studio.youtube.com", timeout=60000)
        except Exception:
            pass

        input("\n👉 YouTube Studio par Login hone ke baad yahan ENTER press karein: ")

        try:
            browser_context.storage_state(path=str(STORAGE_STATE_FILE))
            print(f"✅ YouTube Session Saved: {STORAGE_STATE_FILE}")
        except Exception as e:
            print(f"[!] Note: {e}")

        browser_context.close()
        print("🎉 YouTube Studio setup mukammal ho gaya hai!")

def get_browser_context(p, headless=False):
    if USER_DATA_DIR.exists() and any(USER_DATA_DIR.iterdir()):
        print("ℹ️ Using local YouTube user_session profile")
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1366, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        return context, None
    elif STORAGE_STATE_FILE.exists():
        print(f"ℹ️ Loading authentication from {STORAGE_STATE_FILE.name}")
        browser = p.chromium.launch(
            headless=headless,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox"
            ]
        )
        context = browser.new_context(
            storage_state=str(STORAGE_STATE_FILE),
            viewport={"width": 1366, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        return context, browser
    else:
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1366, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        return context, None

def post_single_short(row, headless=False):
    vid_id = str(row.get("ID", "")).strip()
    raw_title = row.get("Title", "").replace("🔥 CONTRACTOR SECRET: ", "").replace('"', '').strip()
    clean_title = f"{raw_title[:75]} #Shorts #DIY"
    dest_link = row.get("Destination_Link", "https://tool-1-pied.vercel.app")
    description = (
        f"{row.get('Description', '')}\n\n"
        f"👇 Calculate exact materials for free (No signup needed):\n"
        f"{dest_link}\n\n"
        f"#Shorts #DIY #HomeImprovement #ContractorLife #CraftCalc"
    )
    video_path = resolve_video_path(row)

    if not video_path or not os.path.exists(video_path):
        print(f"[ERROR] Video file not found for ID #{vid_id}")
        return False

    print("=" * 65)
    print(f"🎬 UPLOADING YOUTUBE SHORT #{vid_id}: {clean_title}")
    print(f"📁 Video: {Path(video_path).name}")
    print(f"🔗 Target Link: {dest_link}")
    print("=" * 65)

    with sync_playwright() as p:
        browser_context, browser_instance = get_browser_context(p, headless=headless)
        page = browser_context.new_page()

        try:
            print("🌐 Navigating to YouTube Studio...")
            page.goto("https://studio.youtube.com", timeout=45000)
            page.wait_for_timeout(5000)

            # Check if login required
            if "signin" in page.url.lower() or "accounts.google.com" in page.url.lower():
                print("[WARNING] Not logged in to YouTube! Run '1_LOGIN_YOUTUBE.bat' first.")
                page.screenshot(path=str(BOT_DIR / "login_required.png"))
                return False

            # Click Create Button (top right)
            create_btn = page.locator('#create-icon, button[aria-label="Create"], ytcp-button:has-text("Create")').first
            create_btn.wait_for(state="visible", timeout=15000)
            create_btn.click()
            page.wait_for_timeout(1000)

            # Click Upload Videos option
            upload_option = page.locator('tp-yt-paper-item:has-text("Upload videos"), #text-item-0').first
            upload_option.click()
            page.wait_for_timeout(2000)

            # Upload video file
            file_input = page.locator('input[type="file"]').first
            file_input.set_input_files(video_path)
            print("   ✔ Video file uploaded to YouTube Studio uploader")
            page.wait_for_timeout(6000)

            # Set Title
            title_input = page.locator('#title-textarea #textbox, [aria-label*="title" i][contenteditable="true"]').first
            title_input.wait_for(state="visible", timeout=15000)
            title_input.click()
            page.keyboard.press("Control+A")
            page.keyboard.press("Backspace")
            title_input.fill(clean_title)
            print(f"   ✔ Title set: {clean_title}")
            page.wait_for_timeout(1500)

            # Set Description
            desc_input = page.locator('#description-textarea #textbox, [aria-label*="description" i][contenteditable="true"]').first
            if desc_input.count() > 0:
                desc_input.click()
                desc_input.fill(description)
                print("   ✔ Description with backlink & tags entered")
                page.wait_for_timeout(1500)

            # Select "No, it's not made for kids" (mandatory YouTube step)
            not_for_kids_radio = page.locator('tp-yt-paper-radio-button[name="VIDEO_MADE_FOR_KIDS_NOT_MFK"], [name="NOT_MFK"]').first
            if not_for_kids_radio.count() > 0:
                not_for_kids_radio.scroll_into_view_if_needed()
                not_for_kids_radio.click()
                print("   ✔ Selected 'Not made for kids'")
                page.wait_for_timeout(1000)

            # Click Next 3 times (Video elements -> Checks -> Visibility)
            for step_num in range(1, 4):
                next_btn = page.locator('#next-button, button:has-text("Next"), ytcp-button:has-text("Next")').first
                if next_btn.is_visible():
                    next_btn.click()
                    print(f"   ✔ Completed step {step_num}")
                    page.wait_for_timeout(2000)

            # Select Public visibility
            public_radio = page.locator('tp-yt-paper-radio-button[name="PUBLIC"], [name="PUBLIC"]').first
            if public_radio.count() > 0:
                public_radio.click()
                print("   ✔ Selected Visibility: PUBLIC")
                page.wait_for_timeout(1000)

            # Click Publish / Done button
            done_btn = page.locator('#done-button, button:has-text("Publish"), button:has-text("Done"), ytcp-button:has-text("Publish")').first
            done_btn.click()
            print("🚀 🎯 CLICKED PUBLISH BUTTON!")
            page.wait_for_timeout(8000)

            # Log success
            history = load_history()
            if vid_id not in history["posted_ids"]:
                history["posted_ids"].append(vid_id)
            history["logs"].append({
                "id": vid_id,
                "title": clean_title,
                "video": Path(video_path).name,
                "link": dest_link,
                "timestamp": datetime.now().isoformat(),
                "status": "SUCCESS"
            })
            save_history(history)

            print(f"🎉 SUCCESS! YouTube Short #{vid_id} published successfully!")
            return True

        except Exception as e:
            print(f"[ERROR] Failed to post YouTube Short #{vid_id}: {e}")
            try:
                page.screenshot(path=str(BOT_DIR / "last_error.png"))
                print(f"📸 Saved error screenshot to {BOT_DIR / 'last_error.png'}")
            except Exception:
                pass
            return False
        finally:
            try:
                browser_context.close()
            except Exception:
                pass
            if browser_instance:
                try:
                    browser_instance.close()
                except Exception:
                    pass

def run_schedule(interval_hours=12.0, headless=False):
    print("=" * 65)
    print("🤖 CRAFTCALC YOUTUBE SHORTS AUTO-POSTER RUNNING")
    print(f"⏰ Schedule: 1 Short every {interval_hours} hours (2 daily)")
    print("=" * 65)

    videos = load_videos_schedule()
    if not videos:
        print("[ERROR] No videos found in schedule!")
        return

    while True:
        history = load_history()
        posted = set(history.get("posted_ids", []))
        next_vid = next((v for v in videos if str(v.get("ID", "")).strip() not in posted), None)

        if not next_vid:
            print("🏁 All 180 Shorts have been published! Resetting cycle...")
            history["posted_ids"] = []
            save_history(history)
            next_vid = videos[0]

        success = post_single_short(next_vid, headless=headless)
        if success:
            print(f"\n⏳ Waiting {interval_hours} hours for the next scheduled Short...")
            time.sleep(interval_hours * 3600)
        else:
            print("\n⚠️ Upload had an issue or login needed. Retrying in 15 minutes...")
            time.sleep(900)

def main():
    parser = argparse.ArgumentParser(description="CraftCalc YouTube Shorts Auto-Poster")
    parser.add_argument("action", choices=["login", "post_one", "schedule"], default="post_one", nargs="?")
    parser.add_argument("--interval", type=float, default=12.0, help="Interval in hours (default: 12)")
    parser.add_argument("--headless", action="store_true", help="Run browser in background")
    args = parser.parse_args()

    if args.action == "login":
        do_login()
    elif args.action == "schedule":
        run_schedule(interval_hours=args.interval, headless=args.headless)
    else:
        videos = load_videos_schedule()
        history = load_history()
        posted = set(history.get("posted_ids", []))
        next_v = next((v for v in videos if str(v.get("ID", "")).strip() not in posted), None)
        if not next_v and videos:
            next_v = videos[0]
        if next_v:
            post_single_short(next_v, headless=args.headless)

if __name__ == "__main__":
    main()
