import React, { Component } from "react";
import axios from 'axios';
import {Divider, Chip, Button} from '@mui/material';
var returnSeats = sessionStorage.getItem("RetBookedSeats");
var arrFlightNumber= sessionStorage.getItem("ReturnFlightNumber");
var returnSeatsMap = sessionStorage.getItem("RetSeatsMap");
var returnFlightID= sessionStorage.getItem("ReturnFlightID");

var depFlightNumber= sessionStorage.getItem("DepartureFlightNumber");
var departureSeats = sessionStorage.getItem("DepBookedSeats");
var departureSeatsMap = sessionStorage.getItem("DepSeatsMap");
var flightID= sessionStorage.getItem("FlightID");
var BookingId=sessionStorage.getItem("BookingId");

var NewBooking=sessionStorage.getItem("NewBooking");
            console.log("New booking", NewBooking);


const Record = (props) => (
    <tr>
  
  <td>{props.record.FlightNumber}</td>
      <td>{props.record.DepartureTime}</td>
      <td>{props.record.ArrivalTime}</td>
      <td>{props.record.DateTakeoff}</td>
      <td>{props.record.DateArrival}</td>
      <td>{props.record.EconomySeats}</td>
      <td>{props.record.BusinessSeats}</td>
      <td>{props.record.FirstSeats}</td>
      <td>{props.record.AirportTakeOff}</td> 
      <td>{props.record.AirportArrival}</td>
      <td>{props.record.Price}</td> 
      <td>{props.record.BaggageAllowed}</td> 
    </tr>
  );
  
  
  // function checkifNew(){
  //   if(NewBooking==true){
  //     this.addBooking.bind(this);
  //   }
  //   else{
  //     this.addBooking.bind(this);

  //     //change booking
  //   }
  // }
export default class MyItinerary extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
      super(props);
   
    
      this.state = { 
        records: [],
        Passangers: "",
        DateTakeoff: "",
        DateArrival: "",
        AirportArrival: "",
        AirportTakeOff: "", 
        Cabin: ""
      };
    }
  
   


    async addBooking(e) {
      console.log("Adding booking")

      //Get new user name first 
      var firstName = "";
      var lastName = "";
       //Hardcoding user ID till auth is done
      await axios.get('http://localhost:5000/users/61c347f18128719139d8a8c7')
        .then(res =>{
          console.log(res.data);
         firstName = res.data.firstName;
         lastName = res.data.lastName;
        
        }).catch(err=> {
          console.log("Fetching user error: "+ err);
        })
      const newBooking = {
        //Hardcoding user ID till auth is done
        userId: "61c347f18128719139d8a8c7",
        depFlightNumber: depFlightNumber,
        arrFlightNumber: arrFlightNumber,
        departureSeats: departureSeats,
        returnSeats: returnSeats,
        firstName: firstName,
        lastName: lastName,
       
      };
      console.log("Dep 1 map fetched : "+departureSeatsMap);
      var depMap = JSON.parse(departureSeatsMap.toString());
      var returnMap = JSON.parse(returnSeatsMap.toString());
      
        if(NewBooking==true){
          await axios.post('http://localhost:5000/bookings/addBooking ', newBooking)
          .then(res =>{
            console.log(res.data);
            
          }).catch(err=> {
            console.log("Booking confirmation error: "+ err);
          });
          await axios
          .post("http://localhost:5000/flights/updateSeats/" + flightID, depMap)
          .then((response) => {
              console.log("Successfully updated seats");
          })
          .catch(function (error) {
              console.log('errorr: ' + error);
          });
          await axios
          .post("http://localhost:5000/flights/updateSeats/" + returnFlightID, returnMap)
          .then((response) => {
              console.log("Successfully updated seats");
              window.alert("Booking Added!");
              window.location = '/flights/users/list';
          
          })
          .catch(function (error) {
              console.log('errorr: ' + error);
          });
        }else{
          //update booking
          
          await axios.post('http://localhost:5000/bookings/update/',  + BookingId, newBooking)
          .then(res =>{
            console.log(res.data);
            console.log("Successfully updated booking");

          }).catch(err=> {
            console.log("Booking confirmation error: "+ err);
          });
          await axios
          .post("http://localhost:5000/flights/updateSeats/" + flightID, depMap)
          .then((response) => {
              console.log("Successfully updated seats");
          })
          .catch(function (error) {
              console.log('errorr: ' + error);
          });
          await axios
          .post("http://localhost:5000/flights/updateSeats/" + returnFlightID, returnMap)
          .then((response) => {
              console.log("Successfully updated seats");
              window.alert("Booking Updated!");
              window.location = '/flights/users/bookings/';
          
          })
          .catch(function (error) {
              console.log('errorr: ' + error);
          });        }
    }

  
    async getFilteredFlights(e){
      const filterParams = {
       
        FlightNumber: depFlightNumber
      };
  
  
      await axios
       .get("http://localhost:5000/flights/getFilteredFlight", {params: filterParams})
      .then((response) => {
        console.log("Records gotten after filtering: "+ response.data);
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    async getFilteredFlightsReturn(e){
      console.log("Getting return flight, number: "+ arrFlightNumber);
      const filterParams = {
       
        FlightNumber: arrFlightNumber
      };
  
  
      await axios
      .get("http://localhost:5000/flights/getFilteredFlightReturn", {params: filterParams})
      .then((response) => {
        console.log("Getting Return: "+ response.data);
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    // This method will get the data from the database.
    componentDidMount() {
      this.getFilteredFlights();
    }

   
    // This method will map out the users on the table
    recordList() {
      return this.state.records.map((currentrecord) => {
        return (
          <Record
            record={currentrecord}
            deleteRecord={this.deleteRecord}
            key={currentrecord._id}
          />
        );
      });
    }
   
    render() {

    return (
        <div>
   
        <Divider><Chip label=" Flight Details" />
        <table className="table table-striped" style={{ marginTop: 50}}>
          <thead>
            <tr>
            <th>Flight Number</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Takeoff Date</th>
              <th>Arrival Date</th>
              <th>Economy Seats</th>
              <th>Business Seats</th>
              <th>First Seats</th>
              <th>Departure</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Baggage Allowed</th>

            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
        </Divider>
    
        <Divider >
              <Button variant="contained" color = "primary" onClick = {this.getFilteredFlightsReturn.bind(this)
              }>Show Return Flight </Button>
              
                </Divider>
                <Divider >
                  
              <Button variant="contained" color = "primary" onClick = {this.addBooking.bind(this)}
              
              >Confirm </Button>
              
                </Divider>
  
 
      </div>
      
    );
  }
}