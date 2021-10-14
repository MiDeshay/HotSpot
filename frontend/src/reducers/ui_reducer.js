import { combineReducers } from "redux";
import groupsUiReducer from "./groups_ui_reducer";

const uiReducer = combineReducers({
  groups: groupsUiReducer
});

export default uiReducer;