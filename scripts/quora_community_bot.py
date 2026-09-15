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
BOT_DIR = BASE_DIR / "quora_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"
HISTORY_FILE = BOT_DIR / "posted_history.json"
CONFIG_FILE = BOT_DIR / "quora_config.json"
DATABASE_FILE = BOT_DIR / "quora_database.json"

def ensure_dirs():
    BOT_DIR.mkdir(parents=True, exist_ok=True)
    if not HISTORY_FILE.exists():
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump({"posted": []}, f, indent=2)

def load_config():
    if not CONFIG_FILE.exists():
        return {"warmup_mode": True, "include_links": False, "daily_limit": 2}
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"warmup_mode": True, "include_links": False, "daily_limit": 2}

def load_history():
    ensure_dirs()
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"posted": []}

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def load_database():
    if not DATABASE_FILE.exists():
        return []
    try:
        with open(DATABASE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Failed to load database: {e}")
        return []

def do_login():
    ensure_dirs()
    print("=" * 65)
    print("🚀 1-TIME QUORA LOGIN SETUP")
    print("=" * 65)
    print("1. Browser khul raha hai...")
    print("2. Apne Quora account par login karein.")
    print("3. Jab login ho jaye aur home feed dikhe, to yahan aa kar ENTER dabayein.")
    print("=" * 65)

    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=False,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = browser_context.new_page()
        try:
            page.goto("https://www.quora.com", timeout=60000)
        except Exception:
            pass

        input("\n👉 Quora par login karne ke baad yahan ENTER press karein: ")

        try:
            browser_context.storage_state(path=str(STORAGE_STATE_FILE))
            print(f"✅ Session Saved: {STORAGE_STATE_FILE}")
        except Exception as e:
            print(f"[!] Warning saving storage state: {e}")

        browser_context.close()
        print("🎉 Quora Login setup complete! Session ready.")

def get_browser_context(p, headless=False):
    if USER_DATA_DIR.exists() and any(USER_DATA_DIR.iterdir()):
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
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

def post_next_answer(headless=False):
    config = load_config()
    database = load_database()
    history = load_history()

    posted_ids = {p.get("id") for p in history.get("posted", [])}
    next_item = next((item for item in database if item.get("id") not in posted_ids), None)

    if not next_item:
        print("🏁 All Quora database items posted! Resetting queue...")
        history["posted"] = []
        save_history(history)
        next_item = database[0]

    warmup = config.get("warmup_mode", True)
    answer_text = next_item.get("pure_value_answer") if warmup else next_item.get("promotional_answer")
    mode_tag = "🛡️ WARMUP MODE (100% Value, NO Links)" if warmup else "🚀 PROMOTIONAL MODE (Value + Backlink)"

    print("=" * 65)
    print(f"🤖 QUORA EXPERT HELPER: {next_item.get('topic')}")
    print(f"⚙️ Status: {mode_tag}")
    print("=" * 65)
    print("\n📝 Answer Preview:\n" + answer_text[:200] + "...\n")

    with sync_playwright() as p:
        browser_context, browser_instance = get_browser_context(p, headless=headless)
        page = browser_context.new_page()

        try:
            search_query = next_item.get("search_query", "").replace(" ", "+")
            print(f"🔍 Searching questions on Quora for: {next_item.get('search_query')}...")

            page.goto(f"https://www.quora.com/search?q={search_query}&type=question", timeout=45000)
            page.wait_for_timeout(4000)

            # Check if login required
            if "login" in page.url.lower() or "signup" in page.url.lower():
                print("[WARNING] User is not logged into Quora! Please run '1_LOGIN_QUORA.bat' first.")
                return False

            history["posted"].append({
                "id": next_item.get("id"),
                "topic": next_item.get("topic"),
                "mode": "WARMUP" if warmup else "PROMOTIONAL",
                "timestamp": datetime.now().isoformat(),
                "status": "SUCCESS"
            })
            save_history(history)
            print("🎉 Quora Answer recorded to history successfully!")
            return True

        except Exception as e:
            print(f"[ERROR] Failed Quora step: {e}")
            try:
                page.screenshot(path=str(BOT_DIR / "last_error.png"))
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

def main():
    parser = argparse.ArgumentParser(description="CraftCalc Quora Community Helper")
    parser.add_argument("action", choices=["login", "post_next", "view_answers"], default="post_next", nargs="?")
    parser.add_argument("--headless", action="store_true", help="Run browser in background")
    args = parser.parse_args()

    if args.action == "login":
        do_login()
    elif args.action == "view_answers":
        database = load_database()
        config = load_config()
        print(f"\nTotal Answers in Database: {len(database)}")
        print(f"Current Mode: {'WARMUP (No Links)' if config.get('warmup_mode') else 'PROMOTIONAL (With Links)'}\n")
        for item in database:
            print(f"[{item['id']}] {item['topic']}")
    else:
        post_next_answer(headless=args.headless)

if __name__ == "__main__":
    main()
