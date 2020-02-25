import React from 'react'
import {NavLink} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default class NavBar extends React.Component{

    render() {
        return(
        <Menu tabular>
            <Menu.Item> 
                <NavLink to="/">Home</NavLink>
            </Menu.Item>

            {!this.props.token ? <Menu.Item>
                <NavLink to="/login">Login</NavLink>
            </Menu.Item> : null }

            {!this.props.token ? <Menu.Item>
            <NavLink to="/signup">Sign Up</NavLink>
            </Menu.Item> : null }

            {this.props.token ? <Menu.Item>
            <NavLink to={`/profile/${this.props.user.id}`}>Profile</NavLink>
            </Menu.Item> : null }
            
            {this.props.token ? <Menu.Item>
            <button onClick={this.props.signout}>Sign Out</button>
            </Menu.Item> : null }

            <Menu.Item> 
                <NavLink to="/surveys">All Surveys</NavLink>
            </Menu.Item>
        </Menu>
        )
      };
}