const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  DepflightNumber: {
    type: String,
    required: true,
  },
  ArrflightNumber: {
    type: String,
    required: true,
  },
  bookingID:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Booking", bookingSchema);