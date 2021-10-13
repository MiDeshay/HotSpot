import { combineReducers } from 'redux';
import errors from './errors_reducer';
import session from './session_reducer';
import entitiesReducer from './entities_reducer';

const RootReducer = combineReducers({
  entities: entitiesReducer,
  session,
  errors
});

export default RootReducer;