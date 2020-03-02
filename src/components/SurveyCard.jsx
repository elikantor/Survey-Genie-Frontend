import React, { Component } from 'react'
import './surveyCard.css'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class SurveyCards extends Component{


    renderUser = (survey) => {
        let creator = this.props.users.filter(user => user.id === survey.user_id)
        return (
            <div className="userinfo">
                Created by: {creator[0].username} <img src={`${creator[0].image}`} alt="survey-pic"/>
            </div>
        )
    }

    render(){
        let {survey} = this.props
        let respondents = []
        if(survey.user_survey_joiners.length > 0){
            survey.user_survey_joiners.map(joiner => respondents.push(joiner.user_id))
        }
        let taken = () => respondents.includes(this.props.user.id)
        
        return(
            <div className="survey-card">
            <strong><p> {survey.name} </p></strong>
            {this.renderUser(survey)}
                <Menu >
                    {!taken() ? <Menu.Item> 
                        <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                    </Menu.Item> : "Responses Submitted!"}
                    <Menu.Item> 
                        <NavLink to={`/results/${survey.id}`}>See Results</NavLink>
                    </Menu.Item>
                    {this.props.token?<Menu.Item> 
                        <button onClick={()=>this.props.deleteSurvey(survey.id)}>Delete Survey</button>
                    </Menu.Item>: null}
                </Menu>
        </div>
        )
    }
}