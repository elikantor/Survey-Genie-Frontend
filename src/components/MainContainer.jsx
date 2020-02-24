import React from 'react'
import Home from './Home'
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import SurveyContainer from './SurveyContainer'


class MainContainer extends React.Component{

    showResults = (routerProps, survey) => {
        console.log(survey)
    }


    render(){
        return(
            <div className="MainContainer">
                <Switch>
                    <Route path="/" exact render={() => <Home /> } />
                    <Route path="/login" render={ this.renderForm } />
                    <Route path="/signup" render={ this.renderForm } />
                    <Route path="/profile" render={ this.renderProfile } />
                    <Route exact path="/surveys" render={(routerProps) => <SurveyContainer routerProps={routerProps}/> } />
                    <Route path="/surveys/:id" render={(routerProps) => <SurveyContainer showResults={this.showResults} routerProps={routerProps}/> } />
                    <Route path="/results" render={ this.showResults} />
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        )
      };
      
}

export default withRouter(MainContainer)