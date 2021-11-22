
const flight = require('../models/flight.js');

exports.addFlight= (req , res) => {
  const {FlightNumber , DepartureTime , ArrivalTime , DateTakeoff , DateArrival , EconomySeats , BusinessSeats , AirportArrival , AirportTakeOff } = req.body;

  
      const Flight = new flight ({
          FlightNumber,
          DepartureTime,
          ArrivalTime,
          DateTakeoff : new Date(DateTakeoff),
          DateArrival : new Date(DateArrival),
          EconomySeats,
          BusinessSeats,
          AirportArrival,
          AirportTakeOff
      })

      Flight.save()
    .then(result => {
      res.send(result);
      console.log("added");
    })
    .catch(err => {
      console.log(err);
    });
      
 const getFlights = asyncHandler(async(req, res) => {
  
try {
  const flights = await Flight.find({})
  res.json(flights);
} catch (error){
  res.status(500)
  throw new Error();
}

});

}
exports.getFlights = (req, res) => {                                               ``
    flight.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };