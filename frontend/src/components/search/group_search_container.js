import { connect } from "react-redux";
import GroupSearch from "./group_search";
import { fetchGroups, uiGroupShow, uiGroupSearchActive } from "../../actions/group_actions";

const mapStateToProps = state => ({
  groups: state.entities.groups,
  isActive: state.ui.groups.isActive,
});

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  uiGroupShow: group => dispatch(uiGroupShow(group)),
  uiGroupSearchActive: isActive => dispatch(uiGroupSearchActive(isActive)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);