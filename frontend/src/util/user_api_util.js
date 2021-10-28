import axios from 'axios';

export const fetchUsers = () => {
  return axios.get('/api/users/');
};

export const fetchUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

// create handled in session_api_util.js

export const updateUser = (user) => {
  // debugger
  return axios.patch(`/api/users/${user.id}`, user);
};

export const updateUserPicture = (packet) => {
  return axios.patch(`/api/users/picture_update/${packet.id}`, packet.data);
}

export const deleteUser = userId => {
  return axios.delete(`/api/users/${userId}`, userId);
};