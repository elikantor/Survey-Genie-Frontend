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