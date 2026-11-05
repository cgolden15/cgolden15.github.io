/* Entry point — year, initial progress, resize */

document.getElementById("yr").textContent = new Date().getFullYear();

computeProgress();

window.addEventListener("resize", () => {
  sizeRenderer();
  computeProgress();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});

/* Images on project pages change the page height after first layout */
window.addEventListener("load", () => {
  computeProgress();
  if (window.ScrollTrigger) ScrollTrigger.refresh();
});
