// Lesson deck runtime: keyboard navigation, slide counter, ?guides overlay. No dependencies.
(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const counter = document.getElementById("counter");
  let current = 0;

  if (new URLSearchParams(location.search).has("guides")) {
    document.documentElement.classList.add("show-guides");
  }

  const show = (i) => {
    current = Math.max(0, Math.min(slides.length - 1, i));
    slides[current]?.scrollIntoView({ behavior: "smooth" });
    update();
  };
  const update = () => {
    if (counter) counter.textContent = `${current + 1} / ${slides.length}`;
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          current = slides.indexOf(e.target);
          update();
        }
      }
    },
    { threshold: 0.6 },
  );
  slides.forEach((s) => observer.observe(s));

  const NEXT = new Set(["ArrowRight", "ArrowDown", "PageDown", " ", "Spacebar"]);
  const PREV = new Set(["ArrowLeft", "ArrowUp", "PageUp"]);
  addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (NEXT.has(e.key)) { e.preventDefault(); show(e.shiftKey && e.key === " " ? current - 1 : current + 1); }
    else if (PREV.has(e.key)) { e.preventDefault(); show(current - 1); }
    else if (e.key === "Home") { e.preventDefault(); show(0); }
    else if (e.key === "End") { e.preventDefault(); show(slides.length - 1); }
    else if (e.key === "g") document.documentElement.classList.toggle("show-guides");
  });
  update();
})();
