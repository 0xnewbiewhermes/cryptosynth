#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$REPO_DIR/public/data/scam-alerts.json"

mkdir -p "$REPO_DIR/public/data"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

echo "Fetching ScamSniffer (crypto phishing domains)..."
curl -sL "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/domains.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/domains.json" 2>/dev/null || { echo "ERROR: ScamSniffer domains fetch failed" >&2; exit 1; }

echo "Fetching ScamSniffer (scam addresses)..."
curl -sL "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/address.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/addresses.json" 2>/dev/null || { echo "ERROR: ScamSniffer addresses fetch failed" >&2; exit 1; }

python3 -c "
import json

with open('$TMPDIR/domains.json') as f:
    domains = json.load(f)

with open('$TMPDIR/addresses.json') as f:
    addresses = json.load(f)

output = []
seen_domains = set()
seen_addresses = set()

for d in domains:
    domain = d.strip().lower()
    if domain and len(domain) > 3 and domain not in seen_domains:
        seen_domains.add(domain)
        output.append({'key': domain, 'type': 'domain', 'source': 'ScamSniffer'})

for addr in addresses:
    a = addr.strip().lower()
    if a and len(a) > 10 and a not in seen_addresses:
        seen_addresses.add(a)
        output.append({'key': a, 'type': 'address', 'source': 'ScamSniffer'})

output.sort(key=lambda x: x['key'])
with open('$OUTPUT_FILE', 'w') as f:
    json.dump(output, f, separators=(',', ':'))

print(f'OK: {len(output)} items ({len(seen_domains)} domains + {len(seen_addresses)} addresses)')
"

echo "File: $(wc -c < "$OUTPUT_FILE") bytes written"
