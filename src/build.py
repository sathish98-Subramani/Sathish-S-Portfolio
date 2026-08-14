#!/usr/bin/env python3
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from generator import wrap, write, nav, footer, scripts, head
import page_home, page_about, page_skills, page_projects, page_internship, page_certificates, page_contact

SITE = "Sathish S | Portfolio"

pages = [
    ("home.html", f"Home · {SITE}", "Sathish S — Computer Science undergraduate building full-stack and AI-driven projects.", page_home.HOME, ""),
    ("about.html", f"About · {SITE}", "About Sathish S — background, focus areas, and what drives the work.", page_about.ABOUT, ""),
    ("skills.html", f"Skills · {SITE}", "Core, professional, hardware and soft skills of Sathish S.", page_skills.render(), ""),
    ("projects.html", f"Projects · {SITE}", "Full-stack, AI and tooling projects built by Sathish S.", page_projects.PROJECTS, ""),
    ("internship.html", f"Internships · {SITE}", "Internship experience of Sathish S in UI/UX design and Java programming.", page_internship.INTERNSHIP, ""),
    ("certificates.html", f"Certificates · {SITE}", "Professional certifications earned by Sathish S.", page_certificates.CERTIFICATES,
        '<script src="assets/js/certificates.js"></script>'),
    ("contact.html", f"Contact · {SITE}", "Get in touch with Sathish S via email, WhatsApp, LinkedIn or GitHub.", page_contact.CONTACT, ""),
]

for filename, title, desc, body, extra_js in pages:
    extra_css = ""
    if filename == "home.html":
        extra_js = '<script src="assets/js/typewriter.js"></script>' + extra_js
    write(filename, wrap(title, desc, body, extra_css=extra_css, extra_scripts=extra_js))

print("Build complete.")
