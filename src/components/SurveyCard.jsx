import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
// import './surveyCard.css'
// import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
const test = '/images/wireframe/image.png'

export default class SurveyCards extends Component{

    render(){
        let {survey} = this.props
        let respondents = []
        if(survey.user_survey_joiners.length > 0){
            survey.user_survey_joiners.map(joiner => respondents.push(joiner.user_id))
        }
        let taken = () => respondents.includes(this.props.user.id)
        let creator = this.props.users.filter(user => user.id === survey.user_id)
        
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
                <Card.Content extra>
                    <div className='ui buttons'>
                    {!taken() ? <Button style = {{width: '8vw'}} basic color='green'>
                        <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                    </Button> : "Response Submitted!"}
                    <Button basic color='blue' style = {{width: '8vw'}}>
                        <NavLink to={`/results/${survey.id}`}>See Results</NavLink>
                    </Button>
                    {this.props.token? <Button style = {{width: '8vw'}} basic color ='red' onClick={()=>this.props.deleteSurvey(survey.id)}> 
                        Delete Survey
                    </Button>: null}
                    </div>
                </Card.Content>
            </Card>
        )
    }
}