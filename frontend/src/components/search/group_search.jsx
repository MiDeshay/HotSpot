import React from "react";
import { Link } from "react-router-dom";


class GroupSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.filter = this.filter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroups();
  }

  updateInput(field) {
    console.log(this.state.searchTerm);
    return (e) => {
      e.preventDefault();
      this.setState({[field]: e.currentTarget.value});
    }
  }

  filter(group) {
    let { searchTerm } = this.state;
    if (searchTerm === "") {
      return true;
    } else if (group.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true
    }
    return false;
  }

  handleLink(groupId) {
    return (e) => {
      this.props.uiGroupShow(groupId);
    }
  }

  handleClick(e) {
    this.props.uiGroupSearchActive(!this.props.isActive);
    if (!this.props.isActive) {
      this.props.uiUserSearchActive(false);
    }
  }

  render() {
    let { searchTerm } = this.state;
    let { groups } = this.props;
    delete groups.Public; // remove the "Public" group from the drop-down list
    // let isSearching = Boolean(searchTerm !== "");
    let isSearching = this.props.isActive;
    return (
      <div>
        <div className={`${isSearching ? "modal-screen " : ""}none`} onClick={this.handleClick}/>
        <input className="drop-down-input" type="text" value={searchTerm} onClick={this.handleClick} onChange={this.updateInput('searchTerm')} placeholder="Search Groups" />
        <ul className="drop-down-list">
          {!isSearching || searchTerm !== "" ? null : <li key="group-create" className="drop-down-item link"><Link to={'/groups/create'}>Create a group</Link></li>}
          {!isSearching ? null : Object.values(groups).map((group, i) => this.filter(group) ? <li key={`group-${i}`} className="drop-down-item"><Link to={`/groups/${group.name}`} onClick={this.handleLink(group.id)}><div>{group.name}</div></Link></li> : null)}
        </ul>
      </div>
    )
  }
}

export default GroupSearch;