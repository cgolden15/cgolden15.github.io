/* Entry point — year, initial progress, resize */

document.getElementById("yr").textContent = new Date().getFullYear();

computeProgress();

/* A mobile address bar fires resize while scrolling. Only the width matters. */
let lastWidth = innerWidth;
window.addEventListener("resize", () => {
  if (IS_TOUCH && innerWidth === lastWidth) return;
  lastWidth = innerWidth;
  sizeRenderer();
  computeProgress();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});

/* Images on project pages change the page height after first layout */
window.addEventListener("load", () => {
  computeProgress();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});
