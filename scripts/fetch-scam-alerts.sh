#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$REPO_DIR/public/data/scam-alerts.json"
META_FILE="$REPO_DIR/public/data/scam-alerts-meta.json"

mkdir -p "$REPO_DIR/public/data"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

# ===== SOURCE 1: ScamSniffer (domains) =====
echo "Fetching ScamSniffer (domains)..."
curl -fsSL --retry 2 "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/domains.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/ss_domains.json" 2>/dev/null || { echo "ERROR: ScamSniffer domains failed" >&2; exit 1; }

# ===== SOURCE 2: ScamSniffer (addresses) =====
echo "Fetching ScamSniffer (addresses)..."
curl -fsSL --retry 2 "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/address.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/ss_addresses.json" 2>/dev/null || { echo "ERROR: ScamSniffer addresses failed" >&2; exit 1; }

# ===== SOURCE 3: jarelllama/Scam-Blocklist =====
echo "Fetching jarelllama/Scam-Blocklist..."
curl -fsSL --retry 2 "https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/main/data/raw.txt" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/jarelllama.txt" 2>/dev/null || echo "WARN: jarelllama fetch failed, skipping"

python3 -c "
import json, sys
from datetime import datetime, timezone

output = []
seen = {}  # key -> set of sources
address_keys = set()
source_counts = {'ScamSniffer': 0, 'jarelllama': 0}

# --- ScamSniffer domains ---
try:
    with open('$TMPDIR/ss_domains.json') as f:
        domains = json.load(f)
    for d in domains:
        key = d.strip().lower()
        if key and len(key) > 3:
            if key not in seen:
                seen[key] = set()
            seen[key].add('ScamSniffer')
    print(f'  ScamSniffer domains: {len(domains):,}')
    source_counts['ScamSniffer'] += len(domains)
except Exception as exc:
    print(f'  ScamSniffer domains: FAILED ({exc})', file=sys.stderr)
    sys.exit(1)

# --- ScamSniffer addresses ---
try:
    with open('$TMPDIR/ss_addresses.json') as f:
        addrs = json.load(f)
    for a in addrs:
        key = a.strip()
        if key.lower().startswith('0x') and len(key) == 42:
            key = key.lower()
        if key and len(key) > 10:
            address_keys.add(key)
            if key not in seen:
                seen[key] = set()
            seen[key].add('ScamSniffer')
    print(f'  ScamSniffer addresses: {len(addrs):,}')
    source_counts['ScamSniffer'] += len(addrs)
except Exception as exc:
    print(f'  ScamSniffer addresses: FAILED ({exc})', file=sys.stderr)
    sys.exit(1)

# --- jarelllama ---
try:
    with open('$TMPDIR/jarelllama.txt') as f:
        lines = f.readlines()
    for line in lines:
        key = line.strip().lower()
        if key and not key.startswith('#') and len(key) > 3 and '.' in key:
            if key not in seen:
                seen[key] = set()
            seen[key].add('jarelllama')
    print(f'  jarelllama: {len(lines):,}')
    source_counts['jarelllama'] = len(lines)
except: print('  jarelllama: FAILED')

# --- Build output ---
domain_count = 0
address_count = 0
multi_source = 0

for key, sources in seen.items():
    is_addr = key in address_keys
    source_str = ', '.join(sorted(sources))
    output.append({
        'key': key,
        'type': 'address' if is_addr else 'domain',
        'source': source_str
    })
    if is_addr:
        address_count += 1
    else:
        domain_count += 1
    if len(sources) > 1:
        multi_source += 1

output.sort(key=lambda x: x['key'])
with open('$OUTPUT_FILE', 'w') as f:
    json.dump(output, f, separators=(',', ':'))
with open('$META_FILE', 'w') as f:
    json.dump({'generatedAt': datetime.now(timezone.utc).isoformat(), 'items': len(output), 'sources': source_counts}, f)

print(f'\\nTotal: {len(output):,} items ({domain_count:,} domains + {address_count:,} addresses)')
print(f'Multi-source: {multi_source:,} items')
print(f'Uncompressed: {len(json.dumps(output)):,} bytes')
"

echo "Gzipped: $(gzip -c "$OUTPUT_FILE" | wc -c | numfmt --to=iec)"
echo "Done: $OUTPUT_FILE"
