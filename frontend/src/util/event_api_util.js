import axios from 'axios';

export const getEventsApi = () => {
   return axios.post('/api/events/');
};
 