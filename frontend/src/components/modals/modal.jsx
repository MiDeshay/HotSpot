import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreateEventContainer from '../events/create_event_container';
import UpdateEventContainer from '../events/update_event_container';

function Modal(props) {
   let modal = props.modal;
   let closeModal = props.closeModal;
   if (!modal) {
      return null;
   }

   let component;
   switch (modal) {
      case "createEvent":
         component = <CreateEventContainer pos={props.pos} geocoder={props.geocoder}/>;
         break;
      case "updateEvent":
         component = <UpdateEventContainer selectedEvent={props.event}/>
         break;
      default:
         return null;
   }

   return (
      <div className="modal-background">
         <div className="modal-close" onClick={closeModal} />
         <div onClick={e => e.stopPropagation()}>
         { component }
         </div>
      </div>
   );
}

const mapStateToProps = state => {
   return {
      modal: state.ui.modal
   };
};

const mapDispatchToProps = dispatch => {
   return {
      closeModal: () => dispatch(closeModal())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);