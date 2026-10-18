import gsap from "gsap";
import { BRAND_DURATION } from "@/data/eleven-oasis-branding";

/** All camera, panel, opacity and closing-loop motion belongs to this one timeline. */
export function buildBrandGuidelinesTimeline(svg: SVGSVGElement, compact: boolean, onUpdate: () => void) {
  const scene = (name: string) => svg.querySelector<SVGGElement>(`[data-scene="${name}"]`)!;
  const piece = (name: string) => [...svg.querySelectorAll<SVGElement>(`[data-piece="${name}"]`)];
  const scenes = [...svg.querySelectorAll<SVGGElement>("[data-scene]")];
  const origin = compact ? "500 360" : "800 479";
  gsap.set(scenes, { autoAlpha: 0, x: 0, y: 0, scale: 1, svgOrigin: origin });
  gsap.set(scene("identity"), { autoAlpha: 1 });
  const master = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "power2.inOut" }, onUpdate });
  master.addLabel("identity", 0).addLabel("colors", 7).addLabel("typography", 13).addLabel("photography", 19).addLabel("story", 28);
  const transition = (incoming: string, outgoing: string, time: number) => {
    master.fromTo(scene(incoming), { autoAlpha: 0, y: incoming === "story" ? 0 : 65, scale: incoming === "story" ? 1 : .96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, time)
      .to(scene(outgoing), { autoAlpha: 0, y: -35, scale: .97, duration: .85 }, time + .15);
  };
  master.set(piece("identity-hero"), { autoAlpha: 1, x: 0, y: 0, scale: 1, svgOrigin: compact ? "500 360" : "540 425" }, 0)
    .set([...piece("identity-support"), ...piece("identity-rules"), ...piece("identity-intro")], { autoAlpha: 0, x: 0, y: 0, scale: 1 }, 0)
    .to(piece("identity-hero"), { scale: .74, x: compact ? -180 : -160, y: -20, duration: 1.5 }, .85)
    .fromTo(piece("identity-support"), { autoAlpha: 0, x: 100, y: 65 }, { autoAlpha: 1, x: 0, y: 0, stagger: .14, duration: 1.1 }, 1.1)
    .to([...piece("identity-hero"), ...piece("identity-support")], { autoAlpha: 0, x: -100, duration: .8 }, 3.7)
    .fromTo(piece("identity-rules"), { autoAlpha: 0, x: 100, y: 35 }, { autoAlpha: 1, x: 0, y: 0, duration: 1.1 }, 3.9);
  if (!compact) master.fromTo(piece("identity-intro"), { autoAlpha: 0, x: 75 }, { autoAlpha: 1, x: 0, duration: 1 }, 4.45);

  transition("colors", "identity", 7);
  master.fromTo(piece("color-card"), { autoAlpha: 0, x: 45, y: 60 }, { autoAlpha: 1, x: 0, y: 0, stagger: .09, duration: 1.05 }, 7.05);

  transition("typography", "colors", 13);
  master.fromTo(piece("type-hero"), { autoAlpha: 0, x: 75, scale: .88, svgOrigin: origin }, { autoAlpha: 1, x: 0, scale: 1.02, duration: 1.2 }, 13.05)
    .to(piece("type-hero"), { scale: 1.1, y: -15, duration: 1.5 }, 14.25)
    .to(piece("type-hero"), { autoAlpha: 0, scale: .87, x: -60, duration: .8 }, 15.8)
    .fromTo(piece("type-detail"), { autoAlpha: 0, y: 95, scale: .96, svgOrigin: origin }, { autoAlpha: 1, y: 0, scale: 1, stagger: .08, duration: 1.1 }, 16);

  transition("photography", "typography", 19);
  master.fromTo([...piece("photo-landscape"), ...piece("photo-model"), ...piece("photo-friends")], { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1.15, stagger: .13 }, 19.1)
    .to(piece("photo-landscape"), { autoAlpha: 0, x: -60, duration: 1.15 }, 22.4)
    .fromTo(piece("photo-car"), { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0, duration: 1.25 }, 22.3)
    .to(piece("photo-friends"), { autoAlpha: 0, y: -40, duration: 1 }, 23.2)
    .fromTo(piece("photo-coast"), { autoAlpha: 0, y: 65 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 23)
    .to(piece("photo-model"), { y: -12, duration: 2.5, ease: "sine.inOut" }, 23.5)
    .fromTo(piece("photo-guide"), { autoAlpha: 0, x: 40, y: 55 }, { autoAlpha: 1, x: 0, y: 0, duration: 1, stagger: .12 }, 24.1);

  transition("story", "photography", 28);
  master.fromTo(piece("story-headline"), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1.15 }, 28.3)
    .fromTo(piece("story-support"), { autoAlpha: 0, y: 65 }, { autoAlpha: 1, y: 0, stagger: .12, duration: 1.1 }, 28.5)
    .fromTo(piece("story-line"), { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0, duration: 1.2 }, 29.5)
    .to(piece("story-camera"), { scale: 1.015, x: -4, y: -2, svgOrigin: origin, duration: 2.8, ease: "sine.inOut" }, 30.5);

  // Return to the exact opening pose under a crossfade so repeat has no jump or blank.
  master.set(scene("identity"), { autoAlpha: 0, x: 0, y: 0, scale: 1 }, 34)
    .set(piece("identity-hero"), { autoAlpha: 1, x: 0, y: 0, scale: 1 }, 34)
    .set([...piece("identity-support"), ...piece("identity-rules"), ...piece("identity-intro")], { autoAlpha: 0, x: 0, y: 0 }, 34)
    .to(scene("identity"), { autoAlpha: 1, duration: 1 }, 34)
    .to(scene("story"), { autoAlpha: 0, duration: .8 }, 34.1);
  if (Math.abs(master.duration() - BRAND_DURATION) > .001) throw new Error("Unexpected brand timeline duration");
  return master.timeScale(2);
}
