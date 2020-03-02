import React, { Component } from 'react';
import SurveyCards from './SurveyCard'
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import './profile.css'

class Profile extends Component {
    
    showSurveys = () => {
        let surveys = this.props.surveys.filter(survey=> survey.user_id === this.props.user.id)
        return surveys.map(survey => <SurveyCards user={this.props.user} token={this.props.token} deleteSurvey={this.props.deleteSurvey} key={survey.id} survey={survey} users={this.props.users}/>)
    }

  render() {
      let {user} = this.props
    return (
        <div className="profile">
            <h2>Welcome {user.username}!</h2>
            <img src={`${user.image}`} alt="profile-pic"/>
            <p>My interests: {user.interest}</p>
            <p>Email: {user.email}</p>
            <h3>My Surveys</h3>
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