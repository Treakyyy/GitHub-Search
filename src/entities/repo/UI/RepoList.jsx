import React, { useCallback, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import repoStore from '../model/store'

const RepoList = observer(() => {
  const abortControllerRef = useRef(null)

  const throttledFetchRepos = useCallback(
    _.throttle((query) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      const controller = new AbortController()
      abortControllerRef.current = controller
      repoStore.fetchRepos(query)
    }, 1000),
    []
  )

  const handleFavoriteToggle = (repo) => {
    if (repoStore.favorites.some((favorite) => favorite.id === repo.id)) {
      repoStore.removeFromFavorites(repo.id)
    } else {
      repoStore.addToFavorites(repo)
    }
  }

  const handleInputChange = (e) => {
    const newQuery = e.target.value
    repoStore.setQuery(newQuery)
    throttledFetchRepos(newQuery)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    throttledFetchRepos(repoStore.query)
  }

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={repoStore.query}
          onChange={handleInputChange}
          placeholder="Enter keyword"
        />
        <button type="submit">Search</button>
      </form>
      {repoStore.loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul>
            {repoStore.repos.map((repo) => (
              <li key={repo.id}>
                <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                  {repo.full_name}
                </Link>
                <p>Stars: {repo.stargazers_count}</p>
                <p>Forks: {repo.forks_count}</p>
                <img
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login} avatar`}
                  width={50}
                  height={50}
                />
                <button onClick={() => handleFavoriteToggle(repo)}>
                  {repoStore.favorites.some(
                    (favorite) => favorite.id === repo.id
                  )
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h2>Favorites</h2>
            <ul>
              {repoStore.favorites.map((repo) => (
                <li key={repo.id}>
                  <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                    {repo.full_name}
                  </Link>
                  <p>Stars: {repo.stargazers_count}</p>
                  <p>Forks: {repo.forks_count}</p>
                  <img
                    src={repo.owner.avatar_url}
                    alt={`${repo.owner.login} avatar`}
                    width={50}
                    height={50}
                  />
                  <button onClick={() => handleFavoriteToggle(repo)}>
                    Remove from Favorites
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
})

export default RepoList
