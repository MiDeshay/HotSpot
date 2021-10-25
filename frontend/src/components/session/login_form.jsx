import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.screenClick = this.screenClick.bind(this);
  }

  // Once the user has been authenticated, redirect to Index
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/home');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors});
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  // Render the session errors if there are any
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  screenClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeLogin();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoggedIn === false && this.props.isLoggedIn) {
      this.props.closeLogin();
      const that = this;
      setTimeout(() => that.props.history.push('/home'), 500);
    }
  }

  render() {
    return (
      <div className="auth-form-container">
        <div className="modal-screen" onClick={this.screenClick} />
        <div className="form-modal animated fadeInTop">
          <form onSubmit={this.handleSubmit}>
            <div className="auth-form-div">
              <div className="modal-header">
                <h2>Login</h2>
                <div className="header-details">Welcome back to HotSpot</div>
              </div>
              <div className="model-body">
                <label>Email
                <input type="text"
                  value={this.state.email}
                  onChange={this.update('email')}
                  placeholder="Email"
                  className="text-input"
                /></label>
                <br/>
                <label>Password
                <input type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                  placeholder="Password"
                  className="text-input"
                /></label>
                <br/>
                <input type="submit" value="Login" className="button submit" />
                {this.renderErrors()}
                <div className="modal-footer">
                  <div className="auth-other-message">Don't have an account?</div> <div className="link" onClick={this.props.openSignup}>Signup</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);