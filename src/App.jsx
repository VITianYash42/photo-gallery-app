import React, { useState, useReducer, useMemo, useCallback } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import { favouritesReducer, initialFavouritesState } from './reducers/favouritesReducer';

function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouritesReducer, initialFavouritesState);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * useCallback memoizes the event handler function.
   * This ensures the function instance remains the same between normal renders,
   * preventing unnecessary re-renders of any child components that might use this handler.
   */
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  /**
   * useMemo caches the computed filtered list of photos.
   * The filtering array manipulation computationally runs ONLY when 'photos' or 'searchQuery' updates.
   * It skips running during other state changes, saving CPU cycles on larger lists.
   */
  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    
    return photos.filter(photo => 
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  const toggleFavourite = (photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Photo Gallery Component</h1>
        
        {/* Search Filter */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search photos by author..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 font-medium p-4 bg-red-100 rounded-lg max-w-2xl mx-auto">
            Error fetching data: {error}
          </div>
        )}

        {/* Photo Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPhotos.map((photo) => {
              const isFav = favourites.some(fav => fav.id === photo.id);
              
              return (
                <div key={photo.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img 
                    src={`https://picsum.photos/id/${photo.id}/600/400`} 
                    alt={`Taken by ${photo.author}`} 
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 flex flex-row justify-between items-center bg-white border-t border-gray-100">
                    <span className="text-gray-800 font-semibold truncate mr-4" title={photo.author}>
                      {photo.author}
                    </span>
                    <button 
                      onClick={() => toggleFavourite(photo)}
                      className="focus:outline-none flex-shrink-0"
                      aria-label="Toggle Favourite"
                      title={isFav ? "Remove from favourites" : "Add to favourites"}
                    >
                      {isFav ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 fill-current" viewBox="0 0 24 24">
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {/* Empty Search Result Fallback */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="text-center text-gray-500 mt-16 text-lg">
            No authors found matching "{searchQuery}".
          </div>
        )}
      </div>

      <footer className="mt-12 py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Yash Singhal. All Rights Reserved.</p>
        <p className="mt-1">Built with React + Vite + Tailwind</p>
      </footer>
    </div>
  );
}

export default App;
