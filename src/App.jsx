import './css/App.css' // imports the stylesheet for the app
import Favourites from './pages/Favourites' // imports the favourites screen
import Home from './pages/Home' // imports the home screen
import NavBar from './components/NavBar' // imports the navbar
import { MovieProvider } from "./contexts/MovieContext" // imports the movieprovider component
import { Routes, Route } from "react-router-dom" // imports the navigation provider from react

function App() {


  return (
    <div>
      <MovieProvider> {/* MovieProvider to send context down to children */}
        <NavBar /> {/* NavBar component */}
        <main className="main-content">
          <Routes> {/* navigation router */}
            <Route path="/" element={<Home />}/> {/* navigation path to the home page */}
            <Route path="/favourites" element={<Favourites />}/> {/* navigation path to the favourites page */}
          </Routes>
        </main>
      </MovieProvider>
    </div>
  )
}

export default App // default export on app