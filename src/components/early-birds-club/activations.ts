import type { ProjectImage } from "@/data/projects";

type Activation = {
  id: string;
  title: string;
  kind: string;
  location: string;
  context: string;
  sourcePage: number;
  photos: ProjectImage[];
};

const photo = (name: string, width: number, height: number, alt: string, caption: string): ProjectImage => ({
  src: `/projects/early-birds-club/activations/${name}.webp`,
  width, height, alt, caption,
});

export const earlyBirdsActivations: Activation[] = [
  {
    id: "dongjiang",
    title: "Dongjiang Pop-up",
    kind: "Retail pop-up",
    location: "Dongjiang, Shanghai",
    context: "A retail presence at a leading golf driving range in Shanghai.",
    sourcePage: 20,
    photos: [
      photo("dongjiang-signage", 721, 961, "Early Birds Club wordmark on glass at the Dongjiang pop-up", "Dongjiang, Shanghai · storefront identity"),
      photo("dongjiang-merchandise", 575, 970, "Early Birds Club apparel arranged in branded display cabinets at Dongjiang", "Dongjiang, Shanghai · apparel display"),
    ],
  },
  {
    id: "taikoo-hui",
    title: "Taikoo Hui Pop-up Store",
    kind: "Retail pop-up",
    location: "Taikoo Hui, Guangzhou",
    context: "A pop-up store at a prominent luxury shopping mall in Guangdong, supported by in-mall brand displays.",
    sourcePage: 21,
    photos: [
      photo("taikoo-hui-displays", 506, 337, "Digital Early Birds Club campaign displays inside Taikoo Hui shopping mall", "Taikoo Hui, Guangzhou · in-mall displays"),
      photo("taikoo-hui-campaign", 763, 509, "Early Birds Club apparel campaign on illuminated advertising panels", "Taikoo Hui, Guangzhou · campaign imagery"),
    ],
  },
  {
    id: "young-star",
    title: "EBC × Young Star",
    kind: "Community collaboration",
    location: "Yunhaigu, Shenzhen",
    context: "A collaboration with a young entrepreneurs’ association in Guangdong, bringing the brand into a shared golf experience.",
    sourcePage: 22,
    photos: [
      photo("young-star-flag", 451, 601, "A teal Early Birds Club flag flying at the Young Star golf event", "Yunhaigu, Shenzhen · on-site brand presence"),
      photo("young-star-community", 426, 284, "Young Star participants gathered on the golf course between Early Birds Club flags", "Yunhaigu, Shenzhen · community gathering"),
    ],
  },
  {
    id: "beijing-golf",
    title: "EBC × Beijing Golf Association",
    kind: "Tournament activation",
    location: "Nicklaus Club, Beijing",
    context: "Brand presence at an amateur golf tournament, extending the identity into the course environment.",
    sourcePage: 23,
    photos: [
      photo("beijing-golf-flag", 546, 820, "An Early Birds Club flag beside the course at Nicklaus Club", "Nicklaus Club, Beijing · course-side identity"),
      photo("beijing-golf-tournament", 408, 237, "Golf tournament participants gathered with balloons in front of an event backdrop", "Nicklaus Club, Beijing · tournament gathering"),
    ],
  },
  {
    id: "ypo",
    title: "EBC × Young Presidents’ Organization (YPO)",
    kind: "Leadership community collaboration",
    location: "Beijing",
    context: "A collaboration involving YPO’s global leadership community, documented through the golf gathering and event awards.",
    sourcePage: 24,
    photos: [
      photo("ypo-community", 567, 378, "Participants posing in front of a YPO Beijing golf event backdrop", "Beijing · YPO community gathering"),
      photo("ypo-awards", 385, 257, "YPO Beijing golf awards displayed on wooden bases", "Beijing · event awards"),
    ],
  },
];
