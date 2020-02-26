import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Results extends Component{

  renderResults = () => {
    let numOfQs = this.props.survey.questions.length
    console.log(this.props)
    let i = 0
    let form = []
    while (i < numOfQs){
      let question = (
        <div>
          <ul className="question">{this.props.survey.questions[i].content}
          <li>{this.props.survey.questions[i].answers[0].content} : {this.props.survey.questions[i].answers[0].total}</li>
          <li>{this.props.survey.questions[i].answers[1].content} : {this.props.survey.questions[i].answers[1].total}</li>
          <li>{this.props.survey.questions[i].answers[2].content} : {this.props.survey.questions[i].answers[2].total}</li>
          <li>{this.props.survey.questions[i].answers[3].content} : {this.props.survey.questions[i].answers[3].total}</li>
          <li>{this.props.survey.questions[i].answers[4].content} : {this.props.survey.questions[i].answers[4].total}</li>
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
      <div className="results-header">
        <h2>Survey: {this.props.survey.name}</h2>
        <br></br>
        <div className="results">
          {this.renderResults()}
        </div>
      </div>

    )
  }
}

export default withRouter(Results)