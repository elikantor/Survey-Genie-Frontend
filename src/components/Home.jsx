import React from 'react'
import './home.css'

export default class Home extends React.Component{
  
    render(){
        return(
          <div className="home">
              <h2>Survey Genie</h2>
              <p>The internet's best survey tool!</p>
              <br></br>
              <img src="https://i.gifer.com/75ez.gif" alt="logo" />
          </div>
        )
      };
}