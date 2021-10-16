import React from 'react';

export default class UpdateEvent extends React.Component {

   constructor(props){
      super(props)
      this.state = this.props.event;
      this.prevEvents = this.props.events;
      console.log(this.props);
      this.submitted = false;
      // Bindings
      this.handleUpdate = this.handleUpdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
         }
         this.submitted = false;
      }
   }
   render(){
      return (
         <div className='form-modal animated fadeInTop'>
            <form className="form" onSubmit={this.handleSubmit}>
               <ul>
                  <li>
                     <label htmlFor='event-title'>Title </label>
                     <input onChange={this.handleUpdate('title')}type='text' value={this.state.title} id='event-title' className="text-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-description'>Description </label>
                     <textarea onChange={this.handleUpdate('description')}type='body' value={this.state.description} id='event-description' className="textarea-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-address'>Address </label>
                     <input onChange={this.handleUpdate('address')}type='text' value={this.state.address} id='event-address' className="text-input"/>
                  </li>
                  <li>
                     <label htmlFor='event-city'>City </label>
                     <input onChange={this.handleUpdate('city')}type='text' value={this.state.city} id='event-city' className="text-input"/>
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

                     <label htmlFor="groups">Choose a Group:</label>
                     <select id="groups" onChange={this.handleUpdate('groupId')}>
                        <option value="" selected={true} disabled='disabled'>Select a group</option>
                        {this.groups.map( group => (
                           <option value={group.id} >{group.name}</option>
                        ))
                     }
                     </select>
                  </li>
               </ul>
               <div className="modal-footer">
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