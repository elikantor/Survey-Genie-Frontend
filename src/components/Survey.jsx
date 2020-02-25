import React from 'react'
// import { Menu } from 'semantic-ui-react'
// import {NavLink} from 'react-router-dom'

export default class Survey extends React.Component{

  renderSurvey = () => {
    let numOfQs = this.props.userSurveyProp[0].questions.length
    let i = 0
    let form = []
    while (i < numOfQs){
      let question = (
        <div>
          <ul className="question">{this.props.userSurveyProp[0].questions[i].content}
          <li>{this.props.userSurveyProp[0].questions[i].answers[0].content} <input name={this.props.userSurveyProp[0].questions[i].content} value={this.props.userSurveyProp[0].questions[i].answers[0].content} onChange={(event)=>this.props.saveAnswer(this.props.userSurveyProp[0].questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.userSurveyProp[0].questions[i].answers[0].content)}/></li>
          <li>{this.props.userSurveyProp[0].questions[i].answers[1].content} <input name={this.props.userSurveyProp[0].questions[i].content} value={this.props.userSurveyProp[0].questions[i].answers[1].content} onChange={(event)=>this.props.saveAnswer(this.props.userSurveyProp[0].questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.userSurveyProp[0].questions[i].answers[1].content)}/></li>
          <li>{this.props.userSurveyProp[0].questions[i].answers[2].content} <input name={this.props.userSurveyProp[0].questions[i].content} value={this.props.userSurveyProp[0].questions[i].answers[2].content} onChange={(event)=>this.props.saveAnswer(this.props.userSurveyProp[0].questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.userSurveyProp[0].questions[i].answers[2].content)}/></li>
          <li>{this.props.userSurveyProp[0].questions[i].answers[3].content} <input name={this.props.userSurveyProp[0].questions[i].content} value={this.props.userSurveyProp[0].questions[i].answers[3].content} onChange={(event)=>this.props.saveAnswer(this.props.userSurveyProp[0].questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.userSurveyProp[0].questions[i].answers[3].content)}/></li>
          <li>{this.props.userSurveyProp[0].questions[i].answers[4].content} <input name={this.props.userSurveyProp[0].questions[i].content} value={this.props.userSurveyProp[0].questions[i].answers[4].content} onChange={(event)=>this.props.saveAnswer(this.props.userSurveyProp[0].questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.userSurveyProp[0].questions[i].answers[4].content)}/></li>
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
        <form className="survey" onSubmit={(e)=>this.props.submitAnswers(this.props.surveyResult, this.props.userSurveyProp[0], e)}>
          <div className="survey-header">
            <h2>Survey: {this.props.userSurveyProp[0].name}</h2>
            <h3>Created by: {this.props.userSurveyProp[1]}</h3>
            <br></br>
          </div>
            <div className="survey-body">
              {this.renderSurvey()}
            </div>
            <br></br>
            <button value="Submit">Submit Answers</button>
          </form>
      )
    };
}