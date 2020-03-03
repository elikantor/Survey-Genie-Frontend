const initialState = {
    users: [],
    surveys: [],
    questions: [],
    answers: []
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "INITIALIZE_USERS":
        return {...state, users: action.payload}
      case "INITIALIZE_SURVEYS":
        return {...state, surveys: action.payload}
      case "INITIALIZE_QUESTIONS":
        return {...state, questions: action.payload}
      case "INITIALIZE_ANSWERS":
        return {...state, answers: action.payload}
    
      default: {
        return state;
      }
    }
}