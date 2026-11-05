const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const IS_TOUCH = window.matchMedia("(pointer:coarse)").matches;

let scrollProg = 0;

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
function smooth(x) {
  x = clamp01(x);
  return x * x * (3 - 2 * x);
}
function range(s, a, b) {
  return clamp01((s - a) / (b - a));
}
function rnd(a, b) {
  return a + (b - a) * Math.random();
}
