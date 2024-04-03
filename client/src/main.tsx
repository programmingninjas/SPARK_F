import 'regenerator-runtime/runtime';
// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvier } from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvier>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </AuthProvier>
  </BrowserRouter>,
)
