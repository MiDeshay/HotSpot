import React from 'react';
import { Link } from 'react-router-dom'
import UserSearchContainer from '../search/user_search_container';
import GroupSearchContainer from '../search/group_search_container';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.renderSessionModal = this.renderSessionModal.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    let { currentUser, openLogin, openSignup } = this.props;
    if (this.props.loggedIn) {
      return (
        <div className="nav-bar-links protected-buttons">
          <button onClick={this.logoutUser} className="button subtle">Logout</button>
          <Link to={`/profile/${currentUser.id}`}><button className="button">Profile</button></Link>

        </div>
      );
    } else {
      return (
        <div className="nav-bar-links auth-buttons">
          {/* <Link to={'/register'}>Signup</Link> */}
          {/* <Link to={'/login'}>Login</Link> */}
          <button className="button" onClick={() => openSignup()}>Signup</button>
          <button className="button subtle" onClick={() => openLogin()}>Login</button>
        </div>
      );
    }
  }

  renderSessionModal() {
    let { modal, openLogin, closeLogin, openSignup, closeSignup } = this.props;
    if (modal === 'login' || modal === 'signup') {
      if (modal === 'login') {
        return <LoginFormContainer />
      } else {
        return <SignupFormContainer />
      }
    }
  }

  render() {
    return (
      <div className="nav-bar-container">
        <Link to="/home"><h1 className="title">HotSpot</h1></Link>
        <UserSearchContainer />
        <GroupSearchContainer />
        <Link to="/links"><h2 className="links">About</h2></Link>
        { this.getLinks() }
        { this.renderSessionModal() }
      </div>
    );
  }
}

export default NavBar;