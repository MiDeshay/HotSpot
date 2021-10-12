import React from 'react';
import { withRouter } from 'react-router-dom';
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
      this.props.history.push('/login');
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
                <h2>Create a new account</h2>
                <div className="header-details">Join billions of users looking for a party</div>
                </div>
                  <input type="text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="Email"
                    className="auth-form-input"
                  />
                <br/>
                  <input type="text"
                    value={this.state.firstName}
                    onChange={this.update('firstName')}
                    placeholder="First Name"
                    className="auth-form-input"
                  />
                <br/>
                  <input type="text"
                    value={this.state.lastName}
                    onChange={this.update('lastName')}
                    placeholder="Last Name"
                    className="auth-form-input"
                  />
                <br/>
                  <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                    className="auth-form-input"
                  />
                <br/>
                  <input type="password"
                    value={this.state.password2}
                    onChange={this.update('password2')}
                    placeholder="Confirm Password"
                    className="auth-form-input"
                  />
                <br/>
                <input type="submit" value="Submit" />
                {this.renderErrors()}
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