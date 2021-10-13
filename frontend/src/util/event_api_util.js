import axios from 'axios';

export const getEventsApi = () => {
   return axios.get('/api/events/');
};
 