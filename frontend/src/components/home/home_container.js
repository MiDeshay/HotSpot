import home from './home';
import { connect } from 'react-redux';
import { getEvents, createEvent, clearEvents } from '../../actions/event_actions';
import { openModal } from '../../actions/modal_actions';
import { fetchUsers } from '../../actions/user_actions';

const mapStateToProps = state => ({
   user: state.entities.users[state.session.user.id],
   events: state.entities.events,
   groups: state.entities.groups
})

const mapDispatchToProps = dispatch => ({
   getEvents: () => dispatch(getEvents()),
   createEvent: (eventForm) => dispatch(createEvent(eventForm)),
   clearEvents: () => dispatch(clearEvents()),
   openModal: () => dispatch(openModal("createEvent")),
   fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(home);