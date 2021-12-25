const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  depFlightNumber: {
    type: String,
    required: true,
  },
  arrFlightNumber: {
    type: String,
    required: true,
  },
  departureSeats:{
    type: [Number],
    required: true,
    default:[],
  },
  returnSeats:{
    type: [Number],
    required: true,
    default:[],
  },
  firstName:{
    type:String,
    required: true,
  },
  lastName:{
    type:String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);