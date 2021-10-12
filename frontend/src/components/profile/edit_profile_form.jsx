import React from "react";

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user.firstName) {
      let {firstName, lastName, username, email} = this.props.user;
      this.state = {
        firstName, lastName, username, email
      }
    }
  }

  componentDidMount() {
    if (!this.props.user.firstName) {
      this.props.fetchUser(this.props.currentUser.email);
      // this.setState(this.props.user);
    }
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

  handleSubmit(e) {
    // debugger;
    e.preventDefault();
    let user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username
    };

    this.props.updateUser(user);
  }


  render() {
    let { user } = this.props;
    if (!user) {return null};
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        edit profile form
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
          <label>Username
          <input type="text"
            value={this.state.username}
            onChange={this.update('username')}
            placeholder="JohnD"
            className="auth-form-input"
          /></label>
          <button className="edit button">Save Changes</button>
        </form>
      </div>
    )
  }
}

export default EditProfileForm;