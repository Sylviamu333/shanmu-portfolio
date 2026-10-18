"""Create faithful evidence excerpts; leave all fourteen uploaded sources intact."""
from pathlib import Path
from PIL import Image
import hashlib,json
root=Path(__file__).resolve().parents[1]
out=root/'public/projects/eleven-oasis/research';out.mkdir(parents=True,exist_ok=True)
assets={}
def crop(key,file,bounds,alt,context):
 source=root/'source-assets'/file;im=Image.open(source).convert('RGB');bounds=bounds or (0,0,*im.size)
 assert 0<=bounds[0]<bounds[2]<=im.width and 0<=bounds[1]<bounds[3]<=im.height,(key,bounds,im.size)
 image=im.crop(bounds);target=out/(key+'.webp');image.save(target,'WEBP',lossless=True,method=6)
 assert Image.open(target).convert('RGB').tobytes()==image.tobytes()
 assets[key]=dict(src='/'+target.relative_to(root/'public').as_posix(),width=image.width,height=image.height,alt=alt,caption=context,source='source-assets/'+file,sourceSha256=hashlib.sha256(source.read_bytes()).hexdigest(),crop=list(bounds),sha256=hashlib.sha256(target.read_bytes()).hexdigest())
for i in range(1,10):
 file=f'hotjar{i}.'+('png' if i<=6 else 'jpg')
 names=['FlexComfort PDP','Homepage mobile study','Homepage desktop study','Linen-cotton PDP','Seasonal campaign','Sale collection','Best sellers collection','Big & Tall collection','Big & Tall PDP']
 crop(f'hotjar{i}',file,None,f'Original Hotjar research board: {names[i-1]}, including captured heatmaps and researcher notes',f'{file} · {names[i-1]} · Original research board')
views=[
 ('homeDesktopClick','hotjar3.png',(294,40,980,390),'Desktop homepage: navigation, search and hero click marks'),
 ('homeDesktopScroll','hotjar3.png',(294,415,980,940),'Desktop homepage scroll captures with 53.3% and 24.7% depth markers'),
 ('homeMobileClick','hotjar2.png',(24,11,209,343),'Mobile homepage click map highlighting logo, search, cart and navigation'),
 ('homeMobileScroll','hotjar2.png',(24,474,209,910),'Mobile homepage scroll capture with a 34% marker at Gifting for Him'),
 ('pdpFlexDesktop','hotjar1.png',(223,42,756,372),'FlexComfort desktop PDP click map: image, colors, size and fit controls'),
 ('pdpLinenDesktop','hotjar4.png',(190,22,869,373),'Linen-cotton desktop PDP click map concentrating on color, size and fit controls'),
 ('pdpLinenDesktopScroll','hotjar4.png',(196,418,878,727),'Desktop PDP scroll map with the 41.6% depth marker near Add to Cart'),
 ('pdpLinenMobile','hotjar4.png',(36,22,178,373),'Mobile PDP click capture: product imagery, selections and purchase controls'),
 ('pdpLinenMobileScroll','hotjar4.png',(36,410,180,920),'Mobile PDP scroll map with 27.2% at Complete the Look and 10.8% farther below'),
 ('pdpBigDesktop','hotjar9.jpg',(48,334,421,570),'Big & Tall desktop PDP: click marks on imagery, colors, size and fit'),
 ('pdpBigMobile','hotjar9.jpg',(477,334,632,570),'Big & Tall mobile PDP: click marks on product imagery and header controls'),
 ('saleDesktop','hotjar6.png',(47,345,520,592),'Sale collection desktop click map around category entries, navigation and collection controls'),
 ('saleMobile','hotjar6.png',(540,345,754,592),'Sale collection mobile click map highlighting cart, search and navigation'),
 ('bestDesktop','hotjar7.jpg',(404,340,874,538),'Best sellers desktop collection: category/navigation click marks'),
 ('bestMobile','hotjar7.jpg',(48,590,302,898),'Best sellers mobile collection: numbered click concentrations at pagination'),
 ('bigDesktop','hotjar8.jpg',(400,351,580,593),'Big & Tall desktop collection filters: click marks on sizes and filter choices'),
 ('bigMobile','hotjar8.jpg',(611,351,846,529),'Big & Tall mobile collection: numbered click concentrations at pagination'),
 ('campaignDesktop','hotjar5.png',(376,54,782,397),'Desktop seasonal campaign: scene tiles and product-grid click marks'),
 ('campaignMobile','hotjar5.png',(46,54,347,360),'Mobile seasonal campaign: hero, navigation and curated-look captures'),
]
for key,file,bounds,alt in views: crop(key,file,bounds,alt,f'{file} · Focused original capture')
# Publish only relevant analytics excerpts: omit bookmarks, revenue columns and
# unrelated recommendation banners; group order is explicit in each caption.
crop('abtest1','abtest1.png',(1570,155,2705,460),'Separate test table: conversion, add-to-cart and average order value for control and New Group 1','abtest1.png · Metrics excerpt · Control Group above New Group 1; test name/device not shown')
crop('abtest2','abtest2.png',(0,45,1930,215),'Matching separate-test dashboard: reported relative changes and ranges for conversion, add-to-cart and order value','abtest2.png · Reported-change excerpt · No test name or device shown')
crop('abtest3','abtest3.jpg',(1205,970,2010,1185),'Desktop Shop the Look experiment table: conversion, add-to-cart and product-page-view rates','abtest3.jpg · Desktop Shop the Look · Control Group above New Group 1')
crop('abtest4','abtest4.jpg',(1180,660,1980,1140),'Mobile Shop the Look audience results: new visitors first, returning visitors second, control then variant in each pair','abtest4.jpg · Mobile audience breakdown · New visitors then returning visitors; control above variant in each pair')
crop('abtest5','abtest5.jpg',(35,635,1555,1270),'Mobile Shop the Look dashboard: conversion 5.82 to 7.24 percent, add-to-cart 18.4 to 19.0 percent and product views 53.2 to 54.0 percent','abtest5.jpg · Mobile Shop the Look · Original metric charts; tool estimates are not adopted as findings')
crop('desktopTestTitle','abtest3.jpg',(35,37,700,110),'Original experiment title: Test PC homepage shop the look','abtest3.jpg · Title excerpt, browser bookmarks excluded')
crop('mobileTestTitle','abtest4.jpg',(25,15,760,85),'Original experiment title: Test Mobile homepage shop the look','abtest4.jpg · Title excerpt')
(out/'manifest.json').write_text(json.dumps(assets,indent=2))
print(f'Prepared {len(assets)} lossless evidence assets from fourteen originals.')
