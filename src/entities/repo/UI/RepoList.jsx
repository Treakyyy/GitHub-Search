import React, { useState, useCallback, useRef } from 'react'
import _ from 'lodash'

function App() {
  const [query, setQuery] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef(null)

  const fetchRepos = async (query, controller) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`,
        {
          signal: controller.signal,
        }
      )
      const data = await response.json()
      setRepos(data.items)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted')
      } else {
        console.error('Error fetching the repositories:', error)
      }
    }
    setLoading(false)
  }

  const throttledFetchRepos = useCallback(
    _.throttle((query) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      const controller = new AbortController()
      abortControllerRef.current = controller
      fetchRepos(query, controller)
    }, 1000),
    []
  )

  const handleInputChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    throttledFetchRepos(newQuery)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    throttledFetchRepos(query)
  }

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter keyword"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.full_name}
              </a>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Forks: {repo.forks_count}</p>
              <img
                src={repo.owner.avatar_url}
                alt={`${repo.owner.login} avatar`}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
