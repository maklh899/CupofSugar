// const mongoose = require('mongoose').set('debug', true);
const mongoose = require('mongoose');

mongoose.pluralize(null);
const aptSchema = new mongoose.Schema({
  AptNumber: { type: Number, index: { unique: true } },
  balanceDue: Number,
  balancePaid: Number,
  rent: Number,
  paymentMonth: Date,
  paymentHistory: [{
    payer: String,
    payment: Number,
    date: { type: Date, default: Date.now },
  }],
  mainRequest: [{
    requestor: String,
    body: String,
    status: String,
    date: { type: Date, default: Date.now },
  }],
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
