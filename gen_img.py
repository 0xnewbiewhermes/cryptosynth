import requests, io, time
from PIL import Image

slug = "ai-agent-crypto-revolusi-atau-bencana-2026"
prompt = "AI agent crypto autonomous trading blockchain security clean minimal"

def gen_image(seed, out_path):
    url = f"https://image.pollinations.ai/prompt/{requests.utils.quote(prompt)}?width=1059&height=556&seed={seed}&nologo=true&model=sana"
    for attempt in range(3):
        try:
            resp = requests.get(url, timeout=90)
            if resp.status_code == 200 and len(resp.content) > 1000:
                with open(out_path, 'wb') as f:
                    f.write(resp.content)
                img = Image.open(io.BytesIO(resp.content))
                print(f"  {out_path}: {img.size} ({len(resp.content)} bytes)")
                return True
            else:
                print(f"  attempt {attempt+1}: HTTP {resp.status_code}")
        except Exception as e:
            print(f"  attempt {attempt+1}: {e}")
        time.sleep(45)
    return False

print("Hero:")
gen_image(77, f"public/images/hero/{slug}.png")
time.sleep(45)
print("OG:")
gen_image(88, f"public/images/og/{slug}.png")

for f in [f"public/images/hero/{slug}.png", f"public/images/og/{slug}.png"]:
    img = Image.open(f).convert("RGB")
    img.save(f.replace(".png", ".webp"), "WEBP", quality=85)
    print(f"WebP: {f}")
