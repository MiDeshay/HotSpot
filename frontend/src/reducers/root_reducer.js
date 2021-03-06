import { combineReducers } from 'redux';
import errors from './errors_reducer';
import session from './session_reducer';
import entitiesReducer from './entities_reducer';
import uiReducer from './ui_reducer';

const RootReducer = combineReducers({
  entities: entitiesReducer,
  session,
  errors,
  ui: uiReducer,
});

export default RootReducer;