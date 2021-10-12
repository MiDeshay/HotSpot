import axios from 'axios';

export const fetchUsers = () => {
  return axios.get('/api/users/');
};

export const fetchUser = (email) => {
  return axios.get(`/api/users/${email}`, email);
};

// create handled in session_api_util.js

export const updateUser = (user) => {
  return axios.post('/api/users/:email', user);
};

export const deleteUser = email => {
  return axios.delete('/api/users/:email', email);
};