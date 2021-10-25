const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');
const Group = require('./Group');

const GroupJoinRequestSchema = new Schema({
  user: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    required: true
  },
  group: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    required: true
  },
}, {
  timesteamps: true
});


module.exports = GroupJoinRequest = mongoose.model('GroupJoinRequest', GroupJoinRequestSchema);