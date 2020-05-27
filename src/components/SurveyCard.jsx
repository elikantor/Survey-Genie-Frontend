import React, { Component } from 'react'
import { Grid, Button, Card, Image, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {favorite, unfavorite} from '../Redux/actions'
import {NavLink} from 'react-router-dom'
let API = "http://survey-genie-api.herokuapp.com"

class SurveyCards extends Component{

    handleFavorite = (surveyId, userId, favoriteObj=null) => {
        let {favorites} = this.props
        let fav = favorites.find(f=> f.user_id === userId && f.survey_id === surveyId)
        if(!fav){
            fetch(`${API}/favorites`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    survey_id: surveyId
                })
            })
            .then(r=>r.json())
            .then(favoriteObj=> {
                this.props.favorite(favoriteObj)
            })
        } else {
            fetch(`${API}/favorites/${favoriteObj.id}`, {
                method: "DELETE"
            })
            .then(r=>r.json())
            .then(emptyResponse => {
                this.props.unfavorite(favoriteObj)
            })
        }
    }

    render(){
        let {survey, user, users, favorites} = this.props
        let respondents = []
        if(survey.user_survey_joiners.length > 0){
            survey.user_survey_joiners.map(joiner => respondents.push(joiner.user_id))
        }
        let taken = () => respondents.includes(user.id)
        let creator = users.filter(user => user.id === survey.user_id)
        let owner = () => survey.user_id === user.id
        let fav = favorites.find(f=> (f.user_id === user.id && f.survey_id === survey.id))
        return(
            <Card>
                <Card.Content>
                    <Image floated='right' size='mini' src={`${creator[0].image}`}/>
                    <Card.Header>{survey.name}</Card.Header>
                    <Card.Meta>Created by: {creator[0].username}</Card.Meta>
                    {fav? 
                        <Icon name='heart' onClick={()=>this.handleFavorite(survey.id, user.id, fav)} color="red"/>:
                        <Icon name='heart' onClick={()=>this.handleFavorite(survey.id, user.id)} color="black"/>}                 
                </Card.Content>
                <Grid textAlign='center' columns={3}>
                    <Grid.Column>
                        {!taken() ? <Button style = {{width: '8vw'}} basic color='green'>
                            <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                        </Button> : "Response Submitted!"}
                    </Grid.Column>
                    <Grid.Column>
                        <Button basic color='blue' style = {{width: '8vw'}}>
                            <NavLink to={`/results/${survey.id}`}>See Results</NavLink>
                        </Button>
                    </Grid.Column>
                    <Grid.Column>
                        {owner()? <Button style = {{width: '8vw'}} basic color ='red' onClick={()=>this.props.deleteSurvey(survey.id)}> 
                            Delete Survey
                        </Button>: null}
                    </Grid.Column>
                </Grid>
            </Card>
        )
    }
}

const MSTP = (state) => {
    return {
        surveys: state.dataReducer.surveys,
        users: state.dataReducer.users,
        favorites: state.favoriteReducer.favorites
    } 
}

export default connect(MSTP, {favorite, unfavorite})(SurveyCards)