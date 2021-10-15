import home from './home';
import { connect } from 'react-redux';
import { getEvents, createEvent } from '../../actions/event_actions';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = state => ({
   user: state.entities.users[state.session.user.id],
   events: state.entities.events,
   groups: state.entities.groups
})

const mapDispatchToProps = dispatch => ({
   getEvents: () => dispatch(getEvents()),
   createEvent: (eventForm) => dispatch(createEvent(eventForm)),
   openModal: () => dispatch(openModal("createEvent")),
})

export default connect(mapStateToProps, mapDispatchToProps)(home);