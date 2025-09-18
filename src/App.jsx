import { Routes, Route } from 'react-router-dom'
import { FavoritesProvider } from './contexts/FavoritesContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'
import Favorites from './components/Favorites'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import CookiePolicy from './components/CookiePolicy'

function App() {
  return (
    <FavoritesProvider>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container-fluid flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  )
}

export default App