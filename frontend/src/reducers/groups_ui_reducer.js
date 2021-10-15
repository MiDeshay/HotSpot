import { UI_GROUP_SEARCH_ISACTIVE, UI_GROUP_SHOW } from '../actions/group_actions';

const groupsUiReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch ( action.type ) {
    case UI_GROUP_SHOW:
      nextState = Object.assign({}, state);
      nextState.id = action.groupId;
      return nextState;
    case UI_GROUP_SEARCH_ISACTIVE:
      nextState = Object.assign({}, state);
      nextState.isActive = action.isActive;
      return nextState;
    default: return state;
  }
}

export default groupsUiReducer;