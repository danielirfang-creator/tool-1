import os
import sys
import time
import json
import random
import urllib.request
import xmlrpc.client
import ssl
from datetime import datetime, timedelta
from pathlib import Path

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

BASE_DIR = Path(__file__).resolve().parent.parent
BACKLINK_BOT_DIR = BASE_DIR / 'backlink_bot'
BACKLINK_HISTORY_FILE = BACKLINK_BOT_DIR / 'backlink_history.json'
INDEXNOW_KEY = '39fa789b91e44efb9a67e45efc1c28c8'
SITE_URL = 'https://tool-1-pied.vercel.app'

BACKLINK_TARGETS = [
    {
        'keyword': 'Precision Flooring Material Calculator',
        'url': 'https://tool-1-pied.vercel.app/calculators/flooring/flooring-calculator',
        'topic': 'Flooring & Hardwood Estimations',
        'cluster': 'flooring'
    },
    {
        'keyword': 'DIY Tile & Grout Coverage Estimator',
        'url': 'https://tool-1-pied.vercel.app/calculators/flooring/tile-calculator',
        'topic': 'Tiling & Mortar Formulas',
        'cluster': 'flooring'
    },
    {
        'keyword': 'Laminate Plank & Underlayment Calculator',
        'url': 'https://tool-1-pied.vercel.app/calculators/flooring/laminate-calculator',
        'topic': 'Laminate Flooring Takeoffs',
        'cluster': 'flooring'
    },
    {
        'keyword': 'Luxury Vinyl Plank (LVP) Carton Calculator',
        'url': 'https://tool-1-pied.vercel.app/calculators/flooring/vinyl-flooring-calculator',
        'topic': 'Vinyl Plank Estimations',
        'cluster': 'flooring'
    },
    {
        'keyword': 'Wall & Ceiling Paint Gallon Estimator',
        'url': 'https://tool-1-pied.vercel.app/calculators/painting/paint-calculator',
        'topic': 'Painting Coverage Math',
        'cluster': 'painting'
    },
    {
        'keyword': 'Concrete Slab Yardage & Bag Estimator',
        'url': 'https://tool-1-pied.vercel.app/calculators/concrete-masonry/concrete-slab-calculator',
        'topic': 'Concrete Slab Volume Formulas',
        'cluster': 'concrete-masonry'
    },
    {
        'keyword': 'Contractor Flooring Waste Margin Guidelines',
        'url': 'https://tool-1-pied.vercel.app/guides/flooring-waste-percentage-guide',
        'topic': 'Material Waste Factors',
        'cluster': 'guides'
    },
    {
        'keyword': 'Concrete Footing & Pier Volume Guide',
        'url': 'https://tool-1-pied.vercel.app/calculators/concrete-masonry/concrete-footing-calculator',
        'topic': 'Structural Concrete Footings',
        'cluster': 'concrete-masonry'
    }
]

def ensure_dirs():
    BACKLINK_BOT_DIR.mkdir(parents=True, exist_ok=True)
    if not BACKLINK_HISTORY_FILE.exists():
        with open(BACKLINK_HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump({'total_backlinks': 0, 'backlinks': []}, f, indent=2)

def load_history():
    ensure_dirs()
    try:
        with open(BACKLINK_HISTORY_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        return {'total_backlinks': 0, 'backlinks': []}

def save_history(history):
    ensure_dirs()
    with open(BACKLINK_HISTORY_FILE, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def ping_search_engines(urls):
    results = {'indexnow': False, 'pingomatic': False}
    ctx = ssl._create_unverified_context()
    
    # Filter host URLs strictly for IndexNow
    host_urls = [u for u in urls if 'tool-1-pied.vercel.app' in u]
    if host_urls:
        try:
            payload = {
                'host': 'tool-1-pied.vercel.app',
                'key': INDEXNOW_KEY,
                'keyLocation': f'{SITE_URL}/{INDEXNOW_KEY}.txt',
                'urlList': host_urls
            }
            req = urllib.request.Request(
                'https://api.indexnow.org/indexnow',
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json; charset=utf-8', 'User-Agent': 'CraftCalc-IndexNow'}
            )
            res = urllib.request.urlopen(req, context=ctx, timeout=15)
            if res.status in (200, 202):
                results['indexnow'] = True
                print(f'   ✔ IndexNow Accepted {len(host_urls)} URLs for Instant Crawling (HTTP {res.status})')
        except Exception as e:
            print(f'   [!] IndexNow ping failed: {e}')

    try:
        s = xmlrpc.client.ServerProxy('http://rpc.pingomatic.com')
        res = s.weblogUpdates.ping('CraftCalc Precision DIY Calculators', SITE_URL, f'{SITE_URL}/sitemap.xml')
        if not res.get('flerror', True):
            results['pingomatic'] = True
            print('   ✔ Ping-o-Matic successfully alerted weblog aggregators & search bots')
    except Exception as e:
        print(f'   [!] Ping-o-Matic error: {e}')

    return results

def trigger_auto_backlink_run():
    print('=' * 60)
    print('🚀 CRAFTCALC AUTOMATED HIGH-DA BACKLINK MACHINE')
    print(f'📅 Time: {datetime.now().strftime("%d-%b-%Y %I:%M %p")}')
    print('=' * 60)
    
    history = load_history()
    target = random.choice(BACKLINK_TARGETS)
    
    # 1. Trigger High-DA Article Publisher (Dev.to DA 92 / Medium DA 96)
    try:
        import subprocess
        cmd = [sys.executable, str(BASE_DIR / 'scripts' / 'blog_auto_publisher.py'), 'publish']
        print('👉 1. Publishing High-DA Contractor Article with Contextual Backlinks...')
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=60)
        print(res.stdout)
    except Exception as e:
        print(f'[ERROR] Article publisher: {e}')

    # 2. Collect Live Backlink URLs
    all_urls = [
        SITE_URL,
        f'{SITE_URL}/calculators',
        target['url']
    ]
    
    blog_history_file = BASE_DIR / 'blog_bot' / 'published_history.json'
    if blog_history_file.exists():
        try:
            with open(blog_history_file, 'r', encoding='utf-8') as f:
                bdata = json.load(f)
                published = bdata.get('published', [])
                if published:
                    last_item = published[-1]
                    links = last_item.get('links', {})
                    for platform, purl in links.items():
                        all_urls.append(purl)
        except Exception:
            pass

    # 3. Fast Indexing Ping
    print('\n👉 2. Triggering Instant Search Engine & Bot Pinging...')
    ping_res = ping_search_engines(all_urls)
    
    # 4. Record History
    backlink_record = {
        'id': len(history['backlinks']) + 1,
        'anchor_text': target['keyword'],
        'target_url': target['url'],
        'cluster': target['cluster'],
        'domain_authority': 'DA 92-96',
        'pinged_indexnow': ping_res['indexnow'],
        'pinged_pingomatic': ping_res['pingomatic'],
        'timestamp': datetime.now().isoformat()
    }
    history['backlinks'].append(backlink_record)
    history['total_backlinks'] = len(history['backlinks'])
    save_history(history)
    
    print('=' * 60)
    print(f'🎉 Auto-Backlink Cycle Complete! Total Active Backlinks Tracked: {history["total_backlinks"]}')
    print('=' * 60)

def run_scheduler(interval_hours=12):
    print(f'🛡️ Auto-Backlink Scheduler Active (Interval: Every {interval_hours} Hours)')
    trigger_auto_backlink_run()
    while True:
        time.sleep(interval_hours * 3600)
        trigger_auto_backlink_run()

if __name__ == '__main__':
    mode = sys.argv[1] if len(sys.argv) > 1 else '--now'
    if mode == 'schedule':
        interval = float(sys.argv[3]) if len(sys.argv) > 3 else 12.0
        run_scheduler(interval)
    elif mode == 'ping':
        urls = [SITE_URL, f'{SITE_URL}/calculators', f'{SITE_URL}/sitemap.xml']
        ping_search_engines(urls)
    else:
        trigger_auto_backlink_run()
