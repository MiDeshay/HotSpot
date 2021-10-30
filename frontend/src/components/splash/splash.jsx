import React from "react";
import { Link } from "react-router-dom";


class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
  }

   handleDemoLogin(e){
      e.preventDefault();
      let user = {
         email: "Demo@demo.test",
         password: "123456"
      }
      this.props.login(user);
      setTimeout(() => this.props.history.push("/home"), 200)
   }

  render() {
    return (
      // <Link to="/">
        <div className="splash-container">
          <div className="links-header">Welcome to HotSpot</div>
          <div className="splash-image" />
          <div className="page-body" >
            <div className="page-body-body">
              HotSpot is a social media app in which users can join groups then create and share events with members of those groups.
              <ul className="list-steps">
                <li className="list-step">
                  Login or Signup, you'll be redirected to the home page where you can see the world map.
                </li>
                <li className="list-step">
                  The first thing you'll want to do is use the group search bar at the top of the page.
                </li>
                <li className="list-step">
                  Find a group that has a nearby event posted. If you join that group, you'll see their event's drawn on the map!
                </li>
                <li className="list-step">
                  If you want to plan your own events, you'll have to first create a group. "Create a Group" is the first option in the Search Groups dropdown menu.
                </li>
                <li className="list-step">
                  Once your group is made. Head back to the home page and click anywhere on the map to open a new event prompt.
                </li>
              </ul>
            </div>
          {this.props.isLoggedIn ? null :(
            <div className="page-body-calltoaction">
               <div className="button" onClick={this.props.openSignup}>Signup!</div>
               <div className="button" onClick={this.handleDemoLogin}>Demo Account</div>
            </div>
          )}
          </div>
        </div>
      // </Link>
    )
  }
}

export default Splash;