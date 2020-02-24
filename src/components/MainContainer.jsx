import React from 'react'
import Home from './Home'
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import SurveyContainer from './SurveyContainer'
import Results from './Results'


class MainContainer extends React.Component{

    state = {
        survey_id: 0,
        survey: [],
        checkbox_answers: []
    }

    saveAnswer = (answers, event) => {
        let currentState = this.state.checkbox_answers
        if(currentState.includes(event.target.value)){
            let newState = []
            newState = currentState.filter(ele => ele !== event.target.value)
            this.setState({
            checkbox_answers: newState
            })
        } else {
            let newState = []
            let questionObj = answers.filter(ele => ele.content === event.target.name)
            let ansArr = questionObj[0].answers.map(ele=>ele.content)
            let x = currentState.map(ele => {
            if(ansArr.includes(ele)){
                return null
            } else {
                newState.push(ele)
                return null
            }
            })
            newState.push(event.target.value)
            this.setState({
            checkbox_answers: newState
            })
        }

        let surveyObj = {
            question: event.target.name,
            answer: event.target.value
        }
        let y = []
        let z = this.state.survey.map(ele => {
            if(ele.question.includes(event.target.name)){
                return null
            } else {
                y.push(ele)
                return null
            }
        })

        y.push(surveyObj)

        this.setState({
            survey: y
        })
    }

    render(){
        return(
            <div className="MainContainer">
                <Switch>
                    <Route path="/" exact render={() => <Home /> } />
                    <Route path="/login" render={ this.renderForm } />
                    <Route path="/signup" render={ this.renderForm } />
                    <Route path="/profile" render={ this.renderProfile } />
                    <Route exact path="/surveys" render={(routerProps) => <SurveyContainer routerProps={routerProps}/> } />
                    <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer survey={this.state.survey} checkbox_answers={this.state.checkbox_answers} routerProps={routerProps} saveAnswer={this.saveAnswer}/> } />
                    <Route path="/results" render={() => <Results survey={this.state}/> } />
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        )
      };
      
}

export default withRouter(MainContainer)