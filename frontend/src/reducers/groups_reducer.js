import { RECEIVE_GROUPS, RECEIVE_GROUP, REMOVE_GROUP, GROUP_ADD_MEMBER, CREATE_GROUP, RECEIVE_JOIN_REQUEST } from '../actions/group_actions';

const groupsReducer = (state={}, action) => {
  Object.freeze(state);
  let nextState = {};
  nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_GROUPS:
      fixGroupIds(action);
      // nextState = Object.assign({}, state);
      // nextState[action.groups.data]
      return action.groups.data;
    case RECEIVE_GROUP: case GROUP_ADD_MEMBER: case CREATE_GROUP: case RECEIVE_JOIN_REQUEST:
      nextState = Object.assign({}, state);
      removeOldName(nextState, action);
      fixGroupId(action);
      nextState[action.group.data.name] = action.group.data;
      return nextState;
    case REMOVE_GROUP:
      nextState = Object.assign({}, state);
      delete nextState[action.group.data.name];
      return nextState;
    default: return state;
  }
};

export default groupsReducer;

const fixGroupId = action => {
  if (!action.group.data.id) {
    action.group.data.id = action.group.data._id;
    delete action.group.data._id;
  }
  return action;
};

const fixGroupIds = action => {
  action.groups.data.forEach((group, i) => {
    let currentgroup = Object.assign({}, group);
    if (!currentgroup.id) {
      currentgroup.id = currentgroup._id;
      delete currentgroup._id;
      delete action.groups.data[i];
    }
    action.groups.data[group.name] = currentgroup;
  });
  return action;
};

const removeOldName = (nextState, action) => {
  // console.log(action.group.data._id);
  let targetName = '';
  Object.values(nextState).forEach((group, i) => {
    if (group.id === action.group.data._id) {
      targetName = group.name;
    }
  });
  if (targetName !== '') {
    delete nextState[targetName];
  }
  // rely on side-effect mutates
};