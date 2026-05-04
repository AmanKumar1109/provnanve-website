import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from "./Pages/LandingPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  )
}

export default App