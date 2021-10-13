import { getEventsApi, createEventsApi } from '../util/event_api_util'

export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

// Creators
const receiveEvents = (events) => ({
   type: RECEIVE_EVENTS,
   events
})

const receiveEvent = event => ({
   type: RECEIVE_EVENT,
   event 
})

const receiveErrors = errors => ({
   type: RECEIVE_EVENT_ERRORS,
   errors
});

// Thunk actions
export const getEvents = () => dispatch => (
   getEventsApi()
      .then
         (events => dispatch(receiveEvents(events.data)),
         (errs => dispatch(receiveErrors(errs)))
      )
)

export const createEvent = (eventForm) => dispatch => (
   createEventsApi(eventForm)
      .then
         (event => dispatch(receiveEvent(event.data))),
         (errs => dispatch(receiveErrors(errs)))
)