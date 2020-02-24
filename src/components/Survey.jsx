import React from 'react'
import { Menu } from 'semantic-ui-react'
import {NavLink, withRouter} from 'react-router-dom'

class Survey extends React.Component{

  state = {
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

  renderSurvey = () => {
    let numOfQs = this.props.surveyArr[0][0][0].questions.length
    let i = 0
    let form = []
    while (i < numOfQs){
      let question = (
        <div>
          <ul className="question">{this.props.surveyArr[0][0][0].questions[i].content}
          <li>{this.props.surveyArr[0][0][0].questions[i].answers[0].content} <input name={this.props.surveyArr[0][0][0].questions[i].content} value={this.props.surveyArr[0][0][0].questions[i].answers[0].content} onChange={(event)=>this.saveAnswer(this.props.surveyArr[0][0][0].questions, event)} type="checkbox" checked={this.state.checkbox_answers.includes(this.props.surveyArr[0][0][0].questions[i].answers[0].content)}/></li>
          <li>{this.props.surveyArr[0][0][0].questions[i].answers[1].content} <input name={this.props.surveyArr[0][0][0].questions[i].content} value={this.props.surveyArr[0][0][0].questions[i].answers[1].content} onChange={(event)=>this.saveAnswer(this.props.surveyArr[0][0][0].questions, event)} type="checkbox" checked={this.state.checkbox_answers.includes(this.props.surveyArr[0][0][0].questions[i].answers[1].content)}/></li>
          <li>{this.props.surveyArr[0][0][0].questions[i].answers[2].content} <input name={this.props.surveyArr[0][0][0].questions[i].content} value={this.props.surveyArr[0][0][0].questions[i].answers[2].content} onChange={(event)=>this.saveAnswer(this.props.surveyArr[0][0][0].questions, event)} type="checkbox" checked={this.state.checkbox_answers.includes(this.props.surveyArr[0][0][0].questions[i].answers[2].content)}/></li>
          <li>{this.props.surveyArr[0][0][0].questions[i].answers[3].content} <input name={this.props.surveyArr[0][0][0].questions[i].content} value={this.props.surveyArr[0][0][0].questions[i].answers[3].content} onChange={(event)=>this.saveAnswer(this.props.surveyArr[0][0][0].questions, event)} type="checkbox" checked={this.state.checkbox_answers.includes(this.props.surveyArr[0][0][0].questions[i].answers[3].content)}/></li>
          <li>{this.props.surveyArr[0][0][0].questions[i].answers[4].content} <input name={this.props.surveyArr[0][0][0].questions[i].content} value={this.props.surveyArr[0][0][0].questions[i].answers[4].content} onChange={(event)=>this.saveAnswer(this.props.surveyArr[0][0][0].questions, event)} type="checkbox" checked={this.state.checkbox_answers.includes(this.props.surveyArr[0][0][0].questions[i].answers[4].content)}/></li>
          </ul>
        </div>
      )
      form.push(question)
      i++
    }
    return form
  }

  render(){
      return(
        <form className="survey">
          <div className="survey-header">
            <h2>Survey: {this.props.surveyArr[0][0][0].name}</h2>
            <h3>Created by: {this.props.surveyArr[0][1]}</h3>
            <br></br>
          </div>
            <div className="survey-body">
              {this.renderSurvey()}
            </div>
            <br></br>
            <Menu >
                <Menu.Item> 
                    <NavLink to={`/results`} onSubmit={(routerProps)=>this.props.showResults(routerProps, this.state.survey, this.props.surveyArr[0][0][0].id)}>Submit Answers</NavLink>
                </Menu.Item>
            </Menu>
          </form>
      )
    };
}

export default withRouter(Survey)