"""Optimize the existing homepage capture for the Results collage; preserve the original."""
import hashlib
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "source-assets/Eleven Oasis -Now-classic.png"
destination = root / "public/projects/eleven-oasis/results"
destination.mkdir(parents=True, exist_ok=True)
image = Image.open(source).convert("RGB")
bounds = [0, 0, 1921, 2100]
assert image.size == (1921, 6767)
preview = image.crop(bounds)
preview.thumbnail((1200, 2000), Image.Resampling.LANCZOS)
output = destination / "homepage-detail.webp"
preview.save(output, "WEBP", quality=90, method=6)
record = {
    "src": "/projects/eleven-oasis/results/homepage-detail.webp",
    "width": preview.width,
    "height": preview.height,
    "source": "source-assets/" + source.name,
    "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(),
    "crop": bounds,
    "sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
    "alt": "Existing Eleven Oasis Classic homepage: collection navigation, seasonal shopping hero and purchase reassurance",
}
(destination / "manifest.json").write_text(json.dumps(record, indent=2) + "\n")
print("Prepared one Results preview from the existing homepage screenshot.")
