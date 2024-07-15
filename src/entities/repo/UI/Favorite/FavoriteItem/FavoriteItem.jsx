import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../../../shared/UI/Button/Button'
import styles from './FavoriteItem.module.css'

const FavoriteItem = ({ repo, onRemove }) => {
  return (
    <li className={styles.favoriteItem}>
      <Link
        className={styles.favoriteItem_link}
        to={`/repo/${repo.owner.login}/${repo.name}`}
      >
        {repo.full_name}
      </Link>
      <p className={styles.favoriteItem_text}>Stars: {repo.stargazers_count}</p>
      <p className={styles.favoriteItem_text}>Forks: {repo.forks_count}</p>
      <img
        className={styles.favoriteItem_img}
        src={repo.owner.avatar_url}
        alt={`${repo.owner.login} avatar`}
      />
      <Button onClick={() => onRemove(repo.id)}>Remove from Favorites</Button>
    </li>
  )
}

export default FavoriteItem
