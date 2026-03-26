const STORAGE_KEY = "theme";
const THEME_ATTR = "data-theme";
const QUERY_KEY = "(prefers-color-scheme: dark)";

const themes = {
  LIGHT: "light",
  DARK: "dark"
};

initTheme();

function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia(QUERY_KEY).matches) {
    setTheme(themes.DARK);
  } else {
    setTheme(themes.LIGHT);
  }

  const themeMedia = window.matchMedia(QUERY_KEY);
  if (themeMedia.addEventListener) {
    themeMedia.addEventListener("change", (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? themes.DARK : themes.LIGHT);
      }
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    hydrateThemeToggler();
    bindThemeToggle();
    initScrollHeader();
    initReveal();
    initHomeGridHover();
  });
}

function toggleTheme() {
  const theme = getTheme();
  const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
  setTheme(newTheme);
  localStorage.setItem(STORAGE_KEY, newTheme);
  hydrateThemeToggler();
}

function getTheme() {
  return document.documentElement.getAttribute(THEME_ATTR);
}

function setTheme(value) {
  document.documentElement.setAttribute(THEME_ATTR, value);
}

function hydrateThemeToggler() {
  const toggleButton = document.getElementById("theme-toggler");
  if (!toggleButton) {
    return;
  }

  const isDark = getTheme() === themes.DARK;
  toggleButton.innerText = isDark ? "Light Mode" : "Dark Mode";
}

function bindThemeToggle() {
  const toggleButton = document.getElementById("theme-toggler");
  if (!toggleButton) {
    return;
  }

  toggleButton.addEventListener("click", toggleTheme);
}

function initScrollHeader() {
  const header = document.getElementById("site-header");
  if (!header) {
    return;
  }

  let previousY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    const shouldHide = currentY > previousY && currentY > 90;
    header.classList.toggle("is-hidden", shouldHide);
    previousY = currentY;
  }, { passive: true });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal-up, .card-group .col-lg-6, .card-columns > div");
  if (!revealItems.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
    observer.observe(item);
  });
}

function initHomeGridHover() {
  const body = document.body;
  if (!body || !body.classList.contains("home-page")) {
    return;
  }

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const allowMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  if (!canHover || !allowMotion) {
    return;
  }

  const root = document.documentElement;
  body.classList.add("grid-hover-enabled");
  body.classList.add("grid-hover-active");

  const maxGridShift = 14;
  const maxGlowShift = 20;

  const updateFromPointer = (event) => {
    const viewportX = event.clientX / window.innerWidth;
    const viewportY = event.clientY / window.innerHeight;
    const centeredX = viewportX - 0.5;
    const centeredY = viewportY - 0.5;

    root.style.setProperty("--grid-shift-x", `${(centeredX * maxGridShift).toFixed(2)}px`);
    root.style.setProperty("--grid-shift-y", `${(centeredY * maxGridShift).toFixed(2)}px`);
    root.style.setProperty("--glow-shift-x", `${(centeredX * maxGlowShift).toFixed(2)}px`);
    root.style.setProperty("--glow-shift-y", `${(centeredY * maxGlowShift).toFixed(2)}px`);
    root.style.setProperty("--glow-b-shift-x", `${(centeredX * maxGlowShift * -0.75).toFixed(2)}px`);
    root.style.setProperty("--glow-b-shift-y", `${(centeredY * maxGlowShift * -0.75).toFixed(2)}px`);
    root.style.setProperty("--grid-spot-x", `${(viewportX * 100).toFixed(2)}%`);
    root.style.setProperty("--grid-spot-y", `${(viewportY * 100).toFixed(2)}%`);
  };

  const resetGridState = () => {
    root.style.setProperty("--grid-shift-x", "0px");
    root.style.setProperty("--grid-shift-y", "0px");
    root.style.setProperty("--glow-shift-x", "0px");
    root.style.setProperty("--glow-shift-y", "0px");
    root.style.setProperty("--glow-b-shift-x", "0px");
    root.style.setProperty("--glow-b-shift-y", "0px");
    root.style.setProperty("--grid-spot-x", "50%");
    root.style.setProperty("--grid-spot-y", "35%");
  };

  window.addEventListener("pointermove", updateFromPointer, { passive: true });
  window.addEventListener("blur", resetGridState);
}
