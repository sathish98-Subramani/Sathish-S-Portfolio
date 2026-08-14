#!/usr/bin/env python3
"""
Lightweight static-site builder for Sathish S's portfolio.
Run: python3 build.py
Reads page fragments from pages/*.html (body content only) and wraps them
with the shared head/nav/footer, so every page shares one consistent layout,
navigation and link structure. Outputs finished pages to the project root.
"""
import os

SRC_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(SRC_DIR)
OUT_DIR = ROOT

NAV_ITEMS = [
    ("home.html", "Home"),
    ("about.html", "About"),
    ("skills.html", "Skills"),
    ("projects.html", "Projects"),
    ("internship.html", "Internship"),
    ("certificates.html", "Certificates"),
    ("contact.html", "Contact"),
]

SOCIAL_ICONS = {
    "github": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    "linkedin": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>',
    "whatsapp": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.83-1.27A9.5 9.5 0 1 0 12 2.5Zm0 17.2a7.6 7.6 0 0 1-3.9-1.07l-.28-.17-2.85.75.76-2.78-.18-.28A7.68 7.68 0 1 1 12 19.7Z"/></svg>',
    "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
}

MENU_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'


def head(title, description, extra_css="", extra_head=""):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content="{description}" />
<meta name="theme-color" content="#05070d" />
<link rel="icon" href="assets/images/logo.png" />
<link rel="manifest" href="assets/manifest.json" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet" href="assets/css/tokens.css" />
<link rel="stylesheet" href="assets/css/base.css" />
<link rel="stylesheet" href="assets/css/components.css" />
<link rel="stylesheet" href="assets/css/animations.css" />
<link rel="stylesheet" href="assets/css/layout.css" />
<link rel="stylesheet" href="assets/css/certificates.css" />
{extra_css}
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{description}" />
<meta property="og:type" content="website" />
{extra_head}
</head>
"""


def nav():
    links = "\n".join(
        f'<a href="{href}">{label}</a>' for href, label in NAV_ITEMS
    )
    return f"""<a class="skip-link" href="#main">Skip to content</a>
<div class="ambient-bg"></div>
<div class="noise"></div>
<nav class="nav">
  <div class="nav-inner">
    <a class="brand" href="home.html"><img src="assets/images/logo.png" alt="Sathish S logo" />Sathish<span class="dot">.</span>S</a>
    <div class="nav-links">
      {links}
    </div>
    <a class="nav-cta" href="assets/docs/resume.pdf" target="_blank" rel="noopener">Resume</a>
    <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">{MENU_ICON}</button>
  </div>
</nav>
"""


def footer():
    return f"""<footer class="site-footer">
  <div class="container footer-inner">
    <span>&copy; <span data-year></span> Sathish S. Crafted with intent.</span>
    <div class="footer-social">
      <a href="https://github.com/sathish98-Subramani" target="_blank" rel="noopener" aria-label="GitHub">{SOCIAL_ICONS['github']}</a>
      <a href="https://www.linkedin.com/in/sathish-s-458304309" target="_blank" rel="noopener" aria-label="LinkedIn">{SOCIAL_ICONS['linkedin']}</a>
      <a href="https://wa.me/919941293589" target="_blank" rel="noopener" aria-label="WhatsApp">{SOCIAL_ICONS['whatsapp']}</a>
      <a href="mailto:karthi99412@gmail.com" aria-label="Email">{SOCIAL_ICONS['mail']}</a>
    </div>
  </div>
</footer>
"""


def scripts(extra=""):
    return f"""<script src="assets/js/main.js"></script>
{extra}
</body>
</html>
"""


def wrap(title, description, body, extra_css="", extra_head="", extra_scripts=""):
    return (
        head(title, description, extra_css, extra_head)
        + "<body>\n"
        + nav()
        + f'<main id="main">\n{body}\n</main>\n'
        + footer()
        + scripts(extra_scripts)
    )


def write(name, content):
    path = os.path.join(OUT_DIR, name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote", name)
