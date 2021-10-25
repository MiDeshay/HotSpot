import React from "react";
// import { Link } from "react-router-dom";


class Splash extends React.Component {
  constructor(props) {
    super(props);
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
            </div>
          <div className="page-body-calltoaction"><div className="button">Signup!</div></div>
          </div>
        </div>
      // </Link>
    )
  }
}

export default Splash;