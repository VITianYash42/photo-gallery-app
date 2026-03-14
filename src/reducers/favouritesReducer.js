// Initial state reads from localStorage to persist favourites across page reloads
export const initialFavouritesState = JSON.parse(localStorage.getItem('favourites')) || [];

/**
 * useReducer is used here to cleanly organize state logic that involves multiple steps
 * (checking existence, filtering, or appending) into predictable actions. 
 * This makes the state transitions highly predictable and easy to test.
 */
export const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.some(photo => photo.id === action.payload.id);
      let newState;
      
      if (isFavourite) {
        // If it's already favourited, remove it
        newState = state.filter(photo => photo.id !== action.payload.id);
      } else {
        // If it's not and we toggle, add it
        newState = [...state, action.payload];
      }

      // Synchronize the new state with localStorage immediately
      localStorage.setItem('favourites', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};
