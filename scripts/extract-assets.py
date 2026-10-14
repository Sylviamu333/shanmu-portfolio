"""Rebuild published artwork from the unchanged source PDFs and PNGs.
Requires: python -m pip install pymupdf pillow
"""
from pathlib import Path
import io,json,shutil
import fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
manifest=[]
def save(im,folder,name,source,page=None,method='embedded image'):
 target=ROOT/'public/projects'/folder/(name+'.webp')
 target.parent.mkdir(parents=True,exist_ok=True)
 im.convert('RGB').save(target,'WEBP',quality=92,method=6)
 manifest.append(dict(asset='/projects/'+folder+'/'+name+'.webp',source=source,page=page,method=method,width=im.width,height=im.height))
def render(source,page,folder,name,clip=None,width=1800):
 doc=fitz.open(ROOT/source);p=doc[page-1];r=fitz.Rect(clip) if clip else p.rect
 pix=p.get_pixmap(matrix=fitz.Matrix(width/r.width,width/r.width),clip=r,alpha=False)
 save(Image.frombytes('RGB',(pix.width,pix.height),pix.samples),folder,name,source,page,'PDF vector rendering, artwork area')
def embedded(source,page,folder,selected):
 doc=fitz.open(ROOT/source)
 blocks={b['number']:b for b in doc[page-1].get_text('dict')['blocks'] if b['type']==1}
 for number,name in selected:
  save(Image.open(io.BytesIO(blocks[number]['image'])),folder,name,source,page)
EBC='EBC IP DESIGN 06.pdf';P='Portfolio- SHAN MU.pdf';EO='0813 Eleven Oasis Guideline V1.pdf'
for n,name in [(2,'wing-symbol'),(3,'identity-01'),(4,'monogram-01'),(10,'merchandise-01'),(11,'applications-01'),(12,'signage-01'),(13,'double-wing-symbol'),(14,'identity-02'),(16,'cover'),(20,'accessories-02'),(21,'apparel-02'),(24,'flag-02')]:
 render(EBC,n,'early-birds-club',name,(0,14.3,453.543,255.118))
embedded(P,11,'covers',[(6,'cover'),(7,'packaging-front'),(8,'packaging-side'),(1,'bedding-01'),(3,'bedding-02'),(4,'bedding-03'),(5,'bedding-04'),(9,'tag'),(10,'woven-labels')])
embedded(P,10,'covers',[(10,'wordmark-01'),(11,'wordmark-02')])
embedded(P,5,'pix-metaborg',[(24,'cover'),(9,'poster-02'),(25,'poster-03'),(10,'poster-04'),(11,'invitation-01')])
render(P,5,'pix-metaborg','invitations',(1280,185,1740,800),1200)
embedded(P,13,'visual-experiments',[(1,'cover'),(2,'key-visual-02'),(3,'key-visual-03'),(4,'key-visual-04'),(5,'key-visual-05'),(6,'key-visual-06')])
render(P,6,'visual-experiments','explorations',(30,140,1750,815))
render(EO,1,'eleven-oasis','brand-logo',(150,145,650,320),1400)
for n,name in [(3,'logo-clear-space'),(7,'logo-colors'),(10,'brand-colors'),(11,'brand-typography')]:render(EO,n,'eleven-oasis',name)
for filename,name in [('HOMEPAGE - PC.png','homepage-before'),('PDP - pc.png','pdp-before')]:
 source=ROOT/'source-assets'/filename;im=Image.open(source)
 # Keep an exact, downloadable copy; optimized display derivatives preserve the complete composition.
 shutil.copyfile(source,ROOT/'public/projects/eleven-oasis'/(name+'-original.png'))
 save(im,'eleven-oasis',name,'source-assets/'+filename,method='Complete screenshot, WebP display derivative')
 thumb=im.copy();thumb.thumbnail((1200,18000))
 save(thumb,'eleven-oasis',name+'-display','source-assets/'+filename,method='Complete screenshot, resized display derivative')
Path(ROOT/'public/projects/asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'Exported {len(manifest)} assets with provenance.')
