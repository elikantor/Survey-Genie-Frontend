import React, { Component } from 'react'
import SurveyCards from './SurveyCard'
import Survey from './Survey'
import {connect} from 'react-redux'
import { Card, Input, Radio } from 'semantic-ui-react'
import './surveyContainer.css'

class SurveyContainer extends Component{

    state = {
        title: "",
        responded: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showTaken = () => {
        this.setState({
            responded: !this.state.responded
        })
    }

    showSurveys = () => {
        let {surveys, user} = this.props
        let titleFilter = surveys.filter(survey=> survey.name.toLowerCase().includes(this.state.title.toLowerCase()))
        let takenSurveyIds = []

        surveys.map(survey=> survey.user_survey_joiners.map(joiner=>{
            if(joiner.user_id===user.id){
                takenSurveyIds.push(joiner.survey_id)
            }
            return null
        }))

        let takenSurveys = surveys.filter(survey=> takenSurveyIds.includes(survey.id))
        let titleAndTakenFilter = takenSurveys.filter(survey=> survey.name.toLowerCase().includes(this.state.title.toLowerCase()))

        return(
            this.state.title === "" && !this.state.responded ?
            <Card.Group itemsPerRow={3}>
                {this.props.surveys.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
            :
            !this.state.responded ?
            <Card.Group itemsPerRow={3}>
                {titleFilter.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
            :
            this.state.title !== "" ?
            <Card.Group itemsPerRow={3}>
                {titleAndTakenFilter.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
            :
            <Card.Group itemsPerRow={3}>
                {takenSurveys.map(survey => <SurveyCards user={this.props.user} survey={survey} deleteSurvey={this.props.deleteSurvey} key={survey.id}/>)}
            </Card.Group>
        )
    }

    conditional = () => {
        let {title} = this.state
        return(this.props.routerProps.match.params.id ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>All Surveys</h1>
                <div className='input'>
                    <Input placeholder="Filter by title..." type="text" autoComplete="off" name="title" value={title} onChange={this.handleChange}/><br></br>
                </div>
                <Radio label="Show Only Surveys I've Taken" checked={this.state.responded} onClick={this.showTaken}/>
                <br></br>
                <div className="survey-cards">
                    {this.showSurveys()}
                </div>
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