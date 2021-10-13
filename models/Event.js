// Event model
// Details on an event such as position, time, and other misc info.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   
   location: {
      lat: {
         type: Number,
         required: true,
      },
      
      lng: {
         type: Number,
         required: true
      }
   },

   author: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true 
   }, 

   type: {
      type: String,
   }
}, {
   timesteamps:true
})

module.exports = Event = mongoose.model('Event', EventSchema);