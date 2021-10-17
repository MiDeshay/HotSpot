import React from "react";
import { Link } from "react-router-dom";


class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.filter = this.filter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  updateInput(field) {
    console.log(this.state.searchTerm);
    return (e) => {
      e.preventDefault();
      this.setState({[field]: e.currentTarget.value});
    }
  }

  filter(user) {
    let { searchTerm } = this.state;
    if (searchTerm === "") {
      return true;
    } else if (user.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true
    }
    return false;
  }

  handleClick(e) {
    this.props.uiUserSearchActive(!this.props.isActive);
    if (!this.props.isActive) {
      this.props.uiGroupSearchActive(false);
    }
}

  render() {
    let { searchTerm } = this.state;
    let { users } = this.props;
    // let isSearching = Boolean(searchTerm !== "");
    let isSearching = this.props.isActive;
    return (
      <div>
        <div className={`${isSearching ? "modal-screen " : ""}none`} onClick={this.handleClick} />
        <input type="text" value={searchTerm} onClick={this.handleClick} onChange={this.updateInput('searchTerm')} placeholder="Search Users" />
        <ul className="drop-down-list">
          {!isSearching ? null : Object.values(users).map((user, i) => this.filter(user) ? <li className="drop-down-item" key={`user-${i}`}><Link to={`/profile/${user.id}`} ><div>{user.username}</div></Link></li> : null)}
        </ul>
      </div>
    )
  }
}

export default UserSearch;