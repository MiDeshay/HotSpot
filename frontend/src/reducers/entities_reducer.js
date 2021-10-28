import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import eventsReducer from "./events_reducer";
import groupsReducer from "./groups_reducer";
import imagesReducer from "./images_reducer"

const entitiesReducer = combineReducers({
  users: usersReducer,
  events: eventsReducer,
  groups: groupsReducer,
  images: imagesReducer 
});

export default entitiesReducer;