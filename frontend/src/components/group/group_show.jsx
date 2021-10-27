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
      <div className="group-container">
        <div className={`group-header ${group.groupJoinRequests.length > 0 ? 'has-requests' : 'no-requests'}`}>Join Requests:</div>
        <ul className="scroll-box-container" id="join-requests">
          <div className="top-scroll" />
          <div className="scroll-box">
            {group.groupJoinRequests.map(joinerId =>
              <li key={`join-request-${joinerId}`} className="join-request group-text">
                <button className="button green" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'true' })}>✓</button>
                <button className="button red" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'false' })}>𐄂</button>
                <Link to={`/profile/${joinerId}`} className="group-text member-button member-list-item" key={joinerId}>{users[joinerId].username}</Link>
              </li>
            )}
            <div className="list-empty">{group.groupJoinRequests.length > 0 ? '' : 'There are no pending join requests!'}</div>
          </div>
          <div className="bottom-scroll" />
        </ul>
      </div>
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

        <div className="responsive-div">
          <div className="group-container" id="events-container">
            <div className="group-header"> Events: </div>
            <ul className="scroll-box-container" id="group-events-list">
              <div className="top-scroll" />
              <div className="scroll-box">
                {filterredEvents.map((event, i) =>
                  <li key={`group-${i}`}>
                    <ul className="group-text event" >
                      <li className="event-info-main"><div className="event-title" className="event-text">{event.title}</div></li>
                      <li className="event-info-sub" ><div className="event-description group-label" >Description:</div> <div className="event-text">{event.description}</div></li>
                      <li className="event-info-sub" ><div className="event-description group-label" >Date:</div> <div className="event-text">{event.startDate}</div></li>
                      <li className="event-info-sub"> <div  className="event-host group-label" >Host email:</div> <div className="event-text">{event.host[0].email} </div></li>
                    </ul>
                  </li>
                )}
                <div className="list-empty">{filterredEvents.length > 0 ? '' : 'There are no scheduled events'}</div>
              </div>
              <div className="bottom-scroll" />
            </ul>
          </div>


          <div className="group-container">
            <div className="group-header">Members:</div>
            <ul className="scroll-box-container">
              <div className="top-scroll" />
              <div className="scroll-box">
                {!users ? null : group.members.map(memberId =>
                <li key={memberId}><Link to={`/profile/${memberId}`} className="group-text member-button member-list-item" >{users[memberId].username}</Link></li>)}
              </div>
              <div className="bottom-scroll" />
            </ul>
          </div>

          {this.renderJoinRequests()}
        </div>

        <div className="group-action-buttons">
          {this.renderJoinButton()}
        </div>
      </div>
    )
  }
}

export default GroupShow;