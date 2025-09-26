import { useState, useEffect } from 'react'
import { FavoritesContext } from './FavoritesContext'

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem('recipe-favorites')
        if (savedFavorites) {
          const parsedFavorites = JSON.parse(savedFavorites)
          setFavorites(parsedFavorites)
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
        setFavorites([])
      }
    }

    loadFavorites()
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'recipe-favorites') {
        loadFavorites()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (favorites.length > 0 || localStorage.getItem('recipe-favorites')) {
      localStorage.setItem('recipe-favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const addToFavorites = (recipe) => {
    setFavorites(prev => {
      // Check if recipe is already in favorites
      const isAlreadyFavorite = prev.some(fav => fav.recipe.uri === recipe.recipe.uri)
      if (isAlreadyFavorite) {
        return prev
      }
      return [...prev, recipe]
    })
  }

  const removeFromFavorites = (recipeUri) => {
    setFavorites(prev => prev.filter(fav => fav.recipe.uri !== recipeUri))
  }

  const isFavorite = (recipeUri) => {
    return favorites.some(fav => fav.recipe.uri === recipeUri)
  }

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.recipe.uri)) {
      removeFromFavorites(recipe.recipe.uri)
    } else {
      addToFavorites(recipe)
    }
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
