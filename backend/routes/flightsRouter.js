const router = require('express').Router();
let Flight = require('../models/flight');

router.route('/get').get((req, res) => {
  Flight.find()
    .then(flight => res.json(flight))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getFiltered').get((req, res) => {
  Flight.find(req.query)
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
  const AirportArrival = req.body.AirportArrival;
  const AirportTakeOff = req.body.AirportTakeOff;

  const newFlight = new Flight({
    FlightNumber, DepartureTime, ArrivalTime, DateTakeoff, DateArrival, EconomySeats, BusinessSeats, AirportArrival, AirportTakeOff
  });


  newFlight.save()
    .then(() => res.json('Flight added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
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
  Flight.findById(req.params.id)
    .then(flight => {
      flight.FlightNumber = req.body.FlightNumber;
      flight.DepartureTime = req.body.DepartureTime;
      flight.ArrivalTime = req.body.ArrivalTime;
      flight.DateTakeoff = Date.parse(req.body.DateTakeoff);
      flight.DateArrival = Date.parse(req.body.DateArrival);
      flight.EconomySeats = Number(req.body.EconomySeats);
      flight.BusinessSeats = Number(req.body.BusinessSeats);
      flight.AirportArrival = req.body.AirportArrival;
      flight.AirportTakeOff = req.body.AirportTakeOff;


      Flight.save()
        .then(() => res.json('Flight updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;