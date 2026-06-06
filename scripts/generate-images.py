#!/usr/bin/env python3
"""Generate article images (hero + OG) via OpenRouter Gemini 3.1 Flash.

Usage:
  # Generate both for an article
  python3 scripts/generate-images.py --title "BTC Jatuh ke $60K" --slug "btc-jatuh-60k" --category Journal

  # Or single image with custom prompt
  python3 scripts/generate-images.py --prompt "..." --output "public/images/hero/x.png" --width 800 --height 400
"""

import os, sys, json, base64, subprocess, argparse
from PIL import Image

API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not API_KEY:
    print("ERROR: OPENROUTER_API_KEY not set")
    sys.exit(1)

MODEL = "google/gemini-3.1-flash-image-preview"
COST_PER_MTOKEN_INPUT = 0.50  # $0.50/1M input tokens
COST_PER_MTOKEN_OUTPUT = 60.0  # ~$60/1M output tokens (image)


def generate_image(prompt: str, output_path: str, width: int, height: int) -> dict:
    """Generate image, save to path, return metadata."""
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    resp = subprocess.run([
        "curl", "-s", "https://openrouter.ai/api/v1/chat/completions",
        "-H", "Content-Type: application/json",
        "-H", f"Authorization: Bearer {API_KEY}",
        "-d", json.dumps({
            "model": MODEL,
            "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}]
        })
    ], capture_output=True, text=True, timeout=120)

    if resp.returncode != 0:
        return {"error": f"curl failed: {resp.stderr}"}

    data = json.loads(resp.stdout)
    usage = data.get("usage", {})
    cost = usage.get("cost", 0)

    # Extract image from response
    choices = data.get("choices", [{}])
    images = choices[0].get("message", {}).get("images", [])
    if not images:
        raw = json.dumps(data, indent=2)
        return {"error": f"No image in response. Full response:\n{raw[:1000]}"}

    img_url = images[0].get("image_url", {}).get("url")
    if not img_url:
        return {"error": "No image_url field in response"}

    # Decode base64
    if "," in img_url:
        img_data = base64.b64decode(img_url.split(",", 1)[1])
    else:
        img_data = base64.b64decode(img_url)

    # Save temp, then resize
    tmp = output_path + ".tmp"
    with open(tmp, "wb") as f:
        f.write(img_data)

    try:
        img = Image.open(tmp)
        img = img.resize((width, height), Image.LANCZOS)
        img.save(output_path)
        os.remove(tmp)
    except Exception as e:
        # If PIL fails, keep original
        os.rename(tmp, output_path)
        print(f"  Warning: resize failed ({e}), saved original size")

    return {
        "output": output_path,
        "cost": cost,
        "input_tokens": usage.get("prompt_tokens", 0),
        "output_tokens": usage.get("completion_tokens", 0),
        "dimensions": f"{width}x{height}",
    }


CATEGORY_VISUALS = {
    "Airdrop": {
        "icon": "gift boxes, token distribution charts, farming dashboard UI",
        "palette": "emerald green (#10B981) accent",
        "theme": "farming interface with points tally, referral tree, farming progress bars",
    },
    "Journal": {
        "icon": "price charts, news ticker, market data, candlestick patterns",
        "palette": "emerald green (#059669) accent",
        "theme": "market analysis dashboard with macro data",
    },
    "Tutorial": {
        "icon": "code editor, terminal windows, command lines, network diagrams",
        "palette": "blue (#3B82F6) accent",
        "theme": "terminal with code blocks, CLI interface, step indicators",
    },
    "DeFi": {
        "icon": "liquidity pools, yield curves, protocol dashboard, swap interface",
        "palette": "purple (#8B5CF6) accent",
        "theme": "DeFi protocol dashboard with TVL charts, pool metrics",
    },
    "Berita": {
        "icon": "breaking news ticker, newspaper layout, headline UI",
        "palette": "blue (#3B82F6) accent",
        "theme": "news terminal with headlines, timestamp feed",
    },
}

DEFAULT_VISUAL = CATEGORY_VISUALS["Journal"]


def build_og_prompt(title: str, category: str, description: str = "") -> str:
    visual = CATEGORY_VISUALS.get(category, DEFAULT_VISUAL)
    title_keywords = title.replace('"', "").replace("'", "")
    desc_hint = f" Article context: {description[:200]}" if description else ""

    return f"""Generate a dark terminal-themed OG image (1200x630) for a crypto blog article.

Title: "{title}"
Category: {category}{desc_hint}

Visual requirements:
- Dark background (#0F172A) with subtle grid lines
- {visual['palette']} - thin top border line and category badge
- Visual: {visual['icon']}
- {visual['theme']}
- Big text "{title}" in white bold font, left-aligned, max 3 lines
- Small text "CryptoSynth.id" at bottom left in {visual['palette'].split()[0]}
- Category badge "{category}" at top left
- UNIQUE design: the image MUST visually reference "{title_keywords[:60]}" specifically, not generic crypto imagery

Style: hacker terminal aesthetic, minimal, no human faces, no gradients, flat design. Terminal dashboard look. Every image for this blog should be visually distinct - never use the same chart pattern, icon layout, or composition twice."""


def build_hero_prompt(title: str, category: str, description: str = "") -> str:
    visual = CATEGORY_VISUALS.get(category, DEFAULT_VISUAL)
    title_keywords = title.replace('"', "").replace("'", "")
    desc_hint = f" Article context: {description[:150]}" if description else ""

    return f"""Generate a dark terminal-themed hero image (800x400) for a crypto blog article.

Title: "{title}"
Category: {category}{desc_hint}

Visual requirements:
- Dark background (#0F172A) with subtle grid lines
- {visual['palette']} - thin top border line
- Visual on right side: {visual['icon']}
- Text "{title}" in white bold font, left-aligned, max 3 lines
- Small text "CryptoSynth.id" at bottom left
- UNIQUE design: must visually reference "{title_keywords[:50]}" specifically

Style: hacker terminal aesthetic, minimal, no human faces, no gradients, flat design. Never reuse the same layout or chart style from previous images."""


def main():
    parser = argparse.ArgumentParser(description="Generate images for CryptoSynth articles")
    parser.add_argument("--title", help="Article title")
    parser.add_argument("--slug", help="Article slug (filename without extension)")
    parser.add_argument("--category", default="Journal", help="Article category")
    parser.add_argument("--desc", default="", help="Article description/excerpt for contextual visuals")
    parser.add_argument("--prompt", help="Custom prompt (skip auto-build)")
    parser.add_argument("--output", help="Output path (for custom single image)")
    parser.add_argument("--width", type=int, default=1200, help="Image width")
    parser.add_argument("--height", type=int, default=630, help="Image height")
    parser.add_argument("--dry-run", action="store_true", help="Print prompts only, no API call")

    args = parser.parse_args()
    total_cost = 0

    if args.prompt and args.output:
        # Single custom image
        if args.dry_run:
            print(f"[DRY-RUN] Would generate: {args.output}")
            print(f"Prompt:\n{args.prompt[:300]}...")
            return

        print(f"\nGenerating: {args.output}")
        result = generate_image(args.prompt, args.output, args.width, args.height)
        if result.get("error"):
            print(f"  ERROR: {result['error']}")
            sys.exit(1)
        cost = result.get("cost", 0)
        print(f"  Cost: ${cost:.6f} (in: {result.get('input_tokens',0)} out: {result.get('output_tokens',0)} tokens)")
        print(f"  Saved: {result['output']} ({result['dimensions']})")
        total_cost += cost

    elif args.title and args.slug:
        og_path = f"public/images/og/{args.slug}.png"
        hero_path = f"public/images/hero/{args.slug}.png"

        og_prompt = build_og_prompt(args.title, args.category, args.desc)
        hero_prompt = build_hero_prompt(args.title, args.category, args.desc)

        if args.dry_run:
            print("\n=== OG PROMPT ===")
            print(og_prompt)
            print("\n=== HERO PROMPT ===")
            print(hero_prompt)
            return

        # Generate OG
        print(f"\n[1/2] OG: {og_path}")
        r = generate_image(og_prompt, og_path, 1200, 630)
        if r.get("error"):
            print(f"  ERROR: {r['error']}")
            sys.exit(1)
        c = r.get("cost", 0)
        print(f"  Cost: ${c:.6f} (in: {r.get('input_tokens',0)} out: {r.get('output_tokens',0)} tokens)")
        total_cost += c

        # Generate Hero
        print(f"\n[2/2] Hero: {hero_path}")
        r = generate_image(hero_prompt, hero_path, 800, 400)
        if r.get("error"):
            print(f"  ERROR: {r['error']}")
            sys.exit(1)
        c = r.get("cost", 0)
        print(f"  Cost: ${c:.6f} (in: {r.get('input_tokens',0)} out: {r.get('output_tokens',0)} tokens)")
        total_cost += c

    else:
        parser.print_help()
        print("\nProvide --title + --slug for article images, or --prompt + --output for custom.")
        sys.exit(1)

    print(f"\n{'='*40}")
    print(f"Total cost: ${total_cost:.6f}")
    print(f"{'='*40}")


if __name__ == "__main__":
    main()
