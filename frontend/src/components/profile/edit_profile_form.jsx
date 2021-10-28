import React from "react";
import { Link, withRouter } from 'react-router-dom';


class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.user) {
      this.state = Object.assign({},this.props.user, {errors: this.props.errors})
    }
    if (this.props.user.profilePictureKey){
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
    let { user } = this.props;
    const {previewImage} = this.state;
    if (!this.state) {return null};

    const profilePic = previewImage ? <img id="profile-image" src={previewImage}/> : <img id="profile-image" src="../images/default-user-icon-8.jpeg"/>
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        edit profile
          <label>Picture
            {profilePic}
            <input type="file" name="file" onChange={(e) => this.handleFile(e)}/>
          </label>
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
          <button className="edit button">Save Changes</button> <Link to={`/profile/${user.id}`}><div className="button cancel">Cancel</div></Link>
          {this.renderErrors()}
        </form>
      </div>
    )
  }
}

export default withRouter(EditProfileForm);