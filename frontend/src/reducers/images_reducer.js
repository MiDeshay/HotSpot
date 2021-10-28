import {RECEIVE_IMAGES} from "../actions/image_actions";

const imagesReducer = (state = {}, action) => {
    Object.freeze(state);
   
    switch(action.type){
       case RECEIVE_IMAGES: 
          return action.images.data; 
       default: return state; 
    }
}

export default imagesReducer;