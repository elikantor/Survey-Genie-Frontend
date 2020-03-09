import React, { Component } from 'react'
import SurveyCards from './SurveyCard'
import Survey from './Survey'
import {connect} from 'react-redux'
import { Card } from 'semantic-ui-react'
import './surveyContainer.css'

class SurveyContainer extends Component{

    state = {
        title: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showSurveys = () => {
        let titleFilter = this.props.surveys.filter(survey=> survey.name.toLowerCase().includes(this.state.title))

        return(
            this.state.title === "" ?
            <Card.Group itemsPerRow={3}>
                {this.props.surveys.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
            :
            <Card.Group itemsPerRow={3}>
                {titleFilter.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
        )
    }

    conditional = () => {
        let {title} = this.state
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                <br></br>
                <p>Filter Surveys by Title</p><input type="text" autoComplete="off" name="title" value={title} onChange={this.handleChange}/>
                {this.props.users[0] ? this.showSurveys() : null}
            </div>)
    }

    renderSurvey = (surveyId) => {
        let survey=this.props.surveys.find(survey=>survey.id===parseInt(surveyId))
        let creator=this.props.users.find(user=>user.id === survey.user_id)

        return (
            <div className="survey">
                <Survey survey={survey} user={this.props.user} creator={creator} submitAnswers={this.props.submitAnswers} checkbox_answers={this.props.checkbox_answers} saveAnswer={this.props.saveAnswer}/>
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

const MSTP = (state) => {
    return {
        users: state.dataReducer.users,
        surveys: state.dataReducer.surveys
    } 
}

export default connect(MSTP)(SurveyContainer)