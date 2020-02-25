import React, { Component } from 'react'
import Question from './Question'

class CreateSurvey extends Component{

    // state = {
    //     name: "",
    //     questions: [],
    //     counter: 1
    // }

    // handleChange = (event) => {
    //     this.setState({
    //         [event.target.name]:event.target.value
    //     })
    // }

    // addQuestion = () => {
    //     let newQuestion = {
    //         number: this.state.counter,
    //         question: "",
    //         a1: "",
    //         a2: "",
    //         a3: "",
    //         a4: "",
    //         a5: ""
    //     }
    //     this.setState({
    //         counter: this.state.counter + 1,
    //         questions: [...this.state.questions, newQuestion]
    //     })
    // }

    // handleQuestionChange = (state) => {
    //     let newState = this.state.questions
    //     let index = state.number - 1
    //     newState.splice(index, 1, state)
    //     this.setState({
    //         questions: newState
    //     })
    // }

    // handleSubmit = (questions) => {
    //     let postObj = questions.map(question => {
    //         return {
    //             content: question.question,
    //             answers: [
    //                 {content: question.a1},
    //                 {content: question.a2},
    //                 {content: question.a3},
    //                 {content: question.a4},
    //                 {content: question.a5},
    //             ]
    //         }
    //     })

    //     fetch(`${surveyUrl}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name: this.state.name,
    //             questions: postObj,
    //             user_id: this.props.user.id
    //         })
    //     })
    //     .then(r=>r.json())
    //     .then(data => {
    //         console.log(data, this.props)
    //         this.props.history.push(`/profile/${this.props.user.id}`)
    //     })
    // }

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