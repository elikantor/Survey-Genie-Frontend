import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';

class Results extends Component{

  renderResults = () => {
    let {survey} = this.props
    let charts = survey.questions.map(question=> {
      let data = {
        datasets: [{
          data: [
            question.answers[0].total, 
            question.answers[1].total,
            question.answers[2].total, 
            question.answers[3].total, 
            question.answers[4].total
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ]}],
          labels: [
            question.answers[0].content, 
            question.answers[1].content, 
            question.answers[2].content, 
            question.answers[3].content, 
            question.answers[4].content
          ]
      }
      return <Pie data={data} />
    })
    return charts
  }

  render(){
    return(
      <div className="results-header">
        <h2>Survey: {this.props.survey.name}</h2>
        <br></br>
        <div className="results">
          {this.renderResults()}
        </div>
        <button onClick={()=>this.props.history.push(`/surveys`)}>Back</button>
      </div>

    )
  }
}

export default Results