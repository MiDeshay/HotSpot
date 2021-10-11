import home from './home'

const mapStateToProps = state => ({
   currentUser: state.session.currentUser
})

const mapDispatchToProps = dispatch => ({
   getUserLikes: (currentUserId) => dispatch(getUserLikes(currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)