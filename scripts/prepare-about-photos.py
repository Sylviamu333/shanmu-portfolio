"""Copy the user's originals and make responsive WebP delivery copies (Pillow).
No filters, retouching, generated content, or destructive source edits.
"""
from pathlib import Path
import shutil
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
out = root / 'public/about'
out.mkdir(parents=True, exist_ok=True)
for name in ['about-portrait', 'about-life-01', 'about-life-02']:
    source = root / 'source-assets' / f'{name}.jpg'
    shutil.copyfile(source, out / f'{name}.jpg')
    image = ImageOps.exif_transpose(Image.open(source)).convert('RGB')
    for width in [480, 960, min(1600, image.width)]:
        resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
        resized.save(out / f'{name}-{width}.webp', quality=90, method=6)
    print(name, image.size)
