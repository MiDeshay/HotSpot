import getEventsApi from '../util/event_api_util'

export const RECEIVE_EVENT_ERRORS = "RECEIVE_EVENT_ERRORS";
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

// Creators
const receiveEvents = (events) => ({
   type: RECEIVE_EVENT,
   events
})

const receiveErrors = errors => ({
   type: RECEIVE_EVENT_ERRORS,
   errors
});

export const getEvents = () => (
   getEventsApi()
      .then
         (events => dispatch(receiveEvents(events)),
         (errs => dispatch(receiveErrors(errs)))
      )
)