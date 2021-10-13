const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    pinId: {
        type: String,
        required: true
    },
    
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
    hostEmail: {
        type: String,
        required: true
    }, 
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
    }
},  {
    timestamps: true
}
)

module.exports = Event = mongoose.model('Event', EventSchema);