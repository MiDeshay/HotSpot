import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { GROUP_ADD_MEMBER, CREATE_GROUP } from '../actions/group_actions'

const userReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch (action.type) {
    case RECEIVE_USERS:
      let fixedUsers = changeNumsToIds(action.users.data);
      nextState = Object.assign({}, state, fixedUsers);
      return nextState;

    case RECEIVE_USER:
   
      if (action.user.data.id) {
        nextState = Object.assign({}, state, {[action.user.data.id]: action.user.data});
      } else {
   
        let fixedUser = changeNumToId(action.user.data);
        nextState = Object.assign({}, state, fixedUser);
      }
      return nextState;

    case GROUP_ADD_MEMBER: case CREATE_GROUP:
      nextState = Object.assign({}, state);
      let members = action.group.data.members;
      nextState[members[members.length - 1]].groupsJoined.push(action.group.data._id);
      return nextState;
    default: return state;
  }
}

export default userReducer;


const changeNumsToIds = (users) => {
  let result = {};

  Object.values(users).forEach(user => {
    user.id = user._id;
    delete user._id;
    result[user.id] = user
  })
  return result;
}

const changeNumToId = (user) => {
  let result = {};

  user.id = user._id;
  delete user._id;
  result[user.id] = user
  
  return result;
}