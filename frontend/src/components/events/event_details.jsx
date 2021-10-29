import React from 'react'
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";

class EventDetails extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         event: null,
      }
   }

   // Rewrite later to load event from DB using api call. For now directly reference event from state assuming that it's already present.
   componentDidMount(){
      this.setState({
         event: this.props.events[this.props.eventId]
      })
   }

   formatTime(time){
      let hours = parseInt(time.slice(0,2));
      let amPm = (hours >= 12)? "PM" : "AM"; 
      hours = (hours % 12) ? hours % 12 : 12;
      let minutes = time.slice(2); 
      return `${hours}${minutes} ${amPm}`; 
   }

   render() {
      if (!this.state.event) return null;
      // Time formatting
      let event = this.state.event;

      let start = this.formatTime(event.startTime);
      let end = this.formatTime(event.endTime);

      return (
         <div className='form-modal animated fadeInTop' id='event-details-modal'>
            <h1>{event.title}</h1>
            <p>{event.address}, {event.city}</p>
            <p>{event.startDate} AT {start} UNTIL {event.endDate} {end}</p>
            <p>{event.description}</p>

            {/* <p>Event by: {event.host.map( user => " " + user.firstName + " " )}
            </p> */}
            
            <p>Event by: {event.host[0].firstName}</p>

         </div>
      )
   }
}

const mapStateToProps = state => ({
   events: state.entities.events,
   currentUser: state.entities.users[state.session.user.id],
   errors: state.errors.event,
})

const mapDispatchToProps = dispatch =>({
   closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);