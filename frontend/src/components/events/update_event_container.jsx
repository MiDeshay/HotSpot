import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { updateEvent } from "../../actions/event_actions";
import UpdateEvent from './update_event'

const mapStateToProps = state => ({
   events: state.entities.events,
   currentUser: state.entities.users[state.session.user.id],
   errors: state.errors.event,
   groups: state.entities.groups,
})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal()),
   updateEvent: (eventId, eventForm) => dispatch(updateEvent(eventId, eventForm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)
