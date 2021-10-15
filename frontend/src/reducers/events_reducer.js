import {RECEIVE_EVENTS, RECEIVE_EVENT, CLEAR_EVENTS} from '../actions/event_actions'
import {REMOVE_GROUP} from '../actions/group_actions'

const eventsReducer = (state = {}, action) => {
   Object.freeze(state);

   let newState = Object.assign({}, state);

   switch(action.type){
      case RECEIVE_EVENTS: 
         return action.events; 
      
      case RECEIVE_EVENT: 
         newState[action.event._id] = action.event;
         return newState;

      case REMOVE_GROUP:
         action.group.data.events.map(eventId => {
            delete newState[eventId]
         })
         return newState
      
      case CLEAR_EVENTS: 
         return {};
      default: return state; 
   }
}

export default eventsReducer;
