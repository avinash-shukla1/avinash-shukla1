// Keep portfolio curation separate from GitHub's public profile settings.
const hiddenRepositoryNames = new Set(['cubuddy'])

export function isPortfolioRepositoryVisible(fullName: string): boolean {
  const repositoryName = fullName.split('/').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase()
  return Boolean(repositoryName && !hiddenRepositoryNames.has(repositoryName))
}
