import axios from 'axios';

export const getEventsApi = () => {
   return axios.get('/api/events/');
};

export const createEventsApi = eventForm => (
   axios.post('/api/events/create_event', eventForm)
)

export const updateEventApi = (eventId, eventForm) => (
   axios.patch(`/api/events/${eventId}`, eventForm)
)

export const updateEventPicture = (packet) => (
   axios.patch(`/api/events/update_with_picture/${packet.id}`, packet.data)
)

export const deleteEventApi = eventId => (
   axios.delete(`/api/events/delete/${eventId}`)
)

export const joinEventApi = (eventId, email) => (
   axios.patch(`/api/events/join_event/${eventId}`, email)
)

export const declineEventApi = (eventId, email) => (
   axios.patch(`/api/events/decline_event/${eventId}`, email)
)