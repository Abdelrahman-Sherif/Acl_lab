const router = require('express').Router();
let Booking = require('../models/booking');

router.route('/getBookings').get((req, res) => {
  Booking.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addBooking').post((req, res) => {
  console.log("Adding booking Backend ");
  console.log(req.body);
  const arrFlightNumber = req.body.arrFlightNumber;
  const depFlightNumber = req.body.depFlightNumber;
  const returnSeats = req.body.returnSeats.split(',');
  const departureSeats = req.body.departureSeats.split(',');
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
 

  const newBooking = new Booking({
    arrFlightNumber:arrFlightNumber , depFlightNumber:depFlightNumber , userId:userId ,
    returnSeats:returnSeats, departureSeats:departureSeats, lastName:lastName,
    firstName:firstName,
  });

  
  newBooking.save()
    .then(() => res.json('Booking added!'))
    .catch(err => res.status(405).json('Error adding booking: ' + err))
    
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

router.route("/updateReturnSeats/:id").post((req, res) => {
  Booking.findByIdAndUpdate(
    { _id: req.params.id },
    {
      returnSeats: req.body.returnSeats,
    }
  )
    .then(()=> {console.log("Updated Seats succesffully");
  return res.status(200).json('Updated Seats successfully');})
    .catch(err => {
      console.log("Error finding Seats: " + err);
      return res.status(400).json('Couldnt find Seats,Error: ' + err);});
});

router.route('/updateUserNames/:id').post(async (req, res) => {

  console.log("Gonna update user with data: "+ JSON.stringify(req.body));
  const userId = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

   if(Booking.where("userId").equals(userId).exec(async function (err, data){
    var bookings = data;
    console.log("Booking found length: "+ bookings.length);
    if(bookings.length == 0){
      return res.status(200).json("The user has no bookings to update");
    }
    else{
      ///Update user bookings to chnage name
      for (let i = 0; i < bookings.length; i++) { 
        console.log("Updating booking user name with id: "+ bookings[i].id);
        await Booking.findByIdAndUpdate(
          { _id: bookings[i].id },
          {
            firstName: firstName,
            lastName: lastName,
          }
        )
      }
      return res.status(200).json("Updated user bookings");
    }
    
   
  }));
  
});


module.exports = router;