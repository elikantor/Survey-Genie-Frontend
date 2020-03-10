import React, { Component } from 'react';
import {connect} from 'react-redux'
import SurveyCards from './SurveyCard'
import { Card } from 'semantic-ui-react'

class Favorites extends Component {
    
    showFavorites = () => {
        let favSurveys = []
        let {favorites, surveys} = this.props
        let userFavorites = favorites.filter(fav=> fav.user_id===this.props.user.id)
        let favIds = userFavorites.map(favObj=> favObj.survey_id)
        surveys.map(survey=> {
            if(favIds.includes(survey.id)){
                favSurveys.push(survey)
            }
            return null
        })
        return (
        <Card.Group itemsPerRow={3}>
            {favSurveys.map(survey => <SurveyCards user={this.props.user} token={this.props.token} deleteSurvey={this.props.deleteSurvey} key={survey.id} survey={survey}/>)}
        </Card.Group >
        )
    }

  render() {
    let userFavorites = this.props.favorites.filter(fav=> fav.user_id===this.props.user.id)
    return (
        <div className="profile">
            <h3>{this.props.user.username}'s Favorite Surveys</h3>
            { userFavorites.length>0 ? this.showFavorites() :
            <div>
                <br></br>
                <p> No surveys have been favorited! </p>
            </div> }
        </div>
    )
  }

}

const MSTP = (state) => {
    return {
        surveys: state.dataReducer.surveys,
        favorites: state.favoriteReducer.favorites
    } 
}

export default connect(MSTP)(Favorites);