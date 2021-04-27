const mongoose = require('mongoose');

mongoose.pluralize(null);
const userSchema = new mongoose.Schema({
  // profile info
  firstName: {
    type: String,
    // required: true,
    trim: true,
  },
  lastName: {
    type: String,
    // required: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  email: String,
  _userId: { type: String, index: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
  }, // Salted+Hashed
  admin: Boolean,
  aptId: Number,
  // messaging info
  bulletinMessId: Array,
  messageRooms: [{
    roomID: String,
    roomName: String,
  }],

},
{
  timestamps: true,
});

// export "User"
const Users = mongoose.model('Users', userSchema);

// dont need the curly braces
module.exports = Users;
