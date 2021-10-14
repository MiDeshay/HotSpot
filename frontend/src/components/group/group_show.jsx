import React from "react"

class GroupShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('i mounted')
    if (this.props.group && !this.props.group.members) { // if
      this.props.fetchGroup(this.props.match.params.groupName);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.group && prevProps.group.id !== this.props.group.id) {
      this.props.fetchGroup(this.props.group.name);
    }
  }

  render() {
    let { group, users } = this.props;
    if (!group || !group.members) return null;
    return (
      <div className="group-show-div">
        Group Show
        {group.name}
        {group.id}
        {!users ? null : group.members.map(memberId => <div key={memberId}>{users[memberId].username}</div>)}
      </div>
    )
  }
}

export default GroupShow;