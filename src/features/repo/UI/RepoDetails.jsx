import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import repoStore from '../../../entities/repo/model/store'

const RepoDetails = observer(() => {
  const { owner, repoName } = useParams()

  useEffect(() => {
    repoStore.fetchRepoDetails(owner, repoName)
  }, [owner, repoName])

  const repo = repoStore.selectedRepo

  return (
    <div>
      {repoStore.loading ? (
        <p>Loading...</p>
      ) : repo ? (
        <div>
          <h1>{repo.full_name}</h1>
          <p>{repo.description}</p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Forks: {repo.forks_count}</p>
          <p>Open Issues: {repo.open_issues_count}</p>
          <p>License: {repo.license ? repo.license.name : 'N/A'}</p>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            Go to Repository
          </a>
        </div>
      ) : (
        <p>Repository not found</p>
      )}
    </div>
  )
})

export default RepoDetails
