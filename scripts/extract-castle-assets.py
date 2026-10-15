"""Export original TEAM WANG artwork; never reconstruct hidden photograph areas.
Requires the same pymupdf/Pillow dependencies as extract-assets.py.
"""
from pathlib import Path
import json
import shutil
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/projects/team-wang-under-the-castle'
OUT.mkdir(parents=True, exist_ok=True)
PDF = 'Portfolio- SHAN MU.pdf'
COVER = 'source-assets/under the castle-cover.png'
doc = fitz.open(ROOT / PDF)
manifest = []

# Preserve the supplied flattened collage byte for byte for the safe fallback.
shutil.copyfile(ROOT / COVER, OUT / 'cover.png')
manifest.append({'file': 'cover.png', 'source': COVER, 'method': 'Unchanged original PNG'})

for page, assets in [
    (3, [(4, 'key-visual-castle'), (7, 'key-visual-entrance'),
         (11, 'key-visual-moon'), (12, 'key-visual-pumpkin'),
         (16, 'poster-vintage-01'), (13, 'poster-vintage-02'),
         (15, 'poster-vintage-03'), (14, 'poster-vintage-04')]),
    (8, [(2, 'merchandise')]),
    (9, [(1, 'packaging')]),
]:
    blocks = {b['number']: b for b in doc[page - 1].get_text('dict')['blocks'] if b['type'] == 1}
    for number, name in assets:
        block = blocks[number]
        # Embedded PNG bytes, at their original native resolution.
        target = name + '.' + block['ext']
        (OUT / target).write_bytes(block['image'])
        manifest.append({'file': target, 'source': PDF, 'page': page,
                         'image_block': number, 'method': 'Original embedded image',
                         'width': block['width'], 'height': block['height']})

# Unobstructed rectangular crops, used in the case study and the recomposed
# animated cover. These are partial photographs, not recovered full originals.
cover = Image.open(ROOT / COVER)
for name, rect in [
    ('event-pumpkin', (0, 454, 429, 861)),
    ('event-entrance', (430, 0, 800, 453)),
    ('event-crowd', (801, 112, 1299, 430)),
    ('event-interior', (1001, 432, 1598, 748)),
    ('event-merchandise', (919, 751, 1383, 1118)),
    ('event-display', (422, 864, 917, 1198)),
]:
    image = cover.crop(rect)
    image.save(OUT / (name + '.png'))
    manifest.append({'file': name + '.png', 'source': COVER,
                     'crop': rect, 'method': 'Visible unobstructed photo crop; not a full original photograph',
                     'width': image.width, 'height': image.height})

# Unpremultiply the source logo's black matte. On black, the transparent output
# reproduces the source RGB to within rounding precision, including soft edges.
rect = (620, 500, 990, 700)
logo = cover.convert('RGBA').crop(rect)
pixels = []
for r, g, b, _ in logo.get_flattened_data():
    alpha = max(r, g, b)
    pixels.append((round(r * 255 / alpha), round(g * 255 / alpha),
                   round(b * 255 / alpha), alpha) if alpha else (0, 0, 0, 0))
logo.putdata(pixels)
logo.save(OUT / 'logo.png')
manifest.append({'file': 'logo.png', 'source': COVER, 'crop': rect,
                 'method': 'Original logo, black matte converted to transparency; composites to source RGB on black',
                 'width': logo.width, 'height': logo.height})
(OUT / 'asset-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Exported {len(manifest)} original/cropped assets with provenance.')
