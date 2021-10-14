import { connect } from "react-redux";
import GroupSearch from "./group_search";
import { fetchGroups } from "../../actions/group_actions";

const mapStateToProps = state => ({
  groups: state.entities.groups
});

const mapDispatchToProps = dispatch => ({
  fetchGroups: () => dispatch(fetchGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);