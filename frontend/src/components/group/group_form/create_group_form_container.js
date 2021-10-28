import { connect } from "react-redux";
import GroupForm from './group_form';
import {createGroup, createGroupWithPicture} from '../../../actions/group_actions';

const mapStateToProps = state => ({
  group: {
    name: '',
    description: '',
    ownerId: state.session.user.id,
  },
  formType: 'Create Group',
  formDetails: 'Create a new group and invite your friends',
  errors: state.errors.group,
  groupsCount: Object.keys(state.entities.groups).length,
});

const mapDispatchToProps = dispatch => ({
  action: group => dispatch(createGroup(group)),
  createGroupWithPicture: packet => dispatch(createGroupWithPicture(packet))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupForm);