import React from "react";
import { Link } from "react-router-dom";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditButtons = this.renderEditButtons.bind(this);
    this.renderJoinButton = this.renderJoinButton.bind(this);
    this.renderJoinRequests = this.renderJoinRequests.bind(this);
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

  renderEditButtons() {
    let { group, currentUser, deleteGroup} = this.props;
    if (group && group.ownerId && currentUser.id === group.ownerId) {
      return (
        <div className="group-edit-buttons">
          <Link to={`/groups/${group.name}/edit`}><button className="button">Edit Group Information</button></Link>
          <button className="button red" onClick={() => { deleteGroup({ groupId: group.id, ownerId: currentUser.id }) }}>Delete Group</button>
        </div>
      )
    }
  }

  renderJoinButton() {
    let { group, currentUser, updateGroupMembers, deleteGroup, createJoinRequest, joinRequestAction } = this.props;
    let isInGroup = group.members.includes(currentUser.id);
    if (currentUser.id !== group.ownerId) { // if you don't own the group
      // <button className="button" onClick={() => {updateGroupMembers({groupId: group.id, memberId: currentUser.id, isAdding: (!isInGroup).toString()})}}>{isInGroup ? "Leave Group" : "Join Group"}</button>
      if (isInGroup) { // if you are part of the group
        return <button className="button red" onClick={() => updateGroupMembers({ groupId: group.id, memberId: currentUser.id, isAdding: 'false' })}> Leave Group</button>
        } else if (group.groupJoinRequests && group.groupJoinRequests.includes(currentUser.id) || (group.groupJoinRequests && group.groupJoinRequests[0] && group.groupJoinRequests[0]._id ? (group.groupJoinRequests[0]._id === currentUser.id) : false)) { // if you are not part of the group
        return <button className="button red" onClick={() => joinRequestAction({ groupId: group.id, userId: currentUser.id, isAdding: 'false'})}>Cancel Join Request</button>
        } else {
          return <button className="button" onClick={() => createJoinRequest({ groupId: group.id, userId: currentUser.id })}>Request to Join Group</button>
        }
    }
  }

  renderJoinRequests() {
    let { users, currentUser, group, joinRequestAction} = this.props;
    if (currentUser.id !== group.ownerId) { return null }
    return (
      <ul className="join-requests">
        <h3 className={`${group.groupJoinRequests.length > 0 ? 'has-requests' : 'no-requests'}`}>Join Requests</h3>
        <div className="join-request-empty">{group.groupJoinRequests.length > 0 ? '' : 'There are no pending join requests!'}</div>
        {group.groupJoinRequests.map(joinerId =>
          <li key={`join-request-${joinerId}`} className="join-request">
            <button className="button green" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'true' })}>✓</button>
            <button className="button red" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'false' })}>𐄂</button>
            {`${users[joinerId].username} ${users[joinerId].firstName} ${users[joinerId].lastName}`}
          </li>
        )}
      </ul>
    );
  }

  render() {
    let { group, users, events } = this.props;
    const allEvents = Object.values(events)
    if (!group || !group.members) return null;
    let filterredEvents = [];
    allEvents.forEach(event => {
      if (event.group._id === group.id) {
        filterredEvents.push(event);
      }
    });
    return (
      <div className="group-show-div">
         <div id="group-title"> {group.name}</div>
         <div className="group-container">
          <div className="group-header"><div className="about-us">About us:</div>{this.renderEditButtons()}</div>
            <div className="group-text">{group.description} </div>
         </div>


        <div className="group-container" id="events-container">
          <div className="group-header"> Events: </div>
            <div className="top-scroll" />
          <ul id="event-list">
            <div className="events-empty">{filterredEvents.length > 0 ? '' : 'There are no scheduled events'}</div>
            {filterredEvents.map((event, i) =>
            <div className="group-text event" key={i}>
              <li className="event-info-main"><div className="event-title" className="event-text">{event.title}</div></li>
              <li className="event-info-sub" ><div className="event-description group-label" >Description:</div> <div className="event-text">{event.description}</div></li>
              <li className="event-info-sub" ><div className="event-description group-label" >Date:</div> <div className="event-text">{event.startDate}</div></li>
              <li className="event-info-sub"> <div  className="event-host group-label" >Host email:</div> <div className="event-text">{event.host[0].email} </div></li>
            </div>)}
          </ul>
            <div className="bottom-scroll" />
        </div>


        <div className="group-container">
          <div className="group-header">Members:</div>
          <ul id="members-list">
          {!users ? null : group.members.map(memberId =>

          <Link to={`/profile/${memberId}`} className="group-text member-button member-list-item" key={memberId}>{users[memberId].username}</Link>)}
          </ul>
        </div>

        {this.renderJoinRequests()}

        <div className="group-action-buttons">
          {this.renderJoinButton()}
        </div>
      </div>
    )
  }
}

export default GroupShow;