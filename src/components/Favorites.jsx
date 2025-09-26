import { useFavorites } from '../hooks/useFavorites'
import RecipeCard from './RecipeCard'

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites()

  if (favorites.length === 0) {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h2>Your Favorite Recipes</h2>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">No favorites yet!</h5>
                  <p className="card-text">
                    Start exploring recipes and add them to your favorites by clicking the heart icon.
                  </p>
                  <a href="/" className="btn btn-primary">
                    Browse Recipes
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Your Favorite Recipes ({favorites.length})</h2>
            <button
              className="btn btn-outline-danger"
              onClick={clearFavorites}
            >
              Clear All Favorites
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {favorites.map((recipe, index) => (
          <RecipeCard key={recipe.recipe.uri || index} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}

export default Favorites
