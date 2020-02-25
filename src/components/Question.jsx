import React from 'react'

export default class Question extends React.Component{

    state = {
        number: this.props.question.number,
        question: this.props.question.question,
        a1: this.props.question.a1,
        a2: this.props.question.a2,
        a3: this.props.question.a3,
        a4: this.props.question.a4,
        a5: this.props.question.a5
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            this.props.handleQuestionChange(this.state)
        })
    }

    render(){
        return(
        <div className="question">
            Question
            <textarea name="question" value={this.state.question} onChange={this.handleChange} />
            <ul className="answers">
                Answer 1: <input name="a1" value={this.state.a1} onChange={this.handleChange}/>
                Answer 2: <input name="a2" value={this.state.a2} onChange={this.handleChange}/>
                Answer 3: <input name="a3" value={this.state.a3} onChange={this.handleChange}/>
                Answer 4: <input name="a4" value={this.state.a4} onChange={this.handleChange}/>
                Answer 5: <input name="a5" value={this.state.a5} onChange={this.handleChange}/>
            </ul>
        </div>
        )
    }
}