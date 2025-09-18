# Recipe Finder 🍳

A modern React web application for discovering and managing recipes. Search for recipes, view detailed information, save favorites, and explore different cuisines and dietary preferences.

## Features ✨

- **Recipe Search**: Search for recipes using keywords, ingredients, or dish names
- **Advanced Filtering**: Filter by category, cuisine/area, and sort by various criteria
- **Recipe Details**: View comprehensive recipe information including ingredients, step-by-step instructions, and nutrition
- **YouTube Integration**: Watch cooking tutorials directly in the app
- **Random Recipe Generator**: Discover new recipes with the random recipe feature
- **Favorites System**: Save and manage your favorite recipes with localStorage persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators and error handling
- **Debounced Search**: Optimized search with automatic debouncing

## Tech Stack 🛠️

- **Frontend**: React 19 with Hooks (useState, useEffect, useContext)
- **Routing**: React Router DOM
- **Styling**: Bootstrap 5 (as per user preference)
- **API Integration**: TheMealDB API (completely free, no API key required)
- **State Management**: React Context API for favorites
- **Build Tool**: Vite

## Getting Started 🚀

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd recipe-finder
```

2. Install dependencies:
```bash
npm install
```

3. No API keys required! The app uses TheMealDB API which is completely free.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## API Configuration 🔧

The app uses **TheMealDB API** which is completely free and requires no API keys!

### TheMealDB Features

- **Completely Free**: No API key required, no rate limits for basic usage
- **Rich Data**: Includes ingredients, instructions, YouTube videos, categories, and cuisine types
- **Global Recipes**: Thousands of recipes from around the world
- **Community Supported**: Maintained by a passionate community

### Available Endpoints Used

- Search recipes by name or ingredient
- Get recipe details with full instructions
- Random recipe generator
- Filter by category and cuisine/area
- YouTube video integration for cooking tutorials

Visit [TheMealDB.com](https://www.themealdb.com/) to learn more about the API.

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── Home.jsx        # Main home page with search and results
│   ├── Navbar.jsx      # Navigation bar
│   ├── SearchBar.jsx   # Search input with debouncing
│   ├── FilterBar.jsx   # Filtering and sorting controls
│   ├── RecipeCard.jsx  # Individual recipe card component
│   ├── RecipeDetails.jsx # Detailed recipe view
│   └── Favorites.jsx   # Favorites management page
├── contexts/           # React Context providers
│   └── FavoritesContext.jsx # Favorites state management
├── services/           # API services
│   └── recipeApi.js    # Recipe API integration
├── App.jsx            # Main app component with routing
└── main.jsx           # App entry point
```

## Key Features Implementation 🎯

### 1. Search with Debouncing
- Automatic search after 500ms of typing inactivity
- Loading states and error handling
- Fallback API support

### 2. Recipe Cards
- Responsive grid layout
- Hover effects and animations
- Quick favorite toggle
- Category and cuisine badges
- Nutrition information

### 3. Favorites System
- localStorage persistence
- Context API for state management
- Add/remove functionality
- Favorites counter in navigation

### 4. Filtering & Sorting
- Filter by category and cuisine/area
- Sort by calories, protein, cooking time, name
- Clear filters functionality
- Dynamic filter options loaded from API

### 5. Responsive Design
- Bootstrap grid system
- Mobile-first approach
- Collapsible navigation
- Optimized card layouts

## Available Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is open source and available under the [MIT License](LICENSE).

## Demo Notes 📝

- The app works with TheMealDB API out of the box - no configuration needed!
- All features are fully functional including YouTube videos and detailed instructions
- The app includes comprehensive error handling and user feedback
- Random recipe generator for discovering new dishes

## Future Enhancements 🚀

- Dark mode toggle
- Recipe sharing functionality
- Shopping list generation
- User accounts and cloud sync
- Recipe rating and reviews
- Meal planning features# Recipe-Finder
