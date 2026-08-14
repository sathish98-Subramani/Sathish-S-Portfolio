(function () {
  "use strict";
  var el = document.getElementById("role-type");
  if (!el) return;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phrases = [
    "clean web experiences.",
    "full-stack applications.",
    "AI-driven tools.",
    "premium interfaces."
  ];
  if (reduceMotion) { el.textContent = phrases[0]; return; }

  var pi = 0, ci = 0, deleting = false;
  el.classList.add("typewriter");

  function tick() {
    var word = phrases[pi];
    if (!deleting) {
      ci++;
      el.textContent = word.slice(0, ci);
      if (ci === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      ci--;
      el.textContent = word.slice(0, ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 55);
  }
  tick();
})();
