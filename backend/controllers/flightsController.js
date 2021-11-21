
const flight = require('../models/flight.js');

exports.addFlight= (req , res) => {
    const {FlightNumber , DepartureTime , ArrivalTime , DateTakeoff , DateArrival , EconomySeats , BusinessSeats , AirportArrival , AirportTakeOff } = req.body;

    
        const Flight = new flight ({
            FlightNumber,
            DepartureTime,
            ArrivalTime,
            to,
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
        
    

}