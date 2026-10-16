"""Derive the case-study frame, screen video and poster from unchanged uploads.

Run from the repository root with Python (Pillow) and ffmpeg installed.
Preserve the complete original 1440x900 frame, duration and aspect ratio.
The white border, right black margin and clideo.com watermark are embedded in
this recording. They cannot be removed under the no-crop/no-reconstruction
requirements; a clean OBS export is required. Do not set H.264 crop metadata.
Remux without re-encoding, with fast-start; omit unused audio in the muted copy.
"""
from pathlib import Path
import subprocess
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
target = root / "public/projects/eleven-oasis/demo"
target.mkdir(parents=True, exist_ok=True)
source = root / "source-assets"
subprocess.run([
    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error",
    "-i", str(source / "eleven-oasis-homepage-demo1.mp4"),
    "-map", "0:v:0", "-c:v", "copy",
    "-an", "-movflags", "+faststart",
    str(target / "homepage-demo1.mp4"),
], check=True)
subprocess.run([
    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-ss", "3",
    "-i", str(target / "homepage-demo1.mp4"), "-frames:v", "1",
    "-c:v", "libwebp", "-quality", "90", str(target / "poster.webp"),
], check=True)
# This old served derivative is now unused; archival source files stay untouched.
(target / "homepage-demo.mp4").unlink(missing_ok=True)
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
