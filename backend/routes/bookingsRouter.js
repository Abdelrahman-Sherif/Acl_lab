const router = require('express').Router();
let Booking = require('../models/booking');

router.route('/getBookings').get((req, res) => {
  Booking.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getUserBookings').get((req, res) => {
  ///Hardcoding userId till auth is complete
  Booking.find().where("userId").equals("61c347f18128719139d8a8c7")
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Booking.findByIdAndDelete(req.params.id).then(booking => res.json('Booking deleted Successfully'))
    .catch(err => {
      console.log(err);
    });
});










router.route('/addBooking').post((req, res) => {

  const userName = req.body.userName;
  const flightNumber = req.body.flightNumber;
  
  

  const newBooking = new Flight({
    userName , flightNumber , bookingId 

  });
  console.log(newBooking);

  
});


module.exports = router;