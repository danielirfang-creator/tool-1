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
BOT_DIR = BASE_DIR / "pinterest_bot"
USER_DATA_DIR = BOT_DIR / "user_session"
STORAGE_STATE_FILE = BOT_DIR / "storage_state.json"

def get_browser_context(p, headless=False):
    if USER_DATA_DIR.exists() and any(USER_DATA_DIR.iterdir()):
        print("ℹ️ Using local Pinterest user_session profile")
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
        print(f"ℹ️ Loading Pinterest authentication from {STORAGE_STATE_FILE.name}")
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
        context = p.chromium.launch_persistent_context(
            user_data_dir=str(USER_DATA_DIR),
            headless=headless,
            viewport={"width": 1280, "height": 900},
            args=["--disable-blink-features=AutomationControlled"]
        )
        return context, None

def update_profile():
    print("=" * 65)
    print("🎨 UPDATING PINTEREST PROFILE TO 100% PROFESSIONAL BRAND")
    print("=" * 65)

    with sync_playwright() as p:
        browser_context, browser_instance = get_browser_context(p, headless=True)
        page = browser_context.new_page()

        try:
            print("🌐 Navigating to Pinterest Profile Edit Settings...")
            page.goto("https://www.pinterest.com/settings/edit-profile/", timeout=45000)
            page.wait_for_timeout(5000)

            # Check if redirected to login
            if "login" in page.url.lower():
                print("[WARNING] User is not logged in to Pinterest!")
                page.screenshot(path=str(BOT_DIR / "profile_login_required.png"))
                return False

            page.screenshot(path=str(BOT_DIR / "edit_profile_before.png"))
            print("📸 Captured current settings page")

            # 1. Update First Name / Display Name
            # Pinterest fields usually have id="first_name", id="last_name", or name="first_name" or [data-test-id="first_name"]
            first_name_el = page.locator('#first_name, input[name="first_name"], input[data-test-id*="first_name"]').first
            if first_name_el.count() > 0 and first_name_el.is_visible():
                first_name_el.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                first_name_el.fill("CraftCalc")
                print("   ✔ Updated First Name: CraftCalc")
                page.wait_for_timeout(500)

            last_name_el = page.locator('#last_name, input[name="last_name"], input[data-test-id*="last_name"]').first
            if last_name_el.count() > 0 and last_name_el.is_visible():
                last_name_el.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                last_name_el.fill("DIY & Contractor Estimators")
                print("   ✔ Updated Last Name: DIY & Contractor Estimators")
                page.wait_for_timeout(500)

            # 2. Update About / Bio
            about_el = page.locator('#about, textarea[name="about"], textarea[data-test-id*="about"]').first
            if about_el.count() > 0 and about_el.is_visible():
                about_el.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                bio_text = "🛠️ Free DIY & Contractor Material Estimators. Calculate exact Flooring, Paint, Concrete, Tile, Mulch & Drywall needed with zero waste."
                about_el.fill(bio_text)
                print("   ✔ Updated About/Bio section")
                page.wait_for_timeout(500)

            # 3. Update Website
            website_el = page.locator('#website_url, input[name="website_url"], input[data-test-id*="website_url"]').first
            if website_el.count() > 0 and website_el.is_visible():
                website_el.click()
                page.keyboard.press("Control+A")
                page.keyboard.press("Backspace")
                website_el.fill("https://tool-1-pied.vercel.app")
                print("   ✔ Updated Website: https://tool-1-pied.vercel.app")
                page.wait_for_timeout(500)

            # 4. Click Save button
            save_btn = page.locator('button[type="submit"]:has-text("Save"), button:has-text("Save"), [data-test-id="done-button"]').first
            if save_btn.count() > 0 and save_btn.is_visible():
                save_btn.click()
                print("🚀 Clicked Save button!")
                page.wait_for_timeout(5000)

            # 5. Navigate to Live Public Profile to capture screenshot
            print("🌐 Navigating to Live Profile to verify changes...")
            page.goto("https://www.pinterest.com/danielirfang/", timeout=45000)
            page.wait_for_timeout(5000)

            live_screenshot = BOT_DIR / "live_profile_updated.png"
            page.screenshot(path=str(live_screenshot))
            print(f"🎉 SUCCESS! Live profile screenshot saved to {live_screenshot.name}")

            # Save state
            try:
                browser_context.storage_state(path=str(STORAGE_STATE_FILE))
            except Exception:
                pass

            return True

        except Exception as e:
            print(f"[ERROR] Failed to update Pinterest profile: {e}")
            try:
                page.screenshot(path=str(BOT_DIR / "profile_update_error.png"))
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

if __name__ == "__main__":
    update_profile()
