const initialState = {
    users: [],
    surveys: [],
    questions: [],
    answers: []
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case "INITIALIZE_USERS":
        return {...state, users: action.payload.users}
      case "INITIALIZE_SURVEYS":
        // debugger
        return {...state, surveys: action.payload.surveys}
      case "INITIALIZE_QUESTIONS":
        return {...state, questions: action.payload.questions}
      case "INITIALIZE_ANSWERS":
        return {...state, answers: action.payload.answers}
      case "ADD_SURVEY":
        let newSurvey = action.payload
        let newArray = [...state.surveys, newSurvey]
        return {...state, surveys: newArray}
    
      default: {
        return state;
      }
    }
}

export default dataReducer