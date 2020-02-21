import React, { Component } from 'react'
import SurveyCards from './SurveyCard'
import Survey from './Survey'

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
        return surveyObjs.map(surveyObj => <SurveyCards key={surveyObj.id} survey={surveyObj[0]} creator={surveyObj[1]}/>)
    }

    conditional = () => {
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                {this.state.users[0] ? this.showSurveys() : null}
            </div>)
    }

    renderSurvey = (surveyId) => {
        let surveyObjs = this.state.users.map(user=> [user.surveys, user.username])
        let survey = surveyObjs.filter(survey=> survey.id === surveyId )

        return (
            <div className="survey">
                <Survey survey={survey}/>
            </div>
        )

    }


    render(){
        console.log(this.props.users)
        return(
            <div className="conditional">
                {this.conditional()}
            </div>
        )
    }
}