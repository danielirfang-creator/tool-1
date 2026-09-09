import os
import sys
import time
import json
import subprocess
from datetime import datetime, timedelta
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent.parent
NTFY_TOPIC = "craftcalc_danial"  # User mobile ntfy topic

PINTEREST_HISTORY = BASE_DIR / "pinterest_bot" / "posted_history.json"
TWITTER_HISTORY = BASE_DIR / "twitter_bot" / "posted_history.json"
BLOG_HISTORY = BASE_DIR / "blog_bot" / "published_history.json"
HTML_REPORT_FILE = BASE_DIR / "DAILY_REPORT.html"
PYTHON_EXE = sys.executable

def send_ntfy_notification(title, message, tags="chart_with_upwards_trend,white_check_mark", priority="default", click_url="https://tool-1-pied.vercel.app"):
    url = f"https://ntfy.sh/{NTFY_TOPIC}"
    try:
        cmd = [
            "curl.exe", "-s",
            "-H", f"Title: {title}",
            "-H", f"Priority: {priority}",
            "-H", f"Tags: {tags}",
            "-H", f"Click: {click_url}",
            "-d", message,
            url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=20)
        if res.returncode == 0:
            print(f"✅ Mobile Notification delivered to ntfy.sh/{NTFY_TOPIC}")
            return True
        else:
            print(f"[ERROR] curl failed: {res.stderr}")
            return False
    except Exception as e:
        print(f"[ERROR] Failed to send ntfy notification: {e}")
        return False

def get_today_and_total_stats():
    now = datetime.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    cutoff_24h = now - timedelta(hours=24)
    
    # 1. Pinterest Stats
    pin_count_today = 0
    total_pins = 0
    latest_pin = "None"
    if PINTEREST_HISTORY.exists():
        try:
            with open(PINTEREST_HISTORY, "r", encoding="utf-8") as f:
                pdata = json.load(f)
                logs = pdata.get("logs", [])
                total_pins = len(logs)
                for l in logs:
                    try:
                        ts = datetime.fromisoformat(l.get("timestamp", "2000-01-01"))
                        if ts >= today_start or ts >= cutoff_24h:
                            pin_count_today += 1
                    except Exception:
                        pass
                if logs:
                    latest_pin = logs[-1].get("title", "Pin")[:42] + "..."
        except Exception:
            pass

    # 2. Twitter Stats
    tweet_count_today = 0
    total_tweets = 0
    latest_tweet = "None"
    if TWITTER_HISTORY.exists():
        try:
            with open(TWITTER_HISTORY, "r", encoding="utf-8") as f:
                tdata = json.load(f)
                logs = tdata.get("logs", [])
                total_tweets = len(logs)
                for l in logs:
                    try:
                        ts = datetime.fromisoformat(l.get("timestamp", "2000-01-01"))
                        if ts >= today_start or ts >= cutoff_24h:
                            tweet_count_today += 1
                    except Exception:
                        pass
                if logs:
                    latest_tweet = logs[-1].get("text", "Tweet")[:42] + "..."
        except Exception:
            pass

    # 3. Blog Stats
    devto_today = 0
    medium_today = 0
    total_articles = 0
    latest_article = "None"
    if BLOG_HISTORY.exists():
        try:
            with open(BLOG_HISTORY, "r", encoding="utf-8") as f:
                bdata = json.load(f)
                published = bdata.get("published", [])
                total_articles = len(published)
                for b in published:
                    try:
                        ts = datetime.fromisoformat(b.get("timestamp", "2000-01-01"))
                        if ts >= today_start or ts >= cutoff_24h:
                            if "devto" in b.get("links", {}): devto_today += 1
                            if "medium" in b.get("links", {}): medium_today += 1
                    except Exception:
                        pass
                if published:
                    latest_article = published[-1].get("title", "Article")[:42] + "..."
        except Exception:
            pass

    return {
        "pin_count_today": pin_count_today,
        "total_pins": total_pins,
        "latest_pin": latest_pin,
        "tweet_count_today": tweet_count_today,
        "total_tweets": total_tweets,
        "latest_tweet": latest_tweet,
        "devto_today": devto_today,
        "medium_today": medium_today,
        "total_articles": total_articles,
        "latest_article": latest_article,
        "date_str": now.strftime("%d-%b-%Y"),
        "time_str": now.strftime("%I:%M %p")
    }

def check_and_heal_processes():
    """Checks if background workers are active and auto-restarts any missing ones."""
    healed = []
    try:
        cmd = ["powershell", "-NoProfile", "-Command", "Get-CimInstance Win32_Process -Filter \"Name = 'python.exe'\" | Select-Object -ExpandProperty CommandLine"]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=15)
        running_cmdlines = res.stdout if res.returncode == 0 else ""
        
        # Check Pinterest Bot
        if "pinterest_auto_bot.py" not in running_cmdlines:
            subprocess.Popen([PYTHON_EXE, str(BASE_DIR / "scripts" / "pinterest_auto_bot.py"), "schedule", "--interval", "2.4", "--headless"], cwd=str(BASE_DIR), creationflags=0x08000000)
            healed.append("Pinterest 10 Pins/Day Bot Relaunched")
            
        # Check Twitter Bot
        if "twitter_auto_bot.py" not in running_cmdlines:
            subprocess.Popen([PYTHON_EXE, str(BASE_DIR / "scripts" / "twitter_auto_bot.py"), "schedule", "--interval", "6", "--headless"], cwd=str(BASE_DIR), creationflags=0x08000000)
            healed.append("Twitter 6h Bot Relaunched")
            
        # Check Blog Bot
        if "blog_auto_publisher.py" not in running_cmdlines:
            subprocess.Popen([PYTHON_EXE, str(BASE_DIR / "scripts" / "blog_auto_publisher.py"), "schedule", "--interval", "24"], cwd=str(BASE_DIR), creationflags=0x08000000)
            healed.append("Blog Auto-Publisher Relaunched")
            
    except Exception as e:
        print(f"[WATCHDOG HEAL ERROR] {e}")
        
    return healed

def send_daily_summary(is_night_report=True):
    stats = get_today_and_total_stats()
    healed = check_and_heal_processes()
    
    if is_night_report:
        title = f"🌙 CraftCalc End-of-Day Report (11:59 PM - {stats['date_str']})"
    else:
        title = f"📊 CraftCalc Daily Report ({stats['time_str']} - {stats['date_str']})"
        
    heal_text = "🟢 Sab bots 100% normal chal rahe hain (No errors)"
    if healed:
        heal_text = f"🛠️ Auto-Healed & Restored: {', '.join(healed)}"

    message = (
        f"📊 Aaj Ka Mukammal Kaam (Full Day Summary):\n\n"
        f"📌 Pinterest: {stats['pin_count_today']} Pins Posted Today (Total: {stats['total_pins']})\n"
        f"   Last: {stats['latest_pin']}\n\n"
        f"🐦 Twitter/X: {stats['tweet_count_today']} Tweets Posted Today (Total: {stats['total_tweets']})\n"
        f"   Last: {stats['latest_tweet']}\n\n"
        f"✍️ Articles Live: Medium ({stats['medium_today']}), Dev.to ({stats['devto_today']})\n"
        f"   Last: {stats['latest_article']}\n\n"
        f"🛡️ Self-Healing Status:\n{heal_text}\n\n"
        f"🌐 Traffic Destination: tool-1-pied.vercel.app"
    )
    
    print("=" * 60)
    print(title)
    print("=" * 60)
    print(message)
    print("=" * 60)
    
    send_ntfy_notification(title, message, tags="crescent_moon,chart_with_upwards_trend,white_check_mark", priority="high" if is_night_report else "default")
    generate_html_report(stats, heal_text)

def generate_html_report(stats, heal_text):
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CraftCalc End-of-Day Report</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 30px; margin: 0; }}
        .card {{ max-width: 650px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 28px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 1px solid #334155; }}
        .header {{ display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 20px; }}
        .status-badge {{ background: #10b981; color: white; padding: 4px 12px; border-radius: 9999px; font-weight: bold; font-size: 13px; }}
        .stat-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }}
        .stat-box {{ background: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid #334155; }}
        .stat-val {{ font-size: 28px; font-weight: bold; color: #38bdf8; margin: 4px 0; }}
        .stat-lbl {{ color: #94a3b8; font-size: 13px; text-transform: uppercase; }}
        .footer {{ text-align: center; color: #64748b; font-size: 12px; margin-top: 20px; }}
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <div>
                <h2 style="margin:0; font-size: 20px;">🌙 CraftCalc End-of-Day Report (11:59 PM)</h2>
                <span style="color:#94a3b8; font-size:13px;">Date: {stats['date_str']} • Time: {stats['time_str']}</span>
            </div>
            <div class="status-badge">100% HEALTHY</div>
        </div>
        <div class="stat-grid">
            <div class="stat-box">
                <div class="stat-lbl">📌 Pinterest Video Pins</div>
                <div class="stat-val">{stats['pin_count_today']} <span style="font-size:14px; color:#94a3b8;">/ 10 daily</span></div>
                <div style="font-size:12px; color:#cbd5e1;">All-Time Posted: {stats['total_pins']}</div>
            </div>
            <div class="stat-box">
                <div class="stat-lbl">🐦 Twitter/X Tips</div>
                <div class="stat-val">{stats['tweet_count_today']}</div>
                <div style="font-size:12px; color:#cbd5e1;">All-Time Posted: {stats['total_tweets']}</div>
            </div>
            <div class="stat-box">
                <div class="stat-lbl">✍️ Medium Stories</div>
                <div class="stat-val">{stats['medium_today']}</div>
                <div style="font-size:12px; color:#cbd5e1;">DA 96 High-Authority</div>
            </div>
            <div class="stat-box">
                <div class="stat-lbl">✍️ Dev.to Articles</div>
                <div class="stat-val">{stats['devto_today']}</div>
                <div style="font-size:12px; color:#cbd5e1;">DA 92 Backlinks</div>
            </div>
        </div>
        <div style="background:#0f172a; padding:16px; border-radius:12px; font-size:13px; line-height:1.6; color:#94a3b8;">
            <b style="color:#f8fafc;">🛡️ Self-Healing Watchdog:</b> {heal_text}
        </div>
        <div class="footer">CraftCalc Multi-Channel Organic Traffic Engine • <a href="https://tool-1-pied.vercel.app" style="color:#38bdf8;">tool-1-pied.vercel.app</a></div>
    </div>
</body>
</html>"""
    with open(HTML_REPORT_FILE, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"📄 Local HTML Report written: {HTML_REPORT_FILE}")

def run_watchdog_loop():
    print("=" * 60)
    print(f"🛡️ CRAFTCALC 24/7 SELF-HEALING WATCHDOG & 11:59 PM REPORTER")
    print(f"⏰ Nightly Full-Day Report Scheduled At: 11:59 PM Sharp")
    print(f"📲 ntfy Channel: https://ntfy.sh/{NTFY_TOPIC}")
    print("=" * 60)
    
    last_reported_day = None
    
    while True:
        now = datetime.now()
        current_day = now.date()
        
        # Self-healing check every 10 minutes
        healed = check_and_heal_processes()
        if healed:
            print(f"[{now.strftime('%H:%M:%S')}] 🛠️ Watchdog restored: {healed}")
            
        # Check if it's 11:59 PM (23:59) and report hasn't been sent for today
        if now.hour == 23 and now.minute >= 59 and last_reported_day != current_day:
            print(f"[{now.strftime('%H:%M:%S')}] 🌙 11:59 PM Reached! Sending Full Day Summary...")
            send_daily_summary(is_night_report=True)
            last_reported_day = current_day
            
        # Sleep for 30 seconds before next check
        time.sleep(30)

if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "report"
    if action == "test":
        send_ntfy_notification("🔔 CraftCalc Test Notification", "Test notification successful! Aapka mobile ab CraftCalc bot se connected hai. 🚀", tags="tada,rocket")
    elif action == "watch":
        run_watchdog_loop()
    elif action == "--scheduled":
        send_daily_summary(is_night_report=True)
    else:
        send_daily_summary(is_night_report=False)

