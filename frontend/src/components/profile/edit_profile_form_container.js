import { connect } from "react-redux";
import EditProfileForm from "./edit_profile_form";
import { updateUser, fetchUser, updateUserWithPicture } from "../../actions/user_actions";
import {fetchAllImages} from "../../actions/image_actions"

const mapStateToProps = state => ({
  user: state.entities.users[state.session.user.id],
  errors: state.errors.user,
  currentUser: state.session.user,
  images: state.entities.images
})

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  updateUserWithPicture: user => dispatch(updateUserWithPicture(user)),
  fetchAllImages: () => dispatch(fetchAllImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileForm);