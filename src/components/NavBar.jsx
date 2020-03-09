import React from 'react'
import {NavLink} from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'

export default class NavBar extends React.Component{

    render() {
        return(
        <Menu tabular>
            <Menu.Item>
                <Image src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fgenie-coming-out-aladdin-lamp-icon-blue-background-vector-illustration-72007518.jpg&f=1&nofb=1" size='tiny' alt="logo"/>
            </Menu.Item> 

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
                <NavLink to="/surveys">All Surveys</NavLink>
            </Menu.Item> : null }

            {this.props.token ? <Menu.Item> 
                <NavLink to="/favorites">Favorites</NavLink>
            </Menu.Item> : null }
            
            {this.props.token ? <Menu.Item onClick={this.props.signout}>
                Sign Out
            </Menu.Item> : null }
        </Menu>
        )
      };
}