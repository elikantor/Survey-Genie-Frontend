import React, { Component } from 'react';
import {Button, Form} from 'semantic-ui-react'
import './signup.css'


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
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign Up Form </h1>
        <Form.Field>
          <label htmlFor="username">Username:</label>
          <input type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password:</label>
          <input type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="image">Image:</label>
          <input type="text" autoComplete="off" name="image" value={image} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label htmlFor="interest">Interests:</label>
          <input type="text" autoComplete="off" name="interest" value={interest} onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
        <label htmlFor="email">Email:</label>
        <input type="text" autoComplete="off" name="email" value={email} onChange={this.handleChange}/>
        </Form.Field>
        <Button type="submit" value="Submit">Submit</Button>
      </Form>
    );
  }

}

export default Signup;