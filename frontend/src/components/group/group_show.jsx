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
        <button className="button destroy" onClick={() => {deleteGroup({groupId: group.id, ownerId: currentUser.id})}}>Destroy</button>
      )
    }

  }

  render() {
    let { group, users } = this.props;
    if (!group || !group.members) return null;
    return (
      <div className="group-show-div">
        Group Show
        <br/>
        {group.name}
        {this.renderEditButton()}{this.renderJoinButton()}
        <br/>
        {group.description}
        <br/>
        {users[group.ownerId].username}
        <br/>
        {group.id}
        <br/>
        Members
        <br/>
        <ul>
        {!users ? null : group.members.map(memberId => <li key={memberId}>{users[memberId].username}</li>)}
        </ul>
      </div>
    )
  }
}

export default GroupShow;