const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  bookingId: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "flight",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);