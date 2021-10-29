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
        <div className='event-details form-modal animated fadeInDetails' id='event-details-modal'>
            <div className="modal-header-pad">
              <div className="modal-header">
                <h2>{event.title}</h2>
                <button className="button close" onClick={this.props.closeModal}>𐄂</button>
              </div>
            </div>
            <div className="modal-body-pad">
              <div className="modal-body">
                <div className='details-columns'>
                  <ul className="details-labels">
                      <li>Event by:</li>
                      <li>Host Email:</li>
                      <li>Address:</li>
                      <li>City:</li>
                      <li>Start Date:</li>
                      <li>End Date:</li>

                  </ul>
                  <ul className='details-details'>
                      <li>{event.host[0].firstName}</li>
                      <li>{event.host[0].email}</li>
                      <li>{event.address}</li>
                      <li>{event.city}</li>
                      <li>{event.startDate}</li>
                      <li>AT {start} UNTIL {event.endDate} {end}</li>
                  </ul>
                </div>
              </div>
            </div>
          <div className="modal-body-pad">
            <div className="modal-body">
              <p>{event.description}</p>
            </div>
          </div>

            {/* <p>Event by: {event.host.map( user => " " + user.firstName + " " )}
            </p> */}


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