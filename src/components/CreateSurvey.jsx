import React, { Component } from 'react'
import './createSurvey.css'
import Question from './Question'
import { Button, Segment } from 'semantic-ui-react'

class CreateSurvey extends Component{

    render(){
        let questions = this.props.questions.length === 0 ? null : this.props.questions.map(question=> <Question key={question.id} handleQuestionChange={this.props.handleQuestionChange} question={question}/>)
        return(
            <div className="createsurvey">
                <Segment inverted>
                    <h2>Create a Survey</h2>
                    <strong><p>Title:</p></strong> <input type="text" name="name" value={this.props.name} onChange={this.props.handleSurveyTitleChange} />
                        <div className="question">
                            {questions}
                        </div>
                        <br></br>
                    <Button onClick={this.props.addQuestion}>Add Question</Button>
                    {this.props.questions.length > 0 ? <Button onClick={()=>this.props.handleSubmit(this.props.questions)}>Save Survey</Button> : null }
                    <Button onClick={()=>this.props.cancel()}>Cancel</Button>
                </Segment>
            </div>
        )
    }
}

export default CreateSurvey