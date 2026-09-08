import glob
import re
import sys
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

tools_files = list(Path("src/config/tools").glob("*.ts"))
short_descriptions = []
total_tools = 0

print("=" * 70)
print("🔍 CRAFTCALC META DESCRIPTION AUDIT")
print("=" * 70)

for f in tools_files:
    if f.name == "types.ts":
        continue
    content = f.read_text(encoding="utf-8")
    blocks = content.split("{\n    id:")
    for b in blocks[1:]:
        lines = b.splitlines()
        tool_id = lines[0].strip().replace("'", "").replace('"', '').replace(",", "")
        desc_match = re.search(r"metaDescription:\s*['\"]([^'\"]+)['\"]", b)
        if desc_match:
            desc = desc_match.group(1)
            total_tools += 1
            length = len(desc)
            status = "✅ GOOD" if 120 <= length <= 165 else ("⚠️ SHORT" if length < 120 else "⚠️ LONG")
            print(f"[{status}] ({length:3d} chars) {tool_id:32s}: {desc}")
            if length < 120:
                short_descriptions.append((f, tool_id, desc))

print("=" * 70)
print(f"Total Tools Analyzed: {total_tools}")
print(f"Short Descriptions (< 120 chars): {len(short_descriptions)}")
