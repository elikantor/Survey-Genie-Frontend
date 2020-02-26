import React from 'react';
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
//component imports
import NavBar from './components/NavBar'
import Home from './components/Home'
import SurveyContainer from './components/SurveyContainer'
import Results from './components/Results'
import Form from './components/Form'
import Profile from './components/Profile'
import CreateSurvey from './components/CreateSurvey'
//fetch URLs
const userUrl = "http://localhost:3000/users"
let surveyUrl = "http://localhost:3000/surveys"
let answerUrl = "http://localhost:3000/answers"

class App extends React.Component{
  
  state = {
    users: [],
    surveys: [],
    user: {
      username: "",
      id: 0
    },
    survey_id: 0,
    surveyResult: [],
    checkbox_answers: [],
    token: "",
    name: "",
    questions: [],
    counter: 1
  }

  // fetches Users & Surveys
  componentDidMount(){
    fetch(`${userUrl}`)
    .then(r=>r.json())
    .then(data=>{
        this.setState({
            users: data
        })
    })
    fetch(`${surveyUrl}`)
    .then(r=>r.json())
    .then(data=>{
        this.setState({
            surveys: data
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
    let newState = this.state.questions
    let index = state.number - 1
    newState.splice(index, 1, state)
    this.setState({
        questions: newState
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
        questions: [...this.state.questions, newQuestion]
    })
  }

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
          questions: [],
          name: ""
        }, ()=> this.props.history.push(`/profile/${this.state.user.id}`))
    })
  }

//provides control of survey when survey is being answered
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
        let x = currentState.map(ele => {
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
    let z = this.state.surveyResult.map(ele => {
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
  handleRegisterSubmit = (userInfo) => {
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

  //renders login & signup forms
  renderForm = (routerProps) => {
    if(routerProps.location.pathname === "/login"){
      return <Form formName="Login Form" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/signup") {
      return <Form formName="Sign Up Form" handleSubmit={this.handleRegisterSubmit}/>
    }
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
    let user = this.state.users.filter(user => user.id === parseInt(routerProps.match.params.id))
    if(user) {
      return <Profile token={this.state.token} deleteSurvey={this.deleteSurvey} users={this.state.users} user={user} surveys={this.state.surveys} routerProps={routerProps} />
    } else {
      return <p>LOADING</p>
    }
  
  }

// renders survey results
  renderResults = (routerProps) => {
    let survey = this.state.surveys.find(survey => survey.id === parseInt(routerProps.match.params.id))
    console.log(survey)
    if (survey){
      return <Results survey={survey} {...routerProps} />
    } else {
      return <p>LOADING</p>
    }
  }

  //updates survey results
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

    arr.forEach(ele => {
      fetch(`${answerUrl}/${ele.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          total: ele.total
        })
      })
    })
    fetch(`${surveyUrl}`)
    .then(r=>r.json())
    .then(data=>{
      this.setState({
        surveys: data
      })
    })
    this.setState({
      survey_id: 0,
      surveyResult: [],
      checkbox_answers: []
    }, ()=> this.props.history.push(`/results/${surveyArr.id}`))
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
    this.props.history.push(`/surveys`)
  }
  
  render(){
    return (
      <div className="App">
        <NavBar token={this.state.token} signout={this.signout} user={this.state.user} />
        <Switch>
            <Route path="/" exact render={() => <Home /> } />
            <Route path="/login" render={ this.renderForm } />
            <Route path="/signup" render={ this.renderForm } />
            <Route path="/profile/:id" render={(routerProps)=> this.renderProfile(routerProps) } />
            <Route exact path="/surveys" render={(routerProps) => <SurveyContainer surveys={this.state.surveys} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers} users={this.state.users} surveyResult={this.state.surveyResult} routerProps={routerProps}/> } />
            <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer surveys={this.state.surveys} deleteSurvey={this.deleteSurvey} submitAnswers={this.submitAnswers} users={this.state.users} surveyResult={this.state.surveyResult} checkbox_answers={this.state.checkbox_answers} routerProps={routerProps} saveAnswer={this.saveAnswer}/> } />
            <Route path="/results/:id" render={(routerProps) => this.renderResults(routerProps) } />
            <Route path="/createsurvey" render={() => <CreateSurvey name={this.state.name} questions={this.state.questions} addQuestion={this.addQuestion} handleQuestionChange={this.handleQuestionChange} handleChange={this.handleChange} handleSubmit={this.handleSubmit} user={this.state.user}/>} />
            <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
