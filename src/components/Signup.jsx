import React, { Component } from 'react';

class Signup extends Component {

  state = {
    username: "",
    password: "",
    image: "",
    interest: "",
    email: ""
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    let {username, password, image, interest, email} = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up Form </h1>
        <label htmlFor="username">Username:</label>
        <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
        <label htmlFor="password">Password:</label>
        <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
        <br></br>
        <label htmlFor="image">Image:</label>
        <input type="text" autoComplete="off" name="image" value={image} onChange={this.handleChange}/>
        <label htmlFor="interest">Interests:</label>
        <input type="interest" autoComplete="off" name="interest" value={interest} onChange={this.handleChange}/>
        <br></br>
        <label htmlFor="email">Email:</label>
        <input type="text" autoComplete="off" name="email" value={email} onChange={this.handleChange}/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }

}

export default Signup;