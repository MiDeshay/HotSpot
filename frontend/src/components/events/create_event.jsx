import React from 'react';
const mapsKey = process.env.REACT_APP_MAPS_API_KEY;

export default class CreateEvent extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         address: "",
         city: "",
         hostEmail: this.props.currentUser.email,
         title: "",
         description: "",
         mapLat: this.props.pos.lat,
         mapLng: this.props.pos.lng,
         startTime: "",
         endTime: "",
         startDate: "",
         endDate: "",
         groupId: "",
      }
      this.submitted = false;
      // Bindings
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.groups = [];
   }

   handleUpdate(input) {
      return (e) => {
         // Check end time is after start time
         if (input === 'endTime' && this.state.startDate === this.state.endDate) {
            var end = parseInt(e.currentTarget.value.replace(':', ''));
            var begin = parseInt(this.state.startTime.replace(':', ''));
            if (!begin || end < begin) return;
         }

         this.setState({
            [input]: e.currentTarget.value,
         })
         if (input === 'startTime') {
            let time = e.currentTarget.value.split(':').map(Number);
            time[0] += 1;
            if (time[0] > 23) time[0] = "00";
            if (time[1] < 10) time[1] = '0' + time[1];
            this.setState({
               endTime: time.join(':'),
            })
         }

      }
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.createEvent(this.state);
      this.submitted = true;
   }

   // Set min date for inputs
   componentDidMount() {
      for (let name in this.props.groups) {
         let group = this.props.groups[name];
         if (group.members.includes(this.props.currentUser.id)) {
            this.groups.push(group);
         }
      }

      const latlng = {
         lat: this.state.mapLat,
         lng: this.state.mapLng,
      };

      this.props.geocoder
         .geocode({ location: latlng })
         .then((response) => {
            let address = '';
            let city = '';
            response.results[0].address_components.forEach(addr => {
               if (addr.types[0] === 'plus_code') address += addr.short_name + " ";
               if (addr.types[0] === 'premise') address = addr.short_name + " ";
               if (addr.types[0] === 'political') address += addr.short_name + " ";
               if (addr.types[0] === 'street_number') address += addr.short_name + " ";
               if (addr.types[0] === 'route') address += (addr.short_name);
               if (addr.types[0] === 'locality') city = addr.long_name;
               this.setState({
                  address,
                  city
               })
            })
         })

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

   componentDidUpdate() {
      if (this.submitted) {
         if (this.props.errors.length === 0) {
            this.props.closeModal();
         }
         this.submitted = false;
      }

      // Close modal on browser back
      window.onpopstate = e => {
         this.props.closeModal();
      }
   }

   render() {
      return (
         <div className='form-modal animated fadeInTop'>
           <div className="modal-header-pad">
             <div className="modal-header">
               <h2>Organize an Event</h2>
              <button className="button close" onClick={this.props.closeModal}>????</button>
             </div>
           </div>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="modal-body-pad">
               <ul className="modal-body">
                  <li>
                     <label htmlFor='event-title'>Title
                     <input autoComplete="off" onChange={this.handleUpdate('title')} type='text' value={this.state.title} id='event-title' className="text-input" />
                     </label>
                  </li>
                  <li>
                     <label htmlFor='event-description'>Description
                     <textarea autoComplete="off" onChange={this.handleUpdate('description')} type='body' value={this.state.description} id='event-description' className="textarea-input" />
                     </label>
                  </li>
                  <li>
                     <label htmlFor='event-address'>Address
                     <input autoComplete="off" onChange={this.handleUpdate('address')} type='text' value={this.state.address} id='event-address' className="text-input" />
                     </label>
                  </li>
                  <li>
                     <label htmlFor='event-city'>City
                     <input autoComplete="off" onChange={this.handleUpdate('city')} type='text' value={this.state.city} id='event-city' className="text-input" />
                     </label>
                  </li>
                  <li className="li-split">
                     <label htmlFor='event-start-date'>Start Date </label>
                     <input className='event-date' onChange={this.handleUpdate('startDate')} type='date' value={this.state.startDate} id='event-start-date' />
                  </li>
                  <li className="li-split">
                     <label htmlFor='event-end-date'>End Date </label>
                     <input className='event-date' onChange={this.handleUpdate('endDate')} type='date' value={this.state.endDate} id='event-end-date' />
                  </li>
                  <li className="li-split">
                     <label htmlFor="event-start-time">Start Time</label>
                     <input type="time" id="event-start-time" onChange={this.handleUpdate('startTime')} value={this.state.startTime} required />
                  </li>
                  <li className="li-split">
                     <label htmlFor="event-end-time">End Time</label>
                     <input type="time" id="event-end-time" onChange={this.handleUpdate('endTime')} value={this.state.endTime} required />
                  </li>
                  <li className="li-split">
                     <label htmlFor="groups">Choose a Group:</label>
                     <select id="groups" defaultValue={'DEFAULT'} onChange={this.handleUpdate('groupId')}>
                        <option value="DEFAULT" disabled='disabled'>Select a group</option>
                        <option key={`group-Public`} value="Public" >Public</option>
                        {this.groups.map((group, i) => (
                           <option key={`group-${i}`} value={group.id} >{group.name}</option>
                        ))
                        }
                     </select>
                  </li>
               </ul>
               </div>
               <div className="modal-footer">
                  <button className='button subtle flat' onClick={this.props.closeModal}>Cancel</button>
                  <input type='submit' className="button" value="Create Event" />
               </div>
               <ul>
                  {this.props.errors.map((err, i) => (
                     <li key={`error-${i}`}>{err}</li>))}
               </ul>
            </form>
         </div>
      )
   }
}