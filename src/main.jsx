
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CryptoMarketAnalyzer from './CryptoMarketAnalyzer'
import LandingPage from './LandingPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CryptoMarketAnalyzer />} />
        <Route path="/premium" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
