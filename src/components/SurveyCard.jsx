import React, { Component } from 'react'
import { Grid, Button, Card, Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
const test = '/images/wireframe/image.png'

class SurveyCards extends Component{

    render(){
        let {survey, user} = this.props
        let respondents = []
        if(survey.user_survey_joiners.length > 0){
            survey.user_survey_joiners.map(joiner => respondents.push(joiner.user_id))
        }
        let taken = () => respondents.includes(user.id)
        let creator = this.props.users.filter(user => user.id === survey.user_id)
        let owner = () => survey.user_id === user.id
        
        return(
            <Card raised image={test}>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={`${creator[0].image}`}
                    />
                    <Card.Header>{survey.name}</Card.Header>
                    <Card.Meta>Created by: {creator[0].username}</Card.Meta>
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
        users: state.dataReducer.users
    } 
}

export default connect(MSTP)(SurveyCards)