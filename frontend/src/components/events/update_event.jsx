import React from 'react';

export default class UpdateEvent extends React.Component {

   constructor(props){
      super(props)
      this.event = this.props.selectedEvent.event;
      this.marker = this.props.selectedEvent.marker;
      this.infoWindow = this.props.selectedEvent.infoWindow;
      this.state = Object.assign({}, this.event, {groupId: this.event.group._id});
      this.prevEvents = this.props.events;
      this.submitted = false;
      // Bindings
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateMarker = this.updateMarker.bind(this);
      this.groups = [];
   }

   handleUpdate(input){
      return (e) => {
         this.setState({
            [input]: e.currentTarget.value,
         })
      }
   }

   handleSubmit(e){
      e.preventDefault();
      this.props.updateEvent(this.state._id, this.state);
      this.submitted = true;
   }

   // Set min date for inputs
   componentDidMount(){
      for (let name in this.props.groups){
         let group = this.props.groups[name];
         if (group.members.includes(this.props.currentUser.id)){
            this.groups.push(group);
         }
      }

      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      today = yyyy + '-' + mm + '-' + dd;
      this.setState({
         startDate: today,
         endDate: today,
      })
      document.getElementById("event-start-date").setAttribute("min", today);
      document.getElementById("event-end-date").setAttribute("min", today);
   }

   componentDidUpdate(){
      if (this.submitted) {
         if (this.props.errors.length === 0){
            this.props.closeModal();
            this.updateMarker();
         }
         this.submitted = false;
      }

      // Close modal on browser back
      window.onpopstate = e => {
         this.props.closeModal();
      }
   }

   updateMarker(){
      this.marker.eventDetails = this.state;
      let marker = this.marker; 
      marker.setLabel(this.state.title[0]);
      this.infoWindow.setContent(
         `<div class='info-window'> `+
            `<div class='event-header'>`+
               `<h1 class='event-title'>${marker.eventDetails.title}</h1>` +
               (marker.eventDetails.hostEmail !== this.props.currentUser.email ? "" :
                  `<div class='event-buttons'> ` +
                     `<button id='event-edit' class='button'>Edit</button>` +
                     `<button id='event-delete' class='button'>Delete</button>`  +
                  `</div>`
               ) +
               `</div>` +
               `<p class='event-text'>${marker.eventDetails.description}</p>` +
               `<p class='event-text'>${marker.eventDetails.address}</p>` +
               `<p class='event-text'>${marker.eventDetails.city}</p>` +
               `<p class='event-text'>Begin: ${marker.eventDetails.startDate}</p>` +
               `<p class='event-text'>End: ${marker.eventDetails.endDate}</p>` +

         '</div>'
      );
   }

   render(){
      return (
         <div className='form-modal animated fadeInTop'>
            <form className="form" onSubmit={this.handleSubmit}>
               <ul>
                  <li>
                     <label htmlFor='event-title'>Title </label>
                     <input autoComplete="off" onChange={this.handleUpdate('title')}type='text' value={this.state.title} id='event-title' className="text-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-description'>Description </label>
                     <textarea autoComplete="off" onChange={this.handleUpdate('description')}type='body' value={this.state.description} id='event-description' className="textarea-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-address'>Address </label>
                     <input autoComplete="off" onChange={this.handleUpdate('address')}type='text' value={this.state.address} id='event-address' className="text-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-city'>City </label>
                     <input autoComplete="off" onChange={this.handleUpdate('city')}type='text' value={this.state.city} id='event-city' className="text-input"/>
                  </li>
                  <li className="li-split">
                     <label htmlFor='event-start-date'>Start Date </label>
                     <input className='event-date' onChange={this.handleUpdate('startDate')}type='date' value={this.state.startDate} id='event-start-date'/>
                  </li>
                  <li className="li-split">
                     <label htmlFor='event-end-date'>End Date </label>
                     <input className='event-date' onChange={this.handleUpdate('endDate')}type='date' value={this.state.endDate} id='event-end-date'/>
                  </li>
                  
               </ul>
               <div className="modal-footer">
                  <button className='generic-button' onClick={this.props.closeModal}>Cancel</button>
                  <input type='submit' value="Update Event"/>
               </div>

               <ul>
                  {this.props.errors.map( err => (
                     <li>{err}</li>
                  ))}
               </ul>
            </form>
         </div>
      )
   }
}