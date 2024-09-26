import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter, Route } from 'react-router-dom'
// import {GoogleOAuthProvider} from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <GoogleOAuthProvider clientId='36550005782-216mpkmrt32fr0c43rrupcinaeshvvu4.apps.googleusercontent.com' > */}
    <App />
    {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </StrictMode>,
)
