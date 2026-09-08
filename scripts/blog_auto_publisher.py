import os
import sys
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

def ensure_dirs():
    BOT_DIR.mkdir(parents=True, exist_ok=True)
    if not HISTORY_FILE.exists():
        with open(HISTORY_FILE, "w", encoding="utf-8") as f:
            json.dump({"published": []}, f, indent=2)
    if not CONFIG_FILE.exists():
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump({
                "devto_api_key": "",
                "medium_token": "",
                "hashnode_token": "",
                "hashnode_publication_id": ""
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

def publish_to_medium_api(article, token):
    print(f"\n🚀 Publishing to Medium.com (DA 96) via API: '{article['title']}'...")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    try:
        user_res = requests.get("https://api.medium.com/v1/me", headers=headers, timeout=20)
        if user_res.status_code != 200:
            print(f"[ERROR] Failed to fetch Medium user: {user_res.text}")
            return None
        user_id = user_res.json()["data"]["id"]
        
        post_url = f"https://api.medium.com/v1/users/{user_id}/posts"
        payload = {
            "title": article["title"],
            "contentFormat": "markdown",
            "content": f"# {article['title']}\n\n{article['markdown_body']}",
            "canonicalUrl": article.get("canonical_url"),
            "tags": article.get("tags", [])[:5],
            "publishStatus": "public"
        }
        res = requests.post(post_url, json=payload, headers=headers, timeout=30)
        if res.status_code in [200, 201]:
            data = res.json()
            pub_url = data["data"]["url"]
            print(f"🎉 SUCCESS! Published on Medium: {pub_url}")
            return pub_url
        else:
            print(f"[ERROR] Medium publish failed: {res.text}")
            return None
    except Exception as e:
        print(f"[ERROR] Medium request failed: {e}")
        return None

def publish_next_article():
    config = load_config()
    articles = load_articles()
    history = load_history()
    
    published_ids = {p.get("article_id") for p in history.get("published", [])}
    next_art = next((a for a in articles if a.get("id") not in published_ids), None)
    
    if not next_art:
        print("🏁 All articles have been published!")
        return

    print("=" * 65)
    print(f"📰 MULTI-PLATFORM AUTO-BLOGGER: {next_art['title']}")
    print("=" * 65)

    results = {}
    
    # 1. Dev.to
    devto_key = config.get("devto_api_key")
    if devto_key:
        devto_url = publish_to_devto(next_art, devto_key)
        if devto_url:
            results["devto"] = devto_url
    else:
        print("ℹ️ Dev.to API Key not configured (Open blog_bot/blog_config.json to add)")

    # 2. Medium
    med_token = config.get("medium_token")
    if med_token:
        med_url = publish_to_medium_api(next_art, med_token)
        if med_url:
            results["medium"] = med_url
    else:
        print("ℹ️ Medium Integration Token not configured (Open blog_bot/blog_config.json to add)")

    if results:
        history["published"].append({
            "article_id": next_art["id"],
            "title": next_art["title"],
            "timestamp": datetime.now().isoformat(),
            "links": results
        })
        save_history(history)
        print("\n✅ Multi-Platform Publishing Completed & Logged!")
    else:
        print("\n⚠️ No API keys configured in blog_bot/blog_config.json.")

def main():
    parser = argparse.ArgumentParser(description="Multi-Platform Auto-Blogging Publisher")
    parser.add_argument("action", choices=["publish_next", "list_articles", "setup_help"], default="publish_next", nargs="?")
    args = parser.parse_args()

    if args.action == "list_articles":
        articles = load_articles()
        print(f"\nTotal Ready Articles: {len(articles)}")
        for i, a in enumerate(articles, 1):
            print(f"[{i}] {a['title']} ({a['canonical_url']})")
    elif args.action == "setup_help":
        print("=" * 65)
        print("📖 HOW TO GET 100% FREE BLOGGING API KEYS:")
        print("=" * 65)
        print("1. Dev.to (DA 92):")
        print("   👉 Go to https://dev.to/settings/extensions -> Generate API Key")
        print("2. Medium (DA 96):")
        print("   👉 Go to https://medium.com/me/settings/security -> Integration tokens")
        print("3. Paste the keys into 'blog_bot/blog_config.json'")
        print("=" * 65)
    else:
        publish_next_article()

if __name__ == "__main__":
    main()
