import React from 'react';
import NavBar from './components/NavBar'
import Home from './components/Home'
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import SurveyContainer from './components/SurveyContainer'
import Results from './components/Results'
import Form from './components/Form'
import Profile from './components/Profile'
import CreateSurvey from './components/CreateSurvey'
const userUrl = "http://localhost:3000/users"

class App extends React.Component{
  
  
  state = {
    user: {
      username: "",
      id: 0
    },
    users: [],
    survey_id: 0,
    survey: [],
    checkbox_answers: [],
    token: ""
  }

  componentDidMount(){
    fetch(`${userUrl}`)
    .then(r=>r.json())
    .then(data=>{
        this.setState({
            users: data
        })
    })
}

  saveAnswer = (answers, event) => {
    let currentState = this.state.checkbox_answers
    if(currentState.includes(event.target.value)){
        let newState = []
        newState = currentState.filter(ele => ele !== event.target.value)
        this.setState({
        checkbox_answers: newState
        })
    } else {
        let newState = []
        let questionObj = answers.filter(ele => ele.content === event.target.name)
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
    let z = this.state.survey.map(ele => {
        if(ele.question.includes(event.target.name)){
            return null
        } else {
            y.push(ele)
            return null
        }
    })
    y.push(surveyObj)
    this.setState({
        survey: y
    })
}

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
        this.setState({
          user: data.user,
          token: data.token
        }, () => {
          this.props.history.push(`/`)
        })
      }
    })
  }

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

  renderProfile = (routerProps) => {
    let user = this.state.users.filter(user => user.id === parseInt(routerProps.match.params.id))
    return <Profile user={user} routerProps={routerProps} />
  }
  
  render(){
    return (
      <div className="App">
        <NavBar token={this.state.token} signout={this.signout} />
        <Switch>
            <Route path="/" exact render={() => <Home /> } />
            <Route path="/login" render={ this.renderForm } />
            <Route path="/signup" render={ this.renderForm } />
            <Route path="/profile/:id" render={ this.renderProfile } />
            <Route exact path="/surveys" render={(routerProps) => <SurveyContainer users={this.state.users} routerProps={routerProps}/> } />
            <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer users={this.state.users} survey={this.state.survey} checkbox_answers={this.state.checkbox_answers} routerProps={routerProps} saveAnswer={this.saveAnswer}/> } />
            <Route path="/results" render={() => <Results survey={this.state}/> } />
            <Route path="/createsurvey" render={() => <CreateSurvey/>} />
            <Route render={ () => <p>Page not Found</p> } />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
