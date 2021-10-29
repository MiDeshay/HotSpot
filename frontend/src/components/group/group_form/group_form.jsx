import React from "react";
import { withRouter } from "react-router";


class GroupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props.group, {errors: {}});

    if (this.props.group && this.props.group.bannerPictureKey){
      this.state.previewImage = this.props.images[this.props.group.bannerPictureKey]
    }

    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {this.setState({[field]: e.currentTarget.value})};
  }

  renderErrors() {
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

  componentDidMount() { // commented out on purpose
    // console.log(this.state);
    // if (this.props.formType === "Edit Group" && !this.props.group) {
    //   this.props.fetchGroup(this.state.name);
    // }
    this.props.fetchGroup(this.props.match.params.groupName);
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.group && !prevProps.group) {
        let nextState={};
        nextState.name = this.props.group.name;
        nextState.description = this.props.group.description;
        this.setState(nextState);
    }

    if (this.state.isSubmitted && Object.keys(this.state.errors).length <= 0) {
        setTimeout(() => this.props.history.push(`/groups/${prevState.name}`), 200);
    }

    // if (this.props.formType === "Create Group") {
    //   if (prevProps.groupsCount !== this.props.groupsCount) {
    //     this.props.history.push(`/groups/${this.state.name}`);
    //   }
    // } else {
    //   if (this.state.isSubmitted
    //   && (this.state.name !== prevState.name
    //   || this.state.description !== prevState.description)) {
    //     console.log('SHOULD REDIRECT?')
    //     this.props.history.push(`/groups/${this.state.name}`);
    //   }
    // }
  }

  // componentDidUpdate(prevProps, prevState) {
  // }

  // componentWillReceiveProps(nextProps) {
  //   let { name } = this.state;
  //   // Set or clear errors
  //   if (this.props.formType === "Edit Group" && name && name.length > 0) {
  //     this.props.history.push(`/groups/${name}`);
  //   }
  //   this.setState({errors: nextProps.errors});
  // }

  componentWillUnmount(){
    if (this.props.formType === "Edit Group"){
      this.props.fetchGroups();
      if (this.props.group) {
        this.props.history.push(`/groups/${this.props.group.name}`)
      } else {
        // this.props.history.push('/groups/')
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {formType} = this.props;
    const {name, description, ownerId, file, id} = this.state;


    if(formType === "Edit Group" && file){
      let formData = new FormData();

      formData.append('image', file)
      formData.append('name', name);
      formData.append("groupId", id)
      formData.append('description', description);


      const packet = {
        id: id,
        data: formData
      }
      this.props.updateGroupWithPicture(packet)

    } else if (formType === "Create Group" && file){
        let formData = new FormData();

        formData.append('image', file)
        formData.append('name', name);
        formData.append("groupId", id);
        formData.append("ownerId", ownerId);
        formData.append('description', description);

        const packet = {
          id: id,
          data: formData
        }
        this.props.createGroupWithPicture(packet)
    }else{
      let group = {
        name: name,
        description: description,
        ownerId: ownerId,
      }
      if (this.props.formType === 'Edit Group') {
        group.groupId = this.props.group.id;
      }
      this.setState({isSubmitted: true})
      this.props.action(group)
      // this.props.history.push(`/groups/${this.state.name}`);
    }

  }

  render() {
    if (!this.props.group) {return null};
    const {previewImage} = this.state

    const preview = previewImage ? <img id="group-picture" src={previewImage}/> : <img id="group-picture" src="../images/image_placeholder.png"/>

    return (
      <div className="group-show-container">
        <form className="group-edit-form" onSubmit={this.handleSubmit}>
          <div className="modal-header-pad"><div className="modal-header">
            <h2>{this.props.formType}</h2>
            <div className="header-details">{this.props.formDetails}</div>
              <label>
                {preview}
                <input id="file" type="file" name="file" onChange={(e) => this.handleFile(e)}/>
              </label>
          </div></div>
          <div className="modal-body-pad"><div className="modal-body">

              <label>Group Name
              <input type="text"
                value={this.state.name}
                onChange={this.update('name')}
                placeholder="group name"
                className="form-text-input"
              /></label>
              <label>Description
              <input type="text"
                value={this.state.description}
                onChange={this.update('description')}
                placeholder="My new group"
                className="form-textarea-input"
              /></label>
          </div></div>
          <div className="modal-footer">
            <button className="button subtle flat" onClick={() => this.props.history.push(`/groups/${this.props.group.name}`)}>Cancel</button><input type="submit" value={this.props.formType} className="button submit" />
          </div>
          <div className="modal-footer">
            {this.renderErrors()}
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(GroupForm);