import React from 'react';

export default class CreateEvent extends React.Component {

   constructor(props){
      super(props)
      this.state = {
         pinId: 1,
         address: "",
         city: "",
         hostEmail: this.props.currentUser.email,
         title: "",
         description: "",
         mapLat: this.props.pos.lat,
         mapLng: this.props.pos.lng,
         startDate: "",
         endDate: "",     
      }
      this.prevEvents = this.props.events;
      this.submitted = false;
      // Bindings
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.createEvent(this.state);
      this.submitted = true;
   }

   // Set min date for inputs
   componentDidMount(){
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
         }
         this.submitted = false;
      }
   }
   render(){
      return (
         <div>
            <form className='generic-form' onSubmit={this.handleSubmit}>
               <label htmlFor='event-title'>Title </label>
               <input onChange={this.handleUpdate('title')}type='text' value={this.state.title} id='event-title'/>

               <label htmlFor='event-description'>Description </label>
               <input onChange={this.handleUpdate('description')}type='body' value={this.state.description} id='event-description'/>

               <label htmlFor='event-address'>Address </label>
               <input onChange={this.handleUpdate('address')}type='text' value={this.state.address} id='event-address'/>

               <label htmlFor='event-city'>City </label>
               <input onChange={this.handleUpdate('city')}type='text' value={this.state.city} id='event-city'/>

               <label htmlFor='event-start-date'>Start Date </label>
               <input className='event-date' onChange={this.handleUpdate('startDate')}type='date' value={this.state.startDate} id='event-start-date'/>

               <label htmlFor='event-end-date'>End Date </label>
               <input className='event-date' onChange={this.handleUpdate('endDate')}type='date' value={this.state.endDate} id='event-end-date'/>
               
               <div>
                  <button className='generic-button' onClick={this.props.closeModal}>Cancel</button>
                  <input type='submit' value="Create Event"/>
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