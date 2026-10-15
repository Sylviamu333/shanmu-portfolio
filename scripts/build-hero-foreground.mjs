import fs from "node:fs/promises";
import sharp from "sharp";
const fullTop =
  "L916 185L936 180Q936 167 950 168L978 176L1045 190Q1063 191 1063 212C1082 241 1084 281 1073 316L1067 336L1105 181Q1109 165 1126 169";
const cleanTop = "L916 185Q934 178 953 182L1103 193L1105 181Q1109 165 1126 169";
function body(top) {
  return `M724 155L723 146Q721 126 744 125L886 121Q913 119 914 144${top}L1311 197Q1330 201 1326 220L1319 250L1387 250Q1420 249 1421 279L1420 310Q1453 307 1467 333L1472 349Q1508 347 1515 379L1506 448Q1530 457 1523 485L1495 725Q1486 794 1452 836Q1428 866 1385 875L612 750Q566 742 549 690L468 428Q458 396 467 382Q472 375 481 373L482 350Q476 331 493 326L516 321L504 283Q494 255 520 247L574 230Q586 207 609 205L670 204L669 190Q668 169 690 168L704 167Q708 159 724 155Z`;
}
const decorations = `<path d="M352 275L393 258Q413 250 423 270L441 308Q447 325 430 334L391 353Q375 360 366 343L339 304Q330 287 352 275Z"/><circle cx="444" cy="482" r="22"/><path d="M1452 234C1465 215 1496 222 1504 240C1519 220 1548 237 1533 266Q1522 283 1502 296Q1480 283 1462 261Q1445 246 1452 234Z"/><path d="M1252 113Q1247 137 1278 153Q1252 151 1233 183Q1241 151 1210 138Q1242 143 1252 113Z"/><path d="M471 541C424 551 364 576 368 610C374 643 463 630 506 611" fill="none" stroke="white" stroke-width="19" stroke-linecap="round"/><path d="M1493 584C1558 581 1625 602 1633 633C1644 670 1613 685 1597 664" fill="none" stroke="white" stroke-width="17" stroke-linecap="round"/><path d="M1483 703C1544 690 1559 728 1476 735" fill="none" stroke="white" stroke-width="14" stroke-linecap="round"/><path d="M1614 465L1676 511L1657 515L1670 531L1657 540L1645 521L1633 534Z"/><path d="M1646 420L1640 444M1691 443L1671 458" fill="none" stroke="white" stroke-width="11" stroke-linecap="round"/>`;
const bulb = `<path d="M1013 145C1006 137 1012 124 1008 113C997 94 1009 73 1032 68C1057 61 1072 70 1077 82C1083 98 1074 112 1061 129L1046 155L1037 168Q1025 171 1013 162L1008 151Z"/><path d="M978 40L987 56M940 85L963 92M950 137L970 129M1105 87L1126 83M1106 133L1128 139M1079 164L1089 180" fill="none" stroke="white" stroke-width="12" stroke-linecap="round"/>`;
const wrap = (content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1785" height="881" viewBox="0 0 1785 881" fill="white">${content}</svg>`;
const source = await fs.readFile("source-assets/hero-pink-folder.png");
const full = wrap(`<path d="${body(fullTop)}"/>${decorations}${bulb}`);
const clean = wrap(`<path d="${body(cleanTop)}"/>${decorations}`);
await fs.writeFile("public/hero/foreground-matte.svg", full);
await fs.writeFile("public/hero/resting-matte.svg", clean);
// SVG compositing keeps the original RGB pixels. The repair plate is localized
// to the same silhouette used by the existing animation, not the entire scene.
const repair =
  "M934 163C970 154 1031 174 1069 190L1073 220C1092 248 1093 291 1084 330L1076 440L1005 440L962 443L944 426L898 414L875 409L879 343L878 298C880 258 897 230 912 209Z";
const hand =
  "M862 250Q867 242 876 247Q883 250 882 263L881 283Q894 295 888 319L880 343L876 402L831 403L832 349Q823 328 826 304Q824 286 840 282Q847 270 859 281Z";
const foreground =
  "M810 402L948 409L957 516L805 510Z M967 423L1110 434L1100 538L955 515Z M1086 310L1245 325L1239 445L1068 433Z";
const repairImage = await sharp("public/hero/background-repair.webp")
  .png()
  .toBuffer();
const src = `data:image/png;base64,${source.toString("base64")}`;
const plate = `data:image/png;base64,${repairImage.toString("base64")}`;
const composite = `<svg xmlns="http://www.w3.org/2000/svg" width="1785" height="881"><defs><clipPath id="repair"><path d="${repair}"/><path d="${hand}"/></clipPath><clipPath id="front"><path d="${foreground}"/></clipPath></defs><image href="${src}" width="1785" height="881"/><g clip-path="url(#repair)"><image href="${plate}" width="1785" height="881" preserveAspectRatio="none"/></g><g clip-path="url(#front)"><image href="${src}" width="1785" height="881"/></g></svg>`;
await sharp(source)
  .composite([{ input: Buffer.from(full), blend: "dest-in" }])
  .webp({ lossless: true, effort: 6 })
  .toFile("public/hero/hero-foreground.webp");
await sharp(Buffer.from(composite))
  .composite([{ input: Buffer.from(clean), blend: "dest-in" }])
  .webp({ lossless: true, effort: 6 })
  .toFile("public/hero/hero-resting-foreground.webp");
console.log(
  "Exported aligned transparent foregrounds and editable vector mattes.",
);
