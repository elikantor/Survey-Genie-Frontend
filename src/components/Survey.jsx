import React from 'react'

export default class Survey extends React.Component{

  state = {
    
  }

  renderSurvey = () => {
    let numOfQs = this.props.surveyArr[0][0][0].questions.length
    let i = 0
    let form = []
    while (i < numOfQs){
      let question = (
        <div className="question">
          <p>{this.props.surveyArr[0][0][0].questions[i].content}</p>
          {this.props.surveyArr[0][0][0].questions[i].answers[0].content} <input type="checkbox" checked={null}/>
          {this.props.surveyArr[0][0][0].questions[i].answers[1].content} <input type="checkbox" checked={null}/>
          {this.props.surveyArr[0][0][0].questions[i].answers[2].content} <input type="checkbox" checked={null}/>
          {this.props.surveyArr[0][0][0].questions[i].answers[3].content} <input type="checkbox" checked={null}/>
          {this.props.surveyArr[0][0][0].questions[i].answers[4].content} <input type="checkbox" checked={null}/>
        </div>
      )
      form.push(question)
      i++
    }
    return form
  }

  render(){
    // debugger 
      return(
        <div className="survey">
          <div className="survey-header">
            <h2>Survey: {this.props.surveyArr[0][0][0].name}</h2>
            <h3>Created by: {this.props.surveyArr[0][1]}</h3>
          </div>
          <div className="survey-body">
            {this.renderSurvey()}
          </div>
        </div>
      )
    };
}