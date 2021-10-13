import { getEventsApi } from '../util/event_api_util'

export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

// Creators
const receiveEvents = (events) => ({
   type: RECEIVE_EVENTS,
   events
})

const receiveErrors = errors => ({
   type: RECEIVE_EVENT_ERRORS,
   errors
});

export const getEvents = () => dispatch => (
   getEventsApi()
      .then
         (events => dispatch(receiveEvents(events.data)),
         (errs => dispatch(receiveErrors(errs)))
      )
)