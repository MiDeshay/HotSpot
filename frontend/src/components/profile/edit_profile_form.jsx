import React from "react";
import { Link, withRouter } from 'react-router-dom';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user) {
      this.state = Object.assign({},this.props.user, {errors: this.props.errors})
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    // if (!this.props.user) {
    //   this.props.fetchUser(this.props.currentUser.userId).then(res => {
    //     let nextState = Object.assign({}, res, {errors: this.props.errors})
    //     this.setState(nextState);
    //   });
      // this.setState(this.props.user);

    // }
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
      username: this.state.username,
      id: this.props.user.id
    };

    // console.log(user);
    this.props.updateUser(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length <= 0) {
      this.props.history.push('/profile');
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  renderErrors() {
    // console.log(this.state.errors);
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
    // console.log(this.state);
    let { user } = this.props;
    if (!this.state) {return null};
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        edit profile form
          <label>Email
          <input type="text"
            value={this.state.email}
            onChange={this.update('email')}
            placeholder="JohnDoe@sbemail.com"
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
          <button className="edit button">Save Changes</button> <Link to="/profile"><div className="button cancel">Cancel</div></Link>
          {this.renderErrors()}
        </form>
      </div>
    )
  }
}

export default withRouter(EditProfileForm);