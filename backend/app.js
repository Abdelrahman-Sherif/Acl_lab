const express = require("express");
const mongoose = require('mongoose');
const flightsController = require('./controllers/flightsController');


const MongoURI = 'mongodb+srv://borsigwerke:3ezbetna@cluster0.6t7tb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


const app = express();
const port = process.env.PORT || "8000";
const User = require('./models/user');
const flight= require('./models/flight');

mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));  



app.get("/addFlight", (req, res) => {
    const NewFlight = new flight({
        FlightNumber: "AXY210",
        DepartureTime: "10:00" ,
        ArrivalTime: "12:00",
        DateTakeoff: new Date(1995, 11, 17),
        DateArrival: new Date(1995, 11, 17),
        EconomySeats: 100,
        BusinessSeats: 10 ,
        AirportArrival: "JFK" ,
        AirportTakeOff:"PDY"
  
  
    });
  NewFlight.save();
    res.send(NewFlight);
  })

app.get("/Home", (req, res) => {
    res.status(200).send("You have everything installed !");
  });

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
