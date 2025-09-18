import { useState, useEffect } from 'react'

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [query])

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery)
    }
  }, [debouncedQuery, onSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
    setDebouncedQuery('')
  }

  return (
    <div className="search-bar mb-4">
      <form onSubmit={handleSubmit} className="row g-2">
        <div className="col-md-8">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search for recipes (e.g., chicken, pasta, dessert)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={loading}
            />
            {query && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleClear}
                disabled={loading}
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading || !query.trim()}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Searching...
              </>
            ) : (
              'Search Recipes'
            )}
          </button>
        </div>
      </form>
      
      {query && !debouncedQuery && (
        <div className="text-muted mt-2">
          <small>Type to search automatically...</small>
        </div>
      )}
    </div>
  )
}

export default SearchBar
