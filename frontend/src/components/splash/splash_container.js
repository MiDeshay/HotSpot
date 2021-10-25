import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { login } from '../../actions/session_actions';
import Splash from './splash';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  openSignup: () => dispatch(openModal('signup')),
  login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);