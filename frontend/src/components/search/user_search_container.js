import { connect } from "react-redux";
import UserSearch from "./user_search";
import { fetchUsers } from "../../actions/user_actions";
import { uiUserSearchActive } from "../../actions/user_actions";

const mapStateToProps = state => ({
  users: state.entities.users,
  isActive: state.ui.users.isActive,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  uiUserSearchActive: isActive => dispatch(uiUserSearchActive(isActive)),
});

// export const UserSearchContainer = "hello";
export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);