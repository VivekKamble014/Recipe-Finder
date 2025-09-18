import { useState, useCallback, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import RecipeCard from './RecipeCard'
import recipeApi from '../services/recipeApi'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('relevance')

  const searchRecipes = useCallback(async (query) => {
    if (!query.trim()) return

    try {
      setLoading(true)
      setError(null)
      setHasSearched(true)

      // Build search options from filters
      const searchOptions = {}
      if (filters.category) searchOptions.category = filters.category
      if (filters.area) searchOptions.area = filters.area

      // Use TheMealDB API
      const data = await recipeApi.searchRecipes(query, searchOptions)
      let recipeResults = data.hits || []

      // Apply sorting
      if (sortBy !== 'relevance') {
        recipeResults = sortRecipes(recipeResults, sortBy)
      }

      setRecipes(recipeResults)
    } catch (err) {
      setError('Failed to search recipes. Please try again.')
      console.error('Search error:', err)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, [filters, sortBy])

  const sortRecipes = (recipes, sortType) => {
    return [...recipes].sort((a, b) => {
      const recipeA = a.recipe
      const recipeB = b.recipe

      switch (sortType) {
        case 'calories':
          return recipeA.calories - recipeB.calories
        case 'calories-desc':
          return recipeB.calories - recipeA.calories
        case 'protein':
          return (recipeA.totalNutrients?.PROCNT?.quantity || 0) - (recipeB.totalNutrients?.PROCNT?.quantity || 0)
        case 'protein-desc':
          return (recipeB.totalNutrients?.PROCNT?.quantity || 0) - (recipeA.totalNutrients?.PROCNT?.quantity || 0)
        case 'time':
          return (recipeA.totalTime || 0) - (recipeB.totalTime || 0)
        case 'name':
          return recipeA.label.localeCompare(recipeB.label)
        default:
          return 0
      }
    })
  }

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters)
  }, [])

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy)
  }, [])

  const getRandomRecipe = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      setHasSearched(true)

      const randomRecipe = await recipeApi.getRandomRecipe()
      setRecipes([randomRecipe])
    } catch (err) {
      setError('Failed to get random recipe. Please try again.')
      console.error('Random recipe error:', err)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, [])

  const searchByCategory = useCallback(async (category) => {
    try {
      setLoading(true)
      setError(null)
      setHasSearched(true)

      const data = await recipeApi.getRecipesByCategory(category)
      let recipeResults = data.hits || []

      // Apply sorting
      if (sortBy !== 'relevance') {
        recipeResults = sortRecipes(recipeResults, sortBy)
      }

      setRecipes(recipeResults)
      
      // Update URL parameters
      setSearchParams({ category })
    } catch (err) {
      setError('Failed to load recipes for this category. Please try again.')
      console.error('Category search error:', err)
      setRecipes([])
    } finally {
      setLoading(false)
    }
  }, [sortBy, setSearchParams])

  // Handle URL parameters on component mount
  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      searchByCategory(category)
    }
  }, [searchParams, searchByCategory])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Searching for recipes...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Search Error</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            <strong>Powered by TheMealDB:</strong> Free recipe database with thousands of recipes from around the world.
            Visit <a href="https://www.themealdb.com/" target="_blank" rel="noopener noreferrer" className="alert-link">
              TheMealDB.com
            </a> to learn more.
          </p>
        </div>
      )
    }

    if (hasSearched && recipes.length === 0) {
      const category = searchParams.get('category')
      return (
        <div className="text-center py-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {category ? `No ${category} recipes found` : 'No recipes found'}
              </h5>
              <p className="card-text">
                {category ? (
                  <>
                    We couldn't find any <strong>{category}</strong> recipes at the moment. 
                    Try searching with different keywords or browse other categories.
                  </>
                ) : (
                  'Try searching with different keywords or adjust your filters.'
                )}
              </p>
              <p className="text-muted">
                <small>
                  <strong>Powered by TheMealDB:</strong> Free recipe database with thousands of recipes from around the world.
                </small>
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (!hasSearched) {
      return (
        <div className="text-center py-5">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Welcome to Recipe Finder!</h2>
              <p className="card-text">
                Discover amazing recipes from around the world. Search for your favorite dishes, 
                explore different cuisines, and save recipes to your favorites.
              </p>
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">🔍 Search</h5>
                      <p className="card-text">Find recipes by ingredients, dish names, or cuisine types.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">❤️ Favorites</h5>
                      <p className="card-text">Save your favorite recipes and access them anytime.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">📊 Nutrition</h5>
                      <p className="card-text">View detailed nutrition information for each recipe.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        {recipes.map((recipe, index) => (
          <RecipeCard key={recipe.recipe.uri || index} recipe={recipe} />
        ))}
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="fade-in">
            <h1 className="text-center mb-4 display-4 fw-bold">
              <span className="text-gradient">🍳 Recipe Finder</span>
            </h1>
            <p className="text-center mb-5 text-muted fs-5">
              {searchParams.get('category') ? (
                <>
                  Discover amazing <strong>{searchParams.get('category')}</strong> recipes from around the world
                </>
              ) : (
                'Discover amazing recipes from around the world'
              )}
            </p>
            
            {searchParams.get('category') && (
              <div className="text-center mb-4">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                      <Link to="/" className="text-decoration-none">
                        <i className="fas fa-home me-1"></i>Home
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <i className={`fas ${
                        searchParams.get('category') === 'Breakfast' ? 'fa-sun' :
                        searchParams.get('category') === 'Lunch' ? 'fa-utensils' :
                        searchParams.get('category') === 'Dinner' ? 'fa-moon' :
                        searchParams.get('category') === 'Dessert' ? 'fa-ice-cream' : 'fa-tag'
                      } me-1`}></i>
                      {searchParams.get('category')}
                    </li>
                  </ol>
                </nav>
              </div>
            )}
          </div>
          
          <div className="slide-in-left">
            <SearchBar onSearch={searchRecipes} loading={loading} />
          </div>
          
          <div className="text-center mb-4 slide-in-right">
            <button
              className="btn btn-outline-success btn-lg px-4"
              onClick={getRandomRecipe}
              disabled={loading}
            >
              <span className="me-2">🎲</span>
              Get Random Recipe
            </button>
          </div>
          
          {hasSearched && (
            <div className="fade-in">
              <FilterBar 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />
            </div>
          )}

          {hasSearched && recipes.length > 0 && (
            <div className="mb-3 fade-in">
              <div className="alert alert-info border-0 shadow-sm d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-info-circle me-2"></i>
                  {searchParams.get('category') ? (
                    <>
                      Found <strong>{recipes.length}</strong> <strong>{searchParams.get('category')}</strong> recipe{recipes.length !== 1 ? 's' : ''}
                    </>
                  ) : (
                    <>
                      Found <strong>{recipes.length}</strong> recipe{recipes.length !== 1 ? 's' : ''} for your search
                    </>
                  )}
                </div>
                {searchParams.get('category') && (
                  <Link 
                    to="/" 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => {
                      setRecipes([])
                      setHasSearched(false)
                      setError(null)
                    }}
                  >
                    <i className="fas fa-times me-1"></i>Clear Category
                  </Link>
                )}
              </div>
            </div>
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Home
