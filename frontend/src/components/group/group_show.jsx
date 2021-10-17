import React from "react";
import { Link } from "react-router-dom";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.renderJoinButton = this.renderJoinButton.bind(this);
  }

  componentDidMount() {
    // if (this.props.group && !this.props.group.members) { // if
      this.props.fetchGroup(this.props.match.params.groupName);
      this.props.getEvents()
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
         <div id="group-title"> {group.name}</div>
         <div className="group-container">
            <div className="group-header">About us:</div>
            <div className="group-text">{group.description} </div>
         </div>

    
        <div className="group-container" id="events-container">
          <div className="group-header"> Events: </div>
          <ul id="event-list">
            {allEvents.map((event, i) => 
            <div className="group-text event" key={i}>
              <li className="event-info-main"><div className="event-title" className="event-text">{event.title}</div></li>
              <li className="event-info-sub" ><div className="event-description group-label" >Description:</div> <div className="event-text">{event.description}</div></li>
              <li className="event-info-sub" ><div className="event-description group-label" >Date:</div> <div className="event-text">{event.startDate}</div></li>
              <li className="event-info-sub"> <div  className="event-host group-label" >Host email:</div> <div className="event-text">{event.host[0].email} </div></li>
            </div>)}
          </ul>
        </div>


        <div className="group-container">
          <div className="group-header">Members:</div>
          <ul id="members-list">
          {!users ? null : group.members.map(memberId => 
          
          <Link to={`/profile/${memberId}`} className="group-text member-button member-list-item" key={memberId}>{users[memberId].username}</Link>)}
          </ul>
        </div>


        {this.renderEditButton()}{this.renderJoinButton()}
      </div>
    )
  }
}

export default GroupShow;