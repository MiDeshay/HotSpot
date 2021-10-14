import React from "react";
import { Link } from "react-router-dom";


class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.filter = this.filter.bind(this);
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

  render() {
    let { searchTerm } = this.state;
    let { users } = this.props;
    let isSearching = Boolean(searchTerm !== "");
    return (
      <div>
        <input type="text" value={searchTerm} onChange={this.updateInput('searchTerm')} placeholder="Search Users" />
        <ul>
        {!isSearching ? null : Object.values(users).map((user, i) => this.filter(user) ? <Link to={`/profile/${user.id}`} key={`user-${i}`}><div>{user.username}</div></Link>: null)}
        </ul>
      </div>
    )
  }
}

export default UserSearch;