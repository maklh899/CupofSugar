const mongoose = require('mongoose');
const { Users } = require('./userModel');

mongoose.pluralize(null);
const bulletinSchema = new mongoose.Schema({
  Users,
  message_body: String,
  message_status: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

const BULLETIN = mongoose.model('Bulletin', bulletinSchema);

module.exports = { BULLETIN };
