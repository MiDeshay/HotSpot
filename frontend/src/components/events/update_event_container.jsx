import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import { updateEvent, updateEventWithPicture } from "../../actions/event_actions";
import UpdateEvent from './update_event'
import {fetchAllImages} from "../../actions/image_actions"

const mapStateToProps = state => ({
   events: state.entities.events,
   currentUser: state.entities.users[state.session.user.id],
   errors: state.errors.event,
   groups: state.entities.groups,
   images: state.entities.images
})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal()),
   updateEvent: (eventId, eventForm) => dispatch(updateEvent(eventId, eventForm)),
   updateEventWithPicture: (packet) => dispatch(updateEventWithPicture(packet)),
   fetchAllImages: () => dispatch(fetchAllImages())
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)
