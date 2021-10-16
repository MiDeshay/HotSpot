import React from "react";
import { Link } from "react-router-dom";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderJoinButton = this.renderJoinButton.bind(this);
  }

  componentDidMount() {
    console.log('i mounted')
    // if (this.props.group && !this.props.group.members) { // if
      this.props.fetchGroup(this.props.match.params.groupName);
      // this.props.uiGroupShow(this.props.group.id);
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('i updated')
    if (!this.props.group) return;
    if (prevProps.group && prevProps.group.id !== this.props.group.id) {
      this.props.fetchGroup(this.props.group.name);
    }

    if (!this.props.groupId) {

    }
  }

  renderEditButton() {
    let { group, currentUser} = this.props;
    if (group && group.ownerId && currentUser.id === group.ownerId) {
      return (
        <Link to={`/groups/${group.name}/edit`}><button className="button">Edit Group Information</button></Link>
      )
    }
  }

  renderJoinButton() {
    let { group, currentUser, updateGroupMembers, deleteGroup } = this.props;
    let isInGroup = group.members.includes(currentUser.id);
    if (currentUser.id !== group.ownerId) {
      return (
        <button className="button" onClick={() => {updateGroupMembers({groupId: group.id, memberId: currentUser.id, isAdding: (!isInGroup).toString()})}}>{isInGroup ? "Leave Group" : "Join Group"}</button>
      )
    } else {
      return (
        <button className="button destroy" onClick={() => {deleteGroup({groupId: group.id, ownerId: currentUser.id})}}>Delete Group</button>
      )
    }

  }

  render() {
    let { group, users, events } = this.props;
    const allEvents = Object.values(events)
    console.log(allEvents)
    if (!group || !group.members) return null;
    return (
      <div className="group-show-div">
         <div> {group.name}</div>
        <div>{group.description} </div>

        <br/>
        <Link to={`/profile/${group.ownerId}`}>
          <div>Owner</div>
          <div>{users[group.ownerId].firstName} {users[group.ownerId].lastName}</div>
          <div>{users[group.ownerId].username} </div>
          <div>{users[group.ownerId].email} </div>

        </Link>

        <br/>
        <div>
          <div>Members</div>
          <ul>
          {!users ? null : group.members.map(memberId => <Link to={`/profile/${memberId}`} key={memberId}>{users[memberId].username}</Link>)}
          </ul>
        </div>

        <br/>
        <div>
          <div> Events</div>
          <ul>
            {allEvents.map((event, i) => 
            <div key={i}>
              <li><div>Title: </div> {event.title}</li>
              <li><div>Description:</div> {event.description}</li>
              <Link to={`/profile/${event.host[0]._id}`}>
                <div>Host Info:</div>
                <li> {event.host[0].firstName} {event.host[0].firstName} </li>
                <li> {event.host[0].email} </li>
          
              </Link>
              
            </div>)}
          </ul>
        </div>
        <br/>

        {this.renderEditButton()}{this.renderJoinButton()}
      </div>
    )
  }
}

export default GroupShow;