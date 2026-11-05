/* GSAP ScrollTrigger — reveals, marquee, counters, skill bars, nav, rail */

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  if (lenis) ScrollTrigger.scrollerProxy(document.body, {});

  /* Generic scroll reveals */
  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  /* Marquee — pinned horizontal scrub */
  const track = document.getElementById("marqueeTrack");
  const words = gsap.utils.toArray(".mw");
  if (track) ScrollTrigger.create({
    trigger: "#sec-marquee",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: 1,
    onUpdate(self) {
      const p = self.progress;
      const dist = track.scrollWidth - innerWidth + innerWidth * 0.4;
      const tx = -p * dist;
      gsap.set(track, { x: tx });
      // light up each word when its center crosses 65% of the viewport width
      words.forEach((w) => {
        const center = tx + w.offsetLeft + w.offsetWidth / 2;
        w.classList.toggle("lit", center < innerWidth * 0.65);
      });
    },
  });

  /* Stat counters */
  gsap.utils.toArray(".stat .n").forEach((n) => {
    const to = +n.dataset.to;
    const suffix = n.querySelector("s") ? n.querySelector("s").outerHTML : "";
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: n,
      start: "top 85%",
      once: true,
      onEnter() {
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate() {
            n.innerHTML = Math.round(obj.v) + suffix;
          },
        });
      },
    });
  });

  /* Skill bars */
  gsap.utils.toArray(".sk .bar i").forEach((bar) => {
    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      once: true,
      onEnter() {
        gsap.to(bar, {
          width: bar.dataset.w + "%",
          duration: 1.2,
          ease: "power3.out",
        });
      },
    });
  });

  /* Hero headline reveal */
  if (document.querySelector(".hero h1")) gsap.to(".hero h1 .ln span", {
    y: 0,
    duration: 1.1,
    ease: "power4.out",
    stagger: 0.12,
    delay: 0.2,
  });

  /* Nav shrink on scroll */
  ScrollTrigger.create({
    start: "top -60",
    end: 99999,
    onUpdate(self) {
      document
        .getElementById("nav")
        .classList.toggle("shrink", self.scroll() > 60);
    },
  });

  /* Scene rail active dot */
  const dots = gsap.utils.toArray(".rdot");
  function setDot(i) {
    dots.forEach((d, j) => d.classList.toggle("on", j === i));
  }

  gsap.utils.toArray("section[data-scene]").forEach((sec) => {
    const idx = +sec.dataset.scene;
    ScrollTrigger.create({
      trigger: sec,
      start: "top center",
      end: "bottom center",
      onToggle(self) {
        if (self.isActive) setDot(idx);
      },
    });
  });

  dots.forEach((d) => {
    d.addEventListener("click", () => {
      const idx = +d.dataset.go;
      const target = document.querySelector(
        'section[data-scene="' + idx + '"]',
      );
      if (lenis) lenis.scrollTo(target, { offset: -40 });
      else target.scrollIntoView({ behavior: "smooth" });
    });
  });

  ScrollTrigger.addEventListener("refresh", computeProgress);
}
