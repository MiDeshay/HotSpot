import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  currentUser: state.session.user,
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  openSignup: () => dispatch(openModal('signup')),
  closeSignup: () => dispatch(closeModal('signup')),
  openLogin: () => dispatch(openModal('login')),
  closeLogin: () => dispatch(closeModal('login'))
});

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);