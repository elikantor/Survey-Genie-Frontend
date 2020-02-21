import React from 'react'
import Home from './Home'
import {Switch, Route} from 'react-router'
import {withRouter} from 'react-router-dom'
import SurveyContainer from './SurveyContainer'

class MainContainer extends React.Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route exactpath="/" render={() => <Home /> } />
                    <Route path="/login" render={ this.renderForm } />
                    <Route path="/signup" render={ this.renderForm } />
                    <Route path="/profile" render={ this.renderProfile } />
                    <Route path="/surveys" render={() => <SurveyContainer/> } />
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        )
      };
}

export default withRouter(MainContainer)