import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer.jsx'


export default class App extends React.Component{
  
  state = {}
  
  render(){
    return (
      <div className="App">
        <NavBar/>
        <MainContainer/>
        {/* <Footer/> */}
      </div>
    );
  }
}
