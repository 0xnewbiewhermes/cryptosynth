#!/usr/bin/env python3
"""Auto-generate OG images for CryptoSynth articles using Style 2 (Dark Modern)"""

import os
import subprocess
from pathlib import Path

BLOG_DIR = "/root/cryptosynth/cryptosynth-repo/src/content/blog"
IMAGES_DIR = "/root/cryptosynth/cryptosynth-repo/public/images/og"

CATEGORY_COLORS = {
    "Berita": "#3B82F6",
    "Airdrop": "#10B981",
    "DeFi": "#8B5CF6",
    "Funding": "#F59E0B",
    "Tutorial": "#EC4899",
}

CATEGORY_BADGES = {
    "Berita": "BERITA",
    "Airdrop": "AIRDROP",
    "DeFi": "DEFI",
    "Funding": "FUNDING",
    "Tutorial": "TUTORIAL",
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
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if value.startswith("[") and value.endswith("]"):
                value = [v.strip().strip('"') for v in value[1:-1].split(",")]
            data[key] = value
    return data


def escape_xml(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")


def wrap_text(text, max_chars=28):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        if len(current) + len(word) + 1 <= max_chars:
            current = (current + " " + word).strip()
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines[:3]


def format_date(pub_date):
    if not pub_date:
        return ""
    try:
        from datetime import datetime
        dt = datetime.strptime(str(pub_date), "%Y-%m-%d")
        months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        return "{} {} {}".format(dt.day, months[dt.month - 1], dt.year)
    except:
        return str(pub_date)


def generate_svg(title, category, description, date):
    color = CATEGORY_COLORS.get(category, "#059669")
    badge = CATEGORY_BADGES.get(category, "BERITA")

    title_lines = wrap_text(title, 28)
    desc_lines = wrap_text(description, 50)[:2]

    title_tspans = []
    for i, line in enumerate(title_lines):
        if i == 0:
            title_tspans.append('    <tspan x="80" dy="0">{}</tspan>'.format(escape_xml(line)))
        else:
            title_tspans.append('    <tspan x="80" dy="58">{}</tspan>'.format(escape_xml(line)))

    title_y = 220
    desc_y = title_y + len(title_lines) * 58 + 40

    desc_tspans = []
    for i, line in enumerate(desc_lines):
        if i == 0:
            desc_tspans.append('    <tspan x="80" dy="0">{}</tspan>'.format(escape_xml(line)))
        else:
            desc_tspans.append('    <tspan x="80" dy="28">{}</tspan>'.format(escape_xml(line)))

    svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">\n'
    svg += '  <rect width="1200" height="630" fill="#0F172A"/>\n'
    svg += '  <rect x="0" y="0" width="1200" height="4" fill="{}"/>\n'.format(color)
    
    # Grid lines
    for x in range(200, 1200, 200):
        svg += '  <line x1="{}" y1="0" x2="{}" y2="630" stroke="white" stroke-opacity="0.03" stroke-width="1"/>\n'.format(x, x)
    
    # Category badge
    svg += '  <rect x="80" y="120" width="120" height="36" rx="4" fill="{}"/>\n'.format(color)
    svg += '  <text x="140" y="144" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle" letter-spacing="1">{}</text>\n'.format(badge)
    
    # Title
    svg += '  <text x="80" y="{}" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="800" fill="white">\n'.format(title_y)
    svg += '\n'.join(title_tspans) + '\n'
    svg += '  </text>\n'
    
    # Divider
    svg += '  <rect x="80" y="{}" width="60" height="3" fill="{}"/>\n'.format(desc_y - 20, color)
    
    # Description
    svg += '  <text x="80" y="{}" font-family="Inter, Arial, sans-serif" font-size="18" fill="#94A3B8">\n'.format(desc_y + 10)
    svg += '\n'.join(desc_tspans) + '\n'
    svg += '  </text>\n'
    
    # Branding
    svg += '  <text x="80" y="560" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="{}">CryptoSynth.id</text>\n'.format(color)
    svg += '  <text x="1120" y="560" font-family="Inter, Arial, sans-serif" font-size="14" fill="#64748B" text-anchor="end">{}</text>\n'.format(date)
    
    # Decorative
    svg += '  <rect x="1050" y="400" width="120" height="120" rx="8" fill="{}" fill-opacity="0.1" transform="rotate(15 1110 460)"/>\n'.format(color)
    svg += '</svg>'
    
    return svg


def generate_og_image(md_path):
    with open(md_path, "r") as f:
        content = f.read()

    data = parse_frontmatter(content)
    if not data.get("title"):
        return None

    slug = Path(md_path).stem
    pub_date = format_date(data.get("pubDate", ""))

    desc = data.get("excerpt", data.get("description", ""))
    if len(desc) > 120:
        desc = desc[:117] + "..."

    svg = generate_svg(
        title=data["title"],
        category=data.get("category", "Berita"),
        description=desc,
        date=pub_date
    )

    os.makedirs(IMAGES_DIR, exist_ok=True)

    svg_path = os.path.join(IMAGES_DIR, slug + ".svg")
    png_path = os.path.join(IMAGES_DIR, slug + ".png")

    with open(svg_path, "w") as f:
        f.write(svg)

    try:
        subprocess.run(["convert", svg_path, png_path], check=True, capture_output=True)
        print("OK: " + slug + ".png")
        return png_path
    except subprocess.CalledProcessError as e:
        print("ERR: " + slug + " - " + str(e))
        return None


def main():
    print("Generating OG images...\n")
    md_files = list(Path(BLOG_DIR).glob("*.md"))
    if not md_files:
        print("No markdown files found!")
        return

    success = 0
    for md_path in md_files:
        result = generate_og_image(str(md_path))
        if result:
            success += 1

    print("\nDone! {}/{} images generated".format(success, len(md_files)))
    print("Saved to: " + IMAGES_DIR)


if __name__ == "__main__":
    main()
