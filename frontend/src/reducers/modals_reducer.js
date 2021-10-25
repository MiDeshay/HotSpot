import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { UI_SHOW_SESSION_MODAL } from '../actions/session_actions';

const modalsReducer = (state = null, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_MODAL:
      return action.modal;

    case CLOSE_MODAL:
      return null;

    case UI_SHOW_SESSION_MODAL: // action shape -- modal: {modal: "'signup' or 'login'", show: "Boolean"}
      return action.modal;

    default: return state;
  }
};

export default modalsReducer;