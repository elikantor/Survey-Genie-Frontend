import React, { Component } from 'react'
import SurveyCards from './SurveyCard'
import Survey from './Survey'
import { Card } from 'semantic-ui-react'
import './surveyContainer.css'

export default class SurveyContainer extends Component{

    showSurveys = () => {
        return( 
            <Card.Group itemsPerRow={3}>
                {this.props.surveys.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id} users={this.props.users}/>)}
            </Card.Group>
        )
    }

    conditional = () => {
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                <br></br>
                {this.props.users[0] ? this.showSurveys() : null}
            </div>)
    }

    renderSurvey = (surveyId) => {
        let survey=this.props.surveys.find(survey=>survey.id===parseInt(surveyId))
        let creator=this.props.users.find(user=>user.id === survey.user_id)

        return (
            <div className="survey">
                <Survey survey={survey} user={this.props.user} creator={creator} submitAnswers={this.props.submitAnswers} surveyResult={this.props.surveyResult} checkbox_answers={this.props.checkbox_answers} saveAnswer={this.props.saveAnswer}/>
            </div>
        )
    }

    render(){
        return(
            <div className="conditional">
                {this.conditional()}
            </div>
        )
    }
}