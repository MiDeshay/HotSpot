import { connect } from "react-redux";
import EditProfileForm from "./edit_profile_form";
import { updateUser, fetchUser } from "../../actions/user_actions";

const mapStateToProps = state => ({
  user: state.entities.users[state.session.user.id]

})

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  fetchUser: email => dispatch(fetchUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);