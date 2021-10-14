import { connect } from "react-redux";
import GroupShow from "./group_show";
import { fetchGroup } from "../../actions/group_actions";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  fetchGroup: name => dispatch(fetchGroup(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupShow);