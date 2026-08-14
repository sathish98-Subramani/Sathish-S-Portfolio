# Sathish S — Portfolio

A rebuilt, premium version of the portfolio site: consistent multi-page structure,
GPU-accelerated animations, and a small static-site generator so every page shares
one layout instead of copy-pasted HTML.

## What was fixed

- **Broken navigation links** — the original mixed filename casing (`Skills.html` vs
  `skills.html`, `about-me.html` vs `about.html`, `certificate.html` vs
  `certificates.html`). Linux-hosted sites (GitHub Pages, etc.) are case-sensitive,
  so several nav/project links 404'd. Every page and link is now one consistent,
  lowercase filename: `home.html`, `about.html`, `skills.html`, `projects.html`,
  `internship.html`, `certificates.html`, `contact.html`.
- **PDF certificates rendered as broken images** — the old code put `.pdf` files
  directly into an `<img src="...">`, which browsers can't render, showing a broken
  image icon for every PDF certificate. PDFs now render as a styled document card
  that opens the file in a new tab; image certificates (`.jpeg`) still show a real
  thumbnail.
- **Typo'd contact email** (`karthi99412@gamil.com` → `karthi99412@gmail.com`) —
  fixed everywhere it appeared (footer, contact page).
- **Absolute repo-specific paths** (`/Sathish-S-Portfolio/about.html`) replaced with
  relative links, so the site works from any subpath, custom domain, or local file
  preview.
- Removed duplicated inline `<script>`/`<style>` blocks that were repeated on every
  page — shared CSS/JS files now live once under `assets/`.

## Project structure

```
├── index.html              splash / intro (animated WebGL wave background)
├── home.html, about.html, skills.html, projects.html,
│   internship.html, certificates.html, contact.html   (generated pages)
├── assets/
│   ├── css/                tokens · base · components · animations · layout · certificates
│   ├── js/                 main.js (nav, reveal, cursor glow, tilt, transitions)
│   │                       wave-bg.js · typewriter.js · certificates.js
│   ├── images/              logo, profile photo
│   ├── certificates/        renamed cert files (pdf + jpeg)
│   ├── docs/resume.pdf
│   └── manifest.json
└── src/                     the generator — edit content here, not the .html files
    ├── generator.py         shared <head>, nav, footer, page wrapper
    ├── page_*.py            per-page content
    └── build.py             run this to regenerate all pages
```

## Editing content

Don't hand-edit `home.html`, `about.html`, etc. — they're generated. Instead:

1. Edit the relevant `src/page_*.py` file (or `src/generator.py` for nav/footer/head).
2. Run:
   ```
   cd src
   python3 build.py
   ```
3. The updated pages are written back to the project root.

## Animations

- Scroll-triggered reveals (`data-reveal`) using `IntersectionObserver`, animating
  only `opacity`/`transform` so they stay GPU-accelerated and smooth.
- Soft cursor-glow that follows the pointer on desktop.
- Subtle 3D tilt on project/contact cards.
- Animated gradient ring + floating blobs on the hero portrait.
- Auto-filling skill bars once scrolled into view.
- A cross-page fade transition so navigating feels continuous rather than a hard
  page reload.
- Everything respects `prefers-reduced-motion` and is disabled for users who've
  turned that on.

## Deploying

The site is fully static — upload the project root (minus `src/`, which is only
needed if you want to edit content) to GitHub Pages, Netlify, Vercel, or any static
host. `index.html` is the entry point.
