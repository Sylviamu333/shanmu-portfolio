"""Extract existing PDF artwork, original vector paths and photographs; never alter sources.
Requires PyMuPDF and Pillow. Run from the repository root.
"""
from pathlib import Path
from io import BytesIO
import hashlib
import json
import re
import shutil
import fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'source-assets/0813 Eleven Oasis Guideline V1.pdf'
REVISION = hashlib.sha256(SOURCE.read_bytes()).hexdigest()[:12]
OUT = ROOT / 'public/projects/eleven-oasis/branding' / REVISION
OUT.mkdir(parents=True, exist_ok=True)
doc = fitz.open(SOURCE)
records = {}

def record(key, name, page, width, height, **details):
    records[key] = dict(src=f'/projects/eleven-oasis/branding/{REVISION}/{name}', width=width, height=height,
                        page=page, sha256=hashlib.sha256((OUT/name).read_bytes()).hexdigest(), **details)

# Lossless page copies support a complete, accessible manual reader.
for index, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    name = f'page-{index+1:02}.webp'
    image.save(OUT/name, 'WEBP', lossless=True, method=6)
    record(f'page{index+1}', name, index+1, image.width, image.height, kind='page')

# Small editorial page cards use lighter previews; the reader retains full lossless pages.
for number in range(14, 19):
    pix = doc[number-1].get_pixmap(matrix=fitz.Matrix(1, 1), alpha=False)
    image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
    name = f'preview-{number:02}.webp'
    image.save(OUT/name, 'WEBP', quality=92, method=6)
    record(f'preview{number}', name, number, image.width, image.height, kind='page-preview')

# Original PDF outlines remain paths. No font files are extracted or redistributed.
def vector(key, page, rect):
    x0,y0,x1,y1 = rect
    text = doc[page-1].get_svg_image(text_as_path=True)
    text = re.sub(r'width="800" height="600" viewBox="0 0 800 600"',
                  f'width="{x1-x0}" height="{y1-y0}" viewBox="{x0} {y0} {x1-x0} {y1-y0}"', text, count=1)
    name = f'{key}.svg'; (OUT/name).write_text(text)
    record(key, name, page, x1-x0, y1-y0, kind='vector-crop', clip=rect)

vector('logo', 20, [195,222,605,338])
vector('alphabet', 11, [384,126,632,188])
vector('robotoBlack', 11, [382,100,765,216])
vector('robotoRegular', 11, [382,231,765,343])
vector('impact', 12, [382,100,765,212])
vector('gillSans', 12, [382,246,765,357])
vector('closingHeadline', 19, [30,88,565,219])
vector('closingLine', 19, [33,370,278,402])

# The exact embedded reference photographs, not replacement stock photography.
for key, page, xref in [('desert',15,97),('coast',15,103),('car',15,98),('friends',15,108),('model',17,135),('community',14,82)]:
    image = Image.open(BytesIO(doc.extract_image(xref)['image'])).convert('RGB')
    name = f'{key}.webp';image.save(OUT/name,'WEBP',quality=92,method=6)
    record(key,name,page,image.width,image.height,kind='embedded-photograph',xref=xref)

shutil.copyfile(SOURCE, OUT/'guideline.pdf')

manifest = dict(source=str(SOURCE.relative_to(ROOT)),sourceSha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest(),
                physicalPages=len(doc), revision=REVISION,
                document=dict(src=f'/projects/eleven-oasis/branding/{REVISION}/guideline.pdf',sha256=hashlib.sha256(SOURCE.read_bytes()).hexdigest()), assets=records)
(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
(ROOT/'src/data/eleven-oasis-branding-assets.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Source preserved:',manifest['sourceSha256'])
print('Extracted',len(records),'assets;',len(doc),'physical pages; revision',REVISION)
print('Total bytes:',sum(p.stat().st_size for p in OUT.iterdir()))
