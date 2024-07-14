import React, { useState } from 'react'

function App() {
  const [query, setQuery] = useState('')
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}`
      )
      const data = await response.json()
      setRepos(data.items)
    } catch (error) {
      console.error('Error fetching the repositories:', error)
    }
    setLoading(false)
  }

  return (
    <div>
      <h1>GitHub Repository Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
                {repo.name}
              </a>{' '}
              by {repo.owner.login}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
