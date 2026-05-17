#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_DIR="$(dirname "$SCRIPT_DIR")"
OUTPUT_FILE="$REPO_DIR/public/data/scam-alerts.json"
NOW=$(TZ='Asia/Jakarta' date '+%Y-%m-%dT%H:%M:%S+07:00')

mkdir -p "$REPO_DIR/public/data"

TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

# Source 1: ScamSniffer (JSON array)
echo "Fetching ScamSniffer..."
curl -sL "https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/domains.json" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/scamsniffer.json" 2>/dev/null || echo "WARN: ScamSniffer fetch failed"

# Source 2: jarelllama/Scam-Blocklist (raw TXT, one per line)
echo "Fetching jarelllama..."
curl -sL "https://raw.githubusercontent.com/jarelllama/Scam-Blocklist/main/data/raw.txt" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/jarelllama.txt" 2>/dev/null || echo "WARN: jarelllama fetch failed"

# Source 3: phishdestroy/destroylist (TXT, one per line)
echo "Fetching phishdestroy..."
curl -sL "https://raw.githubusercontent.com/phishdestroy/destroylist/main/list.txt" \
  -H "User-Agent: Mozilla/5.0" -o "$TMPDIR/phishdestroy.txt" 2>/dev/null || echo "WARN: phishdestroy fetch failed"

python3 -c "
import json, csv, os, sys

output = []
seen = {}
now = '$NOW'

def add_domain(d, source):
    d = d.strip().lower()
    for prefix in ['http://', 'https://', 'www.', 'hxxp://', 'hxxps://']:
        if d.startswith(prefix):
            d = d[len(prefix):]
    d = d.rstrip('/')
    if d and not d.startswith('#') and d != '' and len(d) > 3:
        seen.setdefault(d, set()).add(source)

# ScamSniffer
sniffer = '$TMPDIR/scamsniffer.json'
if os.path.exists(sniffer) and os.path.getsize(sniffer) > 100:
    try:
        domains = json.load(open(sniffer))
        for d in domains:
            add_domain(d, 'ScamSniffer')
    except Exception as e:
        print(f'ScamSniffer parse error: {e}', file=sys.stderr)

# jarelllama (raw TXT, one per line, may have comments)
jarell = '$TMPDIR/jarelllama.txt'
if os.path.exists(jarell) and os.path.getsize(jarell) > 100:
    try:
        with open(jarell) as f:
            for line in f:
                d = line.strip()
                if d and not d.startswith('#') and not d.startswith('!') and not d.startswith('//'):
                    # Handle adblock format: ||domain.com^ or domain.com
                    d = d.replace('||', '').replace('^', '').replace('|', '')
                    add_domain(d, 'jarelllama')
    except Exception as e:
        print(f'jarelllama parse error: {e}', file=sys.stderr)

# phishdestroy
phish = '$TMPDIR/phishdestroy.txt'
if os.path.exists(phish) and os.path.getsize(phish) > 100:
    try:
        with open(phish) as f:
            for line in f:
                d = line.strip()
                if d and not d.startswith('#') and not d.startswith('//'):
                    add_domain(d, 'phishdestroy')
    except Exception as e:
        print(f'phishdestroy parse error: {e}', file=sys.stderr)

for domain, sources in seen.items():
    output.append({
        'domain': domain,
        'source': ', '.join(sorted(sources))
    })

output.sort(key=lambda x: x['domain'])
with open('$OUTPUT_FILE', 'w') as f:
    json.dump(output, f)

print(f'OK: {len(output)} domains from {len(seen)} unique')
"

echo "Done: $(wc -c < "$OUTPUT_FILE") bytes written"
