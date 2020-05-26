import React from 'react'

export default class AnswerQuestion extends React.Component{

  state = {
    answer: ""
  }

  selectAnswer = (e) => {
    let {saveAnswer, question} = this.props
    this.setState({
      answer: e.target.value
    })
    saveAnswer(question, e.target.value)
  }

  render(){
      let {question} = this.props
      return(
        <div className="question">
          <strong>{question.content}</strong>
          <li>{question.answers[0].content} <input name={question.content} value={question.answers[0].content} onChange={(event)=>this.selectAnswer(event)} type="checkbox" checked={this.state.answer === question.answers[0].content}/></li>
          <li>{question.answers[1].content} <input name={question.content} value={question.answers[1].content} onChange={(event)=>this.selectAnswer(event)} type="checkbox" checked={this.state.answer === question.answers[1].content}/></li>
          <li>{question.answers[2].content} <input name={question.content} value={question.answers[2].content} onChange={(event)=>this.selectAnswer(event)} type="checkbox" checked={this.state.answer === question.answers[2].content}/></li>
          <li>{question.answers[3].content} <input name={question.content} value={question.answers[3].content} onChange={(event)=>this.selectAnswer(event)} type="checkbox" checked={this.state.answer === question.answers[3].content}/></li>
          <li>{question.answers[4].content} <input name={question.content} value={question.answers[4].content} onChange={(event)=>this.selectAnswer(event)} type="checkbox" checked={this.state.answer === question.answers[4].content}/></li>
          <br></br>
        </div>
      )
    };
}