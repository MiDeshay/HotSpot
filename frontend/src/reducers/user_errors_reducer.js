import { RECEIVE_USER, RECEIVE_USER_ERRORS } from '../actions/user_actions';

const _nullErrors = [];

const userErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;
    case RECEIVE_USER:
      return _nullErrors;
    default: return state;
  }
}

export default userErrorsReducer;