import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mapStateToProps = (state) => ({
  signedIn: state.session.isSignedIn,
  errors: state.errors.session,
  formType: "Signup",
  isLoggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  signup: user => dispatch(signup(user)),
  openLogin: () => dispatch(openModal('login')),
  closeSignup: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);