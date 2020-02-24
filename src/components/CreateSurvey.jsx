import React, { Component } from 'react'
import Question from './Question'

export default class CreateSurvey extends Component{

    state = {
        length: [],
        questions: []
    }

    addQuestion = () => {
        let newState = [...this.state.length, 1]
        this.setState({
            length: newState
        })
    }

    handleSubmit = (state) => {
        let newState = [...this.state.questions, state]
        this.setState({
            questions: newState
        })
    }

    render(){
        let questions = this.state.length = 0 ? null : this.state.length.map(dummy=> <Question handleSubmit={this.handleSubmit}/>)
        return(
          <div className="createsurvey">
              <h2>Create a Survey</h2>
              <div className="question">
                  {questions}
              </div>
              <button onClick={this.addQuestion}>Add Question</button>
              {this.state.length.length > 0 ? <button>Create Survey</button> : null}
          </div>
        )
    }
}