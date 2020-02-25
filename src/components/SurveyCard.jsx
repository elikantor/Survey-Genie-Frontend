import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class SurveyCards extends Component{

    renderSurveyCards = () => {
        let surveyCards = this.props.survey.map(survey => 
            <div className="survey-card">
                <strong><p> {survey.name} </p></strong>
                <p>Created by: {this.props.creator}</p>
                    <Menu >
                        <Menu.Item> 
                            <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                        </Menu.Item>
                        <Menu.Item> 
                            <NavLink to={`/surveys/${survey.id}`}>See Results</NavLink>
                        </Menu.Item>
                    </Menu>
            </div>
        )
        if(surveyCards.length === 0){
            return <p>{this.props.creator} has yet to create a survey</p>
        }
        return surveyCards
    }

    render(){
        return(
            this.renderSurveyCards()
        )
    }
}