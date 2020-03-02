import React, { Component } from 'react'
import {setFilter} from './actions/actions'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

class Results extends Component{

  renderPieCharts = () => {
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
          ]
        }],
        labels: [
          question.answers[0].content, 
          question.answers[1].content, 
          question.answers[2].content, 
          question.answers[3].content, 
          question.answers[4].content
        ]
      }
      let options = {
        title: {
          display: true,
          text: question.content
      }
      }
      return (
        <div>
          <Pie data={data} options={options} height={30} width={150}/>
          <br></br>
          <br></br>
        </div>
      )
    })
    return charts
  }

  renderBarCharts = () => {
    let {survey} = this.props
    let charts = survey.questions.map(question=> {
      let type = {
        type: 'horizontalBar'
      }
      let data = {
        datasets: [{
          label: question.content,
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
          ]
        }],
        labels: [
          question.answers[0].content, 
          question.answers[1].content, 
          question.answers[2].content, 
          question.answers[3].content, 
          question.answers[4].content
        ]
      }
      return (
        <div>
          <Bar data={data} type={type} height={30} width={150}/>
          <br></br>
          <br></br>
        </div>
      )
    })
    return charts
  }

  renderNumberCharts = () => {
    let numOfQs = this.props.survey.questions.length
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
          {
            this.props.chartType === "PIE" ? this.renderPieCharts() : 
            this.props.chartType === "BAR" ? this.renderBarCharts() :
            this.renderNumberCharts() 
          }
        </div>
        <button onClick={()=>{this.props.setFilter({chartType:"PIE"})}}>Pie Charts</button>
        <button onClick={()=>{this.props.setFilter({chartType:"BAR"})}}>Bar Charts</button>
        <button onClick={()=>{this.props.setFilter({chartType: "NUMBER"})}}>Number Charts</button>
        <button onClick={()=>this.props.history.push(`/surveys`)}>Back To All Surveys</button>
      </div>

    )
  }
}

const MSTP = (state) => {
  return { chartType: state.chartType }
}


export default connect(MSTP, {setFilter})(Results)