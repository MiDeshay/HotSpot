import { connect } from "react-redux";
import GroupShow from "./group_show";
import { fetchGroup, uiGroupShow } from "../../actions/group_actions";

const mapStateToProps = state => ({
  group: state.entities.groups[state.ui.groups.id],
  users: state.entities.users,
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: name => dispatch(fetchGroup(name)),
  uiGroupShow: groupId => dispatch(uiGroupShow(groupId))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);