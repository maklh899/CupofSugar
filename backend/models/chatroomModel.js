const mongoose = require('mongoose');
const { User } = require('./userModel');

mongoose.pluralize(null);

const chatroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: { type: Array, required: true },

  messages: [
    {
      sender: String,
      message_body: String,
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Chatrooms = mongoose.model('Chatrooms', chatroomSchema);

module.exports = Chatrooms;

// messageSchema = new mongoose.Schema({
//   room,
//   Users,
//   message_body: String,
//   message_status: { type: Boolean, default: false},
//   created_at: { type: Date, default: Date.now },