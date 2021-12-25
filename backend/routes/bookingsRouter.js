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

router.route("/delete/:id").delete((req, res) => {
  console.log("Backend deleting booking with ID: "+ req.params.id);

  Booking.findByIdAndDelete(req.params.id).then(booking => res.json('Booking deleted Successfully'))
    .catch(err => {
      console.log(err);
    });
});


router.route('/addBooking').post((req, res) => {

  const userId = req.body.userId;
  const depFlightNumber = req.body.depFlightNumber;
  const arrFlightNumber = req.body.arrFlightNumber;
  const departureSeats = req.body.departureSeats;
  const arrivalSeats = req.body.arrivalSeats;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  
  

  const newBooking = new Booking({
    userId:userId , depFlightNumber:depFlightNumber ,  arrFlightNumber:arrFlightNumber, departureSeats:departureSeats,
    arrivalSeats:arrivalSeats,firstName:firstName,lastName:lastName
  });
  console.log("New booking is: "+ JSON.stringify(newBooking));

  newBooking.save()
  .then(() => res.json('Booking added!'))
  .catch(err => res.status(402).json('Error: ' + err))
  
  //User can book many times same flights, but will choose different seats so no need to check

  // if(Booking.where("bookingId").equals(bookingId).exec(function (err, data){
  //   console.log("Booking length: "+ data.length);
  //   if(data.length>0){
  //     res.status(401).json('Error: ' + "This Booking Already exists.");
  //   }
  //   else{
  //     newBooking.save()
  //   .then(() => res.json('Booking added!'))
  //   .catch(err => res.status(402).json('Error: ' + err))
  //   }
  // }));
  
});

router.route("/updateDepartureSeats/:id").post((req, res) => {
  Booking.findByIdAndUpdate(
    { _id: req.params.id },
    {
      departureSeats: req.body.departureSeats,
    }
  )
    .then(()=> {console.log("Updated Seats succesffully");
  return res.status(200).json('Updated Seats successfully');})
    .catch(err => {
      console.log("Error finding Seats: " + err);
      return res.status(400).json('Couldnt find Seats,Error: ' + err);});
});

router.route("/updateArrivalSeats/:id").post((req, res) => {
  Booking.findByIdAndUpdate(
    { _id: req.params.id },
    {
      arrivalSeats: req.body.arrivalSeats,
    }
  )
    .then(()=> {console.log("Updated Seats succesffully");
  return res.status(200).json('Updated Seats successfully');})
    .catch(err => {
      console.log("Error finding Seats: " + err);
      return res.status(400).json('Couldnt find Seats,Error: ' + err);});
});

router.route('/updateUserNames/:id').post((req, res) => {

  const userId = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

   if(Booking.where("userId").equals(userId).exec(function (err, data){
    var bookings = data;
    console.log("Booking found length: "+ bookings.length);
    if(bookings.length == 0){
      res.status(401).json('Error: ' + "The user has no bookings to update");
    }
    else{
      ///Update user bookings to chnage name
      for (let i = 0; i < bookings.length; i++) { 
        Booking.findByIdAndUpdate(
          { _id: bookings[i].id },
          {
            firstName: firstName,
            lastName: lastName,
          }
        )
      }
    }
   
  }));
  
});


module.exports = router;