import { connect } from "react-redux";
import GroupShow from "./group_show";
import { getEvents } from '../../actions/event_actions';
import { fetchGroup, uiGroupShow, updateGroupMembers, deleteGroup, createJoinRequest, respondToJoinRequest } from "../../actions/group_actions";
import { closeModal, openModal } from "../../actions/modal_actions";
import { fetchAllImages } from "../../actions/image_actions";

const mapStateToProps = (state, ownProps) => ({
  groups: state.entities.groups,
  group: state.entities.groups[ownProps.match.params.groupName],
  events: state.entities.events,
  users: state.entities.users,
  groupId: state.ui.groups.id,
  currentUser: state.session.user,
  images: state.entities.images,
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: name => dispatch(fetchGroup(name)),
  //if coming straight to this page, events aren't loaded in
  getEvents: () => dispatch(getEvents()),
  uiGroupShow: groupId => dispatch(uiGroupShow(groupId)),
  updateGroupMembers: payload => dispatch(updateGroupMembers(payload)),
  deleteGroup: payload => dispatch(deleteGroup(payload)),
  fetchAllImages: () => dispatch(fetchAllImages()),
  createJoinRequest: payload => dispatch(createJoinRequest(payload)),
  joinRequestAction: payload => dispatch(respondToJoinRequest(payload)),
  openDeleteWarning: () => dispatch(openModal('delete-group-warning')),
  openLeaveWarning: () => dispatch(openModal('leave-group-warning')),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);

// getGroupByName(name, groups) {
//   for (let i=0; i<groups.length; i++) {
//     if (groups[i].name === name) {
//       return groups[i]
//     }
//   }
//   return null;
// }