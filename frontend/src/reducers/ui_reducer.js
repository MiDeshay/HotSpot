import { combineReducers } from "redux";
import modalsReducer from "./modals_reducer";
import groupsUiReducer from "./groups_ui_reducer";

const uiReducer = combineReducers({
  groups: groupsUiReducer,
  modal: modalsReducer,
});

export default uiReducer;