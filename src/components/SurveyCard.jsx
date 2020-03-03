import React, { Component } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
// import './surveyCard.css'
// import { Menu } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
const test = '/images/wireframe/image.png'

export default class SurveyCards extends Component{


    // renderUser = (survey) => {
    //     let creator = this.props.users.filter(user => user.id === survey.user_id)
    //     return (
    //         <div className="userinfo">
    //             Created by: {creator[0].username} <img src={`${creator[0].image}`} alt="survey-pic"/>
    //         </div>
    //     )
    // }

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
                        <div className='ui two buttons'>
                        {!taken() ? <Button basic color='green'>
                            <NavLink to={`/surveys/${survey.id}`}>Take Survey</NavLink>
                        </Button> : "Response Submitted!"}
                        <Button basic color='red'>
                            <NavLink to={`/results/${survey.id}`}>See Results</NavLink>
                        </Button>
                        </div>
                    </Card.Content>
                </Card>
        )
    }
}