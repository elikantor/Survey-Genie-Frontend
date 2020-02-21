import React, { Component } from 'react'

export default class SurveyCards extends Component{


    render(){

        return(
          <div className="survey">
              <strong><p> {this.props.survey[0].name} </p></strong>
              <p>Created by: {this.props.creator}</p>
              <button onClick={this.showSurvey}>Take Survey</button>
              <button>Show Results</button>
          </div>
        )
    }
}