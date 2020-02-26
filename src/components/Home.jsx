import React from 'react'
import './home.css'

export default class Home extends React.Component{
  
    render(){
        return(
          <div className="home">
              <h2>Flatiron's Survey App</h2>
              <img src="https://www.meridiaars.com/wp-content/uploads/2014/12/voting.jpg" alt="logo" />
          </div>
        )
      };
}