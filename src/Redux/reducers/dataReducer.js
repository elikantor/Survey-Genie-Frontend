const initialState = {
    users: [],
    surveys: [],
    questions: [],
    answers: [],
    favorites: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "INITIALIZE_USERS":
        return {...state, users: action.payload.users}
      case "INITIALIZE_SURVEYS":
        return {...state, surveys: action.payload.surveys}
      case "INITIALIZE_QUESTIONS":
        return {...state, questions: action.payload.questions}
      case "INITIALIZE_ANSWERS":
        return {...state, answers: action.payload.answers}
      case "ADD_SURVEY":
        let newSurvey = action.payload
        let newArray = [...state.surveys, newSurvey]
        return {...state, surveys: newArray}
      case "ADD_USER":
        let newUser = action.payload
        let newState = [...state.users, newUser]
        return {...state, users: newState}

      default: {
        return state;
      }
    }
}

export default dataReducer