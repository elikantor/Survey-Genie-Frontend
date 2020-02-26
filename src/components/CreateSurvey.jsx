import React, { Component } from 'react'
import Question from './Question'

class CreateSurvey extends Component{

    render(){
        let questions = this.props.questions.length === 0 ? null : this.props.questions.map(question=> <Question handleQuestionChange={this.props.handleQuestionChange} question={question}/>)
        return(
          <div className="createsurvey">
              <h2>Create a Survey</h2>
              Title: <input type="text" name="name" value={this.props.name} onChange={this.props.handleChange} />
              <div className="question">
                  {questions}
              </div>
              <button onClick={this.props.addQuestion}>Add Question</button>
              {this.props.questions.length > 0 ? <div><p>Or</p> <button onClick={()=>this.props.handleSubmit(this.props.questions)}>Save Survey</button></div> : null}
          </div>
        )
    }
}

export default CreateSurvey