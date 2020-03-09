const initialState = {
    favorites: []
}

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
    //   case "INITIALIZE_FAVORITES":
    //     return {favorites: action.payload}
      case "ADD_FAVORITE":
        let newFavorite = action.payload
        let newArray = [state.favorites, newFavorite]
        return {favorites: newArray}
      case "REMOVE_FAVORITE":
        return {favorites: action.payload.favorites}
    
      default: {
        return state;
      }
    }
}

export default favoriteReducer