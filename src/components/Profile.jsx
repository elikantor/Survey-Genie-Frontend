import React, { Component } from 'react';
import SurveyCards from './SurveyCard'
import Survey from './Survey'
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

class Profile extends Component {

    showSurveys = () => {
        return <SurveyCards key={this.props.user[0].id} survey={this.props.user[0].surveys} creator={this.props.user[0].username}/>
    }

    conditional = () => {
        console.log(this.props)
        return(this.props.routerProps.location.pathname.includes("/survey") ? this.renderSurvey(this.props.routerProps.match.params.id) :
            <div className="survey-container">
                <h1>{this.props.user[0].username}'s Surveys</h1>
                { this.showSurveys() }
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


  render() {
    return (
        <div className="conditional">
            {this.conditional()}
            <br></br>
            <Menu>
                <Menu.Item> 
                    <NavLink to="/createsurvey">Create Survey</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
  }

}

export default Profile;