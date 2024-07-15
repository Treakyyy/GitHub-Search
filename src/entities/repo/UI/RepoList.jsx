import React, { useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import _ from 'lodash'
import repoStore from '../model/store'
import SearchForm from './SearchForm'
import RepoItem from './RepoItem'
import FavoritesList from './FavoritesList'
import styles from './RepoList.module.css'

const RepoList = observer(() => {
  const abortControllerRef = useRef(null)
  const [showFavorites, setShowFavorites] = useState(false)

  const throttledFetchRepos = useCallback(
    _.throttle(async (query) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      const controller = new AbortController()
      abortControllerRef.current = controller
      await repoStore.fetchRepos(query)
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

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  return (
    <div className={styles.repoList}>
      <h1 className={styles.repoList_text}>GitHub Repository Search</h1>
      <SearchForm
        query={repoStore.query}
        onInputChange={handleInputChange}
        onSearch={handleSearch}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
      />
      {showFavorites ? (
        <FavoritesList
          favorites={repoStore.favorites}
          onRemove={(id) => repoStore.removeFromFavorites(id)}
        />
      ) : (
        <>
          {repoStore.loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {repoStore.repos && repoStore.repos.length > 0 ? (
                <ul className={styles.repoList_list}>
                  {repoStore.repos.map((repo) => (
                    <RepoItem
                      key={repo.id}
                      repo={repo}
                      isFavorite={repoStore.favorites.some(
                        (favorite) => favorite.id === repo.id
                      )}
                      onToggleFavorite={handleFavoriteToggle}
                    />
                  ))}
                </ul>
              ) : (
                <p>No repositories found</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
})

export default RepoList
