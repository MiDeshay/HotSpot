import home from './home';
import { connect } from 'react-redux';
import { getEvents, createEvent, deleteEvent, joinEvent, declineEvent } from '../../actions/event_actions';
import { closeModal, openModal } from '../../actions/modal_actions';
import { fetchUsers } from '../../actions/user_actions';
import {fetchAllImages} from '../../actions/image_actions'

const mapStateToProps = state => ({
   user: state.entities.users[state.session.user.id],
   events: state.entities.events,
   groups: state.entities.groups,
   modal: state.ui.modal,
   images: state.entities.images
})

const mapDispatchToProps = dispatch => ({
   getEvents: () => dispatch(getEvents()),
   createEvent: (eventForm) => dispatch(createEvent(eventForm)),
   deleteEvent: eventId => dispatch(deleteEvent(eventId)),
   openCreate: () => dispatch(openModal("createEvent")),
   openUpdate: () => dispatch(openModal("updateEvent")),
   fetchAllImages: () => dispatch(fetchAllImages()),
   openEventDetails: () => dispatch(openModal("eventDetails")),
   fetchUsers: () => dispatch(fetchUsers()),
   joinEvent: (eventId, email) => dispatch(joinEvent(eventId, email)),
   declineEvent: (eventId, email) => dispatch(declineEvent(eventId, email)),
   openModal: (modal) => dispatch(openModal(modal)),
   closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(home);