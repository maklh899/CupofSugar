const mongoose = require('mongoose');
const { room } = require('./chatroomModel');
const { Users } = require('./userModel');

mongoose.pluralize(null);
const messageSchema = new mongoose.Schema({
  room,
  Users,
  message_body: String,
  message_status: { type: Boolean, default: false},
  created_at: { type: Date, default: Date.now },
});

const MESSAGES = mongoose.model('Messages', messageSchema);

module.exports = { MESSAGES };
