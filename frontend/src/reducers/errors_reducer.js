import { combineReducers } from 'redux';

import SessionErrorsReducer from './session_errors_reducer';
import userErrorsReducer from './user_errors_reducer';
import eventErrorsReducer from './event_errors_reducer';

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
  user: userErrorsReducer,
  event: eventErrorsReducer,
});

export default errorsReducer;