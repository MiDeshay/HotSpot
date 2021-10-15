import { combineReducers } from "redux";
import modalsReducer from "./modals_reducer";
import groupsUiReducer from "./groups_ui_reducer";
import usersUiReducer from "./users_ui_reducer";

const uiReducer = combineReducers({
  users: usersUiReducer,
  groups: groupsUiReducer,
  modal: modalsReducer,
});

export default uiReducer;