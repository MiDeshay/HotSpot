import { RECEIVE_USER } from '../actions/user_actions';

const userReducer = (state={}, action) => {
  console.log(state);
  // debugger;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      let nextState = Object.assign({}, state);
      return nextState[action.user.data.id] = {[action.user.data.id]: action.user.data};
    default: return state;
  }
}

export default userReducer;