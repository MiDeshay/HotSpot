import { connect } from "react-redux";
import GroupSearch from "./group_search";
import { fetchGroups, uiGroupShow } from "../../actions/group_actions";

const mapStateToProps = state => ({
  groups: state.entities.groups
});

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups()),
  uiGroupShow: group => dispatch(uiGroupShow(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);