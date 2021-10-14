import { RECEIVE_GROUP_ERRORS, RECEIVE_GROUPS, RECEIVE_GROUP, REMOVE_GROUP } from "../actions/group_actions";

const _nullErrors = [];

const groupErrorsReducer = (state=_nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_GROUP_ERRORS:
      return action.errors;
    case RECEIVE_GROUPS: case RECEIVE_GROUP: case REMOVE_GROUP:
      return _nullErrors;
    default: return state;
  }
}

export default groupErrorsReducer;