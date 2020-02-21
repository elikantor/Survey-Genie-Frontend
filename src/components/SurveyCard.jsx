import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

export default class SurveyCards extends Component{


    render(){

        return(
          <div className="survey">
              <strong><p> {this.props.survey[0].name} </p></strong>
              <p>Created by: {this.props.creator}</p>
            <Menu >
                <Menu.Item> 
                    <NavLink to={`/surveys/${this.props.survey[0].id}`}>Take Survey</NavLink>
                </Menu.Item>
                <Menu.Item> 
                    <NavLink to={`/surveys/${this.props.survey[0].id}`}>See Results</NavLink>
                </Menu.Item>
            </Menu>
          </div>

        )
    }
}