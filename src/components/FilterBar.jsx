import { useState, useEffect } from 'react'
import recipeApi from '../services/recipeApi'

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    area: ''
  })

  const [sortBy, setSortBy] = useState('relevance')
  const [categories, setCategories] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoriesData, areasData] = await Promise.all([
          recipeApi.getCategories(),
          recipeApi.getAreas()
        ])
        setCategories(categoriesData)
        setAreas(areasData)
      } catch (error) {
        console.error('Error loading filter options:', error)
      } finally {
        setLoading(false)
      }
    }

    loadFilterOptions()
  }, [])

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    onSortChange(value)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      area: ''
    }
    setFilters(clearedFilters)
    setSortBy('relevance')
    onFilterChange(clearedFilters)
    onSortChange('relevance')
  }

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '') || sortBy !== 'relevance'

  return (
    <div className="filter-bar mb-4">
      <div className="card">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                disabled={loading}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.strCategory} value={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="area" className="form-label">Cuisine/Area</label>
              <select
                id="area"
                className="form-select"
                value={filters.area}
                onChange={(e) => handleFilterChange('area', e.target.value)}
                disabled={loading}
              >
                <option value="">All Cuisines</option>
                {areas.map((area) => (
                  <option key={area.strArea} value={area.strArea}>
                    {area.strArea}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="sortBy" className="form-label">Sort By</label>
              <select
                id="sortBy"
                className="form-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="calories">Calories (Low to High)</option>
                <option value="calories-desc">Calories (High to Low)</option>
                <option value="protein">Protein (Low to High)</option>
                <option value="protein-desc">Protein (High to Low)</option>
                <option value="time">Cooking Time</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
