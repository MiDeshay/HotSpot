import React from "react";
import { Link } from "react-router-dom";


class GroupSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ""
    }
    this.filter = this.filter.bind(this);
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

  render() {
    let { searchTerm } = this.state;
    let { groups } = this.props;
    let isSearching = Boolean(searchTerm !== "");
    return (
      <div>
        <input type="text" value={searchTerm} onChange={this.updateInput('searchTerm')} placeholder="Search Groups" />
        <ul>
        {!isSearching ? null : Object.values(groups).map((group, i) => this.filter(group) ? <Link to={`/group/${group.name}`}><div key={i}>{group.name}</div></Link>: null)}
        </ul>
      </div>
    )
  }
}

export default GroupSearch;