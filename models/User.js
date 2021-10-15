// User Model
// A user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Group = require('./Group')
const UserSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   profilePictureKey: {
      type: String
   },
   backgroundPictureKey: {
      type: String
   },
   groupsJoined: [{ type: Schema.Types.ObjectId, ref: 'Group'}],
}, {
   timesteamps:true
})

module.exports = User = mongoose.model('User', UserSchema);