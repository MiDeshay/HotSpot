import axios from 'axios';

export const getEventsApi = () => {
   return axios.get('/api/events/');
};

export const createEventsApi = (eventForm) => (
   axios.post('/api/events/create_event', eventForm)
)

export const updateEventApi = (eventId, eventForm) => (
   axios.patch(`/api/events/${eventId}`, eventForm)
)