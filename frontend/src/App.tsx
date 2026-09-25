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
  return <span data-lg-key="29f4847293" aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return <>
    <a data-lg-key="07f1810fc8" className="skip-link" href="#main-content">Skip to main content</a>
    <header data-lg-key="2d2abb6393" className="site-header" id="top">
      <div data-lg-key="fc5dcc6244" className="header-inner wrap">
        <a data-lg-key="a00ac64ff0" className="brand" href="#top" aria-label="Avinash Shukla, back to top" onClick={closeMenu}>
          <span data-lg-key="fd468bf3d2" className="brand-mark">a<span data-lg-key="631a5aea99">.</span></span><span data-lg-key="36c581ca8d" className="brand-name">AVINASH<br data-lg-key="ca41ac4d4e" />SHUKLA</span>
        </a>
        <span data-lg-key="dfacd5963a" className="header-note">INDEPENDENT DEVELOPER<br data-lg-key="0096fec51a" />& CREATIVE THINKER</span>
        <button data-lg-key="39a3a40665" className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="home-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
        <nav data-lg-key="e109f61945" id="home-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a data-lg-key="0b6a5e9b83" href="/projects" onClick={closeMenu}>Projects</a>
          <a data-lg-key="f7c6b638dc" href="/writing" onClick={closeMenu}>Writing</a>
          <a data-lg-key="55caac1c54" href="/activity" onClick={closeMenu}>Activity</a>
          <a data-lg-key="778359e380" className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <Arrow diagonal /></a>
        </nav>
      </div>
    </header>

    <main data-lg-key="e2f0e0a986" id="main-content" tabIndex={-1}>
      <section data-lg-key="d7d4a36709" className="hero wrap" aria-labelledby="hero-title">
        <div data-lg-key="282192f80c" className="hero-topline"><span data-lg-key="c4478aabfc" className="eyebrow"><span data-lg-key="872dafb883" className="orange-dot" /> OPEN TO WHAT'S NEXT</span><span data-lg-key="7e8d507346" className="eyebrow hero-index">PORTFOLIO / AVINASH SHUKLA</span></div>
        <h1 data-lg-key="dc01514ca6" id="hero-title">Building things<br data-lg-key="49dc9e8d84" />that <em data-lg-key="4cfff07a64">feel</em> as good<br data-lg-key="6d066dd5b4" />as they <span data-lg-key="686a445953" className="underlined">work.</span></h1>
        <div data-lg-key="a7a678e1ca" className="hero-bottom">
          <div data-lg-key="be6a9155c1" className="hero-side"><span data-lg-key="0a93429c66" className="asterisk">✳</span><span data-lg-key="84dfaf8866">DESIGN-MINDED<br data-lg-key="8df3d18a9b" />DEVELOPMENT</span></div>
          <div data-lg-key="22f835f85c" className="hero-intro"><p data-lg-key="ffbd33cd33">I'm <strong data-lg-key="f71aa3bf7b">Avinash Shukla</strong> — a full-stack developer turning thoughtful ideas into useful, expressive digital experiences.</p><a data-lg-key="3e27a7ac01" className="text-link" href="#work">Explore my work <Arrow diagonal /></a> <a data-lg-key="9519b7e3d4" className="text-link resume-link" href="/Avinash-Shukla-Resume.pdf" download="Avinash-Shukla-Resume.pdf" type="application/pdf">Download résumé (PDF) ↓</a></div>
        </div>
        <div data-lg-key="1cd9b3c21b" className="hero-foot"><span data-lg-key="285221e0ab">SCROLL TO EXPLORE</span><span data-lg-key="8432dd27c2" className="hero-foot-line" /><span data-lg-key="51a777ac93">01 / 04</span></div>
      </section>

      <section data-lg-key="60002ce091" className="statement" aria-label="My approach">
        <div data-lg-key="d21953107b" className="wrap statement-inner"><span data-lg-key="2f29360e59" className="statement-label">THE SHORT VERSION /</span><p data-lg-key="7fc8bfb70e">Good design gets attention.<br data-lg-key="18900e5dd5" /><span data-lg-key="34b0602f26">Good engineering earns trust.</span><br data-lg-key="e4dd94c00b" />I care about both.</p><span data-lg-key="cad2e225a5" className="statement-star" aria-hidden="true">✳</span></div>
      </section>

      <section data-lg-key="f99e83d331" className="work-section section-pad wrap" id="work" aria-labelledby="work-heading">
        <div data-lg-key="70211ab586" className="section-heading"><div data-lg-key="8781c9b57e"><span data-lg-key="d57f13d614" className="eyebrow section-kicker">01 / SELECTED WORK</span><h2 data-lg-key="6cd3f7593a" id="work-heading">Things I've<br data-lg-key="c8d0f59f40" /><i data-lg-key="c37ad4050e">made happen.</i></h2></div><p data-lg-key="4676ab6514">From real-time applications to expressive interfaces — a few projects that show how I think and build.</p></div>
        <div data-lg-key="645b588ea3" className="project-list">
          {projects.map((project) => <article data-lg-key="deaa25efe6" className="project" key={project.no}>
            <a data-lg-key="0890a93b42" className={`project-visual ${project.visual}`} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.label}: ${project.title}`}>
              {project.visual === 'chat' && <div data-lg-key="1f1272e93e" className="visual-chat"><div data-lg-key="44d7f5ec2d" className="chat-top"><span data-lg-key="ad90a17fb0" className="chat-circle" /> <span data-lg-key="a11136dcfe">conversation_01</span><span data-lg-key="a15dc41fc8">•••</span></div><div data-lg-key="e1932ae0a4" className="chat-content"><span data-lg-key="d6e3f29783" className="bubble one">Hey! Is the build ready?</span><span data-lg-key="956d2591ed" className="bubble two">Looking good. Shipping it now ↗</span><span data-lg-key="ed6b66bf79" className="bubble three">Perfect. Let's go!</span></div><div data-lg-key="8ab59317fb" className="chat-input">Message <span data-lg-key="8c6a53f74e">↗</span></div></div>}
              {project.visual === 'obys' && <div data-lg-key="f6666286f1" className="visual-obys"><span data-lg-key="4db048f722" className="obys-tiny">A STUDY IN MOVEMENT — 2025</span><strong data-lg-key="ddd09e0295">OBYS<span data-lg-key="2f994e4b3b">®</span></strong><span data-lg-key="7d872c7a62" className="obys-bottom">INDEPENDENT CREATIVE<br data-lg-key="cddf90c0c0" />EXPERIMENT</span><span data-lg-key="a8687cb345" className="obys-orbit">↗</span></div>}
              {project.visual === 'experiments' && <div data-lg-key="efc930ad05" className="visual-experiments"><span data-lg-key="4656870c97" className="experiments-label">DIGITAL PLAYGROUND /</span><div data-lg-key="d37132a5c9" className="experiment-shapes"><span data-lg-key="3685d42c2c" /><span data-lg-key="ee8e2d1a0b" /><span data-lg-key="561fde2508" /></div><strong data-lg-key="056d7aeac7">MAKE.<br data-lg-key="29b8e8fdcf" />TEST.<br data-lg-key="a0960e1f14" />REPEAT.</strong><span data-lg-key="6ae3e7d27e" className="experiments-asterisk">✳</span></div>}
              <span data-lg-key="3ebb281113" className="visual-open" aria-hidden="true">↗</span>
            </a>
            <div data-lg-key="9d7feda29b" className="project-info"><div data-lg-key="232e6617cf" className="project-meta"><span data-lg-key="101030bd94">{project.no} / {project.category}</span><span data-lg-key="59fec66c6c">{project.stack}</span></div><div data-lg-key="5a9f9c743a" className="project-title-row"><h3 data-lg-key="2ca23bd987">{project.title}</h3><a data-lg-key="afe0ab8560" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.label}: ${project.title}`}><Arrow diagonal /></a></div><p data-lg-key="e0e9c912bb">{project.description}</p></div>
          </article>)}
        </div>
        <a data-lg-key="db59b3b345" className="more-work" href="/projects">Explore all projects & case studies <Arrow diagonal /></a>
      </section>

      <section data-lg-key="d80860d960" className="about-section" id="about" aria-labelledby="about-heading"><div data-lg-key="97c7af912b" className="wrap about-grid"><div data-lg-key="d1fc9965cc" className="about-heading"><span data-lg-key="6f30acd33e" className="eyebrow section-kicker">02 / THE PERSON BEHIND THE CODE</span><h2 data-lg-key="6d9175f056" id="about-heading">Curious by<br data-lg-key="0c9c5d6c43" /><i data-lg-key="eb7b5a0949">default.</i></h2><span data-lg-key="62db58c950" className="about-mark" aria-hidden="true">a<span data-lg-key="2ea7865060">.</span></span></div><div data-lg-key="910395dff1" className="about-copy"><p data-lg-key="622b6ca2e9" className="about-lead">I like the intersection of <em data-lg-key="c2f4465bca">how it looks</em> and <em data-lg-key="a365272365">how it works.</em></p><p data-lg-key="f0e1c824f7">I'm a full-stack developer working across frontend experiences and the systems behind them. I build with React, Node.js and modern web tools, always looking for the small details that make a product feel considered.</p><p data-lg-key="d78dc7406a">My background spans hands-on product development, interface experimentation and a genuine curiosity for what comes next. I bring that mix of care and problem-solving to every project.</p><div data-lg-key="7762e2d25a" className="skill-block"><span data-lg-key="43a7c483a4" className="eyebrow">TOOLS I REACH FOR</span><div data-lg-key="c24e5b1cf4" className="skill-list"><span data-lg-key="b2d64a5c84">React & Next.js</span><span data-lg-key="6689deeeaf">JavaScript</span><span data-lg-key="3b58ac7c76">Node.js & Express</span><span data-lg-key="675dbe4c2d">MongoDB</span><span data-lg-key="8fcdea555c">REST APIs</span><span data-lg-key="1042b495b4">HTML & CSS</span><span data-lg-key="0f4ed2b03f">Git & GitHub</span><span data-lg-key="001e18be67">Python</span></div></div></div></div></section>

      <section data-lg-key="cac0b60dee" className="experience-section section-pad wrap" id="experience" aria-labelledby="experience-heading"><div data-lg-key="4cd602a7cb" className="section-heading experience-title"><div data-lg-key="8bd9301afb"><span data-lg-key="089c9a0d75" className="eyebrow section-kicker">03 / EXPERIENCE & BACKGROUND</span><h2 data-lg-key="b64ff5c41d" id="experience-heading">Built through<br data-lg-key="f36ab14948" /><i data-lg-key="33b53abb2f">doing.</i></h2></div><p data-lg-key="9257c2fde5">Practical experience, a love of learning, and an approach shaped by building real things.</p></div><div data-lg-key="63e2bd4407" className="timeline"><div data-lg-key="a3871934df" className="timeline-row"><span data-lg-key="a1a71323da" className="timeline-date">FEB — AUG 2025</span><div data-lg-key="88918b4a64"><span data-lg-key="96dae4c465" className="eyebrow">EXPERIENCE</span><h3 data-lg-key="d23243bf15">Full-stack Developer Intern</h3><p data-lg-key="a215fea0b6" className="timeline-place">Tourmates</p><p data-lg-key="7512fdb242">Worked on the Property Partner module, creating multi-step room forms, connecting listing and booking APIs, and implementing role-based access for property teams.</p></div><span data-lg-key="5de2643371" className="timeline-arrow">↗</span></div><div data-lg-key="3424d62ec3" className="timeline-row"><span data-lg-key="2e8d8a74b7" className="timeline-date">EDUCATION</span><div data-lg-key="50fb7b3fae"><span data-lg-key="d91987a9b9" className="eyebrow">ACADEMIC BACKGROUND</span><h3 data-lg-key="e8ba03d9d5">Mathematics & computer applications</h3><p data-lg-key="8628a6b290" className="timeline-place">B.Sc. Mathematics · DCA</p><p data-lg-key="71eca38b2c">Studied mathematics at Swami Vivekananda College, Raisen, and computer applications through Makhanlal Chaturvedi University. MCA studies at LNCT.</p></div><span data-lg-key="cab818362c" className="timeline-arrow">↗</span></div><div data-lg-key="f5107ef800" className="timeline-row"><span data-lg-key="7e0776a909" className="timeline-date">RECOGNITION</span><div data-lg-key="067e18c85f"><span data-lg-key="0911123c25" className="eyebrow">A MOMENT WORTH SHARING</span><h3 data-lg-key="4ea9cf4c5c">Top 20 selected design</h3><p data-lg-key="56a2fb3e55" className="timeline-place">Sheryians Coding School</p><p data-lg-key="644a786e0b">Design selected in the top 20 at the Senior vs Junior web development competition.</p></div><span data-lg-key="35dbc95de1" className="timeline-arrow">↗</span></div></div></section>

      <section data-lg-key="6bc78e46dc" className="contact-section" id="contact" aria-labelledby="contact-heading"><div data-lg-key="44606cc616" className="wrap contact-inner"><div data-lg-key="a76063ae86" className="contact-top"><span data-lg-key="4806b8ad9b" className="eyebrow">04 / HAVE SOMETHING IN MIND?</span><span data-lg-key="c346ff49e8" className="contact-spark" aria-hidden="true">✳</span></div><h2 data-lg-key="ed96ac24fa" id="contact-heading">Let's make<br data-lg-key="e401f58b63" /><em data-lg-key="fdc90beb91">something</em> <span data-lg-key="4377ac1f0d">good.</span></h2><div data-lg-key="5a5da81809" className="contact-bottom"><p data-lg-key="21ae9a5b5c">Have a project, an opportunity, or just an interesting idea? My inbox is open.</p><a data-lg-key="38f0c6eba7" className="contact-email" href={socials.email}>Say hello <Arrow diagonal /></a></div><div data-lg-key="a7249f2b7a" className="contact-direct">OR WRITE DIRECTLY TO <a data-lg-key="b4500faae9" href={socials.email}>Avinashshukla8498@gmail.com</a></div></div></section>
    </main>

    <footer data-lg-key="2de7a52e68" className="footer"><div data-lg-key="5add84b9ed" className="wrap footer-inner"><a data-lg-key="b3502a412d" className="footer-brand" href="#top">a<span data-lg-key="c13fd1514c">.</span></a><span data-lg-key="8d039a1ec1">© {new Date().getFullYear()} AVINASH SHUKLA<br data-lg-key="b968e69f8e" />MADE WITH INTENTION.</span><div data-lg-key="59fab2494f" className="footer-links"><a data-lg-key="7f8cb6037b" href="/projects">Projects ↗</a><a data-lg-key="04153c8d34" href="/writing">Writing ↗</a><a data-lg-key="57f2dd88c5" href="/activity">Activity ↗</a><a data-lg-key="34b7f505c8" href="/Avinash-Shukla-Resume.pdf" download="Avinash-Shukla-Resume.pdf" type="application/pdf">Résumé ↓</a><a data-lg-key="9da498abcb" href={socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a data-lg-key="c948c9b4d1" href={socials.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a data-lg-key="f7d60d4394" href={socials.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a></div><a data-lg-key="d1db4220a8" className="back-top" href="#top">Back to top ↑</a></div></footer>
  </>
}

export default App
