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

  return <section data-lg-key="599ab319a3" className="repository-spotlight" aria-labelledby="repository-heading">
    <div data-lg-key="48a27487b5" className="repository-heading">
      <div data-lg-key="405ed807cd"><span data-lg-key="a50140803b" className="eyebrow">PUBLIC CODE / REPOSITORY SPOTLIGHT</span><h2 data-lg-key="63246d9a15" id="repository-heading">Open for <em data-lg-key="54871cb390">inspection.</em></h2></div>
      <p data-lg-key="88a4903e1d">Recently pushed, original public repositories. Details come directly from GitHub, not a hand-picked or invented list.</p>
    </div>
    {status === 'loading' && <p data-lg-key="cd6f152a8a" className="repository-state" role="status">Loading repositories from GitHub…</p>}
    {status === 'empty' && <p data-lg-key="7bc5de705f" className="repository-state">No original public repositories are available in the recent results. Browse the full GitHub profile below.</p>}
    {status === 'error' && <p data-lg-key="948fd52106" className="repository-state" role="status">GitHub repositories couldn't load right now. Browse the profile directly instead.</p>}
    {status === 'ready' && <div data-lg-key="c63719ec71" className="repository-grid">{repositories.map(repo => {
      const date = repo.pushed_at ? new Date(repo.pushed_at) : null
      const updated = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Date unavailable'
      const url = `https://github.com/${repo.full_name.split('/').map(encodeURIComponent).join('/')}`
      return <article data-lg-key="74cb886d60" className="repository-card" key={repo.id}>
        <span data-lg-key="9d9be7a84c" className="eyebrow">{repo.language || 'REPOSITORY'} <span data-lg-key="f1adf15e4f" aria-hidden="true">/</span> PUSHED {updated}</span>
        <h3 data-lg-key="0f4d1edea6">{repo.name.replace(/[-_]/g, ' ')}</h3>
        <p data-lg-key="f7cdc9d463">{repo.description || 'Explore the code, documentation and commit history on GitHub.'}</p>
        <div data-lg-key="2551589e4f" className="repository-card-bottom"><span data-lg-key="17083c160d" aria-label={`${repo.stargazers_count || 0} GitHub stars`}>☆ {repo.stargazers_count || 0}</span><a data-lg-key="4d240b41ec" href={url} target="_blank" rel="noopener noreferrer" aria-label={`Explore ${repo.name} on GitHub`}>View repository ↗</a></div>
      </article>
    })}</div>}
    <a data-lg-key="711d0a0a8c" className="repository-more" href={`${profile}?tab=repositories`} target="_blank" rel="noopener noreferrer">All public repositories ↗</a>
  </section>
}
