import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { login } from '../../actions/session_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => ({
  errors: state.errors.session,
  formType: "Login",
  isLoggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user)),
  openSignup: () => dispatch(openModal('signup')),
  closeLogin: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);