import { connect } from "react-redux";
import UserSearch from "./user_search";
import { fetchUsers } from "../../actions/user_actions";

const mapStateToProps = state => ({
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

// export const UserSearchContainer = "hello";
export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);