import { StrictMode } from 'react' // imports StrictMode
import { createRoot } from 'react-dom/client' // imports createRoot
import { BrowserRouter } from 'react-router-dom' // imports BrowserRouter
import './css/index.css' // imports index stylesheet
import App from './App.jsx'// imports the app

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* lets the developer (me) know if there are any errors/impure components in the code */}
    <BrowserRouter> {/* enables page navigation and routing with react router */}
      <App /> {/* the entire app */}
    </BrowserRouter>
  </StrictMode>,
)