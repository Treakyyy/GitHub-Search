import React from 'react'
import FavoriteItem from './FavoriteItem'
import styles from './FavoritesList.module.css'

const FavoritesList = ({ favorites, onRemove }) => {
  return (
    <div className={styles.favoritesList}>
      <h2 className={styles.favoritesList_text}>Favorites</h2>
      <ul className={styles.favoritesList_list}>
        {favorites.map((repo) => (
          <FavoriteItem key={repo.id} repo={repo} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  )
}

export default FavoritesList
