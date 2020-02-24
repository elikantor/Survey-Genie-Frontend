import React, { Component } from 'react'
import SurveyCards from './SurveyCard'
import Survey from './Survey'

export default class SurveyContainer extends Component{

    showSurveys = () => {
        let surveyObjs = []
        let a = this.props.users.map(user=> {
            if(user.surveys.length === 0){
                return null
            } else {
            surveyObjs.push([user.surveys, user.username])
                return null
            }
        })
        return surveyObjs.map(surveyObj => <SurveyCards key={surveyObj.id} survey={surveyObj[0]} creator={surveyObj[1]}/>)
    }

    conditional = () => {
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                {this.props.users[0] ? this.showSurveys() : null}
            </div>)
    }

    renderSurvey = (surveyId) => {
        let surveyArrs = []
        let b = this.props.users.map(user=> {
            if(user.surveys.length ===0){
                return null
            } else {
                surveyArrs.push([user.surveys, user.username])
                return null
            }
        })
        let surveyArr = surveyArrs.filter(surveyArr=> surveyArr[0][0].id === parseInt(surveyId) )
        return (
            <div className="survey">
                <Survey surveyArr={surveyArr} survey={this.props.survey} checkbox_answers={this.props.checkbox_answers} saveAnswer={this.props.saveAnswer}/>
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