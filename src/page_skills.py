CORE_SKILLS = [
    ("HTML", 90), ("CSS", 85), ("JavaScript", 80), ("Python", 85),
    ("C / C++", 70), ("MySQL", 80), ("PostgreSQL", 75), ("Java", 70),
]

TOOL_ICONS = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
]


def _skill_rows():
    rows = ""
    for i, (name, val) in enumerate(CORE_SKILLS):
        rows += f"""
        <div class="skill-row" data-reveal data-reveal-delay="{i * 40}">
          <div class="skill-row-top"><strong>{name}</strong><span>{val}%</span></div>
          <div class="skill-track"><div class="skill-fill" data-value="{val}"></div></div>
        </div>"""
    return rows


def _marquee():
    imgs = "".join(f'<img src="{u}" alt="" loading="lazy" />' for u in TOOL_ICONS)
    return f'<div class="marquee-track">{imgs}{imgs}</div>'


def render():
    return f"""
<section class="page-hero">
  <div class="container">
    <p class="eyebrow" data-reveal>Skills</p>
    <h1 data-reveal>What I work <span class="gradient-text">with.</span></h1>
  </div>
</section>

<section class="section-tight">
  <div class="container skills-grid">
    <div class="card">
      <h3 style="margin-bottom:20px;">Core Skills</h3>
      {_skill_rows()}
    </div>

    <div class="skills-side">
      <div class="card" data-reveal>
        <h3>Professional &amp; Technical</h3>
        <div class="tag-row">
          <span class="pill">App &amp; Web Development</span>
          <span class="pill">Cybersecurity &amp; Mobile Security</span>
          <span class="pill">Artificial Intelligence</span>
          <span class="pill">Project Management</span>
        </div>
      </div>
      <div class="card" data-reveal data-reveal-delay="80">
        <h3>Hardware Skills</h3>
        <div class="tag-row">
          <span class="pill">Robotics &amp; Automation</span>
          <span class="pill">Embedded Systems</span>
          <span class="pill">Circuit Design &amp; PCB</span>
          <span class="pill">IoT Integration</span>
        </div>
      </div>
      <div class="card" data-reveal data-reveal-delay="160">
        <h3>Soft Skills</h3>
        <div class="tag-row">
          <span class="pill">Communication</span>
          <span class="pill">Teamwork</span>
          <span class="pill">Problem Solving</span>
          <span class="pill">Adaptability</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-tight">
  <div class="container">
    <span class="eyebrow" style="justify-content:center;display:flex;" data-reveal>Development Toolkit</span>
    <div class="marquee" data-reveal>{_marquee()}</div>
  </div>
</section>
"""
