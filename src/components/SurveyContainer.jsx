import React, { Component } from 'react'
import SurveyCards from './SurveyCard'

const userUrl = "http://localhost:3000/users"

export default class SurveyContainer extends Component{

    state = {
        users: []
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

    showSurveys = () => {
        let surveyObjs = this.state.users.map(user=> [user.surveys, user.username])
        console.log(surveyObjs)
        return surveyObjs.map(surveyObj => <SurveyCards key={surveyObj.id} survey={surveyObj[0]} creator={surveyObj[1]}/>)
    }



    render(){
        return(
          <div className="survey-container">
              <h1>All Surveys</h1>
              {this.state.users[0] ? this.showSurveys() : null}
          </div>
        )
    }
}