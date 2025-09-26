import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

const Navbar = () => {
  const location = useLocation()
  const { favorites } = useFavorites()

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🍳 Recipe Finder
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`} 
                to="/favorites"
              >
                Favorites 
                {favorites.length > 0 && (
                  <span className="badge bg-light text-primary ms-1">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/music' ? 'active' : ''}`} 
                to="/music"
              >
                🎵 Music
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
