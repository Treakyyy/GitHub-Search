import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import repoStore from '../../../entities/repo/model/store'
import styles from './RepoDetails.module.css'

const RepoDetails = observer(() => {
  const { owner, repoName } = useParams()

  useEffect(() => {
    repoStore.fetchRepoDetails(owner, repoName)
  }, [owner, repoName])

  const repo = repoStore.selectedRepo

  const renderRepoDetails = () => {
    if (repoStore.loading) {
      return <p>Loading...</p>
    }

    if (repoStore.error) {
      return <p className={styles.error}>{repoStore.error}</p>
    }

    if (repo) {
      return (
        <div>
          <h1 className={styles.repoDetails__head_text}>{repo.full_name}</h1>
          <img
            className={styles.repoDetails_img}
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login} avatar`}
          />
          <p className={styles.repoDetails_text}>{repo.description}</p>
          <p className={styles.repoDetails_text}>
            Stars: {repo.stargazers_count}
          </p>
          <p className={styles.repoDetails_text}>Forks: {repo.forks_count}</p>
          <p className={styles.repoDetails_text}>
            Open Issues: {repo.open_issues_count}
          </p>
          <p className={styles.repoDetails_text}>
            License: {repo.license ? repo.license.name : 'N/A'}
          </p>
          <a
            className={styles.repoDetails_link}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Repository
          </a>
        </div>
      )
    }

    return <p>Repository not found</p>
  }

  return <div className={styles.repoDetails}>{renderRepoDetails()}</div>
})

export default RepoDetails
