const mongoose = require('mongoose');
const { Users } = require('./userModel');

mongoose.pluralize(null);
const aptSchema = new mongoose.Schema({
  AptNumber: { index: true },
  tenants: Array,
  documents: [{
    name: String,
    body: String,
    date: Date,
  }],
  created_at: { type: Date, default: Date.now },
});

const APT = mongoose.model('Apartments', aptSchema);

module.exports = { APT };
