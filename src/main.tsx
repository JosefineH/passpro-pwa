// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'country-flag-icons/react/3x2'

createRoot(document.getElementById('root')!).render(
  //   <StrictMode>
  <App />
  //   </StrictMode>
)
