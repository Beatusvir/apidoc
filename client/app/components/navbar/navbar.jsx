import React, {Component} from 'react';
import { Link } from 'react-router'
import './styles.scss'

class NavBar extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link id="home" to="/" activeClassName="active">Home</Link></li>
            <li><Link id="add-api" to="/add/" activeClassName="active">Add Api</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;