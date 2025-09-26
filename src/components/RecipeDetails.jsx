import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites'
import recipeApi from '../services/recipeApi'

const RecipeDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to get recipe from favorites first
        const favorites = JSON.parse(localStorage.getItem('recipe-favorites') || '[]')
        const favoriteRecipe = favorites.find(fav => 
          fav.recipe.uri.includes(id) || fav.recipe.id === id
        )
        
        if (favoriteRecipe) {
          setRecipe(favoriteRecipe)
        } else {
          // Fetch from TheMealDB API
          const data = await recipeApi.getRecipeById(id)
          setRecipe(data)
        }
      } catch (err) {
        setError('Failed to load recipe details')
        console.error('Error fetching recipe:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecipe()
    }
  }, [id])

  const handleFavoriteClick = () => {
    if (recipe) {
      toggleFavorite(recipe)
    }
  }

  const formatNutrient = (nutrient) => {
    if (!nutrient) return 'N/A'
    return `${Math.round(nutrient.quantity)} ${nutrient.unit}`
  }

  const extractYouTubeVideoId = (url) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading recipe details...</p>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Recipe Not Found</h4>
          <p>{error || 'The recipe you are looking for could not be found.'}</p>
          <hr />
          <Link to="/" className="btn btn-primary">
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  const isFav = isFavorite(recipe.recipe.uri)
  const youtubeVideoId = extractYouTubeVideoId(recipe.recipe.youtubeUrl)

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {recipe.recipe.label}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Recipe Header with Image */}
          <div className="card mb-4">
            <div className="position-relative">
              <img
                src={recipe.recipe.image}
                className="card-img-top recipe-detail-image"
                alt={recipe.recipe.label}
                style={{ height: '500px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x500?text=Recipe+Image'
                }}
              />
              <div className="position-absolute top-0 end-0 m-3">
                <button
                  className={`btn btn-lg ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
                  onClick={handleFavoriteClick}
                  title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFav ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="card-title mb-2">{recipe.recipe.label}</h1>
                  <div className="mb-3">
                    {recipe.recipe.category && (
                      <span className="badge bg-primary me-2 mb-2 fs-6">
                        📁 {recipe.recipe.category}
                      </span>
                    )}
                    {recipe.recipe.area && (
                      <span className="badge bg-info me-2 mb-2 fs-6">
                        🌍 {recipe.recipe.area}
                      </span>
                    )}
                    {recipe.recipe.tags && recipe.recipe.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="badge bg-secondary me-2 mb-2 fs-6">
                        🏷️ {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recipe Stats */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="text-center p-3 bg-light rounded recipe-stats-card">
                    <div className="fs-2 text-primary">🔥</div>
                    <h5 className="text-primary mb-1">{Math.round(recipe.recipe.calories)}</h5>
                    <small className="text-muted">Calories</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-light rounded recipe-stats-card">
                    <div className="fs-2 text-success">👥</div>
                    <h5 className="text-success mb-1">{recipe.recipe.yield || '4'}</h5>
                    <small className="text-muted">Servings</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-light rounded recipe-stats-card">
                    <div className="fs-2 text-warning">⏱️</div>
                    <h5 className="text-warning mb-1">{recipe.recipe.totalTime || '30'}</h5>
                    <small className="text-muted">Minutes</small>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-light rounded recipe-stats-card">
                    <div className="fs-2 text-info">⚖️</div>
                    <h5 className="text-info mb-1">{Math.round(recipe.recipe.totalWeight || 1000)}g</h5>
                    <small className="text-muted">Total Weight</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YouTube Video Section */}
          {youtubeVideoId && (
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">🎥 Watch Video Tutorial</h4>
              </div>
              <div className="card-body">
                <div className="ratio ratio-16x9 youtube-container">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title={`${recipe.recipe.label} - Video Tutorial`}
                    allowFullScreen
                    className="rounded"
                  ></iframe>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="mb-0">🥘 Ingredients</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {recipe.recipe.ingredientLines.map((ingredient, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center p-2 bg-light rounded ingredient-item">
                      <span className="badge bg-primary me-3" style={{ minWidth: '25px' }}>
                        {index + 1}
                      </span>
                      <span className="flex-grow-1">{ingredient}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          {recipe.recipe.instructions && recipe.recipe.instructions.length > 0 && (
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">👨‍🍳 Step-by-Step Instructions</h4>
              </div>
              <div className="card-body">
                {recipe.recipe.instructions.map((instruction, index) => (
                  <div key={index} className="mb-4 instruction-step">
                    <div className="d-flex align-items-start">
                      <div className="flex-shrink-0 me-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                             style={{ width: '40px', height: '40px', fontSize: '1.1rem', fontWeight: 'bold' }}>
                          {instruction.step}
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <div className="p-3 bg-light rounded">
                          <p className="mb-0 fs-6">{instruction.instruction}</p>
                        </div>
                      </div>
                    </div>
                    {index < recipe.recipe.instructions.length - 1 && (
                      <div className="text-center my-3 step-connector">
                        <div className="border-start border-3 border-primary" style={{ height: '20px', marginLeft: '20px' }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health and Diet Labels */}
          {(recipe.recipe.healthLabels?.length > 0 || recipe.recipe.dietLabels?.length > 0) && (
            <div className="card mb-4">
              <div className="card-header">
                <h4 className="mb-0">🏥 Health & Diet Information</h4>
              </div>
              <div className="card-body">
                {recipe.recipe.healthLabels && recipe.recipe.healthLabels.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-success">Health Labels:</h6>
                    <div>
                      {recipe.recipe.healthLabels.map((label, index) => (
                        <span key={index} className="badge bg-success me-2 mb-2">
                          ✅ {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {recipe.recipe.dietLabels && recipe.recipe.dietLabels.length > 0 && (
                  <div>
                    <h6 className="text-info">Diet Labels:</h6>
                    <div>
                      {recipe.recipe.dietLabels.map((label, index) => (
                        <span key={index} className="badge bg-info me-2 mb-2">
                          🥗 {label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="col-lg-4">
          {/* Nutrition Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📊 Nutrition Information</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-primary bg-opacity-10 rounded nutrition-card">
                    <div className="d-flex align-items-center">
                      <span className="fs-4 me-2">🔥</span>
                      <span className="fw-bold">Energy</span>
                    </div>
                    <span className="fs-5 fw-bold text-primary">
                      {formatNutrient(recipe.recipe.totalNutrients?.ENERC_KCAL)}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-success bg-opacity-10 rounded nutrition-card">
                    <div className="d-flex align-items-center">
                      <span className="fs-4 me-2">💪</span>
                      <span className="fw-bold">Protein</span>
                    </div>
                    <span className="fs-5 fw-bold text-success">
                      {formatNutrient(recipe.recipe.totalNutrients?.PROCNT)}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-warning bg-opacity-10 rounded nutrition-card">
                    <div className="d-flex align-items-center">
                      <span className="fs-4 me-2">🧈</span>
                      <span className="fw-bold">Fat</span>
                    </div>
                    <span className="fs-5 fw-bold text-warning">
                      {formatNutrient(recipe.recipe.totalNutrients?.FAT)}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center p-3 bg-info bg-opacity-10 rounded nutrition-card">
                    <div className="d-flex align-items-center">
                      <span className="fs-4 me-2">🌾</span>
                      <span className="fw-bold">Carbs</span>
                    </div>
                    <span className="fs-5 fw-bold text-info">
                      {formatNutrient(recipe.recipe.totalNutrients?.CHOCDF)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Actions */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">⚡ Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button
                  className={`btn ${isFav ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={handleFavoriteClick}
                >
                  {isFav ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={async () => {
                    try {
                      const randomRecipe = await recipeApi.getRandomRecipe()
                      navigate(`/recipe/${randomRecipe.recipe.id}`)
                    } catch (error) {
                      console.error('Error fetching random recipe:', error)
                    }
                  }}
                >
                  🎲 Get Random Recipe
                </button>
                {recipe.recipe.url && recipe.recipe.url !== '#' && (
                  <a
                    href={recipe.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    🔗 View Original Source
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Summary */}
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">📋 Recipe Summary</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fs-5">👥</div>
                    <small className="text-muted">Serves</small>
                    <div className="fw-bold">{recipe.recipe.yield || '4'}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fs-5">⏱️</div>
                    <small className="text-muted">Prep Time</small>
                    <div className="fw-bold">{recipe.recipe.totalTime || '30'} min</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fs-5">🥘</div>
                    <small className="text-muted">Ingredients</small>
                    <div className="fw-bold">{recipe.recipe.ingredientLines?.length || 0}</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-2 bg-light rounded">
                    <div className="fs-5">👨‍🍳</div>
                    <small className="text-muted">Steps</small>
                    <div className="fw-bold">{recipe.recipe.instructions?.length || 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails