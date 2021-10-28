import {RECEIVE_EVENTS, RECEIVE_EVENT, CLEAR_EVENTS, DELETE_EVENT} from '../actions/event_actions'
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
      
      case CLEAR_EVENTS: 
         return {};
      
      case DELETE_EVENT:
         delete newState[action.event.id];
         return newState;
      default: return state; 
   }
}

export default eventsReducer;
