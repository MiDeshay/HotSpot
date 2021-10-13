import { connect } from "react-redux";
import EditProfileForm from "./edit_profile_form";
import { updateUser, fetchUser } from "../../actions/user_actions";

const mapStateToProps = state => ({
  user: state.entities.users[state.session.user.id],
  errors: state.errors.user,
  currentUser: state.session.user
})

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  fetchUser: email => dispatch(fetchUser(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);