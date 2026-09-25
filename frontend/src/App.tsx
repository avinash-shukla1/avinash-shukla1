import { useState } from 'react'

const socials = {
  github: 'https://github.com/avinash-shukla1',
  linkedin: 'https://www.linkedin.com/in/avinash-shukla-66b11823a/',
  instagram: 'https://www.instagram.com/shadow_code_x/',
  email: 'mailto:Avinashshukla8498@gmail.com',
}

const projects = [
  {
    no: '01', category: 'FULL-STACK / REAL-TIME', title: 'WhatsApp Clone',
    description: 'A real-time messaging experience built with Node.js, Express and Socket.io.',
    stack: 'Node.js  ·  Express  ·  Socket.io',
    href: 'https://whatsapp-clone-delta.vercel.app/', label: 'View live project',
    visual: 'chat',
  },
  {
    no: '02', category: 'FRONTEND / MOTION', title: 'Obys Agency Clone',
    description: 'An expressive agency-site recreation focused on detail, movement and immersive browsing.',
    stack: 'HTML  ·  CSS  ·  JavaScript',
    href: 'https://avinash-shukla1.github.io/obys.agency-clone/', label: 'View live project',
    visual: 'obys',
  },
  {
    no: '03', category: 'INTERFACE / INTERACTION', title: 'Selected experiments',
    description: 'A collection of smaller frontend explorations, including a music player and interface studies.',
    stack: 'React  ·  JavaScript  ·  CSS',
    href: 'https://github.com/avinash-shukla1?tab=repositories', label: 'Explore on GitHub',
    visual: 'experiments',
  },
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <>
    <header className="site-header" id="top">
      <div className="header-inner wrap">
        <a className="brand" href="#top" aria-label="Avinash Shukla, back to top" onClick={closeMenu}>
          <span className="brand-mark">a<span>.</span></span><span className="brand-name">AVINASH<br />SHUKLA</span>
        </a>
        <span className="header-note">INDEPENDENT DEVELOPER<br />& CREATIVE THINKER</span>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </div>
    </header>

    <main>
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-topline"><span className="eyebrow"><span className="orange-dot" /> OPEN TO WHAT'S NEXT</span><span className="eyebrow hero-index">PORTFOLIO / AVINASH SHUKLA</span></div>
        <h1 id="hero-title">Building things<br />that <em>feel</em> as good<br />as they <span className="underlined">work.</span></h1>
        <div className="hero-bottom">
          <div className="hero-side"><span className="asterisk">✳</span><span>DESIGN-MINDED<br />DEVELOPMENT</span></div>
          <div className="hero-intro"><p>I'm <strong>Avinash Shukla</strong> — a full-stack developer turning thoughtful ideas into useful, expressive digital experiences.</p><a className="text-link" href="#work">Explore my work <Arrow diagonal /></a></div>
        </div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="hero-foot-line" /><span>01 / 04</span></div>
      </section>

      <section className="statement" aria-label="My approach">
        <div className="wrap statement-inner"><span className="statement-label">THE SHORT VERSION /</span><p>Good design gets attention.<br /><span>Good engineering earns trust.</span><br />I care about both.</p><span className="statement-star" aria-hidden="true">✳</span></div>
      </section>

      <section className="work-section section-pad wrap" id="work" aria-labelledby="work-heading">
        <div className="section-heading"><div><span className="eyebrow section-kicker">01 / SELECTED WORK</span><h2 id="work-heading">Things I've<br /><i>made happen.</i></h2></div><p>From real-time applications to expressive interfaces — a few projects that show how I think and build.</p></div>
        <div className="project-list">
          {projects.map((project) => <article className="project" key={project.no}>
            <a className={`project-visual ${project.visual}`} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.label}: ${project.title}`}>
              {project.visual === 'chat' && <div className="visual-chat"><div className="chat-top"><span className="chat-circle" /> <span>conversation_01</span><span>•••</span></div><div className="chat-content"><span className="bubble one">Hey! Is the build ready?</span><span className="bubble two">Looking good. Shipping it now ↗</span><span className="bubble three">Perfect. Let's go!</span></div><div className="chat-input">Message <span>↗</span></div></div>}
              {project.visual === 'obys' && <div className="visual-obys"><span className="obys-tiny">A STUDY IN MOVEMENT — 2025</span><strong>OBYS<span>®</span></strong><span className="obys-bottom">INDEPENDENT CREATIVE<br />EXPERIMENT</span><span className="obys-orbit">↗</span></div>}
              {project.visual === 'experiments' && <div className="visual-experiments"><span className="experiments-label">DIGITAL PLAYGROUND /</span><div className="experiment-shapes"><span /><span /><span /></div><strong>MAKE.<br />TEST.<br />REPEAT.</strong><span className="experiments-asterisk">✳</span></div>}
              <span className="visual-open" aria-hidden="true">↗</span>
            </a>
            <div className="project-info"><div className="project-meta"><span>{project.no} / {project.category}</span><span>{project.stack}</span></div><div className="project-title-row"><h3>{project.title}</h3><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.label}: ${project.title}`}><Arrow diagonal /></a></div><p>{project.description}</p></div>
          </article>)}
        </div>
        <a className="more-work" href={socials.github} target="_blank" rel="noopener noreferrer">See more on GitHub <Arrow diagonal /></a>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-heading"><div className="wrap about-grid"><div className="about-heading"><span className="eyebrow section-kicker">02 / THE PERSON BEHIND THE CODE</span><h2 id="about-heading">Curious by<br /><i>default.</i></h2><span className="about-mark" aria-hidden="true">a<span>.</span></span></div><div className="about-copy"><p className="about-lead">I like the intersection of <em>how it looks</em> and <em>how it works.</em></p><p>I'm a full-stack developer working across frontend experiences and the systems behind them. I build with React, Node.js and modern web tools, always looking for the small details that make a product feel considered.</p><p>My background spans hands-on product development, interface experimentation and a genuine curiosity for what comes next. I bring that mix of care and problem-solving to every project.</p><div className="skill-block"><span className="eyebrow">TOOLS I REACH FOR</span><div className="skill-list"><span>React & Next.js</span><span>JavaScript</span><span>Node.js & Express</span><span>MongoDB</span><span>REST APIs</span><span>HTML & CSS</span><span>Git & GitHub</span><span>Python</span></div></div></div></div></section>

      <section className="experience-section section-pad wrap" id="experience" aria-labelledby="experience-heading"><div className="section-heading experience-title"><div><span className="eyebrow section-kicker">03 / EXPERIENCE & BACKGROUND</span><h2 id="experience-heading">Built through<br /><i>doing.</i></h2></div><p>Practical experience, a love of learning, and an approach shaped by building real things.</p></div><div className="timeline"><div className="timeline-row"><span className="timeline-date">FEB — AUG 2025</span><div><span className="eyebrow">EXPERIENCE</span><h3>Full-stack Developer Intern</h3><p className="timeline-place">Tourmates</p><p>Worked on the Property Partner module, creating multi-step room forms, connecting listing and booking APIs, and implementing role-based access for property teams.</p></div><span className="timeline-arrow">↗</span></div><div className="timeline-row"><span className="timeline-date">EDUCATION</span><div><span className="eyebrow">ACADEMIC BACKGROUND</span><h3>Mathematics & computer applications</h3><p className="timeline-place">B.Sc. Mathematics · DCA</p><p>Studied mathematics at Swami Vivekananda College, Raisen, and computer applications through Makhanlal Chaturvedi University. MCA studies at LNCT.</p></div><span className="timeline-arrow">↗</span></div><div className="timeline-row"><span className="timeline-date">RECOGNITION</span><div><span className="eyebrow">A MOMENT WORTH SHARING</span><h3>Top 20 selected design</h3><p className="timeline-place">Sheryians Coding School</p><p>Design selected in the top 20 at the Senior vs Junior web development competition.</p></div><span className="timeline-arrow">↗</span></div></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="wrap contact-inner"><div className="contact-top"><span className="eyebrow">04 / HAVE SOMETHING IN MIND?</span><span className="contact-spark" aria-hidden="true">✳</span></div><h2 id="contact-heading">Let's make<br /><em>something</em> <span>good.</span></h2><div className="contact-bottom"><p>Have a project, an opportunity, or just an interesting idea? My inbox is open.</p><a className="contact-email" href={socials.email}>Say hello <Arrow diagonal /></a></div><div className="contact-direct">OR WRITE DIRECTLY TO <a href={socials.email}>Avinashshukla8498@gmail.com</a></div></div></section>
    </main>

    <footer className="footer"><div className="wrap footer-inner"><a className="footer-brand" href="#top">a<span>.</span></a><span>© {new Date().getFullYear()} AVINASH SHUKLA<br />MADE WITH INTENTION.</span><div className="footer-links"><a href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={socials.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={socials.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><a className="back-top" href="#top">Back to top ↑</a></div></footer>
  </>
}

export default App
