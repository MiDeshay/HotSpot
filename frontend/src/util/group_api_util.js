import axios from 'axios';

export const fetchGroups = () => {
  return axios.get('/api/groups/');
};

export const fetchGroup = name => {
  return axios.get(`/api/groups/${name}`);
};

export const createGroup = payload => {
  return axios.post('/api/groups/create', payload);
};

export const updateGroup = group => {
  return axios.patch(`/api/groups/${group.id}/update`, group);
};

export const deleteGroup = payload => {
  return axios.delete(`/api/groups/${payload.groupId}/${payload.ownerId}`);
};

export const updateGroupMembers = payload => {
  return axios.patch('/api/groups/members', payload);
};

export const updateGroupEvents = payload => {
  return axios.patch('/api/groups/events', payload);
};

export const createJoinRequest = payload => {
  return axios.post('/api/groups/join_request', payload);
};

export const respondToJoinRequest = payload => {
  return axios.patch('/api/groups/join_request/response', payload);
};