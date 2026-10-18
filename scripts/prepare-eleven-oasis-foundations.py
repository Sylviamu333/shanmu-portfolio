"""Extract original raster icons and storefront UI; preserve source files unchanged."""
from pathlib import Path
from PIL import Image,ImageChops
import hashlib,json
root=Path(__file__).resolve().parents[1]
out=root/'public/projects/eleven-oasis/foundations'
out.mkdir(parents=True,exist_ok=True)
assets={}
def crop(key,name,box,label,trim=False):
 p=root/'source-assets'/name;im=Image.open(p).convert('RGB');result=im.crop(box)
 if trim:
  bbox=ImageChops.difference(result,Image.new('RGB',result.size,'white')).convert('L').point(lambda x:255 if x>35 else 0).getbbox()
  if bbox:
   bounds=(max(0,bbox[0]-6),max(0,bbox[1]-6),min(result.width,bbox[2]+6),min(result.height,bbox[3]+6))
   result=result.crop(bounds)
   box=(box[0]+bounds[0],box[1]+bounds[1],box[0]+bounds[2],box[1]+bounds[3])
 target=out/(key+'.webp');result.save(target,'WEBP',lossless=True,method=6)
 assets[key]=dict(src='/'+target.relative_to(root/'public').as_posix(),width=result.width,height=result.height,alt=label,source='source-assets/'+name,sourceSha256=hashlib.sha256(p.read_bytes()).hexdigest(),crop=box,sha256=hashlib.sha256(target.read_bytes()).hexdigest())
icons=[('linen',(374,175),'Smooth Linen'),('breathable',(1168,177),'Lightweight & Breathable'),('wrinkle',(584,344),'Wrinkle Resistant'),('stripe',(158,905),'Contrast Stripe Detail'),('cocktail',(730,904),'Tropical Cocktail Print'),('shortSleeve',(1806,901),'Relaxed Short Sleeve'),('wash',(151,1473),'Machine Wash Cold'),('bleach',(385,1470),'Do Not Bleach'),('iron',(1114,1475),'Cool Iron If Needed'),('guarantee',(1512,589),'30-Day Guarantee'),('payLater',(1932,589),'Pay Later'),('shipping',(2128,589),'Free Shipping')]
for key,(x,y),label in icons:
 is_service=key in ['guarantee','payLater','shipping']
 crop(key,'eleven-oasis-icon system.png',(x-62,y-(36 if is_service else 60),x+62,y+(27 if is_service else 43)),label,True)
crop('productCard','HOMEPAGE - PC.png',(25,1515,420,2190),'Actual storefront product card with image, sale badge, color swatches and price')
crop('heroCta','HOMEPAGE - PC.png',(890,634,1275,768),'Original SHOP NOW primary campaign call to action')
crop('secondaryCta','HOMEPAGE - PC.png',(965,1434,1190,1494),'Original underlined View All secondary storefront action')
crop('price','eleven-oasis-pdp-mobile-full.png',(25,355,720,448),'PDP original price, sale price and promotional label')
crop('selectors','eleven-oasis-pdp-mobile-full.png',(25,1995,1150,2385),'Actual PDP color swatches and size selector')
crop('colorSwatches','eleven-oasis-pdp-mobile-full.png',(25,1995,680,2135),'Original PDP color swatches, enlarged in the compact composition')
crop('sizeOptions','eleven-oasis-pdp-mobile-full.png',(25,2140,460,2320),'Original PDP size label and first three size options, enlarged in the compact composition')
crop('rating','eleven-oasis-pdp-mobile-full.png',(20,1882,620,1970),'Original customer star rating and review link')
crop('cartCta','eleven-oasis-pdp-mobile-full.png',(25,2815,1150,2940),'Original ADD TO CART primary purchase action')
crop('reassurance','eleven-oasis-pdp-mobile-full.png',(50,5355,1125,5535),'Actual purchase reassurance badges for returns, pay later and shipping')
crop('desktop','HOMEPAGE - PC.png',(0,0,2160,1490),'Desktop homepage with campaign hero, collection navigation and Trending Now section')
crop('mobile','eleven-oasis-mobile-1.png',(0,0,679,1148),'Original mobile storefront homepage')
crop('pdp','eleven-oasis-pdp-mobile-full.png',(0,0,1179,1990),'Original mobile PDP product image, price and reviews')
crop('campaign','eleven-oasis-strategy-03-editorial-full.png',(0,0,1280,950),'Original Winter 2026 campaign landing page hero and shopping content')
(out/'manifest.json').write_text(json.dumps(assets,indent=2))
print('Prepared',len(assets),'source-derived raster crops; no icon paths are redrawn.')
