import Pins from './pins'
import { connect } from 'react-redux'
const mapStateToProps = state => ({
   //currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
   //getUserLikes: (currentUserId) => dispatch(getUserLikes(currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Pins);