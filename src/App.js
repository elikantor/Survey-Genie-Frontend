import React from 'react';
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {initializeFavorites, addUser, addSurvey, initializeUsers, initializeSurveys, initializeQuestions, initializeAnswers} from './Redux/actions'

//components
import NavBar from './components/NavBar'
import Home from './components/Home'
import SurveyContainer from './components/SurveyContainer'
import Results from './components/Results'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import CreateSurvey from './components/CreateSurvey'
import Footer from './components/Footer'
import Favorites from './components/Favorites'

const API = "https://survey-genie-api.herokuapp.com"

class App extends React.Component{
  
  state = {
    user: {
      username: "",
      interest: "",
      email: "",
      image: "",
      id: 0
    },
    token: "",
    survey_id: 0,
    surveyResult: [],
    name: "",
    createdQuestions: [],
    counter: 1
  }

  // fetches Users, Surveys, Questions, and Answers
  componentDidMount(){
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")

      fetch(`${API}/persist`, {
        headers: {
          "Authorization": `bearer ${token}`
        }
      })
      .then(r => r.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          this.setState({
            user: data.user,
            token: data.token
          }, () => {
            this.props.history.push(`/profile/${this.state.user.id}`)
          })
        }
      })
    }

    fetch(`${API}/users`)
    .then(r=>r.json())
    .then(data=>{
      let surveys = []
      data.map(user => {
        if(user.surveys.length > 0){
          user.surveys.map(survey=> surveys.push(survey))
        }
        return null
      })
      
      let questions = []
      let favorites = []
      surveys.map(survey => {
          if(survey.favorites.length > 0){
            survey.favorites.map(favorite=> favorites.push(favorite))
          }
          survey.questions.map(question=> questions.push(question))
          return null
      })
      let answers = []
      questions.map(question => {
        question.answers.map(answer=> answers.push(answer))
        return null
      })

      this.props.initializeUsers({users: data})
      this.props.initializeSurveys({surveys: surveys})
      this.props.initializeFavorites({favorites: favorites})
      this.props.initializeQuestions({questions: questions})
      this.props.initializeAnswers({answers: answers})

    })
  }


//Survey Creation Methods  
  //Submits newly CreatedSurvey
  handleSubmit = (questions) => {
    let postObj = questions.map(question => {
        return {
            content: question.question,
            answers: [
                {content: question.a1},
                {content: question.a2},
                {content: question.a3},
                {content: question.a4},
                {content: question.a5},
            ]
        }
    })

    fetch(`${API}/surveys`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: this.state.name,
            questions: postObj,
            user_id: this.state.user.id
        })
    })
    .then(r=>r.json())
    .then(data => {
      this.props.addSurvey(data)
      this.setState({
        createdQuestions: [],
        name: "",
        counter: 1
      }, () => {
        this.props.history.push(`/profile/${this.state.user.id}`)
      })

    })
  }

  //controls CreateSurvey Form
  handleSurveyTitleChange = (event) => {
    this.setState({
        [event.target.name]:event.target.value
    })
  }

  //used to CreateSurvey
  handleQuestionChange = (state) => {
    let newState = this.state.createdQuestions
    let index = state.number - 1
    newState.splice(index, 1, state)
    this.setState({
        createdQuestions: newState
    })
  }

  //adds questions to CreateSurvey
  addQuestion = () => {
    let newQuestion = {
        number: this.state.counter,
        question: "",
        a1: "",
        a2: "",
        a3: "",
        a4: "",
        a5: ""
    }
    this.setState({
        counter: this.state.counter + 1,
        createdQuestions: [...this.state.createdQuestions, newQuestion]
    })
  }

  cancelSurvey = () => {
    this.setState({
      createdQuestions: [],
      name: "",
      counter: 1
    }, () => this.props.history.push(`/profile/${this.state.user.id}`))
  }

//Methods to Answer Survey  
  //Posts answers to backend and updates frontend
  submitAnswers = (survey, user, e) => {
    e.preventDefault()
    let arr = []
    
    /* surveyResult includes object that has question property and answer property, which is used to
    update results on backend*/
    for (let el of survey.questions){
      const foundQuestion = this.state.surveyResult.find(obj => obj.question === el.content )
      if(foundQuestion){
        const backendAnswerToBeUpdated = el.answers.find(a => a.content === foundQuestion.answer)
        backendAnswerToBeUpdated.total ++
        arr.push(backendAnswerToBeUpdated)
      }
    }

    let i = 0
    while(i< arr.length){
      fetch(`${API}/answers/${arr[i].id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: arr[i].id,
          content: arr[i].content,
          total: arr[i].total
        })
      })
      .then(r=>r.json())
      .then(data=>{
        this.setState({...this.state})
      })
      i++
    }
    
    fetch(`${API}/user_survey_joiners`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        survey_id: survey.id
      })
    })
    .then(r=>r.json())
    .then(data=> {
      survey.user_survey_joiners.push(data)
      let newSurveys = this.props.surveys.filter(surveyObj=> surveyObj.id !== survey.id)
      newSurveys.push(survey)
      this.setState({
        surveys: newSurveys
      })
    }) 

    this.setState({
      survey_id: 0,
      surveyResult: []
    }, ()=> this.props.history.push(`/results/${survey.id}`))
  }

  //controls surveyform when being answered
  //Qs argument is all questions in the survey
  saveAnswer = (questionName, answer) => {
    let surveyObj = {
        question: questionName,
        answer: answer
    }
    let y = []
    
    this.state.surveyResult.map(ele => {
        if(ele.question.includes(questionName)){
            return null
        } else {
            y.push(ele)
            return null
        }
    })
    y.push(surveyObj)

    this.setState({
        surveyResult: y
    },()=>console.log(this.state.surveyResult))
  }

  //handles case where user tries to unclick answer
  removeAnswer = (answer) => {
    let newResults = this.state.surveyResult.filter(obj => {
      return obj.answer !== answer
    })
    this.setState({
      surveyResult: newResults
    },()=>console.log(this.state.surveyResult))
  }

//login
  handleLoginSubmit = (userInfo) => {
    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    .then(data => {
      if (!data.error) {
        localStorage.setItem("token", data.token)
        this.setState({
          user: data.user,
          token: data.token
        }, () => {
          this.props.history.push(`/profile/${this.state.user.id}`)
        })
      }
    })
  }

//signup
  handleSignupSubmit = (userInfo) => {
    fetch(`${API}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(
        userInfo
      )
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      if (!data.error) {
        localStorage.setItem("token", data.token)
        this.props.addUser(data.user)
        this.setState({
          user: data.user,
          token: data.token
        }, () => {
          this.props.history.push(`/profile/${this.state.user.id}`)
        })
      }
    })
  }

  signout = () => {
    localStorage.clear("token")
    this.props.history.push("/")
    this.setState({
      token: ""
    })
  }

//renders User Profile after login or signup
  renderProfile = (routerProps) => {
      return <Profile token={this.state.token} deleteSurvey={this.deleteSurvey} user={this.state.user} routerProps={routerProps} />
  }

// renders survey results
  renderResults = (routerProps) => {
    let survey = this.props.surveys.find(survey => survey.id === parseInt(routerProps.match.params.id))
    if (survey){
      return <Results survey={survey} {...routerProps} />
    } else {
      return <p>LOADING</p>
    }
  }

  deleteSurvey = (surveyId) => {
    fetch(`${API}/surveys/${surveyId}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(data=>{
      let surveyArr = this.props.surveys.filter(survey=> survey.id !== surveyId)
      this.props.initializeSurveys({surveys: surveyArr})
    })
    this.props.history.push(`/profile/${this.state.user.id}`)
  }
  
  render(){
    return (
      <div className="App">
        <NavBar token={this.state.token} signout={this.signout} user={this.state.user} />
        <Switch>
            <Route path="/" exact render={() => <Home /> } />
            <Route path="/login" render={ () => <Login handleSubmit={this.handleLoginSubmit} /> } />
            <Route path="/signup" render={ () => <Signup handleSubmit={this.handleSignupSubmit} /> } />
            <Route exact path="/profile/:id" render={(routerProps)=> this.renderProfile(routerProps) } />
            <Route path="/favorites" render={ (routerProps) => <Favorites user={this.state.user} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitSurveyAnswers}  routerProps={routerProps}/> } />
            <Route exact path="/surveys" render={(routerProps) => <SurveyContainer user={this.state.user} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers}  routerProps={routerProps}/> } />
            <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer user={this.state.user} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers} removeAnswer={this.removeAnswer} routerProps={routerProps} saveAnswer={this.saveAnswer}/> } />
            <Route path="/results/:id" render={(routerProps) => this.renderResults(routerProps) } />
            <Route path="/createsurvey" render={() => <CreateSurvey cancel={this.cancelSurvey} name={this.state.name} questions={this.state.createdQuestions} addQuestion={this.addQuestion} handleQuestionChange={this.handleQuestionChange} handleSurveyTitleChange={this.handleSurveyTitleChange} handleSubmit={this.handleSubmit} user={this.state.user}/>} />
            <Route render={ () => <p>Page not Found</p> } />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const MSTP = (state) => {
  return {surveys: state.dataReducer.surveys}
}

export default connect(MSTP, {initializeFavorites, addUser, addSurvey, initializeUsers, initializeSurveys, initializeQuestions, initializeAnswers})(withRouter(App))
