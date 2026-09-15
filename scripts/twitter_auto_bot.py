import os
import sys
import time
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
BOT_DIR = BASE_DIR / "twitter_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"
HISTORY_FILE = BOT_DIR / "posted_history.json"
TWEETS_FILE = BOT_DIR / "tweets_database.json"
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

def load_tweets():
    if not TWEETS_FILE.exists():
        print(f"[ERROR] Tweets file not found at {TWEETS_FILE}")
        return []
    try:
        with open(TWEETS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Failed to load tweets: {e}")
        return []

def do_login():
    ensure_dirs()
    print("=" * 60)
    print("🚀 OPENING BROWSER FOR 1-TIME TWITTER / X LOGIN")
    print("=" * 60)
    print("1. Browser khul raha hai...")
    print("2. Apne Twitter / X account par Login karein.")
    print("3. Jab login ho jaye aur home feed khul jaye, to yahan aa kar ENTER dabayein.")
    print("=" * 60)

    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=False,
            viewport={"width": 1280, "height": 850},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = browser_context.new_page()
        page.goto("https://x.com/login", timeout=60000)
        
        input("\n👉 Twitter / X par Login karne ke baad yahan ENTER press karein: ")
        
        browser_context.storage_state(path=str(STORAGE_STATE_FILE))
        print(f"✅ Session File Saved: {STORAGE_STATE_FILE}")
        
        browser_context.close()
        print("🎉 Twitter / X Login setup complete! Ab bot tayyar hai.")

def get_browser_context(p, headless=False):
    """
    Seamlessly initializes browser context for either Local or Cloud (GitHub Actions) runner.
    """
    if USER_DATA_DIR.exists() and any(USER_DATA_DIR.iterdir()):
        print("ℹ️ Using local user_session profile")
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage"
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
                "--no-sandbox",
                "--disable-dev-shm-usage"
            ]
        )
        context = browser.new_context(
            storage_state=str(STORAGE_STATE_FILE),
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        return context, browser
    else:
        print("⚠️ No session or storage_state found, launching clean persistent context")
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-dev-shm-usage"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        return context, None

def post_single_tweet(tweet, headless=False):
    tweet_id = tweet.get("id")
    text = tweet.get("text", "")
    image_rel = tweet.get("image", "")

    image_path = None
    if image_rel:
        img_full = PUBLIC_DIR / image_rel
        if img_full.exists():
            image_path = str(img_full)

    print(f"\n🐦 Posting Tweet #{tweet_id} ({tweet.get('category')}):")
    print(f"📝 Content:\n{text[:120]}...")
    if image_path:
        print(f"🖼️ Attached Image: {Path(image_path).name}")

    with sync_playwright() as p:
        browser_context, browser_instance = get_browser_context(p, headless=headless)
        page = browser_context.new_page()

        try:
            print("🌐 Navigating to Twitter/X compose page...")
            page.goto("https://x.com/compose/post", timeout=45000)
            page.wait_for_timeout(4000)

            # Check if redirected to compose/tweet fallback
            if "compose" not in page.url.lower():
                page.goto("https://x.com/compose/tweet", timeout=45000)
                page.wait_for_timeout(4000)

            # Check for login redirect
            if "login" in page.url.lower() or "i/flow/login" in page.url.lower():
                print("[WARNING] User is not logged in! Session cookies may have expired.")
                page.screenshot(path=str(BOT_DIR / "login_required_error.png"))
                return False

            # Dismiss any cookie consent / prompt if present
            try:
                cookie_accept = page.locator('button:has-text("Refuse non-essential cookies"), button:has-text("Accept all cookies"), [data-testid="sheetDialogClose"]').first
                if cookie_accept.is_visible(timeout=3000):
                    cookie_accept.click()
                    page.wait_for_timeout(1000)
            except Exception:
                pass

            # Locate editor
            editor = page.locator('[data-testid="tweetTextarea_0"], div[role="textbox"][contenteditable="true"]').first
            editor.wait_for(state="visible", timeout=20000)
            editor.click()
            page.wait_for_timeout(500)
            page.keyboard.type(text)
            print("   ✔ Tweet text typed successfully")
            page.wait_for_timeout(1500)

            # Attach image if available
            if image_path and os.path.exists(image_path):
                file_inputs = page.locator('input[data-testid="fileInput"], input[type="file"]')
                if file_inputs.count() > 0:
                    file_inputs.first.set_input_files(image_path)
                    print(f"   ✔ Image uploaded: {Path(image_path).name}")
                    page.wait_for_timeout(4000)

            # Find Post / Tweet button
            post_btn = page.locator('[data-testid="tweetButton"], [data-testid="tweetButtonInline"], button:has-text("Post")').first
            for _ in range(15):
                if not post_btn.is_disabled():
                    break
                page.wait_for_timeout(500)

            post_btn.click(force=True)
            print("   🚀 🎯 CLICKED POST BUTTON!")
            page.wait_for_timeout(6000)

            # Record success
            history = load_history()
            if tweet_id not in history["posted_ids"]:
                history["posted_ids"].append(tweet_id)
            history["logs"].append({
                "id": tweet_id,
                "category": tweet.get("category"),
                "text": text[:80] + "...",
                "timestamp": datetime.now().isoformat(),
                "status": "SUCCESS"
            })
            save_history(history)

            print(f"🎉 SUCCESS! Tweet #{tweet_id} posted live to Twitter/X.")
            return True

        except Exception as e:
            print(f"[ERROR] Failed to post tweet #{tweet_id}: {e}")
            try:
                page.screenshot(path=str(BOT_DIR / "last_error.png"))
                print(f"📸 Saved failure debug screenshot to {BOT_DIR / 'last_error.png'}")
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

def run_schedule(interval_hours=6.0, headless=False):
    print("=" * 60)
    print("🤖 CRAFTCALC TWITTER / X AUTO-POSTING BOT STARTED")
    print(f"⏰ Interval: 1 Tweet every {interval_hours} hours")
    print("=" * 60)

    tweets = load_tweets()
    if not tweets:
        print("[ERROR] No tweets found in database!")
        return

    while True:
        history = load_history()
        posted_ids = set(history.get("posted_ids", []))

        next_tweet = None
        for t in tweets:
            if t.get("id") not in posted_ids:
                next_tweet = t
                break

        if not next_tweet:
            print("🏁 All tweets have been published! Resetting cycle...")
            history["posted_ids"] = []
            save_history(history)
            next_tweet = tweets[0]

        success = post_single_tweet(next_tweet, headless=headless)
        if success:
            print(f"\n⏳ Waiting {interval_hours} hours until the next tweet...")
            time.sleep(interval_hours * 3600)
        else:
            print("\n⚠️ Tweet failed or session error. Retrying in 10 minutes...")
            time.sleep(600)

def main():
    parser = argparse.ArgumentParser(description="CraftCalc Twitter/X Automated Bot")
    parser.add_argument("mode", choices=["login", "post_one", "schedule"], help="Action to perform")
    parser.add_argument("--interval", type=float, default=6.0, help="Interval in hours for scheduler (default: 6)")
    parser.add_argument("--headless", action="store_true", help="Run browser in background (headless)")

    args = parser.parse_args()

    if args.mode == "login":
        do_login()
    elif args.mode == "post_one":
        tweets = load_tweets()
        history = load_history()
        posted_ids = set(history.get("posted_ids", []))
        next_t = next((t for t in tweets if t.get("id") not in posted_ids), None)
        if not next_t and tweets:
            next_t = tweets[0]
        if next_t:
            post_single_tweet(next_t, headless=args.headless)
    elif args.mode == "schedule":
        run_schedule(interval_hours=args.interval, headless=args.headless)

if __name__ == "__main__":
    main()
