/** One clock drives both the slide index and progress; no CSS animation or interval. */
export const PDP_SLIDE_DURATION = 5000;

export type PdpPlaybackSnapshot = {
  index: number;
  playing: boolean;
  paused: boolean;
  reduced: boolean;
};

type Conditions = {
  active: boolean;
  visible: boolean;
  hidden: boolean;
  modal: boolean;
  reduced: boolean;
};

type Driver = {
  now: () => number;
  request: (callback: (timestamp: number) => void) => number;
  cancel: (id: number) => void;
  onChange: (snapshot: PdpPlaybackSnapshot) => void;
  onProgress: (elapsed: number) => void;
};

export function createPdpPlaybackController(count: number, driver: Driver) {
  let index = 0;
  let elapsed = 0;
  let last: number | null = null;
  let frame: number | null = null;
  let ready = false;
  let paused = false;
  let disposed = false;
  const conditions: Conditions = { active: false, visible: false, hidden: false, modal: false, reduced: false };
  let previous: PdpPlaybackSnapshot = { index: 0, playing: false, paused: false, reduced: false };
  const shouldPlay = () => conditions.active && conditions.visible && !conditions.hidden && !conditions.modal && !conditions.reduced && !paused;
  const account = (timestamp: number) => {
    if (last !== null) elapsed = Math.min(PDP_SLIDE_DURATION, elapsed + Math.max(0, timestamp - last));
    last = null;
  };
  const stop = (accumulate = true) => {
    if (accumulate) account(driver.now());
    else last = null;
    if (frame !== null) driver.cancel(frame);
    frame = null;
  };
  const publish = () => {
    const next = { index, playing: shouldPlay(), paused, reduced: conditions.reduced };
    if (Object.keys(next).some(key => next[key as keyof typeof next] !== previous[key as keyof typeof next])) {
      previous = next;
      driver.onChange(next);
    }
  };
  const schedule = (timestamp = driver.now()) => {
    if (!disposed && shouldPlay() && ready && frame === null) {
      last = timestamp;
      frame = driver.request(tick);
    }
  };
  const synchronize = (timestamp?: number) => {
    driver.onProgress(elapsed);
    publish();
    schedule(timestamp);
  };
  function tick(timestamp: number) {
    if (disposed) return;
    frame = null;
    account(timestamp);
    if (elapsed >= PDP_SLIDE_DURATION) {
      index = (index + 1) % count;
      elapsed = 0;
      // Do not start timing an image until its decode has completed.
      ready = false;
    }
    synchronize(timestamp);
  }

  return {
    setConditions(next: Partial<Conditions>) {
      if (disposed || !Object.keys(next).some(key => next[key as keyof Conditions] !== conditions[key as keyof Conditions])) return;
      stop();
      Object.assign(conditions, next);
      synchronize();
    },
    select(next: number) {
      if (disposed) return;
      const target = ((next % count) + count) % count;
      if (target === index) return; // Selecting the active indicator preserves progress.
      stop(false);
      index = target;
      elapsed = 0;
      ready = false;
      synchronize();
    },
    step(direction: number) { this.select(index + direction); },
    toggle() {
      if (disposed || conditions.reduced) return;
      stop();
      paused = !paused;
      synchronize();
    },
    decoded(target: number, success = true) {
      if (disposed || target !== index || ready === success) return;
      stop();
      ready = success;
      synchronize();
    },
    dispose() {
      disposed = true;
      stop(false);
    },
  };
}
