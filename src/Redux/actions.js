export const setFilter = (filter) => { 
    return { 
        type: "SET_CHART_TYPE", 
        payload: filter
    }
}

export const initializeUsers = (users) => { 
    return { 
        type: "INITIALIZE_USERS", 
        payload: users
    }
}

export const initializeSurveys = (surveys) => { 
    // debugger
    return { 
        type: "INITIALIZE_SURVEYS", 
        payload: surveys
    }
}

export const initializeQuestions = (questions) => { 
    return { 
        type: "INITIALIZE_QUESTIONS", 
        payload: questions
    }
}

export const initializeAnswers = (answers) => { 
    return { 
        type: "INITIALIZE_ANSWERS", 
        payload: answers
    }
}

export const addSurvey = (survey) => { 
    return { 
        type: "ADD_SURVEY", 
        payload: survey
    }
}

export const addUser = (user) => { 
    return { 
        type: "ADD_USER", 
        payload: user
    }
}

export const initializeFavorites = (favorites) => { 
    return { 
        type: "INITIALIZE_FAVORITES", 
        payload: favorites
    }
}

export const favorite = (favorite) => { 
    return { 
        type: "ADD_FAVORITE", 
        payload: favorite
    }
}

export const unfavorite = (favorite) => { 
    return { 
        type: "DELETE_FAVORITE", 
        payload: favorite
    }
}