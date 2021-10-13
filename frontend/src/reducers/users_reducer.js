import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';

const userReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch (action.type) {
    case RECEIVE_USERS:
      let fixedUsers = changeNumsToIds(action.users.data);
      nextState = Object.assign({}, state, fixedUsers);
      return nextState;

    case RECEIVE_USER:
      console.log(action.user.data)
      if (action.user.data.id) {
        nextState = Object.assign({}, state, {[action.user.data.id]: action.user.data});
      } else {
        console.log('so you have chosen death');
        let fixedUser = changeNumToId(action.user.data);
        nextState = Object.assign({}, state, fixedUser);
      }
      return nextState;

    default: return state;
  }
}

export default userReducer;


const changeNumsToIds = (users) => {
  let result = {};
  console.log(users)
  Object.values(users).forEach(user => {
    user.id = user._id;
    delete user._id;
    result[user.id] = user
  })
  return result;
}

const changeNumToId = (user) => {
  let result = {};
  console.log(user);
  user.id = user._id;
  delete user._id;
  result[user.id] = user
  console.log(user);
  return result;
}