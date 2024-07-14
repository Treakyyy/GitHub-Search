import React from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import RepoList from '../entities/repo/UI/RepoList'
import RepoDetails from '../features/repo/UI/RepoDetails'

const App = observer(() => {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:owner/:repoName" element={<RepoDetails />} />
        </Routes>
      </div>
    </HashRouter>
  )
})

export default App
