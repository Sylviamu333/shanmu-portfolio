#!/usr/bin/env python3
"""Build content-addressed static WebP variants. Originals are never overwritten.
Requires Pillow with WebP support: python -m pip install Pillow
Run from any directory; rerunning reuses the same deterministic output filenames.
"""
from pathlib import Path
from hashlib import sha256
from concurrent.futures import ThreadPoolExecutor
import json
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
OUTPUT = PUBLIC / 'media-optimized'
OUTPUT.mkdir(exist_ok=True)
# Archival comparisons, reader originals and superseded artwork stay untouched.
EXCLUDED = {'homepage-before-original.png', 'homepage-before.webp', 'homepage-before-display.webp',
            'pdp-before-original.png', 'pdp-before.webp', 'pdp-before-display.webp',
            'homepage-ux.png', 'mobile-browsing.png', 'pdp-ux-decisions.png', 'pdp-mobile-full.webp'}

def eligible(path):
    rel = path.relative_to(PUBLIC).as_posix()
    if rel.startswith(('media-optimized/', 'hero/')) or path.name in EXCLUDED:
        return False
    if rel.startswith('about/'):
        return path.suffix.lower() == '.jpg' or path.name == 'about-shan-illustration.png'
    if rel == 'brand/s-monogram.png' or rel == 'previews/early-birds-club/cover.png':
        return True
    if '/branding/' in rel and path.name.startswith('page-'):
        return False  # Full-resolution guideline reader retains its existing originals.
    return path.suffix.lower() in {'.png', '.jpg', '.jpeg', '.webp'} and path.stat().st_size > 100_000

def convert(path):
    raw = path.read_bytes()
    fingerprint = sha256(raw).hexdigest()[:12]
    rel = '/' + path.relative_to(PUBLIC).as_posix()
    image = ImageOps.exif_transpose(Image.open(path))
    if getattr(image, 'n_frames', 1) != 1:
        return None
    profile = image.info.get('icc_profile')
    alpha = 'A' in image.getbands() or 'transparency' in image.info
    image = image.convert('RGBA' if alpha else 'RGB')
    width, height = image.size
    exact = rel in {'/brand/s-monogram.png', '/previews/early-birds-club/cover.png', '/footer-folder/glass-pocket.png'}
    widths = [width] if exact else sorted({min(width, w) for w in [240, 480, 800, 1200, 1600, width]})
    variants = []
    for w in widths:
        h = round(height * w / width)
        # Lanczos preserves typography; alpha is encoded losslessly by WebP.
        resized = image if w == width else image.resize((w, h), Image.Resampling.LANCZOS)
        name = f'{path.stem}-{fingerprint}-{w}-' + ('lossless' if exact else 'q94') + '.webp'
        output = OUTPUT / name
        if not output.exists():
            options = dict(format='WEBP', method=6, lossless=exact, quality=100 if exact else 94, exact=True)
            if profile:
                options['icc_profile'] = profile
            resized.save(output, **options)
        if exact:
            assert Image.open(output).convert('RGBA').tobytes() == image.convert('RGBA').tobytes(), rel
        variants.append({'src': '/media-optimized/' + name, 'width': w, 'height': h, 'bytes': output.stat().st_size})
    # Never replace a smaller original with a larger native-resolution re-encode.
    if variants[-1]['bytes'] >= len(raw):
        variants[-1] = {'src': rel, 'width': width, 'height': height, 'bytes': len(raw)}
    return rel, {'width': width, 'height': height, 'originalBytes': len(raw), 'sha256': sha256(raw).hexdigest(), 'lossless': exact, 'variants': variants}

paths = sorted(p for p in PUBLIC.rglob('*') if p.is_file() and eligible(p))
with ThreadPoolExecutor(max_workers=4) as pool:
    manifest = dict(result for result in pool.map(convert, paths) if result)
target = ROOT / 'src/lib/media/images.json'
target.write_text(json.dumps(manifest, indent=2) + '\n')
# Remove obsolete derived files only; source/public originals remain untouched.
used = {variant['src'].split('/')[-1] for entry in manifest.values() for variant in entry['variants'] if variant['src'].startswith('/media-optimized/')}
for path in OUTPUT.glob('*.webp'):
    if path.name not in used:
        path.unlink()
print(json.dumps({'images': len(manifest), 'originalBytes': sum(x['originalBytes'] for x in manifest.values()), 'nativeVariantBytes': sum(x['variants'][-1]['bytes'] for x in manifest.values()), 'variants': sum(len(x['variants']) for x in manifest.values())}))
