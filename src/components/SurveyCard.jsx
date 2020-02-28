import React, { Component } from 'react'
import './surveyCard.css'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class SurveyCards extends Component{


    renderUser = (survey) => {
        let user = this.props.users.filter(user => user.id === survey.user_id)
        return (
            <div className="userinfo">
                Created by: {user[0].username} <img src={`${user[0].image}`} alt="survey-pic"/>
            </div>
        )
    }

    render(){
        let {survey} = this.props
        return(
            <div className="survey-card">
            <strong><p> {survey.name} </p></strong>
            {this.renderUser(survey)}
                <Menu >
                    <Menu.Item> 
                        <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                    </Menu.Item>
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