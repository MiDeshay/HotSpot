const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Group = require('./Group');
const EventSchema = new Schema({
    startDate: {
        type: String, 
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },
    //displayed to everybody
    city: {
        type: String,
        required: true
    }, 
    //full address only displayed to members of a group
    address: {
        type: String,
        required: true
    },
    host: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ],
    hostEmail: {
        type: String,
        required: true
    }, 
    
    group: {type: Schema.Types.ObjectId, ref: 'Group'},

    description: {
        type: String,
        required: true
    },
    attendeesEmail: [String],
    mapLat: {
        type: mongoose.Types.Decimal128
     
    }, 
    mapLng: {
        type: mongoose.Types.Decimal128
    }, 
    startTime:{
       type: String,
       required: true,
    },
    endTime:{
      type: String,
      required: true,
   },
    coverPictureKey:{
        type: String
    },
    eventPicturesKeys: [String],
},  {
    timestamps: true
}
)

module.exports = Event = mongoose.model('Event', EventSchema);