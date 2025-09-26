import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'

const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isFav = isFavorite(recipe.recipe.uri)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(recipe)
  }

  const formatCalories = (calories) => {
    return Math.round(calories)
  }

  const getMainIngredients = (ingredients, maxCount = 3) => {
    return ingredients.slice(0, maxCount).map(ingredient => ingredient.text || ingredient)
  }

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 recipe-card bounce-in" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
        <div className="position-relative">
          <img
            src={recipe.recipe.image}
            className="card-img-top"
            alt={recipe.recipe.label}
            style={{ height: '200px', objectFit: 'cover' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
            }}
          />
          <button
            className={`btn btn-sm position-absolute top-0 end-0 m-2 ${
              isFav ? 'btn-danger' : 'btn-outline-light'
            }`}
            onClick={handleFavoriteClick}
            title={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.recipe.label}</h5>
          
          <div className="mb-2">
            <small className="text-muted">
              <strong>Source:</strong> {recipe.recipe.source}
            </small>
            {recipe.recipe.category && (
              <span className="badge bg-primary ms-2">{recipe.recipe.category}</span>
            )}
            {recipe.recipe.area && (
              <span className="badge bg-info ms-1">{recipe.recipe.area}</span>
            )}
          </div>

          <div className="mb-2">
            <span className="badge bg-primary me-1">
              {formatCalories(recipe.recipe.calories)} cal
            </span>
            {recipe.recipe.totalTime && (
              <span className="badge bg-secondary me-1">
                {recipe.recipe.totalTime} min
              </span>
            )}
            {recipe.recipe.yield && (
              <span className="badge bg-info">
                {recipe.recipe.yield} servings
              </span>
            )}
          </div>

          {recipe.recipe.ingredients && recipe.recipe.ingredients.length > 0 && (
            <div className="mb-3">
              <small className="text-muted">
                <strong>Main ingredients:</strong>
              </small>
              <div className="mt-1">
                {getMainIngredients(recipe.recipe.ingredients).map((ingredient, index) => (
                  <span key={index} className="badge bg-light text-dark me-1 mb-1">
                    {ingredient}
                  </span>
                ))}
                {recipe.recipe.ingredients.length > 3 && (
                  <span className="badge bg-light text-muted">
                    +{recipe.recipe.ingredients.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {recipe.recipe.healthLabels && recipe.recipe.healthLabels.length > 0 && (
            <div className="mb-3">
              {recipe.recipe.healthLabels.slice(0, 3).map((label, index) => (
                <span key={index} className="badge bg-success me-1 mb-1">
                  {label}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto">
            <Link
              to={`/recipe/${recipe.recipe.id || encodeURIComponent(recipe.recipe.uri.split('#recipe_')[1] || recipe.recipe.uri)}`}
              className="btn btn-primary w-100"
            >
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
