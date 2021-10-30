import React from "react";
import { Link, withRouter } from 'react-router-dom';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user) {
      this.state = Object.assign({},this.props.user, {errors: this.props.errors}, {profilePictureKey: ""})
    }
    if (this.props.user && this.props.user.profilePictureKey){
      this.state.previewImage = this.props.images[this.props.user.profilePictureKey]
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }



  handleFile(e){
    let file = e.currentTarget.files[0]
    const reader = new FileReader();
    reader.onloadend = () => {

      this.setState({previewImage: reader.result})
    }
    reader.readAsDataURL(file)
    this.setState({file: file})


  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.user && !prevProps.user) {
      let nextState={};
      nextState.firstName = this.props.user.firstName;
      nextState.lastName = this.props.user.lastName;
      nextState.profilePictureKey = this.props.user.profilePictureKey;
      nextState.username = this.props.user.username;
      nextState.email = this.props.user.email;

      this.setState(nextState);
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
    if (this.state.file){

      const {file, firstName, lastName, username, id, email } = this.state

      let formData = new FormData();



      formData.append('image', file);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('username', username);
      formData.append('email', email);

      const packet = {
        id: id,
        data: formData
      }

      this.props.updateUserWithPicture(packet)
    } else {

      let user = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        id: this.props.user.id,
      };

      // console.log(user);
      this.props.updateUser(user);
    }




  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length <= 0) {
      this.props.history.push(`/profile/${nextProps.user.id}`);
    }

    // Set or clear errors
    this.setState({errors: nextProps.errors})
  }

  renderErrors() {
    // console.log(this.state.errors);
    return(
      <ul className="errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`} className="error">
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }


  render() {
    let { user } = this.props;
    if (!this.state) {return null};
    const {previewImage} = this.state;

    const profilePic = previewImage ? <img id="profile-image" src={previewImage}/> : <img id="profile-image" src="../images/default-user-icon-8.jpeg"/>
    return (
      <div className="profile-info-container">
        <div className="profile-info">
          <form onSubmit={this.handleSubmit}>
            <div className="modal-header-pad">
              <div className="modal-header">
            <h2>Edit Profile</h2>
            <label>
              <div className="justify-center">{profilePic}</div>
              <input type="file" name="file" onChange={(e) => this.handleFile(e)}/>
            </label>
            </div>
            </div>
            <div className="modal-body-pad"><div className="modal-body">
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
            </div></div>
            <div className="modal-footer">
              <div onClick={(e) => {e.preventDefault(); this.props.history.push(`/profile/${user.id}`)}} className="button subtle flat">Cancel</div><input className="edit button" type="submit" value="Save Changes"/>
            </div>
            {this.renderErrors()}
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditProfileForm);