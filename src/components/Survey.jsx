import React from 'react'
import AnswerQuestion from "./AnswerQuestion"

export default class Survey extends React.Component {


  renderSurvey = () => {
    let {survey, saveAnswer} = this.props
    return survey.questions.map(question => <AnswerQuestion question={question} saveAnswer={saveAnswer}/>)
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