import React from 'react'
import { Route, Routes, HashRouter } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import HomePage from '../pages/HomePage/Homepage'
import RepoPage from '../pages/RepoPage/RepoPage'
import './App.css'

const App = observer(() => {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repo/:owner/:repoName" element={<RepoPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
})

export default App
