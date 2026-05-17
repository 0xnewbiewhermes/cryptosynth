#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$REPO_DIR/public/data/scam-alerts.json"

mkdir -p "$REPO_DIR/public/data"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

# ===== SOURCE 1: ScamSniffer (domains) =====
echo "Fetching ScamSniffer (domains)..."
curl -sL "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/domains.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/ss_domains.json" 2>/dev/null || { echo "ERROR: ScamSniffer domains failed" >&2; exit 1; }

# ===== SOURCE 2: ScamSniffer (addresses) =====
echo "Fetching ScamSniffer (addresses)..."
curl -sL "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/address.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/ss_addresses.json" 2>/dev/null || { echo "ERROR: ScamSniffer addresses failed" >&2; exit 1; }

# ===== SOURCE 3: jarelllama/Scam-Blocklist =====
echo "Fetching jarelllama/Scam-Blocklist..."
curl -sL "https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/main/data/raw.txt" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/jarelllama.txt" 2>/dev/null || echo "WARN: jarelllama fetch failed, skipping"

# ===== SOURCE 4: phishdestroy/destroylist =====
echo "Fetching phishdestroy/destroylist..."
curl -sL "https://raw.githubusercontent.com/phishdestroy/destroylist/main/list.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/phishdestroy.json" 2>/dev/null || echo "WARN: phishdestroy fetch failed, skipping"

python3 -c "
import json, sys

output = []
seen = {}  # key -> set of sources

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
except: print('  ScamSniffer domains: FAILED')

# --- ScamSniffer addresses ---
try:
    with open('$TMPDIR/ss_addresses.json') as f:
        addrs = json.load(f)
    for a in addrs:
        key = a.strip().lower()
        if key and len(key) > 10:
            if key not in seen:
                seen[key] = set()
            seen[key].add('ScamSniffer')
    print(f'  ScamSniffer addresses: {len(addrs):,}')
except: print('  ScamSniffer addresses: FAILED')

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
except: print('  jarelllama: FAILED')

# --- phishdestroy ---
try:
    with open('$TMPDIR/phishdestroy.json') as f:
        pd_list = json.load(f)
    for d in pd_list:
        key = d.strip().lower()
        if key and len(key) > 3:
            if key not in seen:
                seen[key] = set()
            seen[key].add('phishdestroy')
    print(f'  phishdestroy: {len(pd_list):,}')
except: print('  phishdestroy: FAILED')

# --- Build output ---
domain_count = 0
address_count = 0
multi_source = 0

for key, sources in seen.items():
    is_addr = key.startswith('0x') and len(key) == 42
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

print(f'\\nTotal: {len(output):,} items ({domain_count:,} domains + {address_count:,} addresses)')
print(f'Multi-source: {multi_source:,} items')
print(f'Uncompressed: {len(json.dumps(output)):,} bytes')
"

echo "Gzipped: $(gzip -c "$OUTPUT_FILE" | wc -c | numfmt --to=iec)"
echo "Done: $OUTPUT_FILE"