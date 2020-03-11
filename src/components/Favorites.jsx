import React, { Component } from 'react';
import {connect} from 'react-redux'
import SurveyCards from './SurveyCard'
import { Card, Input, Radio } from 'semantic-ui-react'
import './favorite.css'

class Favorites extends Component {

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
    
    showFavorites = () => {
        let favSurveys = []
        let {favorites, surveys, user} = this.props
        let userFavorites = favorites.filter(fav=> fav.user_id===this.props.user.id)
        let favIds = userFavorites.map(favObj=> favObj.survey_id)
        surveys.map(survey=> {
            if(favIds.includes(survey.id)){
                favSurveys.push(survey)
            }
            return null
        })
        let titleFilter = favSurveys.filter(survey=> survey.name.toLowerCase().includes(this.state.title.toLowerCase()))
        let takenSurveyIds = []
        favSurveys.map(survey=> survey.user_survey_joiners.map(joiner=>{
            if(joiner.user_id===user.id){
                takenSurveyIds.push(joiner.survey_id)
            }
            return null
        }))
        let takenSurveys = favSurveys.filter(survey=> takenSurveyIds.includes(survey.id))
        let titleAndTakenFilter = takenSurveys.filter(survey=> survey.name.toLowerCase().includes(this.state.title.toLowerCase()))
        return (
        this.state.title === "" && !this.state.responded ?
        <Card.Group itemsPerRow={3}>
            {favSurveys.map(survey => <SurveyCards user={this.props.user} token={this.props.token} deleteSurvey={this.props.deleteSurvey} key={survey.id} survey={survey}/>)}
        </Card.Group >
        :
        !this.state.responded ?
        <Card.Group itemsPerRow={3}>
            {titleFilter.map(survey => <SurveyCards user={this.props.user} token={this.props.token} deleteSurvey={this.props.deleteSurvey} key={survey.id} survey={survey}/>)}
        </Card.Group >
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

  render() {
    let userFavorites = this.props.favorites.filter(fav=> fav.user_id===this.props.user.id)
    return (
        <div className="profile">
            <h1>{this.props.user.username}'s Favorite Surveys</h1>
            <div className="input">
            <Input placeholder="Filter by title..." type="text" autoComplete="off" name="title" value={this.state.title} onChange={this.handleChange}/>
            </div>
            <div>
            <Radio label="Show Only Surveys I've Taken" checked={this.state.responded} onClick={this.showTaken}/>
            </div>
            <br></br>
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