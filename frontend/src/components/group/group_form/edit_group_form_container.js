import { connect } from "react-redux";
import GroupForm from './group_form';
import { updateGroup, fetchGroup } from '../../../actions/group_actions';

const mapStateToProps = (state, ownProps) => ({
  group: state.entities.groups[ownProps.match.params.groupName],
  formType: "Edit Group",
  formDetails: 'Update group name or description',
  errors: state.errors.group,
  groupsCount: null,
});

const mapDispatchToProps = dispatch => ({
  action: group => dispatch(updateGroup(group)),
  fetchGroup: groupName => dispatch(fetchGroup(groupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);