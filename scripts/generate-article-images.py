#!/usr/bin/env python3
"""Auto-generate article body images for CryptoSynth (hero + section illustrations)"""

import os
import subprocess
from pathlib import Path

BLOG_DIR = "/root/cryptosynth/src/content/blog"
HERO_DIR = "/root/cryptosynth/public/images/hero"
ILLUST_DIR = "/root/cryptosynth/public/images/illustrations"

CATEGORY_COLORS = {
    "Berita": "#3B82F6",
    "Airdrop": "#10B981",
    "DeFi": "#8B5CF6",
    "Funding": "#F59E0B",
    "Tutorial": "#EC4899",
}

CATEGORY_ICONS = {
    "Berita": "bitcoin",
    "Airdrop": "gift",
    "DeFi": "network",
    "Funding": "rocket",
    "Tutorial": "book",
}

ILLUSTRATIONS = {
    "bitcoin": """<circle cx="200" cy="200" r="80" fill="{color}" fill-opacity="0.15"/>
  <circle cx="200" cy="200" r="60" fill="{color}" fill-opacity="0.2"/>
  <text x="200" y="215" font-family="Arial" font-size="48" font-weight="bold" fill="{color}" text-anchor="middle">BTC</text>""",
    
    "gift": """<rect x="140" y="140" width="120" height="120" rx="10" fill="{color}" fill-opacity="0.15"/>
  <rect x="155" y="155" width="90" height="90" rx="5" fill="{color}" fill-opacity="0.2"/>
  <rect x="185" y="130" width="30" height="140" rx="2" fill="{color}" fill-opacity="0.3"/>
  <rect x="130" y="185" width="140" height="30" rx="2" fill="{color}" fill-opacity="0.3"/>""",
    
    "network": """<circle cx="200" cy="150" r="20" fill="{color}" fill-opacity="0.3"/>
  <circle cx="140" cy="220" r="20" fill="{color}" fill-opacity="0.3"/>
  <circle cx="260" cy="220" r="20" fill="{color}" fill-opacity="0.3"/>
  <line x1="200" y1="170" x2="140" y2="200" stroke="{color}" stroke-opacity="0.3" stroke-width="3"/>
  <line x1="200" y1="170" x2="260" y2="200" stroke="{color}" stroke-opacity="0.3" stroke-width="3"/>
  <line x1="160" y1="220" x2="240" y2="220" stroke="{color}" stroke-opacity="0.3" stroke-width="3"/>""",
    
    "rocket": """<polygon points="200,120 230,200 200,250 170,200" fill="{color}" fill-opacity="0.2"/>
  <polygon points="200,140 220,190 200,230 180,190" fill="{color}" fill-opacity="0.3"/>
  <rect x="185" y="250" width="30" height="30" rx="2" fill="{color}" fill-opacity="0.15"/>""",
    
    "book": """<rect x="150" y="140" width="100" height="130" rx="5" fill="{color}" fill-opacity="0.15"/>
  <rect x="160" y="150" width="80" height="110" rx="3" fill="{color}" fill-opacity="0.2"/>
  <line x1="200" y1="150" x2="200" y2="260" stroke="{color}" stroke-opacity="0.1" stroke-width="2"/>
  <rect x="170" y="170" width="50" height="4" rx="2" fill="{color}" fill-opacity="0.3"/>
  <rect x="170" y="185" width="40" height="4" rx="2" fill="{color}" fill-opacity="0.2"/>""",
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


def escape_xml(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def generate_hero_svg(title, category, description):
    color = CATEGORY_COLORS.get(category, "#059669")
    icon = CATEGORY_ICONS.get(category, "bitcoin")
    illustration = ILLUSTRATIONS.get(icon, ILLUSTRATIONS["bitcoin"]).format(color=color)
    
    svg = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400">
  <rect width="1200" height="400" fill="#0F172A"/>
  <rect x="0" y="0" width="1200" height="4" fill="{color}"/>
  
  <!-- Grid -->
  <line x1="200" y1="0" x2="200" y2="400" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="400" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="600" y1="0" x2="600" y2="400" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="800" y1="0" x2="800" y2="400" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="1000" y1="0" x2="1000" y2="400" stroke="white" stroke-opacity="0.03" stroke-width="1"/>
  
  <!-- Illustration -->
  <g transform="translate(850, 20) scale(0.8)">
    {illustration}
  </g>
  
  <!-- Branding -->
  <text x="60" y="370" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="600" fill="{color}" fill-opacity="0.6">CryptoSynth.id</text>
</svg>""".format(color=color, illustration=illustration)
    
    return svg


def generate_section_illustration(category, section_num):
    color = CATEGORY_COLORS.get(category, "#059669")
    icon = CATEGORY_ICONS.get(category, "bitcoin")
    illustration = ILLUSTRATIONS.get(icon, ILLUSTRATIONS["bitcoin"]).format(color=color)
    
    svg = """<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200" viewBox="0 0 800 200">
  <rect width="800" height="200" fill="#F8FAFC"/>
  <rect x="0" y="0" width="4" height="200" fill="{color}"/>
  
  <g transform="translate(200, 0) scale(0.4)">
    {illustration}
  </g>
  
  <text x="60" y="105" font-family="Inter, Arial, sans-serif" font-size="12" fill="{color}" fill-opacity="0.4">Section {num}</text>
</svg>""".format(color=color, illustration=illustration, num=section_num)
    
    return svg


def generate_article_images(md_path):
    with open(md_path, "r") as f:
        content = f.read()
    
    data = parse_frontmatter(content)
    if not data.get("title"):
        return
    
    slug = Path(md_path).stem
    category = data.get("category", "Berita")
    title = data.get("title", "")
    desc = data.get("excerpt", data.get("description", ""))[:80]
    
    os.makedirs(HERO_DIR, exist_ok=True)
    os.makedirs(ILLUST_DIR, exist_ok=True)
    
    # Generate hero image
    hero_svg = generate_hero_svg(title, category, desc)
    hero_svg_path = os.path.join(HERO_DIR, slug + ".svg")
    hero_png_path = os.path.join(HERO_DIR, slug + ".png")
    
    with open(hero_svg_path, "w") as f:
        f.write(hero_svg)
    
    try:
        subprocess.run(["convert", hero_svg_path, hero_png_path], check=True, capture_output=True)
        print("OK hero: " + slug + ".png")
    except:
        print("ERR hero: " + slug)
    
    # Generate section illustrations (max 4)
    for i in range(1, 5):
        illust_svg = generate_section_illustration(category, i)
        illust_svg_path = os.path.join(ILLUST_DIR, slug + "-section" + str(i) + ".svg")
        illust_png_path = os.path.join(ILLUST_DIR, slug + "-section" + str(i) + ".png")
        
        with open(illust_svg_path, "w") as f:
            f.write(illust_svg)
        
        try:
            subprocess.run(["convert", illust_svg_path, illust_png_path], check=True, capture_output=True)
        except:
            pass
    
    print("OK illustrations: " + slug)


def main():
    print("Generating article body images...\n")
    md_files = list(Path(BLOG_DIR).glob("*.md"))
    
    for md_path in md_files:
        generate_article_images(str(md_path))
    
    print("\nDone!")


if __name__ == "__main__":
    main()
