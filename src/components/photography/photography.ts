const base = "/projects/visual-experiments/photography/";

export const photographySeries = [
  {
    id: "stay-for-the-night", number: "01", title: "STAY FOR THE NIGHT", client: "TEAM WANG DESIGN", tone: "pink",
    photos: [
      "Blue and pink garments arranged on a soft sculptural form",
      "Blue and pink silhouettes seated together on a pink form",
      "A blue figure reclining upside down over a pink form",
      "Close-up of intertwined blue and pink fabric forms",
      "Blue garments raised above a rounded pink form",
      "Blue and pink figures reclining together across the studio floor",
    ].map((alt, i) => ({ src: `${base}stay-0${i + 1}.webp`, alt, width: 278, height: 494 })),
  },
  {
    id: "the-original-1", number: "02", title: "THE ORIGINAL 1", client: "TEAM WANG DESIGN", tone: "mono",
    photos: [
      "Black garments and suspended headwear silhouetted against a studio light",
      "Layered black clothing silhouettes framed by a bright circular light",
      "A black jacket and headwear floating in a monochrome composition",
      "A twisting black garment silhouette beneath a suspended cap",
      "A group of dark clothing silhouettes receding into light",
      "Black garment silhouettes crossing a diagonal beam of studio light",
    ].map((alt, i) => ({ src: `${base}original-0${i + 1}.webp`, alt, width: 278, height: 494 })),
  },
  {
    id: "early-birds-drop-1", number: "03", title: "EARLY BIRDS CLUB / DROP 1", client: "Fashion & Lifestyle Photography", tone: "green",
    photos: [
      { alt: "Two models in black and white Early Birds Club jackets on a golf course", width: 1278, height: 1707 },
      { alt: "Model seated in a white EBC jacket, looking back toward the camera", width: 1280, height: 1706 },
      { alt: "Golfer in black EBC clothing beside a golf bag on the course", width: 903, height: 1207 },
      { alt: "Model in a grey illustrated hoodie standing beside a golf cart", width: 1278, height: 1707 },
      { alt: "Two models and a golf cart beneath a tree on the course", width: 1280, height: 1706 },
      { alt: "Model in a teal Early Birds Club tracksuit walking toward the camera", width: 1280, height: 1707 },
    ].map((photo, i) => ({ ...photo, src: `${base}ebc-0${i + 1}.webp` })),
  },
];
