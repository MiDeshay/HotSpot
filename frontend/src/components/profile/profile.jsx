import React from "react";
import { Link } from "react-router-dom";


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
    this.props.fetchAllImages()
  }

  render() {
    let { user, currentUser, groups, images } = this.props;
    if (!user) {return null};
    let { firstName, lastName, username, email, profilePictureKey } = user;
    
    const allGroups = Object.values(groups);
    const usersGroups = []

    const profilePic = profilePictureKey ? <img id="profile-image" src={images[profilePictureKey]}/> : <img id="profile-image" src="../images/default-user-icon-8.jpeg"/>

    allGroups.map(group => {
      if (group.members.includes(user.id)){
        usersGroups.push(group) 
      }
    }) 

    return (
      <div className="profile-block">

      {profilePic}
      
      <div className="first-last-name">{firstName} {lastName}</div>
  
        <div className="username">"{username}"</div> 

        <div className="profile-groups-container">
            <div className="groups-joined"> Groups Joined:</div>
            <ul>
              {usersGroups.map((group, i) => 
                 <Link to={`/groups/${group.name}`} className="profile-group button" key={i}>{group.name}</Link>
              )}
            </ul>
        </div>

        <div className= "profile-contact-container">           
          <div className="profile-contact"> Contact info: </div>
          <div className="profile-email">{email}</div>
        </div>
  
        {Boolean(currentUser.id === user.id) ? <Link to={`/profile/${currentUser.id}/edit`}><button className="button">Edit Profile</button></Link> : null}
      </div>
    )
  }
}

export default Profile;