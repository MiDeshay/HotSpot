const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Event = require('./Events');

const GroupSchema = new Schema({
  name: {
     type: String,
     required: true
  },
  description: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  members: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}],
    default: undefined
  },
  events: {
    type: [{type: Schema.Types.ObjectId, ref: 'Event'}],
    default: undefined
  },
  bannerPictureKey: {
    type: String
  }
}, {
  timesteamps:true
})


module.exports = Group = mongoose.model('Group', GroupSchema);