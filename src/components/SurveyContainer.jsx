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
        return surveyObjs.map(surveyObj => <SurveyCards deleteSurvey={this.props.deleteSurvey} key={surveyObj.id} survey={surveyObj[0]} creator={surveyObj[1]}/>)
    }

    conditional = () => {
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                {this.props.users[0] ? this.showSurveys() : null}
            </div>)
    }

    renderSurvey = (surveyId) => {
        let userSurveyArr = []
        let userSurveyProp = []
        let b = this.props.users.map(user=> {
            if(user.surveys.length === 0){
                return null
            } else {
                userSurveyArr.push([user.surveys, user.username])
                return null
            }
        })
        
        let userArr = userSurveyArr.filter(surveyArr=> { 
                let i = 0
                while(i < surveyArr[0].length){
                    if(surveyArr[0][i].id === parseInt(surveyId)){
                        userSurveyProp.push(surveyArr[0][i])
                        userSurveyProp.push(surveyArr[1])
                    }
                    i++
                }
                return false
        })
        return (
            <div className="survey">
                <Survey submitAnswers={this.props.submitAnswers} userSurveyProp={userSurveyProp} surveyResult={this.props.surveyResult} checkbox_answers={this.props.checkbox_answers} saveAnswer={this.props.saveAnswer}/>
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