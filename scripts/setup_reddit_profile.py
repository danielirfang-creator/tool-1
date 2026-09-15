import os
import sys
import time
import json
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from playwright.sync_api import sync_playwright

BASE_DIR = Path(__file__).resolve().parent.parent
BOT_DIR = BASE_DIR / "reddit_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"

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

def customize_reddit_profile():
    print("=" * 65)
    print("🎨 CUSTOMIZING REDDIT PROFILE FOR CRAFTCALC")
    print("=" * 65)

    with sync_playwright() as p:
        browser_context, browser_instance = get_browser_context(p, headless=False)
        page = browser_context.new_page()

        try:
            print("🌐 Navigating to Reddit Profile Settings...")
            page.goto("https://www.reddit.com/settings/profile", timeout=45000)
            page.wait_for_timeout(5000)

            if "login" in page.url.lower():
                print("[WARNING] Not logged in! Please login first via 1_LOGIN_REDDIT.bat")
                return False

            # Display name
            disp = page.locator('input[name="displayName"], input[id="displayName"], [data-testid="display-name-input"]').first
            if disp.count() > 0 and disp.is_visible():
                disp.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                disp.fill("CraftCalc | DIY Estimators")
                print("   ✔ Updated Display Name: CraftCalc | DIY Estimators")
                page.wait_for_timeout(1000)

            # About / Bio
            about = page.locator('textarea[name="about"], textarea[id="about"], [data-testid="about-textarea"]').first
            if about.count() > 0 and about.is_visible():
                about.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                bio = "🛠️ Free DIY & Contractor Material Estimators. Calculate exact Flooring, Paint, Concrete, Tile, Mulch & Drywall needed with zero waste."
                about.fill(bio)
                print("   ✔ Updated Bio / About description")
                page.wait_for_timeout(1000)

            # Click save if needed or it autosaves
            page.wait_for_timeout(3000)
            page.screenshot(path=str(BOT_DIR / "reddit_profile_customized.png"))
            print("🎉 Profile setup complete! Screenshot saved.")
            return True

        except Exception as e:
            print(f"[ERROR] Failed to customize Reddit profile: {e}")
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

if __name__ == "__main__":
    customize_reddit_profile()
