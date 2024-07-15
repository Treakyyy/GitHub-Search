import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import repoStore from '../../../model/store'
import SearchForm from '../../SearchForm/SearchForm'
import RepoItem from '../RepoItem/RepoItem'
import FavoritesList from '../../Favorite/FavoriteList/FavoritesList'
import styles from './RepoList.module.css'

const RepoList = observer(() => {
  const [showFavorites, setShowFavorites] = useState(false)

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites)
  }

  return (
    <div className={styles.repoList}>
      <h1 className={styles.repoList_text}>GitHub Repository Search</h1>
      <SearchForm
        query={repoStore.query}
        onInputChange={(e) => repoStore.handleInputChange(e.target.value)}
        onSearch={(e) => {
          e.preventDefault()
          repoStore.fetchRepos(repoStore.query)
        }}
        showFavorites={showFavorites}
        onToggleFavorites={handleToggleFavorites}
      />
      {repoStore.error && <p className={styles.error}>{repoStore.error}</p>}
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
              {repoStore.repos.length > 0 ? (
                <ul className={styles.repoList_list}>
                  {repoStore.repos.map((repo) => (
                    <RepoItem
                      key={repo.id}
                      repo={repo}
                      isFavorite={repoStore.favorites.some(
                        (favorite) => favorite.id === repo.id
                      )}
                      onToggleFavorite={() =>
                        repoStore.handleFavoriteToggle(repo)
                      }
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
