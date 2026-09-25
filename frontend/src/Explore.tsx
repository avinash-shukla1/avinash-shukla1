import { useEffect, useState } from 'react'
import { updatePageMetadata } from './metadata'
import RepositorySpotlight from './RepositorySpotlight'
import './explore.css'
import './case-study.css'

type Project = { slug: string; title: string; kind: 'Full-stack' | 'Frontend' | 'Experience'; summary: string; stack: string; link?: string; linkLabel?: string; role: string; context: string; contributions: string[]; source: string; note?: string }

const projects: Project[] = [
  { slug: 'whatsapp-clone', title: 'WhatsApp Clone', kind: 'Full-stack', summary: 'A real-time messaging project built with Node.js, Express and Socket.io.', stack: 'Node.js · Express · Socket.io', link: 'https://whatsapp-clone-delta.vercel.app/', linkLabel: 'Open supplied live demo', role: 'Full-stack development', context: 'A messaging project focused on real-time conversations. The résumé identifies it as a backend project and describes its live messaging implementation.', contributions: ['Built the server-side application with Node.js and Express.', 'Used Socket.io for real-time messaging between connected users.'], source: 'Project description in the supplied résumé and GitHub profile README; demo URL supplied there.', note: 'Authentication, storage, read receipts and other messaging features are not documented in the supplied materials.' },
  { slug: 'obys-agency-clone', title: 'Obys Agency Clone', kind: 'Frontend', summary: 'An agency website recreation focused on visual movement and expressive browsing.', stack: 'Frontend recreation', link: 'https://avinash-shukla1.github.io/obys.agency-clone/', linkLabel: 'Open supplied live demo', role: 'Frontend development', context: 'A personal recreation of the Obys Agency website, listed among frontend projects in the résumé.', contributions: ['Recreated an agency-style website as a frontend project.', 'Published a demo at the GitHub Pages URL listed in the supplied profile.'], source: 'Project description and demo URL in the supplied résumé and GitHub profile README.', note: 'The source materials do not confirm the exact libraries or implementation details for this particular clone.' },
  { slug: 'tourmates-property-partner', title: 'Property Partner / Tourmates', kind: 'Experience', summary: 'Property and hotel management tools created during a full-stack internship.', stack: 'React · Node.js · Express · MongoDB', role: 'Full-stack Developer Intern · Feb–Aug 2025', context: 'During a full-stack internship at Tourmates, I worked on Property Partner, a property and hotel management module for property teams.', contributions: ['Developed multi-step room creation forms with image upload and validation.', 'Integrated REST APIs for property listings, bookings and the partner dashboard.', 'Implemented authentication and role-based access for admins, property owners and staff.', 'Contributed to cloud deployment and performance improvements.'], source: 'Tourmates internship section in the supplied résumé and GitHub profile README.', note: 'No public demo or measurable performance figures were supplied for this internship work.' },
  { slug: 'q-clay-clone', title: 'Q Clay Clone', kind: 'Frontend', summary: 'An animated website experiment using web animation tools.', stack: 'HTML · CSS · JavaScript · GSAP · Locomotive Scroll · ScrollTrigger', role: 'Frontend development', context: 'An animated website recreation listed as a frontend project in the supplied résumé.', contributions: ['Built an animated frontend with HTML, CSS and JavaScript.', 'Used GSAP, Locomotive Scroll and ScrollTrigger for motion and scrolling behavior.'], source: 'Frontend projects section of the supplied résumé and GitHub profile README.', note: 'The résumé mentions a live demo but does not provide a usable URL; no demo link is shown here.' },
  { slug: 'bookstore-app', title: 'Bookstore App', kind: 'Full-stack', summary: 'A book discovery project for exploring authors and titles.', stack: 'MERN stack (résumé category)', role: 'Personal project', context: 'The résumé lists a Bookstore App under MERN stack projects and describes it as a mobile app for readers to explore new authors and titles.', contributions: ['Explored a book discovery experience organized around authors and titles.'], source: 'Projects section of the supplied résumé and GitHub profile README.', note: 'The supplied description does not explain the architecture or provide a public demo; the stack label reflects the résumé category, not an independently audited implementation.' },
  { slug: 'ecommerce-cart', title: 'E-commerce Cart', kind: 'Frontend', summary: 'A functional shopping-cart interface from a collection of React projects.', stack: 'React (résumé category)', role: 'Frontend development', context: 'A shopping-cart project listed among React projects in the supplied résumé.', contributions: ['Built an e-commerce cart described as fully functional in the résumé.'], source: 'React projects section of the supplied résumé.', note: 'The résumé mentions a live demo but does not provide a usable URL or a feature breakdown.' },
]

const notes = [
  { slug: 'building-with-both-sides-in-mind', title: 'Building with both sides in mind', label: 'DEVELOPMENT NOTE', intro: 'A good interface depends on the system behind it — and a reliable system still needs to feel clear to the person using it.', paragraphs: ['Working across frontend and backend has changed how I approach a feature. A form is not just fields on a screen; it also needs validation, a useful response when something goes wrong, and a data model that can support the next step.', 'In property-management work, multi-step room creation and image uploads made that connection especially tangible. The interface had to make a complex task understandable, while the API and access rules had to keep the underlying workflow consistent.', 'I try to consider both sides early: what the user is trying to do, and what must be true in the system for that action to work reliably.'] },
  { slug: 'motion-with-a-purpose', title: 'Motion with a purpose', label: 'FRONTEND NOTE', intro: 'An animation earns its place when it makes an experience easier to understand or more memorable.', paragraphs: ['Recreating expressive websites is a useful way to learn the craft behind motion. Timing, typography and scroll behavior shape the feeling of a page as much as its colors or layout do.', 'Projects such as the Obys Agency Clone and Q Clay Clone are experiments in how these pieces fit together. They are not substitutes for clarity: movement works best when the content remains readable and the page remains usable.', 'The detail I come back to is pacing. Give a visitor enough visual energy to be interested, and enough restraint to know where to go next.'] },
]

const github = 'https://github.com/avinash-shukla1'
const resume = '/Avinash-Shukla-Resume.pdf'
const filters = ['All', 'Full-stack', 'Frontend', 'Experience'] as const
type Filter = typeof filters[number]

type GitHubEvent = { id: string; type: string; created_at: string; repo?: { name?: string }; payload?: { action?: string; commits?: { sha: string }[]; ref_type?: string } }
function eventLabel(event: GitHubEvent) {
  switch (event.type) {
    case 'PushEvent': return `Pushed ${event.payload?.commits?.length || 'new'} commit(s)`
    case 'CreateEvent': return `Created a ${event.payload?.ref_type || 'repository'}`
    case 'PullRequestEvent': return `${event.payload?.action || 'Updated'} a pull request`
    case 'IssuesEvent': return `${event.payload?.action || 'Updated'} an issue`
    case 'WatchEvent': return 'Starred a repository'
    case 'ForkEvent': return 'Forked a repository'
    default: return 'Contributed on GitHub'
  }
}

function Activity() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading')
  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/avinash-shukla1/events/public?per_page=12', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then(async response => { if (!response.ok) throw new Error('GitHub unavailable'); return response.json() as Promise<GitHubEvent[]> })
      .then(data => { const safe = Array.isArray(data) ? data.filter(e => e?.id && e?.repo?.name).slice(0, 8) : []; setEvents(safe); setStatus(safe.length ? 'ready' : 'empty') })
      .catch(() => { if (!controller.signal.aborted) setStatus('error') })
    return () => controller.abort()
  }, [])
  return <div data-lg-key="4cf505f3b3" className="explore-content">
    <div data-lg-key="8c491a8358" className="explore-head"><span data-lg-key="be043c7d9d" className="eyebrow">PUBLIC GITHUB ACTIVITY / LIVE DATA</span><h1 data-lg-key="13fbe07ab2">In the <em data-lg-key="8e9e7e30c0">making.</em></h1><p data-lg-key="24af189e72">Recent public activity from my GitHub profile. The feed is fetched live and may be limited by GitHub availability.</p></div>
    <RepositorySpotlight />
    <div data-lg-key="00b18bc9bc" className="activity-heading"><span data-lg-key="7b6fb10c24" className="eyebrow">RECENT ACTIVITY / PUBLIC EVENTS</span><h2 data-lg-key="0ddbfdb16f">Work in progress.</h2></div>
    {status === 'loading' && <p data-lg-key="618f4cd63d" className="feed-state" role="status">Loading public activity…</p>}
    {status === 'empty' && <p data-lg-key="290ce658df" className="feed-state">No recent public events are available. You can still explore my repositories directly.</p>}
    {status === 'error' && <p data-lg-key="03adca74f9" className="feed-state" role="status">The live feed is unavailable right now. My GitHub profile is still accessible below.</p>}
    {status === 'ready' && <div data-lg-key="82c2408eb6" className="activity-list">{events.map(event => { const repo = event.repo!.name!; const date = new Date(event.created_at); const formatted = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); return <div data-lg-key="84dc1047a7" className="activity-row" key={event.id}><span data-lg-key="46d831c8d8" className="eyebrow">{formatted}</span><div data-lg-key="6404bb6a99"><strong data-lg-key="38e407166b">{eventLabel(event)}</strong><a data-lg-key="7264ec8d0c" href={`https://github.com/${repo.split('/').map(encodeURIComponent).join('/')}`} target="_blank" rel="noopener noreferrer">{repo} ↗</a></div></div> })}</div>}
    <a data-lg-key="b23f70a390" className="explore-pill" href={github} target="_blank" rel="noopener noreferrer">Explore GitHub ↗</a>
  </div>
}

function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const filtered = filter === 'All' ? projects : projects.filter(project => project.kind === filter)
  return <div data-lg-key="1230b345c4" className="explore-content">
    <div data-lg-key="267e467fbc" className="explore-head"><span data-lg-key="9311a58eb9" className="eyebrow">A CLOSER LOOK / PROJECT INDEX</span><h1 data-lg-key="29493e0ca0">Work in <em data-lg-key="050af1713f">focus.</em></h1><p data-lg-key="888558954b">A collection of projects and practical work, from interface experiments to full-stack application development.</p></div>
    <div data-lg-key="1c5d9d31d3" className="filter-row" role="group" aria-label="Filter projects">{filters.map(item => <button data-lg-key="cd8d308e40" key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={filter === item ? 'active' : ''}>{item} <span data-lg-key="da13eb731b">{item === 'All' ? projects.length : projects.filter(project => project.kind === item).length}</span></button>)}</div>
    <div data-lg-key="0db023cf4e" className="gallery-grid">{filtered.map((project, index) => <article data-lg-key="bb9d83b433" className="gallery-card" key={project.slug}><div data-lg-key="cb0e7b1b5b" className="gallery-card-top"><span data-lg-key="04886e58dd" className="eyebrow">{project.kind.toUpperCase()} / {String(index + 1).padStart(2, '0')}</span><span data-lg-key="aae43dea0a" aria-hidden="true">↗</span></div><h2 data-lg-key="6dda3ea97c">{project.title}</h2><p data-lg-key="4138c11ebc">{project.summary}</p><div data-lg-key="c7fdaef4ab" className="gallery-card-bottom"><span data-lg-key="53bdb91f1d">{project.stack}</span><a data-lg-key="b3783b11ff" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>Read case study ↗</a></div></article>)}</div>
  </div>
}

function CaseStudy({ slug }: { slug: string }) {
  const project = projects.find(item => item.slug === slug)
  if (!project) return <NotFound />
  return <article className="explore-content case-study"><a className="back-link" href="/projects">← All projects</a><div className="explore-head"><span className="eyebrow">PROJECT STORY / {project.kind.toUpperCase()}</span><h1>{project.title}<span className="title-dot">.</span></h1><p>{project.summary}</p></div><div className="case-meta"><div><span className="eyebrow">ROLE</span><strong>{project.role}</strong></div><div><span className="eyebrow">STACK / CLASSIFICATION</span><strong>{project.stack}</strong></div></div><div className="case-sections"><section className="case-section" aria-labelledby="context-heading"><span className="eyebrow">01 / CONTEXT</span><div><h2 id="context-heading">The brief.</h2><p>{project.context}</p></div></section><section className="case-section" aria-labelledby="contributions-heading"><span className="eyebrow">02 / DOCUMENTED WORK</span><div><h2 id="contributions-heading">What I worked on.</h2><ul>{project.contributions.map(item => <li key={item}>{item}</li>)}</ul></div></section><section className="case-section case-evidence" aria-labelledby="evidence-heading"><span className="eyebrow">03 / SOURCE & SCOPE</span><div><h2 id="evidence-heading">What you can verify.</h2><p>{project.source}</p>{project.note && <p className="case-note">{project.note}</p>}{project.link && <a className="explore-pill" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a>}</div></section></div><div className="next-steps"><a href="/projects">Browse all projects ↗</a><a href={resume} download="Avinash-Shukla-Resume.pdf">Download résumé ↓</a></div></article>
}

function Writing({ slug }: { slug?: string }) {
  const note = notes.find(item => item.slug === slug)
  if (slug && !note) return <NotFound />
  if (note) return <article data-lg-key="18de3e4390" className="explore-content note-detail"><a data-lg-key="8b7de558cc" className="back-link" href="/writing">← All notes</a><div data-lg-key="2b1515efb9" className="explore-head"><span data-lg-key="16e259fff8" className="eyebrow">{note.label} / FIELD NOTES</span><h1 data-lg-key="39ced4b391">{note.title}<span data-lg-key="309b7e35cf" className="title-dot">.</span></h1><p data-lg-key="e0edb0a623">{note.intro}</p></div><div data-lg-key="df1ecf700f" className="note-body">{note.paragraphs.map(paragraph => <p data-lg-key="b81e90507c" key={paragraph}>{paragraph}</p>)}</div><a data-lg-key="4bd748130c" className="explore-pill" href="/writing">More writing ↗</a></article>
  return <div data-lg-key="2b17048d74" className="explore-content"><div data-lg-key="09757b91d4" className="explore-head"><span data-lg-key="422c548dea" className="eyebrow">THOUGHTS FROM THE WORK / WRITING</span><h1 data-lg-key="649efb26fe">Field <em data-lg-key="3df0fb3d43">notes.</em></h1><p data-lg-key="fe1b21210f">Short reflections on the craft of building interfaces and the systems behind them.</p></div><div data-lg-key="82f827befc" className="note-list">{notes.map((item, index) => <article data-lg-key="8ec6e23587" className="note-row" key={item.slug}><span data-lg-key="a5a40c4530" className="eyebrow">{String(index + 1).padStart(2, '0')} / {item.label}</span><div data-lg-key="b53b54b76e"><h2 data-lg-key="4653cb8084">{item.title}</h2><p data-lg-key="d17ff6447e">{item.intro}</p></div><a data-lg-key="b744cb629e" href={`/writing/${item.slug}`} aria-label={`Read ${item.title}`}>Read note ↗</a></article>)}</div></div>
}

function NotFound() { return <div data-lg-key="4c006c7538" className="explore-content explore-head"><span data-lg-key="b5fc4d83d9" className="eyebrow">404 / NOT FOUND</span><h1 data-lg-key="4a4247c3e3">Page not <em data-lg-key="0d96dc6191">found.</em></h1><p data-lg-key="15fe5882b6">That page isn't in the portfolio yet.</p><a data-lg-key="3fc4883178" className="explore-pill" href="/projects">Browse projects ↗</a></div> }

export default function Explore() {
  const [menuOpen, setMenuOpen] = useState(false)
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  useEffect(() => { updatePageMetadata(path) }, [path])
  let content
  if (path === '/projects') content = <Gallery />
  else if (path.startsWith('/projects/')) content = <CaseStudy slug={path.slice('/projects/'.length)} />
  else if (path === '/writing') content = <Writing />
  else if (path.startsWith('/writing/')) content = <Writing slug={path.slice('/writing/'.length)} />
  else if (path === '/activity') content = <Activity />
  else content = <NotFound />
  return <div data-lg-key="7a393163c6" className="explore-page"><a data-lg-key="558486cd6c" className="skip-link" href="#main-content">Skip to main content</a><header data-lg-key="4345dd3ff4" className="site-header"><div data-lg-key="709a207b21" className="header-inner wrap"><a data-lg-key="0f989def5c" className="brand" href="/" aria-label="Avinash Shukla, home"><span data-lg-key="10ed462d14" className="brand-mark">a<span data-lg-key="9dd5e992cc">.</span></span><span data-lg-key="a86c340ffc" className="brand-name">AVINASH<br data-lg-key="3536c1e205" />SHUKLA</span></a><span data-lg-key="5a02707681" className="header-note">SELECTED WORK<br data-lg-key="f3600d6bd2" />& FIELD NOTES</span><button data-lg-key="0bbe7569c2" className="menu-toggle" type="button" aria-controls="explore-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button><nav data-lg-key="cec57d5943" id="explore-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><a data-lg-key="ff64648b52" href="/">Home</a><a data-lg-key="e315631d68" href="/projects">Projects</a><a data-lg-key="a2d8ed76f6" href="/writing">Writing</a><a data-lg-key="52fac7e636" href="/activity">Activity</a><a data-lg-key="116c81fd68" className="nav-contact" href="/Avinash-Shukla-Resume.pdf" download="Avinash-Shukla-Resume.pdf">Résumé ↓</a></nav></div></header><main data-lg-key="a530edecc4" id="main-content" tabIndex={-1} className="wrap explore-main">{content}</main><footer data-lg-key="0ce769b6ae" className="footer"><div data-lg-key="564027084c" className="wrap footer-inner"><a data-lg-key="875df4ca12" className="footer-brand" href="/">a<span data-lg-key="b0b37cd238">.</span></a><span data-lg-key="8242175ff3">© {new Date().getFullYear()} AVINASH SHUKLA<br data-lg-key="565a734d38" />MADE WITH INTENTION.</span><div data-lg-key="49c04cc647" className="footer-links"><a data-lg-key="9aa938799c" href="/projects">Projects ↗</a><a data-lg-key="2ef1208a06" href="/writing">Writing ↗</a><a data-lg-key="40448eca79" href="/activity">Activity ↗</a><a data-lg-key="0443543a17" href="mailto:Avinashshukla8498@gmail.com">Email ↗</a></div></div></footer></div>
}
