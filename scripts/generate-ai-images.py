#!/usr/bin/env python3
"""Auto-generate AI images for CryptoSynth articles using Pollinations.ai (Flux model)"""

import os
import subprocess
import urllib.parse
import time
import re
from pathlib import Path

BLOG_DIR = "/root/cryptosynth/src/content/blog"
OG_DIR = "/root/cryptosynth/public/images/og"
HERO_DIR = "/root/cryptosynth/public/images/hero"

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
                # Verify file exists and has content
                if os.path.exists(output_path) and os.path.getsize(output_path) > 10000:
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
    else:
        print(f"  FAIL OG: {slug}.png")
        return False
    
    # Wait a bit between requests
    time.sleep(3)
    
    # Generate hero image (same image, we reuse it)
    hero_path = os.path.join(HERO_DIR, slug + ".png")
    subprocess.run(["cp", og_path, hero_path], check=True)
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
