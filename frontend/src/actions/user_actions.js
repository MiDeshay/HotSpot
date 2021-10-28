import * as UserApiUtil from "../util/user_api_util";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";
export const UI_USER_SEARCH_ISACTIVE = "UI_USER_SEARCH_ISACTIVE";

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

const removeUser = userId => ({
  type: REMOVE_USER,
  userId
});

export const receiveErrors = errors => ({
  type: RECEIVE_USER_ERRORS,
  errors
});

export const uiUserSearchActive = isActive => ({
  type: UI_USER_SEARCH_ISACTIVE,
  isActive
})

export const fetchUsers = () => dispatch => (
  UserApiUtil.fetchUsers().then(users => dispatch(receiveUsers(users))).catch(err => {
    dispatch(receiveErrors(err.response.data));
}));

export const fetchUser = userId => dispatch => (
  UserApiUtil.fetchUser(userId).then(user => dispatch(receiveUser(user))).catch(err => {
    dispatch(receiveErrors(err.response.data));
}));

// export const fetchAttendingUsers = eventId

export const updateUser = user => dispatch => {
  // debugger
  return UserApiUtil.updateUser(user).then(user => dispatch(receiveUser(user))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})};

export const updateUserWithPicture = user => dispatch => {
  return UserApiUtil.updateUserPicture(user).then(user => dispatch(receiveUser(user))).catch(err => {
    dispatch(receiveErrors(err.response.data));
})}

export const deleteUser = userId => dispatch => (
  UserApiUtil.deleteUser(userId).then(() => dispatch(removeUser(userId))).catch(err => {
    dispatch(receiveErrors(err.response.data));
}));