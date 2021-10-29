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
      <div className="profile-info-container">
        <div className="profile-block profile-info">
      <div className="modal-header-pad"><div className="modal-header ">
        <div className="justify-center">
          {profilePic}
        </div>
        <div className="first-last-name justify-center">{firstName} {lastName}</div>
        <div className="username justify-center">"{username}"</div>
      </div></div>
      <div className="modal-body-pad"><div className="modal-body">

        <div className="profile-groups-container">
            <div className="groups-joined"> Groups Joined:</div>
            <ul className="scroll-box-container groups" id="group-list">
              <div className="top-scroll" />
              <div className="bottom-scroll" />
              <div className="left-scroll" />
              <div className="scroll-box">
              {usersGroups.map((group, i) =>
                 <Link to={`/groups/${group.name}`} className="profile-group button" key={i}>{group.name}</Link>
                 )}
              </div>
            </ul>
        </div>

                 </div></div>
          <div className="modal-body-pad"><div className="modal-body">

        <div className= "profile-contact-container">
          <div className="profile-contact"> Contact info: </div>
          <div className="profile-email">{email}</div>
        </div>
          </div></div>
        <div className="modal-footer">
        {Boolean(currentUser.id === user.id) ? <Link to={`/profile/${currentUser.id}/edit`}><button className="button">Edit Profile</button></Link> : null}
        </div>
      </div>
      </div>
    )
  }
}

export default Profile;