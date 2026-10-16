"""Prepare only the Strategy 01 mobile recording; retain original artwork/uploads.

The 592x1280 HEVC recording includes a 74px status strip with another Dynamic
Island. Remove that strip only, retaining the browser address/navigation UI and
all website pixels. The artwork supplies its own original status bar/island.
Measured artwork screen-content bounds: x617 y126 width366 height746 in 1600x958.
Run from the repository root with FFmpeg/FFprobe installed.
"""
from pathlib import Path
import hashlib
import json
import subprocess

root = Path(__file__).resolve().parent.parent
source = root / "source-assets/eleven-oasis-homepage-demo-mobile.mp4"
output = root / "public/projects/eleven-oasis/strategy/mobile"
output.mkdir(parents=True, exist_ok=True)

def probe(path):
    data = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,codec_name,duration", "-of", "json", str(path)], check=True, capture_output=True, text=True)
    return json.loads(data.stdout)["streams"][0]

original = probe(source)
assert (original["width"], original["height"]) == (592, 1280), "Inspect a changed recording before reusing the measured crop"
version = hashlib.sha256(source.read_bytes() + b"status-crop-74-h264-crf18-v1").hexdigest()[:12]
video = output / f"homepage-mobile-{version}.mp4"
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(source), "-map", "0:v:0", "-vf", "crop=592:1206:0:74", "-c:v", "libx264", "-crf", "18", "-preset", "slow", "-pix_fmt", "yuv420p", "-profile:v", "high", "-an", "-movflags", "+faststart", str(video)], check=True)
served = probe(video)
# Traced inner display contour. Coordinates are local to the measured 366x746
# content opening; the original status area above y126 remains entirely intact.
left = [(1,0),(0,20),(0,688),(.5,694),(1.2,699),(2.7,704),(4.6,709),(6.4,714),(9,719),(11,724),(15.5,729),(21,734),(29,739),(36.4,742),(43.2,744),(49,745),(61,746)]
outline = left + [(366-x,y) for x,y in reversed(left)]
path = "M" + " L".join(f"{x:g},{y:g}" for x,y in outline) + " Z"
mask = output / "screen-mask.svg"
mask.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 366 746"><path fill="white" d="{path}"/></svg>\n')
manifest = {
    "src": "/" + str(video.relative_to(root / "public")),
    "mask": "/" + str(mask.relative_to(root / "public")),
    "source": str(source.relative_to(root)),
    "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
    "sourceWidth": original["width"], "sourceHeight": original["height"], "sourceCodec": original["codec_name"],
    "width": served["width"], "height": served["height"], "duration": float(served["duration"]),
    "encodedCrop": {"x": 0, "y": 74, "width": 592, "height": 1206},
    "artwork": {"width": 1600, "height": 958},
    "screen": {"x": 617, "y": 126, "width": 366, "height": 746},
}
(root / "src/components/eleven-oasis/elevenOasisMobileDemo.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(json.dumps({"src": manifest["src"], "bytes": video.stat().st_size, "width": served["width"], "height": served["height"], "duration": served["duration"]}))
