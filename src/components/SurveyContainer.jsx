import React from 'react'
import Survey from './Survey'

export default class SurveyContainer extends React.Component{

    state = {
        surveys: []
    }

    componentDidMount(){
        fetch()
        .then(r=>r.json())
        .then(data=>{
            this.setState({
                surveys: data
            })
        })
    }


    render(){
        let surveys = this.state.surveys.map(survey => <Survey key={survey.id} survey={survey}/>)
        return(
          <div className="surveycontainer">
              {surveys}
          </div>
        )
      }
}