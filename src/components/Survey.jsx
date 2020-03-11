import React from 'react'

export default class Survey extends React.Component{

  renderSurvey = () => {
    let {survey} = this.props
    let numOfQs = survey.questions.length
    let i = 0
    let form = []
    while (i < numOfQs){
      let question = (
        <div className="question">
          <strong>{survey.questions[i].content}</strong>
          <li>{survey.questions[i].answers[0].content} <input name={survey.questions[i].content} value={survey.questions[i].answers[0].content} onChange={(event)=>this.props.saveAnswer(this.props.survey.questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.survey.questions[i].answers[0].content)}/></li>
          <li>{survey.questions[i].answers[1].content} <input name={survey.questions[i].content} value={survey.questions[i].answers[1].content} onChange={(event)=>this.props.saveAnswer(this.props.survey.questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.survey.questions[i].answers[1].content)}/></li>
          <li>{survey.questions[i].answers[2].content} <input name={survey.questions[i].content} value={survey.questions[i].answers[2].content} onChange={(event)=>this.props.saveAnswer(this.props.survey.questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.survey.questions[i].answers[2].content)}/></li>
          <li>{survey.questions[i].answers[3].content} <input name={survey.questions[i].content} value={survey.questions[i].answers[3].content} onChange={(event)=>this.props.saveAnswer(this.props.survey.questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.survey.questions[i].answers[3].content)}/></li>
          <li>{survey.questions[i].answers[4].content} <input name={survey.questions[i].content} value={survey.questions[i].answers[4].content} onChange={(event)=>this.props.saveAnswer(this.props.survey.questions, event)} type="checkbox" checked={this.props.checkbox_answers.includes(this.props.survey.questions[i].answers[4].content)}/></li>
          <br></br>
        </div>
      )
      form.push(question)
      i++
    }
    return form
  }

  render(){
      let {creator, user, survey} = this.props
      return(
        <form className="survey" onSubmit={(e)=>this.props.submitAnswers(survey, user, e)}>
          <div className="survey-header">
            <h2>Survey: {survey.name}</h2>
            <h3>Created by: {creator.username}</h3>
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