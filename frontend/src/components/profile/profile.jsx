import React from "react";
import { Link } from "react-router-dom";


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {
    let { user, currentUser } = this.props;
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
        {Boolean(currentUser.id === user.id) ? <Link to={`/profile/${currentUser.id}/edit`}><button className="button">Edit Profile</button></Link> : null}
      </div>
    )
  }
}

export default Profile;