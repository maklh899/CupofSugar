const mongoose = require('mongoose').set('debug', true);
const { Users } = require('./userModel');

mongoose.pluralize(null);
const aptSchema = new mongoose.Schema({
  AptNumber: { type: Number, index: { unique: true } },
  rentDue: Number,
  rentPaid: Number,
  tenants: Array,
  documents: [{
    name: String,
    body: String,
    date: Date,
  }],
  created_at: { type: Date, default: Date.now },
});

const Apts = mongoose.model('Apartments', aptSchema);

module.exports = Apts;
