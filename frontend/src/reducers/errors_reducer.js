import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import groupErrorsReducer from './group_errors_reducer';

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  user: userErrorsReducer,
  group: groupErrorsReducer,
});

export default errorsReducer;