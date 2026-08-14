/* Certificate data. PDFs render as premium "document" cards (icon + open button)
   since browsers cannot render a PDF inside an <img> tag — this was the bug
   in the previous version, where every PDF certificate showed a broken image icon.
   JPEG/PNG certificates render as real image thumbnails with a lightbox. */

var CERTIFICATE_GROUPS = [
  {
    title: "Internships",
    items: [
      { src: "assets/certificates/internship-ai-agent.pdf", title: "Internship 6.0: AI Agent", type: "pdf" },
      { src: "assets/certificates/msme-ui-ux-design.jpeg", title: "MSME UI/UX Design", type: "image" },
      { src: "assets/certificates/interpe-java-programming.jpeg", title: "InterPe Java Programming", type: "image" }
    ]
  },
  {
    title: "AI & Data",
    items: [
      { src: "assets/certificates/intro-to-nlp.pdf", title: "Intro to NLP", type: "pdf" },
      { src: "assets/certificates/intro-to-ai.pdf", title: "Intro to AI", type: "pdf" },
      { src: "assets/certificates/deep-learning.pdf", title: "Deep Learning", type: "pdf" },
      { src: "assets/certificates/computer-vision.pdf", title: "Computer Vision", type: "pdf" },
      { src: "assets/certificates/gen-ai-unleashed.pdf", title: "Gen AI Unleashed", type: "pdf" },
      { src: "assets/certificates/ai-agents-mongodb.pdf", title: "AI Agents · MongoDB", type: "pdf" }
    ]
  },
  {
    title: "Cloud & Automation",
    items: [
      { src: "assets/certificates/oci-foundations-associate.pdf", title: "OCI Foundations Associate", type: "pdf" },
      { src: "assets/certificates/rpa-intro.pdf", title: "RPA Intro", type: "pdf" },
      { src: "assets/certificates/ebpl-completion.pdf", title: "EBPL — Completion", type: "pdf" }
    ]
  }
];

(function () {
  "use strict";
  var root = document.getElementById("certificates-root");
  if (!root) return;

  var docIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/></svg>';

  var html = "";
  CERTIFICATE_GROUPS.forEach(function (group) {
    html += '<div class="cert-group" data-reveal>';
    html += '<h3 class="cert-group-title">' + group.title + "</h3>";
    html += '<div class="cert-grid">';
    group.items.forEach(function (item) {
      if (item.type === "image") {
        html +=
          '<a class="cert-card cert-card-image" href="' + item.src + '" target="_blank" rel="noopener">' +
          '<img src="' + item.src + '" alt="' + item.title + '" loading="lazy" />' +
          '<div class="cert-card-body"><span>' + item.title + "</span></div></a>";
      } else {
        html +=
          '<a class="cert-card cert-card-doc" href="' + item.src + '" target="_blank" rel="noopener">' +
          '<div class="cert-card-icon">' + docIcon + "</div>" +
          '<div class="cert-card-body"><span>' + item.title + '</span><em>View PDF</em></div></a>';
      }
    });
    html += "</div></div>";
  });
  root.innerHTML = html;

  // Re-run reveal observer for dynamically injected nodes.
  var revealEls = root.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }
})();
