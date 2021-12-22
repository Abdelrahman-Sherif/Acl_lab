const router = require('express').Router();
let Booking = require('../models/booking');

router.route('/getBookings').get((req, res) => {
  Booking.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBooking').get((req, res) => {
  const arrFlightNumber = req.body.arrFlightNumber;
  const depFlightNumber = req.body.depFlightNumber;
  const bookingId = req.body.bookingId;
  const userId = req.body.userId;
  

  const newBooking = new Booking({
    arrFlightNumber:arrFlightNumber , depFlightNumber:depFlightNumber ,
    bookingId:bookingId , userId:userId 

  });

  
  newBooking.save()
    .then(() => res.json('Booking added!'))
    .catch(err => res.status(400).json('Error: ' + err))
    
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

  const userId = req.body.userId;
  const depFlightNumber = req.body.depFlightNumber;
  const arrFlightNumber = req.body.arrFlightNumber;
  const bookingId = req.body.bookingId;
  

  const newBooking = new Booking({
    userId:userId , depFlightNumber:depFlightNumber ,  arrFlightNumber:arrFlightNumber, bookingId:bookingId
  });
  console.log("New booking is: "+ JSON.stringify(newBooking));
  
  if(Booking.where("bookingId").equals(bookingId).exec(function (err, data){
    console.log("Booking length: "+ data.length);
    if(data.length>0){
      res.status(401).json('Error: ' + "This Booking Already exists.");
    }
    else{
      newBooking.save()
    .then(() => res.json('Booking added!'))
    .catch(err => res.status(402).json('Error: ' + err))
    }
  }));
  
});


module.exports = router;