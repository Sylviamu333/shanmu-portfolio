// All coordinates refer to the unchanged 1785 × 881 transparent illustration.
// The visible content is flattened: move the complete bank, not copied logos.
export const folderContentsPath = "M523 351L504 283Q494 255 520 247L574 230Q586 207 609 205L670 204L669 190Q668 169 690 168L704 167Q708 159 724 155L723 146Q721 126 744 125L886 121Q913 119 914 144L916 185Q934 178 953 182L1103 193L1105 181Q1109 165 1126 169L1311 197Q1330 201 1326 220L1319 250L1387 250Q1420 249 1421 279L1420 310Q1453 307 1467 333L1472 349Q1508 347 1515 379L1495 490L1466 501L1430 600Q1410 579 1380 574L835 491C810 484 800 470 793 450Q783 417 756 410L674 391L660 386Q656 373 640 371L523 351Z";
export const folderDecorations = [
  { id: "cube", bounds: [328, 245, 124, 120], path: "M352 275L393 258Q413 250 423 270L441 308Q447 325 430 334L391 353Q375 360 366 343L339 304Q330 287 352 275Z", origin: "390 308", rise: 85, rotation: -3 },
  { id: "orb", bounds: [412, 450, 65, 65], path: "M466 482a22 22 0 1 1-44 0a22 22 0 1 1 44 0", origin: "444 482", rise: 75, rotation: 2 },
  { id: "heart", bounds: [1438, 210, 115, 97], path: "M1452 234C1465 215 1496 222 1504 240C1519 220 1548 237 1533 266Q1522 283 1502 296Q1480 283 1462 261Q1445 246 1452 234Z", origin: "1500 260", rise: 95, rotation: 4 },
  { id: "sparkle", bounds: [1200, 100, 90, 95], path: "M1252 113Q1247 137 1278 153Q1252 151 1233 183Q1241 151 1210 138Q1242 143 1252 113Z", origin: "1245 148", rise: 92, rotation: -5 },
  { id: "illustrated-cursor", bounds: [1595, 395, 120, 165], path: "M1600 400H1708V550H1600Z", origin: "1650 480", rise: 82, rotation: 3 },
] as const;

// Only the newly exposed, originally occluded trim is extended. Its color is
// sampled from the same card's blank material; no hidden logos are fabricated.
export const folderEdgeMaterials = [
  { until: 670, sample: [637, 338] },
  { until: 806, sample: [691, 349] },
  { until: 957, sample: [865, 424] },
  { until: 1110, sample: [977, 519] },
  { until: 1280, sample: [1155, 461] },
  { until: 1450, sample: [1340, 500] },
  { until: 1785, sample: [1452, 389] },
] as const;
