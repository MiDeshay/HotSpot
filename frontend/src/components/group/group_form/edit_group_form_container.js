import { connect } from "react-redux";
import GroupForm from './group_form';
import { updateGroup, fetchGroup, fetchGroups, updateGroupWithPicture } from '../../../actions/group_actions';
import { fetchAllImages } from "../../../actions/image_actions";

const mapStateToProps = (state, ownProps) => ({
  group: state.entities.groups[ownProps.match.params.groupName],
  formType: "Edit Group",
  formDetails: 'Update group name or description',
  errors: state.errors.group,
  groupsCount: null,
  images: state.entities.images
});

const mapDispatchToProps = dispatch => ({
  action: group => dispatch(updateGroup(group)),
  updateGroupWithPicture: packet => dispatch(updateGroupWithPicture(packet)),
  fetchGroup: groupName => dispatch(fetchGroup(groupName)),
  fetchGroups: () => dispatch(fetchGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);
