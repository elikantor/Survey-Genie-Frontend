import React from 'react';
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SurveyContainer from './components/SurveyContainer'
import Results from './components/Results'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import CreateSurvey from './components/CreateSurvey'
const userUrl = "http://localhost:3000/users"
let surveyUrl = "http://localhost:3000/surveys"
let answerUrl = "http://localhost:3000/answers"


class App extends React.Component{
  
  state = {
    users: [],
    surveys: [],
    questions: [],
    answers: [],
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
    checkbox_answers: [],
    name: "",
    createdQuestions: [],
    counter: 1
  }

  // fetches Users, Surveys, Questions, and Answers
  componentDidMount(){
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token")

      fetch("http://localhost:3000/persist", {
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
            this.props.history.push("/profile")
          })
        }
      })
    }

    fetch(`${userUrl}`)
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
      surveys.map(survey => {
          survey.questions.map(question=> questions.push(question))
          return null
      })
      let answers = []
      questions.map(question => {
        question.answers.map(answer=> answers.push(answer))
        return null
      })
      this.setState({
          users: data,
          surveys: surveys,
          questions: questions,
          answers: answers
      })
    })
  }


//CreateSurvey Methods  
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

    fetch(`${surveyUrl}`, {
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
        this.setState({
          surveys: [...this.state.surveys, data],
          createdQuestions: [],
          name: ""
        }, () => {
          this.props.history.push(`/profile/${this.state.user.id}`)
        })
    })
  }

  //controls CreateSurvey Form
  handleChange = (event) => {
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

//Answer Survey Methods
  //Posts answers to backend and updates frontend
  submitAnswers = (surveyResult, surveyArr, e) => {
    e.preventDefault()
    let arr = []
    
    for (let el of surveyArr.questions){
      const foundQuestion = surveyResult.find(obj => obj.question === el.content )
      if(foundQuestion){
        const backendAnswerToBeUpdated = el.answers.find(a => a.content === foundQuestion.answer)
        backendAnswerToBeUpdated.total ++
        arr.push(backendAnswerToBeUpdated)
      }
    }

    let i = 0
    while(i< arr.length){
      fetch(`${answerUrl}/${arr[i].id}`, {
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
    this.setState({
      survey_id: 0,
      surveyResult: [],
      checkbox_answers: []
    }, ()=> this.props.history.push(`/results/${surveyArr.id}`))
  }

  //controls surveyform when being answered
  saveAnswer = (Qs, event) => {
    let currentState = this.state.checkbox_answers
    if(currentState.includes(event.target.value)){
        let newState = []
        newState = currentState.filter(ele => ele !== event.target.value)
        this.setState({
        checkbox_answers: newState
        })
    } else {
        let newState = []
        let questionObj = Qs.filter(ele => ele.content === event.target.name)
        let ansArr = questionObj[0].answers.map(ele=>ele.content)
        
        currentState.map(ele => {
          if(ansArr.includes(ele)){
              return null
          } else {
              newState.push(ele)
              return null
          }
        })
        newState.push(event.target.value)
        this.setState({
        checkbox_answers: newState
        })
    }
    let surveyObj = {
        question: event.target.name,
        answer: event.target.value
    }
    let y = []
    
    this.state.surveyResult.map(ele => {
        if(ele.question.includes(event.target.name)){
            return null
        } else {
            y.push(ele)
            return null
        }
    })
    y.push(surveyObj)
    this.setState({
        surveyResult: y
    })
  }

//login
  handleLoginSubmit = (userInfo) => {
    fetch("http://localhost:3000/login", {
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
    fetch("http://localhost:3000/users", {
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
        // debugger
        this.setState({
          users: [...this.state.users, data.user],
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
      return <Profile token={this.state.token} deleteSurvey={this.deleteSurvey} user={this.state.user} users={this.state.users} surveys={this.state.surveys} routerProps={routerProps} />
  }

// renders survey results
  renderResults = (routerProps) => {
    let survey = this.state.surveys.find(survey => survey.id === parseInt(routerProps.match.params.id))
    if (survey){
      return <Results survey={survey} {...routerProps} />
    } else {
      return <p>LOADING</p>
    }
  }

  deleteSurvey = (surveyId) => {
    fetch(`${surveyUrl}/${surveyId}`, {
      method: "DELETE"
    })
    .then(r=>r.json())
    .then(data=>{
      let surveyArr = this.state.surveys.filter(survey=> survey.id !== surveyId)
      this.setState({
        surveys: surveyArr
      })
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
            <Route exact path="/surveys" render={(routerProps) => <SurveyContainer surveys={this.state.surveys} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers} users={this.state.users} surveyResult={this.state.surveyResult} routerProps={routerProps}/> } />
            <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer surveys={this.state.surveys} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers} users={this.state.users} surveyResult={this.state.surveyResult} checkbox_answers={this.state.checkbox_answers} routerProps={routerProps} saveAnswer={this.saveAnswer}/> } />
            <Route path="/results/:id" render={(routerProps) => this.renderResults(routerProps) } />
            <Route path="/createsurvey" render={() => <CreateSurvey name={this.state.name} questions={this.state.createdQuestions} addQuestion={this.addQuestion} handleQuestionChange={this.handleQuestionChange} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user}/>} />
            <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
