import gsap from "gsap";

export const FOUNDATIONS_DURATION = 12;
export const foundationScenes = [
  { id: "typography", title: "01 / TYPOGRAPHY SYSTEM", subtitle: "A Clear and Consistent Visual Hierarchy", start: 0, pose: 2.2 },
  { id: "icons", title: "02 / ICONOGRAPHY SYSTEM", subtitle: "Making Product Information Easier to Understand", start: 3, pose: 5.2 },
  { id: "patterns", title: "03 / REUSABLE UI PATTERNS", subtitle: "Consistent Components Across the Shopping Journey", start: 6, pose: 8.2 },
  { id: "devices", title: "04 / CROSS-DEVICE CONSISTENCY", subtitle: "One Design Language, Multiple Touchpoints", start: 9, pose: 11.1 },
] as const;

/** A single clock owns every layer, stagger, hold and transition. */
export function buildFoundationsTimeline(element: HTMLElement, onUpdate: () => void) {
  const scenes = [...element.querySelectorAll<HTMLElement>("[data-foundation-scene]")];
  const pieces = (name: string) => [...element.querySelectorAll<HTMLElement>(`[data-foundation-piece="${name}"]`)];
  gsap.set(scenes, { autoAlpha: 0, y: 0 });
  gsap.set(scenes[0], { autoAlpha: 1 });
  const master = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "power2.inOut" }, onUpdate });
  master.fromTo(pieces("display"), { autoAlpha: .7, y: 10 }, { autoAlpha: 1, y: 0, duration: .5 }, 0)
    .fromTo(pieces("type-sample"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .45, stagger: .12 }, .35)
    .fromTo(pieces("type-spec"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .4, stagger: .08 }, 1.15);
  for (let index = 1; index < scenes.length; index++) {
    const time = foundationScenes[index].start;
    master.fromTo(scenes[index], { autoAlpha: 0, y: index === 1 ? 0 : 8 }, { autoAlpha: 1, y: 0, duration: .5 }, time)
      .to(scenes[index - 1], { autoAlpha: 0, y: -8, duration: .5 }, time);
  }
  master.fromTo(pieces("icon"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .4, stagger: .045 }, 3.15)
    .fromTo(pieces("icon-label"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: .4, stagger: .07 }, 4.1)
    .fromTo(pieces("pattern"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .09 }, 6.15)
    .fromTo(pieces("desktop"), { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: .6 }, 9.1)
    .fromTo(pieces("mobile"), { autoAlpha: 0, x: 18 }, { autoAlpha: 1, x: 0, duration: .6 }, 9.2)
    .fromTo(pieces("touchpoint"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .5, stagger: .1 }, 9.6)
    .to(pieces("desktop"), { y: -3, duration: .6 }, 10.4)
    .to(pieces("mobile"), { y: 3, duration: .6 }, 10.4)
    .to([...pieces("desktop"), ...pieces("mobile")], { y: 0, duration: .5 }, 11);
  // The final crossfade returns to the exact initial pose, including child layers.
  master.set(scenes[0], { autoAlpha: 0, y: 0 }, 11.5)
    .set(pieces("display"), { autoAlpha: .7, y: 10 }, 11.5)
    .set([...pieces("type-sample"), ...pieces("type-spec")], { autoAlpha: 0, y: 10 }, 11.5)
    .to(scenes[0], { autoAlpha: 1, duration: .5 }, 11.5)
    .to(scenes[3], { autoAlpha: 0, y: 0, duration: .5 }, 11.5);
  if (Math.abs(master.duration() - FOUNDATIONS_DURATION) > .001) throw new Error("Unexpected foundations cycle duration");
  return master;
}
