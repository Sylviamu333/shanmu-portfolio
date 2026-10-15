"""Extract supplied contact-sheet photographs and selected PDF editorial photos.
Requires Pillow and Poppler pdfimages; generated delivery assets are committed.
No generated imagery, retouching, or reference-site assets are used.
"""
from pathlib import Path
import json, subprocess, tempfile
from PIL import Image

root = Path(__file__).resolve().parents[1]
out = root / 'public/projects/visual-experiments/photography'
out.mkdir(parents=True, exist_ok=True)
manifest = []
for source, prefix, xs, top in [
    ('粉蓝摄影原图.png', 'stay', [17, 325, 633, 936, 1238, 1541], 174),
    ('黑白摄影原图.png', 'original', [23, 331, 639, 942, 1244, 1547], 199),
]:
    image = Image.open(root / 'source-assets' / source).convert('RGB')
    for index, x in enumerate(xs, 1):
        box = (x, top, x + 278, top + 494)
        photo = image.crop(box)
        name = f'{prefix}-{index:02}.webp'
        photo.save(out / name, quality=94, method=6)
        manifest.append({'file': name, 'source': source, 'crop': box, 'width': photo.width, 'height': photo.height})

# Extract actual embedded photographs, without PDF page furniture or a PDF viewer.
for index, page in enumerate([4, 6, 8, 14, 16, 17], 1):
    with tempfile.TemporaryDirectory() as directory:
        base = Path(directory) / 'photo'
        subprocess.run(['pdfimages', '-f', str(page), '-l', str(page), '-j', str(root / 'source-assets/EBC Drop 1 Lookbook .pdf'), str(base)], check=True)
        candidates = list(Path(directory).glob('*'))
        original = max((Image.open(p).convert('RGB') for p in candidates), key=lambda im: im.width * im.height)
        photo = original.copy()
        photo.thumbnail((1280, 1707), Image.Resampling.LANCZOS)
        name = f'ebc-{index:02}.webp'
        photo.save(out / name, quality=88, method=6)
        manifest.append({'file': name, 'source': 'EBC Drop 1 Lookbook .pdf', 'page': page, 'embedded_size': original.size, 'width': photo.width, 'height': photo.height})
(out / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(f'Exported {len(manifest)} individual photographs.')
