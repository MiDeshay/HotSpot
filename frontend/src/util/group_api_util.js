import axios from 'axios';

export const fetchGroups = () => {
  return axios.get('/api/groups/');
};

export const fetchGroup = name => {
  return axios.get(`/api/groups/${name}`);
};

export const deleteGroup = payload => {
  return axios.delete(`/api/groups/${payload.groupId}/${payload.ownerId}`);
};

export const createGroup = payload => {
  return axios.post('/api/groups/create', payload);
};

export const updateGroupMembers = payload => {
  return axios.patch('/api/groups/members', payload);
};

export const updateGroupEvents = payload => {
  return axios.patch('/api/groups/events', payload);
};