import home from './home'
import { connect } from 'react-redux'
import { getEvents } from '../../actions/event_actions'

const mapStateToProps = state => ({
   user: state.entities.users[state.session.user.id],
   events: state.entities.events
})

const mapDispatchToProps = dispatch => ({
   getEvents: () => dispatch(getEvents()),
})

export default connect(mapStateToProps, mapDispatchToProps)(home);