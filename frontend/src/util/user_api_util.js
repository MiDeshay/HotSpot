import axios from 'axios';

export const fetchUsers = () => {
  return axios.get('/api/users/');
};

export const fetchUser = (email) => {
  return axios.get(`/api/users/${email}`, email);
};

// create handled in session_api_util.js

export const updateUser = (user) => {
  // debugger
  return axios.patch(`/api/users/${user.id}`, user);
};

export const deleteUser = email => {
  return axios.delete(`/api/users/${email}`, email);
};