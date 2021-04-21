const mongoose = require('mongoose');
const { Users } = require('./userModel');

mongoose.pluralize(null);

const chatroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: Array,
  // messages: Array,
  messages: [
    {
      sender: String,
      message_body: String,
      message_status: { type: Boolean, default: false },
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
},
{
  timestamps: true,
});

const Chatrooms = mongoose.model('Chatrooms', chatroomSchema);

module.exports = Chatrooms;

// messageSchema = new mongoose.Schema({
//   room,
//   Users,
//   message_body: String,
//   message_status: { type: Boolean, default: false},
//   created_at: { type: Date, default: Date.now },