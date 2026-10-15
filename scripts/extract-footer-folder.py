"""Separate visible footer artwork; do not reconstruct or retouch the portrait.
Requires Pillow. Hidden card extents are rebuilt as CSS surfaces, not photo fill.
"""
from pathlib import Path
import json
from PIL import Image, ImageDraw, ImageChops

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/footer-folder'
OUT.mkdir(parents=True, exist_ok=True)
source = Image.open(ROOT / 'source-assets/footer-pink-glass-folder.png').convert('RGBA')
# A clean inner rectangle, rectified from the existing tilted photograph.
quad = (200, 365, 248, 590, 468, 543, 420, 318)
portrait = source.transform((225, 230), Image.Transform.QUAD, quad, resample=Image.Resampling.BICUBIC)
portrait.save(OUT / 'portrait.png')

note = source.crop((510, 425, 822, 660))
pixels = []
for r, g, b, a in note.get_flattened_data():
    alpha = max(0, min(1, (185 - g) / 120))
    pixels.append((r, g, b, round(a * alpha)))
note.putdata(pixels)
# Remove the underline component truncated by the original pocket. The complete
# simple underline is drawn in SVG; all lettering and the heart remain sourced.
a = note.getchannel('A'); seen = set()
for y in range(note.height):
    for x in range(note.width):
        if (x, y) in seen or a.getpixel((x, y)) == 0:
            continue
        stack = [(x, y)]; component = []; seen.add((x, y))
        while stack:
            px, py = stack.pop(); component.append((px, py))
            for nx, ny in [(px-1, py), (px+1, py), (px, py-1), (px, py+1)]:
                if 0 <= nx < note.width and 0 <= ny < note.height and (nx, ny) not in seen and a.getpixel((nx, ny)):
                    seen.add((nx, ny)); stack.append((nx, ny))
        if any(py == note.height - 1 for _, py in component):
            for px, py in component:
                a.putpixel((px, py), 0)
note.putalpha(a)
canvas = Image.new('RGBA', (312, 260)); canvas.paste(note, (0, 0)); canvas.save(OUT / 'whiteboarding-ink.png')

red = source.crop((810, 345, 1150, 455))
red.putdata([(r, g, b, round(a * max(0, min(1, (g-r) / 42)))) for r, g, b, a in red.get_flattened_data()])
red.save(OUT / 'threads-ink.png')

front = source.crop((82, 674, 1208, 1063))
mask = Image.new('L', front.size, 0)
ImageDraw.Draw(mask).rounded_rectangle((0, 0, 1125, 388), radius=58, fill=255)
front.putalpha(ImageChops.multiply(front.getchannel('A'), mask))
front.save(OUT / 'glass-pocket.png')

(OUT / 'asset-manifest.json').write_text(json.dumps({
    'source': 'source-assets/footer-pink-glass-folder.png',
    'portrait.png': {'source_quad_UL_LL_LR_UR': quad, 'size': [225, 230], 'method': 'Visible source photo crop and geometric rectification only; no retouching or generated content'},
    'whiteboarding-ink.png': {'crop': [510, 425, 822, 660], 'method': 'Original dark lettering and heart isolated from yellow; truncated underline replaced by SVG stroke'},
    'threads-ink.png': {'crop': [810, 345, 1150, 455], 'method': 'Original green lettering isolated by chroma'},
    'glass-pocket.png': {'crop': [82, 674, 1208, 1063], 'method': 'Front pocket texture with original alpha and rounded edge mask'},
}, indent=2) + '\n')
print('Exported portrait crop, original lettering, glass texture, and provenance.')
