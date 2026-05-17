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
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/domains.json" 2>/dev/null || { echo "ERROR: ScamSniffer fetch failed" >&2; exit 1; }

python3 -c "
import json

with open('$TMPDIR/domains.json') as f:
    domains = json.load(f)

output = []
seen = set()
for d in domains:
    domain = d.strip().lower()
    if domain and len(domain) > 3 and domain not in seen:
        seen.add(domain)
        output.append({'domain': domain, 'source': 'ScamSniffer'})

output.sort(key=lambda x: x['domain'])
with open('$OUTPUT_FILE', 'w') as f:
    json.dump(output, f, separators=(',', ':'))

print(f'OK: {len(output)} domains')
"

echo "File: $(wc -c < "$OUTPUT_FILE") bytes written"
