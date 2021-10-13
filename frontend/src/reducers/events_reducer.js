import {RECEIVE_EVENTS} from '../actions/event_actions'

const eventsReducer = (state = {}, action) => {
   Object.freeze(state);

   let newState = Object.assign({}, state);

   switch(action.type){
      case RECEIVE_EVENTS: 
         return action.events; 
      default: 
         return state; 
   }
}

export default eventsReducer;
