import { connect } from "react-redux";
import GroupShow from "./group_show";
import { fetchGroup, uiGroupShow, updateGroupMembers, deleteGroup } from "../../actions/group_actions";

const mapStateToProps = (state, ownProps) => ({
  groups: state.entities.groups,
  group: state.entities.groups[ownProps.match.params.groupName],
  users: state.entities.users,
  groupId: state.ui.groups.id,
  currentUser: state.session.user,
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: name => dispatch(fetchGroup(name)),
  uiGroupShow: groupId => dispatch(uiGroupShow(groupId)),
  updateGroupMembers: payload => dispatch(updateGroupMembers(payload)),
  deleteGroup: payload => dispatch(deleteGroup(payload)),
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