import { connect } from "react-redux";
import Profile from "./profile";
import { fetchUser, updateUser, deleteUser } from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return ({
  isAuth: state.session.isAuthenticated,
  currentUser: state.entities.users[state.session.user.id],
  user: state.entities.users[ownProps.match.params.userId],
  groups: state.entities.groups
})};

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  updateUser: user => dispatch(updateUser(user)),
  deleteUser: userId => dispatch(deleteUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);