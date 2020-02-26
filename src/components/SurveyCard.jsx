import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class SurveyCards extends Component{


    renderUser = (survey) => {
        let user = this.props.users.filter(user => user.id === survey.user_id)
        return user[0].username
    }

    render(){
        let {survey} = this.props
        return(
            <div className="survey-card">
            <strong><p> {survey.name} </p></strong>
            <p>Created by: {this.renderUser(survey)}</p>
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