import { useEffect, useState } from 'react'

type Repository = {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  stargazers_count: number
  pushed_at: string | null
  fork: boolean
  archived: boolean
}

type LoadState = 'loading' | 'ready' | 'empty' | 'error'
const profile = 'https://github.com/avinash-shukla1'

export default function RepositorySpotlight() {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [status, setStatus] = useState<LoadState>('loading')

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/users/avinash-shukla1/repos?type=owner&sort=pushed&direction=desc&per_page=30', {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then(async response => {
        if (!response.ok) throw new Error('GitHub repositories unavailable')
        return response.json() as Promise<Repository[]>
      })
      .then(data => {
        if (controller.signal.aborted) return
        const recent = Array.isArray(data)
          ? data.filter(repo => repo && typeof repo.id === 'number' && typeof repo.full_name === 'string' && /^avinash-shukla1\/[^/]+$/i.test(repo.full_name) && !repo.fork && !repo.archived)
            .sort((a, b) => Date.parse(b.pushed_at || '') - Date.parse(a.pushed_at || '') || a.name.localeCompare(b.name))
            .slice(0, 4)
          : []
        setRepositories(recent)
        setStatus(recent.length ? 'ready' : 'empty')
      })
      .catch(() => { if (!controller.signal.aborted) setStatus('error') })
    return () => controller.abort()
  }, [])

  return <section className="repository-spotlight" aria-labelledby="repository-heading">
    <div className="repository-heading">
      <div><span className="eyebrow">PUBLIC CODE / REPOSITORY SPOTLIGHT</span><h2 id="repository-heading">Open for <em>inspection.</em></h2></div>
      <p>Recently pushed, original public repositories. Details come directly from GitHub, not a hand-picked or invented list.</p>
    </div>
    {status === 'loading' && <p className="repository-state" role="status">Loading repositories from GitHub…</p>}
    {status === 'empty' && <p className="repository-state">No original public repositories are available in the recent results. Browse the full GitHub profile below.</p>}
    {status === 'error' && <p className="repository-state" role="status">GitHub repositories couldn't load right now. Browse the profile directly instead.</p>}
    {status === 'ready' && <div className="repository-grid">{repositories.map(repo => {
      const date = repo.pushed_at ? new Date(repo.pushed_at) : null
      const updated = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Date unavailable'
      const url = `https://github.com/${repo.full_name.split('/').map(encodeURIComponent).join('/')}`
      return <article className="repository-card" key={repo.id}>
        <span className="eyebrow">{repo.language || 'REPOSITORY'} <span aria-hidden="true">/</span> PUSHED {updated}</span>
        <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
        <p>{repo.description || 'Explore the code, documentation and commit history on GitHub.'}</p>
        <div className="repository-card-bottom"><span aria-label={`${repo.stargazers_count || 0} GitHub stars`}>☆ {repo.stargazers_count || 0}</span><a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${repo.name} on GitHub`}>View repository ↗</a></div>
      </article>
    })}</div>}
    <a className="repository-more" href={`${profile}?tab=repositories`} target="_blank" rel="noopener noreferrer">All public repositories ↗</a>
  </section>
}
