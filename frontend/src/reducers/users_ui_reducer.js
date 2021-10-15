import { UI_USER_SEARCH_ISACTIVE } from '../actions/user_actions';

const usersUiReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch ( action.type ) {
    case UI_USER_SEARCH_ISACTIVE:
      nextState = Object.assign({}, state);
      nextState.isActive = action.isActive;
      return nextState;
    default: return state;
  }
}

export default usersUiReducer;