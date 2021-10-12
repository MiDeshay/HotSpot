import { connect } from "react-redux";
import Profile from "./profile";
import { fetchUser, updateUser, deleteUser } from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => ({
  isAuth: state.session.isAuthenticated,
  currentUser: state.session.user,
  user: state.entities.users[state.session.user.id]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchUser: email => dispatch(fetchUser(email)),
  updateUser: user => dispatch(updateUser(user)),
  deleteUser: email => dispatch(deleteUser(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);