import { connect } from "react-redux";
import CreateEvent from "./create_event";
import { closeModal } from "../../actions/modal_actions";
import { createEvent } from "../../actions/event_actions";

const mapStateToProps = state => ({
   events: state.entities.events,
   currentUser: state.entities.users[state.session.user.id],
   errors: state.errors.event,
})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal()),
   createEvent: (eventForm) => dispatch(createEvent(eventForm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent)