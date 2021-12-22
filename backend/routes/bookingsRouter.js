const router = require('express').Router();
let Booking = require('../models/booking');

router.route('/getBooking').get((req, res) => {
  Booking.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});






router.route('/addBooking').post((req, res) => {

  const userID = req.body.userID;
  const DepflightNumber = req.body.DepflightNumber;
  const ArrflightNumber = req.body.ArrflightNumber;
  let bookingID = userID+DepflightNumber+ArrflightNumber;
  

  const newBooking = new Booking({
    userID , DepflightNumber ,  ArrflightNumber, bookingID

  });
  console.log(newBooking);
  console.log(bookingID);

  if(Booking.where("bookingID").equals(bookingID).exec(function (err, data){
    console.log(data);
    if(data.length>0){
      res.status(400).json('Error: ' + "This Booking Already exists.");
    }
    else{
      newBooking.save()
    .then(() => res.json('Booking added!'))
    .catch(err => res.status(400).json('Error: ' + err))
    }
  }));
  
});


module.exports = router;