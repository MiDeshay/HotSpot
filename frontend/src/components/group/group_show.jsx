import React from "react";
import { Link } from "react-router-dom";
import { BiTrash } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import { GoMailRead, GoMail } from 'react-icons/go';
import { ImExit } from 'react-icons/im';
import { openModal } from "../../actions/modal_actions";

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
    this.renderEditButtons = this.renderEditButtons.bind(this);
    this.renderJoinButton = this.renderJoinButton.bind(this);
    this.renderJoinRequests = this.renderJoinRequests.bind(this);
    this.screenClick = this.screenClick.bind(this);
  }

  componentDidMount() {

    this.props.fetchGroup(this.props.match.params.groupName);
    this.props.getEvents()
    this.props.fetchAllImages()

  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.group) return;
    if (prevProps.group && prevProps.group.id !== this.props.group.id) {
      this.props.fetchGroup(this.props.group.name);
    }
    if (this.props.group.bannerPictureKey && !this.props.images[this.props.group.bannerPictureKey]){
      this.props.fetchAllImages()
    }

  }

  renderEditButtons() {
    let { group, currentUser, deleteGroup, openDeleteWarning } = this.props;
    if (group && group.ownerId && currentUser.id === group.ownerId) {
      return (
        <div className="group-edit-buttons">
          <Link to={`/groups/${group.name}/edit`}><button className="button big"><FiEdit /></button></Link>
          <button className="button red big" onClick={() => openDeleteWarning('delete-group-warning')}><BiTrash /></button>
        </div>
      )
    }
  }

  renderJoinButton() {
    let { group, currentUser, updateGroupMembers, deleteGroup, createJoinRequest, joinRequestAction, openLeaveWarning } = this.props;
    let isInGroup = group.members.includes(currentUser.id);
    if (currentUser.id !== group.ownerId) { // if you don't own the group
      // <button className="button" onClick={() => {updateGroupMembers({groupId: group.id, memberId: currentUser.id, isAdding: (!isInGroup).toString()})}}>{isInGroup ? "Leave Group" : "Join Group"}</button>
      if (isInGroup) { // if you are part of the group
        return <button className="button red big" onClick={openLeaveWarning}><ImExit className="rightSpace"/> Leave Group</button>
        } else if (group.groupJoinRequests && group.groupJoinRequests.includes(currentUser.id) || (group.groupJoinRequests && group.groupJoinRequests[0] && group.groupJoinRequests[0]._id ? (group.groupJoinRequests[0]._id === currentUser.id) : false)) { // if you are not part of the group
        return <button className="button red cancel-join big" onClick={() => joinRequestAction({ groupId: group.id, userId: currentUser.id, isAdding: 'false' })}><BiTrash className="rightSpace"/>Cancel Join</button>
        } else {
        return <button className="button big" onClick={() => createJoinRequest({ groupId: group.id, userId: currentUser.id })}><GoMailRead className="rightSpace"/>Request to Join Group</button>
        }
    }
  }

  renderJoinRequests() {
    let { users, currentUser, group, joinRequestAction } = this.props;
    if (currentUser.id !== group.ownerId) { return null }
 
    return (
      <div className="group-container">
        <div className={`group-header ${group.groupJoinRequests.length > 0 ? 'has-requests' : 'no-requests'}`}>Join Requests:</div>
        <ul className="scroll-box-container" id="join-requests">
          <div className="top-scroll" />
          <div className="bottom-scroll" />
          <div className="left-scroll" />
          <div className="scroll-box">
            {group.groupJoinRequests.map(joinerId =>
              <li key={`join-request-${joinerId}`} className="join-request group-text scroll-box-li">
                <button className="button green" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'true' })}>???</button>
                <button className="button red" onClick={() => joinRequestAction({ groupId: group.id, userId: joinerId, isAdding: 'false' })}>????</button>
                <Link to={`/profile/${joinerId}`} className="group-text member-button member-list-item" key={joinerId}>{users[joinerId].username}</Link>
              </li>
            )}
            <div className="list-empty">{group.groupJoinRequests.length > 0 ? '' : 'There are no pending join requests!'}</div>
          </div>
        </ul>
      </div>
    );
  }


  screenClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeModal();
  }

  renderDeleteWarning() {
    if (this.props.modal !== 'delete-group-warning') {return null;}
    let { deleteGroup, group, currentUser, closeModal } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-screen" onClick={this.screenClick} />
        <div className="form-modal animated fadeInTop red-border">
          <div className="modal-header-pad">
            <div className="modal-header">
            <h2>WARNING</h2>
            <button className="button close" onClick={closeModal}>????</button>
            </div>
          </div>
          <div className="modal-body-pad">
            <div className="modal-body">Are you sure you want to delete this group? This operation is destruction and cannot be reversed.</div>
          </div>
          <div className="modal-footer">
            <button className="button" onClick={closeModal}>Cancel</button>
            <button className="button red" onClick={() => { deleteGroup({ groupId: group.id, ownerId: currentUser.id });  this.props.history.push("/home")}}><BiTrash /> Destroy Group</button>
            </div>
        </div>
      </div>
    )
  }

  renderLeaveWarning() {
    if (this.props.modal !== 'leave-group-warning') { return null; }
    let {updateGroupMembers, group, currentUser, closeModal } = this.props;
    return (
      <div className="modal-container">
        <div className="modal-screen" onClick={this.screenClick} />
        <div className="form-modal animated fadeInTop red-border">
          <div className="modal-header-pad">
            <div className="modal-header">
              <h2>WARNING</h2>
              <button className="button close" onClick={closeModal}>????</button>
            </div>
          </div>
          <div className="modal-body-pad">
            <div className="modal-body">Are you sure you want to leave this group? You'll have to ask to rejoin later!</div>
          </div>
          <div className="modal-footer">
            <button className="button" onClick={closeModal}>Cancel</button>
            <button className="button red" onClick={() => updateGroupMembers({ groupId: group.id, memberId: currentUser.id, isAdding: 'false' })}><BiTrash /> Leave Group</button>
            </div>
        </div>
      </div>
    )
  }

  render() {
    let { group, users, events } = this.props;
    const {images} = this.props;

    const allEvents = Object.values(events)
    if (!group || !group.members) return null;
    let filterredEvents = [];
    allEvents.forEach(event => {
      if (event.group._id === group.id) {
        filterredEvents.push(event);
      }
    });

    const banner = images[group.bannerPictureKey] ? <img id="group-picture" alt="group banner" src={images[group.bannerPictureKey]}/> : <img id="group-picture" src="../images/image_placeholder.png"/>

    return (
      <div className="group-show-container">
        <div className="group-show">
          <div className="modal-header-pad"><div className="modal-header">
            {banner}
          {this.renderDeleteWarning()}
          {this.renderLeaveWarning()}
          <div id="group-title"> {group.name}</div>
            </div></div>
            <div className="modal-body-pad"><div className="modal-body">
          <div className="group-container">
            <div className="group-header"><div className="about-us">About us:</div>{this.renderEditButtons()}</div>
              <div className="group-text">{group.description} </div>
          </div>

          <div className="responsive-div">
            <div className="group-container" id="events-container">
              <div className="group-header"> Events: </div>
              <ul className="scroll-box-container events" id="group-events-list">
                <div className="top-scroll" />
                  <div className="bottom-scroll" />
                  <div className="left-scroll" />
                  <div className="scroll-box">
                    {filterredEvents.map((event, i) =>
                      <li key={`group-${i}`} className="scroll-box-li">
                        <ul className="group-text event" >
                          <li className="event-info-main"><div className="event-title" className="event-text">{event.title}</div></li>
                          <li className="event-info-sub" ><div className="event-description group-label" >Date:</div> <div className="event-text">{event.startDate}</div></li>
                          <li className="event-info-sub"> <div  className="event-host group-label" >Host email:</div> <div className="event-text">{event.host[0].email} </div></li>
                          <li className="event-info-sub" ><div className="event-description group-label" >Description:</div> <div className="event-text">{event.description}</div></li>
                        </ul>
                      </li>
                    )}
                  <div className="list-empty">{filterredEvents.length > 0 ? '' : 'There are no scheduled events'}</div>
                </div>
              </ul>
            </div>


            <div className="group-container">
              <div className="group-header">Members:</div>
              <ul className="scroll-box-container">
                <div className="top-scroll" />
                <div className="bottom-scroll" />
                <div className="left-scroll" />
                <div className="scroll-box">
                  {!users ? null : group.members.map(memberId =>
                    <Link to={`/profile/${memberId}`} className="profile-group button" >{users[memberId].username}</Link>)}
                </div>
              </ul>
            </div>
            {this.renderJoinRequests()}
          </div>
          </div></div>

            <div className="modal-footer">
            <div className="justify-center">
              {this.renderJoinButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupShow;