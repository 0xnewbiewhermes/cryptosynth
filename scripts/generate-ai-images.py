#!/usr/bin/env python3
"""Auto-generate AI images for CryptoSynth articles using Pollinations.ai (Flux model)"""

import os
import subprocess
import urllib.parse
import time
import re
from pathlib import Path

try:
    from PIL import Image
    HAS_PIL = True
except ImportError:
    HAS_PIL = False

BLOG_DIR = "/root/cryptosynth/src/content/blog"
OG_DIR = "/root/cryptosynth/public/images/og"
HERO_DIR = "/root/cryptosynth/public/images/hero"

OG_TARGET = (1200, 630)
HERO_TARGET = (1200, 400)


def resize_to_target(img_path, target_w, target_h):
    """Resize image to cover target dimensions, center-crop, save as PNG"""
    if not HAS_PIL:
        return False
    try:
        img = Image.open(img_path).convert("RGB")
        if img.size == (target_w, target_h):
            return True
        orig_w, orig_h = img.size
        scale = max(target_w / orig_w, target_h / orig_h)
        new_w = int(orig_w * scale)
        new_h = int(orig_h * scale)
        img_resized = img.resize((new_w, new_h), Image.LANCZOS)
        left = (new_w - target_w) // 2
        top = (new_h - target_h) // 2
        img_cropped = img_resized.crop((left, top, left + target_w, top + target_h))
        img_cropped.save(img_path, "PNG", optimize=True)
        return True
    except Exception as e:
        print(f"  Resize error: {e}")
        return False


def remove_svg_fallback(png_path):
    """Remove SVG fallback file if it exists alongside the PNG"""
    p = Path(png_path) if isinstance(png_path, str) else png_path
    svg_path = p.with_suffix('.svg')
    if svg_path.exists():
        svg_path.unlink()
        print(f"  Removed SVG fallback: {svg_path.name}")

# Style prompt suffixes per category
CATEGORY_STYLES = {
    "Berita": "professional crypto news editorial style, cinematic lighting, dark navy blue background, golden accents, high contrast, 4k quality",
    "Airdrop": "glowing digital tokens falling from sky, neon green and gold particles, dark futuristic background, crypto airdrop concept art, 4k quality",
    "DeFi": "decentralized finance network visualization, interconnected glowing nodes, purple and blue neon, blockchain technology, dark background, 4k quality",
    "Funding": "rocket launching through digital blockchain universe, golden glow, venture capital growth concept, dark space background, 4k quality",
    "Tutorial": "clean tech education illustration, glowing digital interface, step by step guide concept, blue and white, dark background, 4k quality",
}


def parse_frontmatter(content):
    if not content.startswith("---"):
        return {}
    end = content.find("---", 3)
    if end == -1:
        return {}
    frontmatter = content[3:end].strip()
    data = {}
    for line in frontmatter.split("\n"):
        if ":" in line:
            key, value = line.split(":", 1)
            data[key.strip()] = value.strip().strip('"').strip("'")
    return data


def generate_prompt(title, category, description):
    """Generate a descriptive prompt for AI image generation"""
    style = CATEGORY_STYLES.get(category, CATEGORY_STYLES["Berita"])
    
    # Extract key concepts from title
    title_clean = re.sub(r'[^\w\s]', '', title)
    
    # Build prompt
    prompt = f"{title_clean}, {style}"
    
    # Truncate to reasonable length
    if len(prompt) > 300:
        prompt = prompt[:297] + "..."
    
    return prompt


def download_image(prompt, output_path, max_retries=3):
    """Download AI-generated image from Pollinations.ai"""
    encoded = urllib.parse.quote(prompt)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=1200&height=630&nologo=true&seed=42"
    
    for attempt in range(max_retries):
        try:
            result = subprocess.run(
                ["curl", "-s", "-o", output_path, "-w", "%{http_code}", url],
                capture_output=True, text=True, timeout=120
            )
            
            if "200" in result.stdout:
                if os.path.exists(output_path) and os.path.getsize(output_path) > 10000:
                    # Resize to correct dimensions (Pollinations may return non-standard sizes)
                    resize_to_target(output_path, OG_TARGET[0], OG_TARGET[1])
                    return True
            
            print(f"  Retry {attempt + 1}/{max_retries}...")
            time.sleep(2)
        except Exception as e:
            print(f"  Error: {e}")
            time.sleep(2)
    
    return False


def process_article(md_path):
    """Generate AI images for a single article"""
    with open(md_path, "r") as f:
        content = f.read()
    
    data = parse_frontmatter(content)
    if not data.get("title"):
        return False
    
    slug = Path(md_path).stem
    title = data["title"]
    category = data.get("category", "Berita")
    description = data.get("excerpt", data.get("description", ""))[:100]
    
    # Generate prompt
    prompt = generate_prompt(title, category, description)
    
    os.makedirs(OG_DIR, exist_ok=True)
    os.makedirs(HERO_DIR, exist_ok=True)
    
    # Generate OG image
    og_path = os.path.join(OG_DIR, slug + ".png")
    print(f"  Generating OG image...")
    if download_image(prompt, og_path):
        print(f"  OK OG: {slug}.png")
        # Remove SVG fallback if present
        remove_svg_fallback(og_path)
    else:
        print(f"  FAIL OG: {slug}.png")
        return False
    
    # Wait a bit between requests
    time.sleep(3)
    
    # Generate hero image (resize from OG)
    hero_path = os.path.join(HERO_DIR, slug + ".png")
    subprocess.run(["cp", og_path, hero_path], check=True)
    resize_to_target(hero_path, HERO_TARGET[0], HERO_TARGET[1])
    # Remove SVG hero fallback
    remove_svg_fallback(hero_path)
    print(f"  OK Hero: {slug}.png")
    
    return True


def main():
    print("=== CryptoSynth AI Image Generator ===")
    print("Using Pollinations.ai (Flux model)\n")
    
    md_files = list(Path(BLOG_DIR).glob("*.md"))
    
    if not md_files:
        print("No markdown files found!")
        return
    
    print(f"Found {len(md_files)} articles\n")
    
    success = 0
    for i, md_path in enumerate(md_files):
        print(f"[{i+1}/{len(md_files)}] {md_path.stem}")
        if process_article(str(md_path)):
            success += 1
    
    print(f"\n=== Done! {success}/{len(md_files)} articles processed ===")
    print(f"OG images: {OG_DIR}")
    print(f"Hero images: {HERO_DIR}")


if __name__ == "__main__":
    main()
