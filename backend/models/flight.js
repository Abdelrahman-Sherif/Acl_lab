const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
  FlightNumber: {
    type: String,
    required: true,
    unique : true
  },
  DepartureTime: {
    type: String,
    required: true
  },
  ArrivalTime: {
    type: String,
    required: true,
  },
  DateTakeoff: {
    type: Date,
    required: true
  },
  DateArrival: {
    type: Date,
    required: true
  },
  EconomySeats: {
    type: Number,
    required: true
  },
  BusinessSeats: {
    type: Number,
    required: true
  },
  FirstSeats: {
    type: Number,
    required: true
  },
  AirportArrival: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
  AirportTakeOff: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,

  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;