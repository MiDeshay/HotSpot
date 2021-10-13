import { RECEIVE_EVENT_ERRORS, RECEIVE_EVENTS } from '../actions/event_actions';

const _nullErrors = [];

const eventErrorsReducer = (state = _nullErrors, action) => {
   Object.freeze(state);

   switch (action.type) {
      case RECEIVE_EVENT_ERRORS:
         return action.errors;

      default: return _nullErrors;
   }
}

export default eventErrorsReducer;