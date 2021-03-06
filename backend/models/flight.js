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
    required: true,
    minimum: 1,
  },
  Price: {
    type: Number,
    required: true,
    minimum: 1,
  },
  BusinessSeats: {
    type: Number,
    required: true,
    minimum: 1,
  },
  FirstSeats: {
    type: Number,
    required: true,
    minimum: 1,
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

  },
  BaggageAllowed:{
    type: String,
    required: true,
    default:"Yes"
  },
  EconomySeatsAvail:{
    type: [Boolean],
    required: true,
    default:[],
  },
  BusinessSeatsAvail:{
    type: [Boolean],
    required: true,
    default:[],
  },
  FirstSeatsAvail:{
    type: [Boolean],
    required: true,
    default:[],
  },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
module.exports = Flight;