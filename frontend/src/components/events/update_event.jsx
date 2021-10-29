import React from 'react';

export default class UpdateEvent extends React.Component {

   constructor(props){
      super(props)
      this.event = this.props.selectedEvent.event;
      this.marker = this.props.selectedEvent.marker;
      this.infoWindow = this.props.selectedEvent.infoWindow;

      this.state = Object.assign({}, this.event, {groupId: this.event.group._id});
      if(this.event.coverPictureKey){
         this.state.previewImage = this.props.images[this.event.coverPictureKey]
      }

      this.prevEvents = this.props.events;
      this.submitted = false;

      // Bindings
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateMarker = this.updateMarker.bind(this);
      this.handleFile = this.handleFile.bind(this)
      this.groups = [];
   }

   handleUpdate(input){
      return (e) => {
         // Check end time is after start time
         if (input === 'endTime' && this.state.startDate === this.state.endDate){
            var end = parseInt(e.currentTarget.value.replace(':',''));
            var begin = parseInt(this.state.startTime.replace(':',''));
            if (!begin || end < begin) return;
         }

         this.setState({
            [input]: e.currentTarget.value,
         })
         if (input === 'startTime'){
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

   handleSubmit(e){
      e.preventDefault();
      if (this.state.file){
         let formData = new FormData();
         const {_id, picture, title, description, address, city, startDate, endDate, file, hostEmail} = this.state

         formData.append('image', file);
         formData.append('hostEmail', hostEmail);
         formData.append('picture', picture);
         formData.append('title', title);
         formData.append('address', address);
         formData.append('city', city);
         formData.append('startDate', startDate);
         formData.append('endDate', endDate);
         formData.append('description', description);


         const packet = {
           id: _id,
           data: formData
         }

         this.props.updateEventWithPicture(packet)


      }else{
         this.props.updateEvent(this.state._id, this.state);
      }
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

         // const {coverPictureKey} = this.props.events[this.state._id]
         //    if(coverPictureKey && !this.props.images[coverPictureKey]){
         //       this.props.fetchAllImages()
         //    }

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

   formatTime(time){
      let hours = parseInt(time.slice(0,2));
      let amPm = (hours >= 12)? "PM" : "AM";
      hours = (hours % 12) ? hours % 12 : 12;
      let minutes = time.slice(2);
      return `${hours}${minutes} ${amPm}`;
   }

   updateMarker(){
      this.marker.eventDetails = this.state;
      let marker = this.marker;
      marker.setLabel(this.state.title[0]);

      const images = this.props.images
      const {coverPictureKey, pictureUrl} = this.props.events[this.state._id]

      let eventPicture = ""


      eventPicture = coverPictureKey ? images[coverPictureKey] : ""

      if(pictureUrl){
         eventPicture = pictureUrl
      }
      let start = this.formatTime(marker.eventDetails.startTime);
      let end = this.formatTime(marker.eventDetails.endTime);
     let { description, title } = marker.eventDetails;
     if (description.length > 20) { description = description.slice(0, 40).concat('...') }

      this.infoWindow.setContent(
         `<div class='info-window'> `+
            // `<div><img id='${this.state._id}' src=${eventPicture} class='event-picture'/></div>`+
            `<div class="modal-header-pad"><div class='modal-header'><h2 class='event-title'>${title}</h2></div></div>` +
            `<div class='modal-body-pad'><div class='modal-body'>` +
            `<div class='event-text'>${description}</div>` +
            `</div></div>`+
            `<div class='modal-body-pad'><div class='modal-body'>` +
            `<div class='details-columns'><ul class='details-labels'><li>Address:</li>`+
            `<li>City:</li>`+
            `<li>Begin:</li>`+
            `<li>End:</li></ul>`+
            `<ul class='details-details'><li>${marker.eventDetails.city}</li>` +
            `<li>${marker.eventDetails.address}</li>` +
            `<li'>${marker.eventDetails.startDate} AT ${start}</li>` +
            `<li>${marker.eventDetails.endDate} UNTIL ${end}</li></ul></div>` +
            `</div></div>`+
            `<div class='modal-footer'><div class='event-buttons'> ` +
            `<a id='event-details' href='details' class='button flat'>More Info</a>`+
            (marker.eventDetails.hostEmail !== this.props.currentUser.email ? "" :
                  `<button id='event-edit' class='button'>Edit</button>` +
                  `<button id='event-delete' class='button red'>Delete</button>`
                  ) +
            `</div></div>`+
         '</div>'
      );
   }

   handleFile(e){
      let file = e.currentTarget.files[0]
      const reader = new FileReader();
      reader.onloadend = () => {

        this.setState({previewImage: reader.result})
      }
      reader.readAsDataURL(file)
      this.setState({file: file});



   }

   render(){
      const {previewImage} = this.state;

      const preview = previewImage ? <img id="event-picture" src={previewImage}/> : ""
      return (
         <div className='form-modal animated fadeInTop'>
           <div className="modal-header-pad">
            <div className="modal-header">
              <h2>Edit Event Info</h2>
              <button className="button close" onClick={this.props.closeModal}>𐄂</button>
            </div>
           </div>
            <form className="form" >
              <div className="modal-body-pad">
               <ul className="modal-body">
                  {/* <li>
                     <label htmlFor='event-Picture'>Picture </label>
                     {preview}
                     <input type="file" name="file" onChange={(e) => this.handleFile(e)}/>
                  </li> */}
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
                  <li className="li-split">
                  <label htmlFor="event-start-time">Start Time</label>
                     <input type="time" id="event-start-time" onChange={this.handleUpdate('startTime')} value={this.state.startTime} required/>
                  </li>
                  <li className="li-split">
                  <label htmlFor="event-end-time">End Time</label>
                     <input type="time" id="event-end-time" onChange={this.handleUpdate('endTime')} value={this.state.endTime} required/>
                  </li>
               </ul>
               </div>
                 </form>
               <div className="modal-footer">
                  <button className='button subtle flat' onClick={this.props.closeModal}>Cancel</button>
            <input type='submit' value="Update Event" className="button" onClick={this.handleSubmit}/>
               </div>
               <ul>
                  {this.props.errors.map( err => (
                     <li>{err}</li>
                  ))}
               </ul>
        </div>
      )
   }
}