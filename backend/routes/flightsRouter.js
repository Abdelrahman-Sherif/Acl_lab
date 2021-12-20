const router = require('express').Router();
let Flight = require('../models/flight');

router.route('/get').get((req, res) => {
  Flight.find()
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getFiltered').get((req, res) => {
  let newParams = {};
  for (const [key, value] of Object.entries(req.query)) {
    if(['FlightNumber', 'AirportTakeOff', 'AirportArrival'].includes(key)){
      // Check if substring matches
      newParams[key] = {$regex : "^" + value};
    }
    else{
      newParams[key] = value;
    }
  }

  Flight.find(newParams)
    .then((flight) => {
      console.log(flight);
      res.json(flight);
    })
    .catch(err => res.status(400).json('Error: ' + err));
   
    
});



router.route('/add').post((req, res) => {
  const FlightNumber = req.body.FlightNumber;
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const DateTakeoff = Date.parse(req.body.DateTakeoff);
  const DateArrival = Date.parse(req.body.DateArrival);
  const EconomySeats = Number(req.body.EconomySeats);
  const BusinessSeats = Number(req.body.BusinessSeats);
  const FirstSeats = Number(req.body.FirstSeats);
  const BaggageAllowed= Boolean (req.body.BaggageAllowed);
  const AirportArrival = req.body.AirportArrival;
  const AirportTakeOff = req.body.AirportTakeOff;
  const Price= Number(req.body.Price);

  const newFlight = new Flight({
    FlightNumber , DepartureTime , ArrivalTime , DateTakeoff , DateArrival , EconomySeats , BusinessSeats , FirstSeats, AirportArrival , AirportTakeOff, BaggageAllowed, Price

  });

  if(Flight.where("FlightNumber").equals(FlightNumber).exec(function (err, data){
    console.log(data);
    if(data.length>0){
      res.status(400).json('Error: ' + "An entry with this flight number already exists.");
    }
    else{
      newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err))
    }
  }));
});

router.route('/:id').get((req, res) => {
  console.log("Getting flight details from db");
  Flight.findById(req.params.id)
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/delete/:id").delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id).then(flight => res.json('flight deleted Successfully'))
    .catch(err => {
      console.log(err);
    });
});

router.route('/update/:id').post((req, res) => {
 
  Flight.findByIdAndUpdate(
    { _id: req.params.id },
    {
    FlightNumber : req.body.FlightNumber ,
    DepartureTime  : req.body.DepartureTime ,
    ArrivalTime  : req.body.ArrivalTime ,
    DateTakeoff  : new Date(Date.parse(req.body.DateTakeoff)) ,
    DateArrival  :new Date(Date.parse(req.body.DateArrival)) ,
     EconomySeats  : Number(req.body.EconomySeats) ,
     BusinessSeats  : Number(req.body.BusinessSeats) ,
     FirstSeats  : Number(req.body.FirstSeats) ,
     AirportArrival  : req.body.AirportArrival ,
     AirportTakeOff  : req.body.AirportTakeOff ,
     BaggageAllowed  : req.body.BaggageAllowed ,
     Price  : Number(req.body.Price) ,


    }
     
  )
    .then(()=> {console.log("Updated flight succesffully");
  return res.status(200).json('Updated flight successfully');})
    .catch(err => {
      console.log("Error finding flight: " + err);
      return res.status(400).json('Couldnt find flight,Error: ' + err);});
});

module.exports = router;