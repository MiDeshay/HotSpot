import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Splash from '../splash/splash';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push('/home');
    }

    this.setState({errors: nextProps.errors});
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    // debugger;
    e.preventDefault();
    let user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

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

  render() {
    return (
      <div className="auth-form-container">
        <div className="modal-screen"></div>
        <div className="auth-form-modal animated fadeInTop">
          <div className="auth-form-div">
            <form onSubmit={this.handleSubmit}>
              <div className="signup-form">
                <div className="auth-form-header">
                  <h2>HotSpot</h2>
                  <div className="header-details">Join billions of users looking for a party</div>
                </div>
                <div className="modal-body">
                    <label>Email
                    <input type="text"
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder="JohnDoe@yahoo.com"
                      className="auth-form-input"
                    /></label>
                  <br/>
                    <label>First Name
                    <input type="text"
                      value={this.state.firstName}
                      onChange={this.update('firstName')}
                      placeholder="John"
                      className="auth-form-input"
                    /></label>
                  <br/>
                    <label>Last Name
                    <input type="text"
                      value={this.state.lastName}
                      onChange={this.update('lastName')}
                      placeholder="Doe"
                      className="auth-form-input"
                    /></label>
                  <br/>
                    <label>Password
                    <input type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder="*****"
                      className="auth-form-input"
                    /></label>
                  <br/>
                    <label>Confirm Password
                    <input type="password"
                      value={this.state.password2}
                      onChange={this.update('password2')}
                      placeholder="*****"
                      className="auth-form-input"
                    /></label>
                  <br/>
                  <input type="submit" value="Signup" className="button submit" />
                  {this.renderErrors()}
                  <div className="auth-form-footer">
                    <div className="auth-other-message">Already have an account?</div> <Link to="/login"><div className="link">Login</div></Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Splash />
      </div>
    );
  }
}

export default withRouter(SignupForm);