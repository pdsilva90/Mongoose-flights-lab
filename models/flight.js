const mongoose = require('mongoose');
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

var destinationSchema = new Schema({
  airport: {
      type: String,
      enum: ['AUS', 'DFW', 'LAX', 'DEN'],
  },
  arrival: {
      type: Date, 
     
  },
});


const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'],
    required: true
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX'],
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999,
  },
  departs: {
    type: Date,
    default: function() {
      return new Date(new Date().setFullYear(newDate().getFullYear() + 1));
    }
  },
  destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);