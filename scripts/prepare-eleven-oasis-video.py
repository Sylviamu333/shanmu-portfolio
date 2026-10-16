"""Prepare the latest clean Eleven Oasis demo with consistent browser cropping.

Run from the repository root with Python (Pillow), FFmpeg and FFprobe installed.
The uploaded 800x500 recording has a recorded window rim and right black padding.
Measured website + recorded scrollbar ROI: x=4, y=6, width=760, height=490.
Encode that ROI with high-quality, browser-compatible H.264 (CRF 14). A header-
only left crop is not applied consistently by browser decoders. The original
upload stays unchanged. The 16:10 presentation clips 15px at the bottom,
keeping the navigation and the checked sticky cart/checkout controls visible.
Versioned video/poster URLs and a generated manifest prevent stale asset reuse.
"""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import tempfile
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
target = root / "public/projects/eleven-oasis/demo"
target.mkdir(parents=True, exist_ok=True)
source = root / "source-assets/eleven-oasis-homepage-demo.mp4"


def probe(path):
    result = subprocess.run([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,codec_name,pix_fmt,duration",
        "-of", "json", str(path),
    ], check=True, capture_output=True, text=True)
    return json.loads(result.stdout)["streams"][0]


original = probe(source)
assert (original["width"], original["height"]) == (800, 500), "Inspect a changed source before applying the measured ROI"
assert original["codec_name"] == "h264" and original["pix_fmt"] == "yuv420p"
with tempfile.TemporaryDirectory(prefix="eleven-clean-") as temporary:
    video = Path(temporary) / "demo.mp4"
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(source),
        "-map", "0:v:0", "-vf", "crop=760:490:4:6",
        "-c:v", "libx264", "-preset", "slow", "-crf", "14",
        "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-fps_mode", "passthrough", "-an", "-movflags", "+faststart", str(video),
    ], check=True)
    served = probe(video)
    assert (served["width"], served["height"]) == (760, 490)
    version = hashlib.sha256(video.read_bytes()).hexdigest()[:12]
    video_name = f"homepage-demo-{version}.mp4"
    poster_name = f"poster-{version}.webp"
    shutil.copyfile(video, target / video_name)
    subprocess.run([
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-ss", "3",
        "-i", str(video), "-frames:v", "1", "-c:v", "libwebp", "-quality", "90",
        str(target / poster_name),
    ], check=True)

manifest = {
    "src": f"/projects/eleven-oasis/demo/{video_name}",
    "poster": f"/projects/eleven-oasis/demo/{poster_name}",
    "source": str(source.relative_to(root)),
    "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
    "sourceWidth": original["width"], "sourceHeight": original["height"],
    "width": served["width"], "height": served["height"],
    "duration": float(served["duration"]),
    "encodedBorderCrop": {"x": 4, "y": 6, "width": 760, "height": 490},
    "presentationCrop": {"top": 0, "bottom": 15},
}
(root / "src/components/eleven-oasis/elevenOasisDemo.json").write_text(json.dumps(manifest, indent=2) + "\n")
# Remove obsolete served derivatives only. Original source uploads stay intact.
for pattern, keep in [("homepage-demo*.mp4", video_name), ("poster*.webp", poster_name)]:
    for obsolete in target.glob(pattern):
        if obsolete.name != keep:
            obsolete.unlink()

# Preserve the existing source-derived device overlay and its physical bezel.
frame = Image.open(root / "source-assets/eleven-oasis-macbook.png").convert("RGBA")
assert frame.size == (1600, 1020)
scale = 4
opening = Image.new("L", (1600 * scale, 1020 * scale))
draw = ImageDraw.Draw(opening)
draw.rounded_rectangle((208*scale, 137*scale, 1388*scale, 879*scale), radius=16*scale, fill=255)
draw.rectangle((208*scale, 160*scale, 1388*scale, 879*scale), fill=255)
opening = opening.resize(frame.size, Image.Resampling.LANCZOS)
frame.putalpha(opening.point(lambda alpha: 255-alpha))
frame.save(target / "macbook-frame.webp", lossless=True)
