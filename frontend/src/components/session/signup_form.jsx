import React from 'react';
import { Link, withRouter } from 'react-router-dom';


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
    this.screenClick = this.screenClick.bind(this);
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

  screenClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.closeSignup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoggedIn === false && this.props.isLoggedIn) {
      this.props.closeSignup();
      const that = this;
      setTimeout(() => that.props.history.push('/home'), 500);
    }
  }

  render() {
    return (
      <div className="auth-form-container">
        <div className="modal-screen" onClick={this.screenClick} />
        <div className="form-modal animated fadeInTop">
          <div className="auth-form-div">
            <form onSubmit={this.handleSubmit}>
              <div className="signup-form">
                <div className="modal-header">
                  <h2>HotSpot</h2>
                  <div className="header-details">Join billions of users looking for a party</div>
                </div>
                <div className="modal-body">
                    <label>Email
                    <input type="text"
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder="JohnDoe@yahoo.com"
                      className="text-input"
                    /></label>
                  <br/>
                    <label>First Name
                    <input type="text"
                      value={this.state.firstName}
                      onChange={this.update('firstName')}
                      placeholder="John"
                      className="text-input"
                    /></label>
                  <br/>
                    <label>Last Name
                    <input type="text"
                      value={this.state.lastName}
                      onChange={this.update('lastName')}
                      placeholder="Doe"
                      className="text-input"
                    /></label>
                  <br/>
                    <label>Password
                    <input type="password"
                      value={this.state.password}
                      onChange={this.update('password')}
                      placeholder="*****"
                      className="text-input"
                    /></label>
                  <br/>
                    <label>Confirm Password
                    <input type="password"
                      value={this.state.password2}
                      onChange={this.update('password2')}
                      placeholder="*****"
                      className="text-input"
                    /></label>
                  <br/>
                  <input type="submit" value="Signup" className="button submit" />
                  {this.renderErrors()}
                  <div className="modal-footer">
                    <div className="auth-other-message">Already have an account?</div><div className="link" onClick={this.props.openLogin}>Login</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);