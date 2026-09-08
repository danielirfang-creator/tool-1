import os
import sys
import time
import json
import argparse
import requests
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
BOT_DIR = BASE_DIR / "blog_bot"
CONFIG_FILE = BOT_DIR / "blog_config.json"
HISTORY_FILE = BOT_DIR / "published_history.json"
ARTICLES_FILE = BOT_DIR / "articles_database.json"

MEDIUM_BOT_DIR = BASE_DIR / "medium_bot"
MEDIUM_USER_DATA_DIR = MEDIUM_BOT_DIR / "user_session"
MEDIUM_STORAGE_STATE_FILE = MEDIUM_BOT_DIR / "storage_state.json"

def ensure_dirs():
    BOT_DIR.mkdir(parents=True, exist_ok=True)
    MEDIUM_BOT_DIR.mkdir(parents=True, exist_ok=True)
    if not HISTORY_FILE.exists():
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump({"published": []}, f, indent=2)
    if not CONFIG_FILE.exists():
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "devto_api_key": "SNYFU6xZyWF1Ee7RewDb2NWa",
                "medium_token": ""
            }, f, indent=2)

def load_config():
    ensure_dirs()
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

def load_history():
    ensure_dirs()
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {"published": []}

def save_history(history):
    with open(HISTORY_FILE, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)

def load_articles():
    if not ARTICLES_FILE.exists():
        return []
    try:
        with open(ARTICLES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"[ERROR] Failed to load articles: {e}")
        return []

def do_medium_login():
    ensure_dirs()
    print("=" * 60)
    print("🚀 OPENING BROWSER FOR 1-TIME MEDIUM.COM LOGIN")
    print("=" * 60)
    print("1. Browser khul raha hai...")
    print("2. Apne Medium account par Login karein.")
    print("3. Jab login ho jaye aur home feed open ho jaye, to yahan aa kar ENTER dabayein.")
    print("=" * 60)

    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(MEDIUM_USER_DATA_DIR),
            headless=False,
            viewport={"width": 1280, "height": 850},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-infobars"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = browser_context.new_page()
        page.goto("https://medium.com/m/signin", timeout=60000)
        
        input("\n👉 Medium par Login karne ke baad yahan ENTER press karein: ")
        
        browser_context.storage_state(path=str(MEDIUM_STORAGE_STATE_FILE))
        print(f"✅ Medium Session Saved: {MEDIUM_STORAGE_STATE_FILE}")
        
        browser_context.close()
        print("🎉 Medium Login setup complete! Ab Medium auto-posting tayyar hai.")

def publish_to_devto(article, api_key):
    print(f"\n🚀 Publishing to Dev.to (DA 92): '{article['title']}'...")
    url = "https://dev.to/api/articles"
    headers = {
        "api-key": api_key,
        "Content-Type": "application/json",
        "User-Agent": "CraftCalcAutoBlogger/1.0"
    }
    payload = {
        "article": {
            "title": article["title"],
            "published": True,
            "body_markdown": article["markdown_body"],
            "tags": article.get("tags", ["diy", "tools", "productivity"])[:4],
            "canonical_url": article.get("canonical_url"),
            "main_image": article.get("cover_image"),
            "description": article.get("description")
        }
    }
    
    try:
        res = requests.post(url, json=payload, headers=headers, timeout=30)
        if res.status_code in [200, 201]:
            data = res.json()
            article_url = data.get("url")
            print(f"🎉 SUCCESS! Published on Dev.to: {article_url}")
            return article_url
        else:
            print(f"[ERROR] Dev.to responded with status {res.status_code}: {res.text}")
            return None
    except Exception as e:
        print(f"[ERROR] Dev.to request failed: {e}")
        return None

def publish_to_medium_browser(article, headless=False):
    print(f"\n🚀 Publishing to Medium.com (DA 96) via Browser: '{article['title']}'...")
    
    with sync_playwright() as p:
        browser_context = p.chromium.launch_persistent_context(
            user_data_dir=str(MEDIUM_USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--disable-infobars"
            ],
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        )
        page = browser_context.new_page()

        try:
            page.goto("https://medium.com/new-story", timeout=45000)
            page.wait_for_timeout(4000)

            # Check if redirected to login
            if "signin" in page.url.lower() or "login" in page.url.lower():
                print("[WARNING] User is not logged into Medium! Please run '1_LOGIN_MEDIUM.bat' first.")
                browser_context.close()
                return None

            # Fill Title
            title_el = page.locator('h3[data-placeholder*="Title" i], [data-testid="editorTitleBlock"], h3, [role="textbox"]').first
            title_el.wait_for(state="visible", timeout=15000)
            title_el.click()
            page.keyboard.type(article["title"])
            page.keyboard.press("Enter")
            print("   ✔ Medium Title entered")
            page.wait_for_timeout(1000)

            # Type Body (clean markdown formatting)
            body_text = article["markdown_body"].replace("#", "").replace("`", "").replace("$$", "")
            # Type first paragraph or full text
            page.keyboard.type(body_text[:2500], delay=10)
            print("   ✔ Medium Story Content entered")
            page.wait_for_timeout(2000)

            # Click Publish button at top right
            pub_top = page.locator('button[data-action="publish"], button:has-text("Publish")').first
            if pub_top.is_visible():
                pub_top.click()
                print("   ✔ Clicked top Publish button")
                page.wait_for_timeout(3000)

            # Fill Tags in publish dropdown
            tag_input = page.locator('input[placeholder*="topic" i], input[placeholder*="tag" i], input[data-testid="tagInput"]').first
            if tag_input.count() > 0 and tag_input.is_visible():
                for tag in article.get("tags", ["DIY", "Home Improvement", "Tools"])[:3]:
                    tag_input.fill(tag)
                    page.keyboard.press("Enter")
                    page.wait_for_timeout(500)
                print("   ✔ Tags added")

            # Click final modal Publish button
            final_pub = page.locator('button:has-text("Publish"), button:has-text("Publish now")').last
            if final_pub.count() > 0 and final_pub.is_visible():
                final_pub.click()
                print("   🚀 🎯 CLICKED MODAL PUBLISH BUTTON!")
                page.wait_for_timeout(7000)

            print(f"🎉 SUCCESS! Article published to Medium: {page.url}")
            med_url = page.url
            browser_context.close()
            return med_url

        except Exception as e:
            print(f"[ERROR] Failed to publish on Medium: {e}")
            browser_context.close()
            return None

def publish_next_article(headless=False):
    config = load_config()
    articles = load_articles()
    history = load_history()
    
    published_ids = {p.get("article_id") for p in history.get("published", [])}
    next_art = next((a for a in articles if a.get("id") not in published_ids), None)
    
    if not next_art:
        print("🏁 All articles have been published! Resetting queue...")
        history["published"] = []
        save_history(history)
        next_art = articles[0]

    print("=" * 65)
    print(f"📰 MULTI-PLATFORM AUTO-BLOGGER: {next_art['title']}")
    print("=" * 65)

    results = {}
    
    # 1. Dev.to (API)
    devto_key = config.get("devto_api_key", "SNYFU6xZyWF1Ee7RewDb2NWa")
    if devto_key:
        devto_url = publish_to_devto(next_art, devto_key)
        if devto_url:
            results["devto"] = devto_url

    # 2. Medium (Browser session)
    if (MEDIUM_BOT_DIR / "user_session").exists() or MEDIUM_STORAGE_STATE_FILE.exists():
        med_url = publish_to_medium_browser(next_art, headless=headless)
        if med_url:
            results["medium"] = med_url
    else:
        print("ℹ️ Medium session not found. Run '1_LOGIN_MEDIUM.bat' once to enable Medium auto-posting.")

    if results:
        history["published"].append({
            "article_id": next_art["id"],
            "title": next_art["title"],
            "timestamp": datetime.now().isoformat(),
            "links": results
        })
        save_history(history)
        print("\n✅ Multi-Platform Publishing Completed & Logged!")
        return True
    return False

def run_schedule(interval_hours=24.0, headless=False):
    print("=" * 65)
    print("🤖 DAILY AUTO-BLOGGER STARTED")
    print(f"⏰ Interval: 1 Article every {interval_hours} hours (Daily)")
    print("=" * 65)

    while True:
        publish_next_article(headless=headless)
        print(f"\n⏳ Waiting {interval_hours} hours until the next daily article...")
        time.sleep(interval_hours * 3600)

def main():
    parser = argparse.ArgumentParser(description="Multi-Platform Auto-Blogging Publisher")
    parser.add_argument("action", choices=["publish_next", "list_articles", "login_medium", "schedule"], default="publish_next", nargs="?")
    parser.add_argument("--interval", type=float, default=24.0, help="Interval in hours for scheduler (default: 24)")
    parser.add_argument("--headless", action="store_true", help="Run browser in background")
    args = parser.parse_args()

    if args.action == "login_medium":
        do_medium_login()
    elif args.action == "list_articles":
        articles = load_articles()
        print(f"\nTotal Ready Articles: {len(articles)}")
        for i, a in enumerate(articles, 1):
            print(f"[{i}] {a['title']} ({a['canonical_url']})")
    elif args.action == "schedule":
        run_schedule(interval_hours=args.interval, headless=args.headless)
    else:
        publish_next_article(headless=args.headless)

if __name__ == "__main__":
    main()
