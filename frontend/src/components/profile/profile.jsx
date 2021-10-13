import React from "react";
import { Link } from "react-router-dom";


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log(this.props.user.email)
    this.props.fetchUser(this.props.currentUser.email);
  }

  render() {
    let { user } = this.props;
    if (!user) {return null};
    let { firstName, lastName, username, email } = user;
    return (
      <div>
        User Profile
        Name: {firstName} {lastName}
        <br/>
        Username: {username}
        <br/>
        Email: {email}
        <br/>
        {Boolean(this.props.currentUser.id === user.id) ? <Link to="/profile/edit"><button>Edit Profile</button></Link> : null}
      </div>
    )
  }
}

export default Profile;