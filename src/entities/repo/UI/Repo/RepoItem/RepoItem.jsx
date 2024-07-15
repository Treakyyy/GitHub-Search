import React from 'react'
import { Link } from 'react-router-dom'
import styles from './RepoItem.module.css'
import Button from '../../../../../shared/UI/Button/Button'
import CopyButton from '../../../../../shared/UI/Button/CopyButton'

const RepoItem = ({ repo, isFavorite, onToggleFavorite }) => {
  return (
    <li className={styles.repo}>
      <Link
        className={styles.repo_link}
        to={`/repo/${repo.owner.login}/${repo.name}`}
      >
        {repo.full_name}
      </Link>
      <p className={styles.repo_text}>Stars: {repo.stargazers_count}</p>
      <p className={styles.repo_text}>Forks: {repo.forks_count}</p>
      <img
        className={styles.repo_img}
        src={repo.owner.avatar_url}
        alt={`${repo.owner.login} avatar`}
      />
      <Button
        className={styles.repo_btn}
        onClick={() => onToggleFavorite(repo)}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
      <CopyButton text={repo.full_name} />
    </li>
  )
}

export default RepoItem
