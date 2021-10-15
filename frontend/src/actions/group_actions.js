import * as GroupApiUtil from '../util/group_api_util';

export const RECEIVE_GROUPS = "RECEIVE_GROUPS";
export const RECEIVE_GROUP = "RECEIVE_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";
export const RECEIVE_GROUP_ERRORS = "RECEIVE_GROUP_ERRORS";
export const UI_GROUP_SHOW = "UI_GROUP_SHOW";
export const UI_GROUP_SEARCH_ISACTIVE = "UI_GROUP_SEARCH_ISACTIVE";
export const GROUP_ADD_MEMBER = "GROUP_ADD_MEMBER"
export const CREATE_GROUP = "CREATE_GROUP"

const receiveGroups = groups => ({
  type: RECEIVE_GROUPS,
  groups
});

const receiveGroup = group => ({
  type: RECEIVE_GROUP,
  group
});

const removeGroup = group => ({
  type: REMOVE_GROUP,
  group
});

const groupAddMember = group => ({
   type: GROUP_ADD_MEMBER,
  group
})

const groupCreate = group => ({
   type: CREATE_GROUP,
  group
})

export const receiveErrors = errors => ({
  type: RECEIVE_GROUP_ERRORS,
  errors
})

export const uiGroupShow = groupId => ({
  type: UI_GROUP_SHOW,
  groupId
})

export const uiGroupSearchActive = isActive => ({
  type: UI_GROUP_SEARCH_ISACTIVE,
  isActive
})

export const fetchGroups = () => dispatch => {
  GroupApiUtil.fetchGroups().then(groups => dispatch(receiveGroups(groups))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};


export const fetchGroup = name => dispatch => {
  GroupApiUtil.fetchGroup(name).then(group => dispatch(receiveGroup(group))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};

export const createGroup = payload => dispatch => {
  GroupApiUtil.createGroup(payload).then(group => dispatch(groupCreate(group))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};

export const updateGroup = group => dispatch => {
  GroupApiUtil.updateGroup(group).then(group => dispatch(receiveGroup(group))).catch(err => { // Need to fix, this actually adds a new group to the current state.
    dispatch(receiveErrors(err.response.data));
})};

export const updateGroupMembers = payload => dispatch => {
  GroupApiUtil.updateGroupMembers(payload).then(group => dispatch(groupAddMember(group))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};

export const updateGroupEvents = payload => dispatch => {
  GroupApiUtil.updateGroupEvents(payload).then(group => dispatch(receiveGroup(group))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};

export const deleteGroup = payload => dispatch => {
  GroupApiUtil.deleteGroup(payload).then(groupId => dispatch(removeGroup(groupId))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};