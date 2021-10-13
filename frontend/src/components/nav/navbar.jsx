import React from 'react';
import { Link } from 'react-router-dom'
import UserSearchContainer from '../search/user_search_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    let { currentUser } = this.props;
      if (this.props.loggedIn) {
        return (
            <div className="nav-bar-links protected-buttons">
                <Link to={'/'}>Index</Link>
                <Link to={`/profile/${currentUser.id}`}>Profile</Link>
                <button onClick={this.logoutUser} className="button">Logout</button>
                <UserSearchContainer />
            </div>
        );
      } else {
        return (
            <div className="nav-bar-links auth-buttons">
                <Link to={'/register'}>Signup</Link>
                <Link to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="nav-bar-container">
            <h1>HotSpot</h1>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;