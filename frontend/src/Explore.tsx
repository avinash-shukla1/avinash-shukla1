import { useEffect, useState } from 'react'
import './explore.css'

type Project = { slug: string; title: string; kind: 'Full-stack' | 'Frontend' | 'Experience'; summary: string; stack: string; link?: string; linkLabel?: string; detail?: string[]; role?: string }

const projects: Project[] = [
  { slug: 'whatsapp-clone', title: 'WhatsApp Clone', kind: 'Full-stack', summary: 'A real-time messaging project built with Node.js, Express and Socket.io.', stack: 'Node.js · Express · Socket.io', link: 'https://whatsapp-clone-delta.vercel.app/', linkLabel: 'View live project', role: 'Full-stack development', detail: ['Built a messaging application centered on real-time communication. Socket.io handles live message exchange, while Node.js and Express provide the server-side foundation.', 'This project explores the relationship between responsive conversation interfaces and the backend communication needed to make them feel immediate.'] },
  { slug: 'obys-agency-clone', title: 'Obys Agency Clone', kind: 'Frontend', summary: 'An agency website recreation focused on visual movement and expressive browsing.', stack: 'HTML · CSS · JavaScript', link: 'https://avinash-shukla1.github.io/obys.agency-clone/', linkLabel: 'View live project', role: 'Frontend development', detail: ['Recreated the look and feel of an expressive agency website, with particular attention to animation, typography and scroll-driven presentation.', 'The exercise is about translating a visual reference into working frontend code while preserving the pacing and details that make the original experience distinctive.'] },
  { slug: 'tourmates-property-partner', title: 'Property Partner / Tourmates', kind: 'Experience', summary: 'Property and hotel management tools created during a full-stack internship.', stack: 'React · Node.js · Express · MongoDB', role: 'Full-stack Developer Intern · Feb–Aug 2025', detail: ['Worked on the Property Partner module for a property and hotel management system during a full-stack development internship.', 'Developed multi-step room creation forms with image upload and validation; integrated REST APIs for property listings, bookings and the partner dashboard.', 'Implemented authentication and role-based access for admins, property owners and staff. The work used React, Node.js, Express and MongoDB.'] },
  { slug: 'q-clay-clone', title: 'Q Clay Clone', kind: 'Frontend', summary: 'An animated website experiment using web animation tools.', stack: 'HTML · CSS · JavaScript · GSAP', role: 'Frontend development', detail: ['An animated frontend exercise built with HTML, CSS, JavaScript, GSAP, Locomotive Scroll and ScrollTrigger.', 'Focused on translating motion and visual timing into a browser experience.'] },
  { slug: 'bookstore-app', title: 'Bookstore App', kind: 'Full-stack', summary: 'A book discovery project for exploring authors and titles.', stack: 'MERN stack', role: 'Full-stack project', detail: ['A project for book enthusiasts to explore books, authors and titles. The original résumé describes it as a MERN stack project.', 'Further implementation details and a public demo have not been provided.'] },
  { slug: 'ecommerce-cart', title: 'E-commerce Cart', kind: 'Frontend', summary: 'A functional shopping-cart interface from a collection of React projects.', stack: 'React', role: 'Frontend development', detail: ['A React-based e-commerce cart project listed among frontend work in the supplied résumé.', 'This project focuses on the interactions of adding and managing items in a cart; no public demo URL was provided.'] },
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
  return <div className="explore-content">
    <div className="explore-head"><span className="eyebrow">PUBLIC GITHUB ACTIVITY / LIVE DATA</span><h1>In the <em>making.</em></h1><p>Recent public activity from my GitHub profile. The feed is fetched live and may be limited by GitHub availability.</p></div>
    {status === 'loading' && <p className="feed-state" role="status">Loading public activity…</p>}
    {status === 'empty' && <p className="feed-state">No recent public events are available. You can still explore my repositories directly.</p>}
    {status === 'error' && <p className="feed-state" role="status">The live feed is unavailable right now. My GitHub profile is still accessible below.</p>}
    {status === 'ready' && <div className="activity-list">{events.map(event => { const repo = event.repo!.name!; const date = new Date(event.created_at); const formatted = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }); return <div className="activity-row" key={event.id}><span className="eyebrow">{formatted}</span><div><strong>{eventLabel(event)}</strong><a href={`https://github.com/${repo.split('/').map(encodeURIComponent).join('/')}`} target="_blank" rel="noopener noreferrer">{repo} ↗</a></div></div> })}</div>}
    <a className="explore-pill" href={github} target="_blank" rel="noopener noreferrer">Explore GitHub ↗</a>
  </div>
}

function Gallery() {
  const [filter, setFilter] = useState<Filter>('All')
  const filtered = filter === 'All' ? projects : projects.filter(project => project.kind === filter)
  return <div className="explore-content">
    <div className="explore-head"><span className="eyebrow">A CLOSER LOOK / PROJECT INDEX</span><h1>Work in <em>focus.</em></h1><p>A collection of projects and practical work, from interface experiments to full-stack application development.</p></div>
    <div className="filter-row" role="group" aria-label="Filter projects">{filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={filter === item ? 'active' : ''}>{item} <span>{item === 'All' ? projects.length : projects.filter(project => project.kind === item).length}</span></button>)}</div>
    <div className="gallery-grid">{filtered.map((project, index) => <article className="gallery-card" key={project.slug}><div className="gallery-card-top"><span className="eyebrow">{project.kind.toUpperCase()} / {String(index + 1).padStart(2, '0')}</span><span aria-hidden="true">↗</span></div><h2>{project.title}</h2><p>{project.summary}</p><div className="gallery-card-bottom"><span>{project.stack}</span><a href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>Read case study ↗</a></div></article>)}</div>
  </div>
}

function CaseStudy({ slug }: { slug: string }) {
  const project = projects.find(item => item.slug === slug)
  if (!project) return <NotFound />
  return <article className="explore-content case-study"><a className="back-link" href="/projects">← All projects</a><div className="explore-head"><span className="eyebrow">PROJECT STORY / {project.kind.toUpperCase()}</span><h1>{project.title}<span className="title-dot">.</span></h1><p>{project.summary}</p></div><div className="case-meta"><div><span className="eyebrow">ROLE</span><strong>{project.role}</strong></div><div><span className="eyebrow">STACK</span><strong>{project.stack}</strong></div></div><div className="case-body"><span className="eyebrow">THE WORK /</span><div>{project.detail?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{project.link && <a className="explore-pill" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel} ↗</a>}</div></div><div className="next-steps"><a href="/projects">Browse all projects ↗</a><a href={resume} download="Avinash-Shukla-Resume.pdf">Download résumé ↓</a></div></article>
}

function Writing({ slug }: { slug?: string }) {
  const note = notes.find(item => item.slug === slug)
  if (slug && !note) return <NotFound />
  if (note) return <article className="explore-content note-detail"><a className="back-link" href="/writing">← All notes</a><div className="explore-head"><span className="eyebrow">{note.label} / FIELD NOTES</span><h1>{note.title}<span className="title-dot">.</span></h1><p>{note.intro}</p></div><div className="note-body">{note.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><a className="explore-pill" href="/writing">More writing ↗</a></article>
  return <div className="explore-content"><div className="explore-head"><span className="eyebrow">THOUGHTS FROM THE WORK / WRITING</span><h1>Field <em>notes.</em></h1><p>Short reflections on the craft of building interfaces and the systems behind them.</p></div><div className="note-list">{notes.map((item, index) => <article className="note-row" key={item.slug}><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {item.label}</span><div><h2>{item.title}</h2><p>{item.intro}</p></div><a href={`/writing/${item.slug}`} aria-label={`Read ${item.title}`}>Read note ↗</a></article>)}</div></div>
}

function NotFound() { return <div className="explore-content explore-head"><span className="eyebrow">404 / NOT FOUND</span><h1>Page not <em>found.</em></h1><p>That page isn't in the portfolio yet.</p><a className="explore-pill" href="/projects">Browse projects ↗</a></div> }

export default function Explore() {
  const [menuOpen, setMenuOpen] = useState(false)
  const path = decodeURIComponent(window.location.pathname).replace(/\/$/, '') || '/'
  let content
  if (path === '/projects') content = <Gallery />
  else if (path.startsWith('/projects/')) content = <CaseStudy slug={path.slice('/projects/'.length)} />
  else if (path === '/writing') content = <Writing />
  else if (path.startsWith('/writing/')) content = <Writing slug={path.slice('/writing/'.length)} />
  else if (path === '/activity') content = <Activity />
  else content = <NotFound />
  return <div className="explore-page"><header className="site-header"><div className="header-inner wrap"><a className="brand" href="/" aria-label="Avinash Shukla, home"><span className="brand-mark">a<span>.</span></span><span className="brand-name">AVINASH<br />SHUKLA</span></a><span className="header-note">SELECTED WORK<br />& FIELD NOTES</span><button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button><nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation"><a href="/">Home</a><a href="/projects">Projects</a><a href="/writing">Writing</a><a href="/activity">Activity</a><a className="nav-contact" href="/Avinash-Shukla-Resume.pdf" download="Avinash-Shukla-Resume.pdf">Résumé ↓</a></nav></div></header><main className="wrap explore-main">{content}</main><footer className="footer"><div className="wrap footer-inner"><a className="footer-brand" href="/">a<span>.</span></a><span>© {new Date().getFullYear()} AVINASH SHUKLA<br />MADE WITH INTENTION.</span><div className="footer-links"><a href="/projects">Projects ↗</a><a href="/writing">Writing ↗</a><a href="/activity">Activity ↗</a><a href="mailto:Avinashshukla8498@gmail.com">Email ↗</a></div></div></footer></div>
}
