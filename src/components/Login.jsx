import React, { Component } from 'react';
import {Button, Form, Message} from 'semantic-ui-react'
import './login.css'

class Login extends Component {

  state = {
    username: "",
    password: ""
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
    let {username, password} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Login Form</h1>
        <Form.Field>
          <label htmlFor="username">Username:</label>
          <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password:</label>
          <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
        </Form.Field>
        <Message
          error
          header='Error'
          content='Your username or password are incorrect.  Please try again.'
        />
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    );
  }

}

export default Login;