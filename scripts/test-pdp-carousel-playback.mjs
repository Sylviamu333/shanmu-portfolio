import test from 'node:test';
import assert from 'node:assert/strict';
import { createPdpPlaybackController, PDP_SLIDE_DURATION } from '../src/components/eleven-oasis/pdpCarouselPlayback.ts';

function harness(conditions = {}) {
  let now = 0, nextId = 0, elapsed = 0, notifications = 0;
  let snapshot = { index: 0, playing: false, paused: false, reduced: false };
  const frames = new Map();
  const clock = createPdpPlaybackController(7, {
    now: () => now,
    request: callback => { assert.equal(frames.size, 0, 'Only one master animation frame may be pending'); frames.set(++nextId, callback); return nextId; },
    cancel: id => frames.delete(id),
    onChange: next => { snapshot = next; notifications++; },
    onProgress: value => { elapsed = value; },
  });
  clock.setConditions({ active: true, visible: true, ...conditions });
  const advance = duration => {
    now += duration;
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach(callback => callback(now));
  };
  return { clock, advance, frames, get state() { return snapshot; }, get elapsed() { return elapsed; }, get notifications() { return notifications; } };
}

test('two-second cycles share the same elapsed value as progress and wrap all seven slides', () => {
  const h = harness();
  assert.equal(PDP_SLIDE_DURATION, 2000);
  for (let index = 0; index < 7; index++) {
    assert.equal(h.state.index, index);
    assert.equal(h.frames.size, 0, 'Wait for image decode before timing');
    h.clock.decoded(index);
    h.advance(1999);
    assert.equal(h.state.index, index);
    assert.equal(h.elapsed, 1999);
    h.advance(1);
    assert.equal(h.state.index, (index + 1) % 7);
    assert.equal(h.elapsed, 0);
  }
});

test('pause/resume freezes exact progress; manual selection preserves explicit pause', () => {
  const h = harness(); h.clock.decoded(0); h.advance(500);
  assert.equal(h.elapsed / PDP_SLIDE_DURATION, .25);
  h.clock.toggle(); h.advance(100000);
  assert.equal(h.elapsed, 500); assert.equal(h.state.paused, true); assert.equal(h.frames.size, 0);
  h.clock.toggle(); h.advance(400); assert.equal(h.elapsed, 900);
  h.clock.select(3); assert.equal(h.elapsed, 0); assert.equal(h.state.index, 3);
  h.clock.decoded(0); assert.equal(h.frames.size, 0, 'Ignore stale image decode');
  h.clock.decoded(3); h.advance(500); h.clock.select(3);
  assert.equal(h.elapsed, 500, 'Clicking the active indicator must not restart');
  h.clock.toggle(); h.clock.select(5); h.clock.decoded(5); h.advance(20000);
  assert.equal(h.state.index, 5); assert.equal(h.elapsed, 0); assert.equal(h.state.paused, true);
  h.clock.toggle(); h.advance(1000); assert.equal(h.elapsed, 1000);
});

test('offscreen, hidden-tab, inactive and modal gates freeze and resume one clock without catch-up', () => {
  for (const [flag, blocked, allowed] of [['visible', false, true], ['hidden', true, false], ['active', false, true], ['modal', true, false]]) {
    const h = harness(); h.clock.decoded(0); h.advance(800);
    h.clock.setConditions({ [flag]: blocked }); h.advance(1000000);
    assert.equal(h.elapsed, 800, flag); assert.equal(h.state.index, 0); assert.equal(h.frames.size, 0);
    h.clock.setConditions({ [flag]: allowed }); h.advance(400);
    assert.equal(h.elapsed, 1200, flag); assert.equal(h.state.index, 0);
  }
});

test('closing the modal does not override explicit pause', () => {
  const h = harness(); h.clock.decoded(0); h.advance(1100); h.clock.toggle();
  h.clock.setConditions({ modal: true }); h.advance(20000); h.clock.setConditions({ modal: false }); h.advance(20000);
  assert.equal(h.elapsed, 1100); assert.equal(h.state.paused, true); assert.equal(h.frames.size, 0);
});

test('reduced motion disables the clock while preserving manual navigation; disposal cancels all work', () => {
  const h = harness({ reduced: true }); h.clock.decoded(0); h.advance(100000); h.clock.toggle();
  assert.equal(h.frames.size, 0); assert.equal(h.elapsed, 0); assert.equal(h.state.reduced, true);
  h.clock.select(6); h.clock.decoded(6); h.advance(100000); assert.equal(h.state.index, 6);
  h.clock.setConditions({ reduced: false }); h.advance(1200); assert.equal(h.elapsed, 1200);
  const previous = h.notifications; h.clock.dispose(); h.advance(100000); h.clock.select(1); h.clock.toggle(); h.clock.decoded(6);
  assert.equal(h.frames.size, 0); assert.equal(h.notifications, previous);
});
