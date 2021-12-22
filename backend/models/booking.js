const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);