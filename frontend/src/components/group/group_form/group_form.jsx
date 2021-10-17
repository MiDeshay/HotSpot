import React from "react";

class GroupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({}, this.props.group, {errors: {}});
    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return (e) => {this.setState({[field]: e.currentTarget.value})};
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

  // componentDidMount() { // commented out on purpose
  //   if (this.props.formType === "Edit Group" && !this.props.group) {
  //     this.props.fetchGroup(this.state.name);
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.formType === "Create Group") {
      if (prevProps.groupsCount !== this.props.groupsCount) {
        this.props.history.push(`/groups/${this.state.name}`);
      }
    } else {
      if (this.state.submitted
      && (this.state.name !== prevState.name
      || this.state.description !== prevState.description)) {
        this.props.history.push(`/groups/${this.state.name}`);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    let {name} = this.state;
    // Set or clear errors
    if (this.props.formType === "Edit Group" && name.length > 0) {
      this.props.history.push(`/groups/${name}`);
    }
    this.setState({errors: nextProps.errors});
  }

  componentWillUnmount(){
   if (this.props.formType === "Edit Group"){
      this.props.fetchGroups();
   }
  }

  handleSubmit(e) {
    e.preventDefault();
    let group = {
      name: this.state.name,
      description: this.state.description,
      ownerId: this.state.ownerId,
    }
    if (this.props.formType === 'Edit Group') {
      group.groupId = this.props.group.id;
    }
    this.props.action(group)
  }

  render() {
    if (!this.props.group) {return null};
    return (
      <div className="group-form-div">
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <div className="form-header">
              <h2>{this.props.formType}</h2>
              <div className="header-details">{this.props.formDetails}</div>
            </div>
            <div className="modal-body">
                <label>Group Name
                <input type="text"
                  value={this.state.name}
                  onChange={this.update('name')}
                  placeholder="group name"
                  className="form-text-input"
                /></label>
              <br/>
                <label>Description
                <input type="text"
                  value={this.state.description}
                  onChange={this.update('description')}
                  placeholder="My new group"
                  className="form-textarea-input"
                /></label>
              <br/>
              <input type="submit" value={this.props.formType} className="button submit" />
              {this.renderErrors()}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default GroupForm;