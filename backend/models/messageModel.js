const mongoose = require('mongoose');
const { roomId } = require('./chatroomModel');
const { User } = require('./userModel');

mongoose.pluralize(null);
const messageSchema = new mongoose.Schema({
  room,
  sender: User,
  message_body: String,
  created_at: { type: Date, default: Date.now },
});

const MESSAGES = mongoose.model('Messages', messageSchema);

module.exports = { MESSAGES };

// later on would separate  messages and chat rooms into separate models