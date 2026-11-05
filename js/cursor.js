/* Custom cursor — desktop only */

if (!IS_TOUCH) {
  const cur = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  let mx = innerWidth / 2,
    my = innerHeight / 2,
    tx = mx,
    ty = my;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  });

  (function ring_loop() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    ring.style.left = tx + "px";
    ring.style.top = ty + "px";
    requestAnimationFrame(ring_loop);
  })();

  document.querySelectorAll("a, button, .rdot, .prow, .cta").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur.style.width = "20px";
      cur.style.height = "20px";
      cur.style.background = "transparent";
      cur.style.border = "1px solid #ff8a3a";
      ring.style.opacity = "0";
    });
    el.addEventListener("mouseleave", () => {
      cur.style.width = "7px";
      cur.style.height = "7px";
      cur.style.background = "#fff";
      cur.style.border = "none";
      ring.style.opacity = "1";
    });
  });
}
