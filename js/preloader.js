/* Preloader counter + progress fill */

(function preloader() {
  const el = document.getElementById("preload");
  const count = document.getElementById("plCount");
  const fill = document.getElementById("plFill");
  let v = 0;

  const tick = () => {
    v += Math.random() * 9;
    if (v >= 100) v = 100;
    count.textContent = Math.floor(v);
    fill.style.width = v + "%";
    if (v < 100) {
      setTimeout(tick, 90);
    } else {
      setTimeout(() => {
        el.classList.add("done");
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }, 350);
    }
  };
  tick();
})();
