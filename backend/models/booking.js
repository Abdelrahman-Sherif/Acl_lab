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
  bookingId:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Booking", bookingSchema);