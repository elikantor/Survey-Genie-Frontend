import React, { Component } from 'react';
import SurveyCards from './SurveyCard'
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import './profile.css'

class Profile extends Component {
    
    showSurveys = () => {
        let surveys = this.props.surveys.filter(survey=> survey.user_id === this.props.user[0].id)
        return surveys.map(survey => <SurveyCards token={this.props.token} deleteSurvey={this.props.deleteSurvey} key={survey.id} survey={survey} users={this.props.users}/>)
    }

  render() {
    return (
        <div className="profile">
            <h2>Welcome {this.props.user[0].username}!</h2>
            <img src={`${this.props.user[0].image}`} alt="profile-pic"/>
            <p>My interests: {this.props.user[0].interest}</p>
            <p>Email: {this.props.user[0].email}</p>
            <h3>Your Surveys</h3>
            { this.showSurveys() }
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