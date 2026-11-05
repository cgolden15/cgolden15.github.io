/* Smooth scroll (Lenis) + scroll progress bar */

let lenis = null;

if (!REDUCE && window.Lenis) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
}

function computeProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  scrollProg = max > 0 ? clamp01(scrollY / max) : 0;
  document.getElementById("progress").style.width =
    (scrollProg * 100).toFixed(2) + "%";
}
window.addEventListener("scroll", computeProgress, { passive: true });
