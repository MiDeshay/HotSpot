import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';
import { UI_SHOW_SESSION_MODAL } from '../actions/session_actions';
import { GROUP_ADD_MEMBER } from '../actions/group_actions';

const modalsReducer = (state = null, action) => {
  Object.freeze(state);

  switch(action.type){
    case OPEN_MODAL:
      return action.modal;

    case CLOSE_MODAL: case GROUP_ADD_MEMBER:
      return null;

    // case UI_SHOW_SESSION_MODAL: // action shape -- modal: {session: {form: "'signup' or 'login'", show: "Boolean"}}
    //   return {session: action.modal};

    default: return state;
  }
};

export default modalsReducer;