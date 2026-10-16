"""Derive the case-study frame/poster from the two unchanged uploaded assets.

Run from the repository root with Python (Pillow) and ffmpeg installed.
The MP4 is copied byte-for-byte, including its original browser chrome.
"""
from pathlib import Path
import shutil
import subprocess
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
target = root / "public/projects/eleven-oasis/demo"
target.mkdir(parents=True, exist_ok=True)
source = root / "source-assets"
shutil.copyfile(source / "eleven-oasis-homepage-demo.mp4", target / "homepage-demo.mp4")
subprocess.run([
    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-ss", "3",
    "-i", str(source / "eleven-oasis-homepage-demo.mp4"), "-frames:v", "1",
    "-c:v", "libwebp", "-quality", "90", str(target / "poster.webp"),
], check=True)
frame = Image.open(source / "eleven-oasis-macbook.png").convert("RGBA")
assert frame.size == (1600, 1020)
# Measured source display, with a 1–2 source-pixel guard inside the black bezel
# to remove the old screen's antialiased orange and white fringes completely.
scale = 4
opening = Image.new("L", (1600 * scale, 1020 * scale))
draw = ImageDraw.Draw(opening)
draw.rounded_rectangle((208*scale, 137*scale, 1388*scale, 879*scale), radius=16*scale, fill=255)
draw.rectangle((208*scale, 160*scale, 1388*scale, 879*scale), fill=255)
opening = opening.resize(frame.size, Image.Resampling.LANCZOS)
frame.putalpha(opening.point(lambda alpha: 255-alpha))
frame.save(target / "macbook-frame.webp", lossless=True)
