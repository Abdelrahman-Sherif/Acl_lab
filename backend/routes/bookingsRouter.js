const router = require('express').Router();
let Booking = require('../models/booking');

router.route('/getBooking').get((req, res) => {
  Booking.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
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