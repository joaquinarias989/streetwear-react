import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './bootstrap.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
