"""Derive the case-study frame, screen video and poster from unchanged uploads.

Run from the repository root with Python (Pillow) and ffmpeg installed.
The MP4 has a 40px encoded bottom margin (1280x720 -> 1280x680).
Remove only that margin; preserve the browser and website UI. The source stays
unchanged. H.264 with fast-start supports inline playback and metadata loading;
the unused audio track is omitted from this muted showcase's derived copy.
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
    "-i", str(source / "eleven-oasis-homepage-demo.mp4"),
    "-map", "0:v:0", "-vf", "crop=1280:680:0:0", "-an",
    "-c:v", "libx264", "-preset", "medium", "-crf", "18",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    str(target / "homepage-demo.mp4"),
], check=True)
subprocess.run([
    "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-ss", "3",
    "-i", str(target / "homepage-demo.mp4"), "-frames:v", "1",
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
