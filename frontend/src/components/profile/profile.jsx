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
    let { user, currentUser, groups } = this.props;
    if (!user) {return null};
    let { firstName, lastName, username } = user;
    const allGroups = Object.values(groups);
    const usersGroups = []

    allGroups.map(group => {
      if (group.members.includes(user.id)){
        usersGroups.push(group) 
      }
    }) 

    console.log(usersGroups)
    return (
      <div className="profile-block">
      
      <div className="first-last-name">{firstName} {lastName}</div>
  
        <div className="username">{username}</div> 

        <div>
            <div className="groups-joined"> Groups Joined:</div>
            <ul>
              {usersGroups.map((group, i) => 
                 <Link to={`/groups/${group.name}`} key={i}>{group.name}</Link>
              )}
            </ul>
        </div>
  
        {Boolean(currentUser.id === user.id) ? <Link to={`/profile/${currentUser.id}/edit`}><button className="button">Edit Profile</button></Link> : null}
      </div>
    )
  }
}

export default Profile;