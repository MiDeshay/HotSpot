import axios from 'axios';

export const getEventsApi = () => {
   return axios.get('/api/events/');
};

export const createEventsApi = (eventForm) => (
   axios.post('/api/events/create_event', eventForm)
)