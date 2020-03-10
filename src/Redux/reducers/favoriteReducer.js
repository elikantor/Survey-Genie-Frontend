const initialState = {
    favorites: []
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
      case "INITIALIZE_FAVORITES":
        return {favorites: action.payload.favorites}
      case "ADD_FAVORITE":
        let newFavorite = action.payload
        let newArray = [...state.favorites, newFavorite]
        return {favorites: newArray}
      case "DELETE_FAVORITE":
        return {favorites: state.favorites.filter(fav=> fav.id !== action.payload.id)}
    
      default: {
        return state;
      }
    }
}

export default favoriteReducer