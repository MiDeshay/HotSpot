import React from 'react'
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";

class EventDetails extends React.Component {
   constructor(props){
      super(props)
      this.event = this.props.event;
   }

   render() {
      let hours = parseInt(this.event.startTime.slice(0,2));
      let amPm = (hours >= 12)? "PM" : "AM"; 
      hours = (hours % 12) ? hours % 12 : 12;
      let minutes = this.event.startTime.slice(2); 
      let time = `${hours}${minutes} ${amPm}`; 
      return (
         <div className='form-modal animated fadeInTop' id='event-details-modal'>
            <h1>{this.event.title}</h1>
            <p>{this.event.address}, {this.event.city}</p>
            <p>{this.event.startDate} AT {time} UNTIL {this.event.endDate}</p>
            <p>{this.event.description}</p>

            {/* <p>Event by: {this.event.host.map( user => " " + user.firstName + " " )}
            </p> */}
            
            <p>Event by: {this.event.host[0].firstName}</p>

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