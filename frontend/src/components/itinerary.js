import React, { Component } from "react";
import axios from 'axios';
import {Divider, Chip, Button} from '@mui/material';
import queryString from 'query-string';

var {flag, paid}=queryString.parse(window.location.search);

if(paid == 'true')paid = true;
else paid = false;


var returnSeats = sessionStorage.getItem("RetBookedSeats");
var arrFlightNumber= sessionStorage.getItem("ReturnFlightNumber");
var returnSeatsMap = sessionStorage.getItem("RetSeatsMap");
var returnFlightID= sessionStorage.getItem("ReturnFlightID");

var depFlightNumber= sessionStorage.getItem("DepartureFlightNumber");
var departureSeats = sessionStorage.getItem("DepBookedSeats");
var departureSeatsMap = sessionStorage.getItem("DepSeatsMap");
var flightID= sessionStorage.getItem("FlightID");
var BookingId=sessionStorage.getItem("BookingId");


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


async function getUserEmail() {
  var currUserId = sessionStorage.getItem("currUser");
  let email = await axios
    .get("http://localhost:5000/users/" + currUserId)
    .then((response) => {
      console.log("User email : " + JSON.stringify(response.data));
      return response.data.email;
      // console.log("Arrival date: " + this.state.DateArrival.);
    })
    .catch(function (error) {
      console.log("User email fetch error:" + error);
      return "yassin.daadour@gmail.com";

    });
  return email;
}
  
  
  
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
        Cabin: "",
      };
    }
  
    async addBooking(e) {
      console.log("Adding booking");

      if(paid){
        // Get new user name first 
      var firstName = "";
      var lastName = "";
      var currUserId = sessionStorage.getItem("currUser");
       //Hardcoding user ID till auth is done
      await axios.get('http://localhost:5000/users/'+ currUserId)
        .then(res =>{
          console.log(res.data);
         firstName = res.data.firstName;
         lastName = res.data.lastName;
        
        }).catch(err=> {
          console.log("Fetching user error: "+ err);
        })
      const newBooking = {
        //Hardcoding user ID till auth is done
        userId: currUserId,
        depFlightNumber: depFlightNumber,
        arrFlightNumber: arrFlightNumber,
        departureSeats: departureSeats,
        returnSeats: returnSeats,
        firstName: firstName,
        lastName: lastName,
       
      };
      console.log("Dep 1 map fetched : "+departureSeatsMap);
      console.log("Booking info", newBooking);
      var depMap = JSON.parse(departureSeatsMap.toString());
      var returnMap = JSON.parse(returnSeatsMap.toString());
      
        if(flag==0){
          //new booking
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

          ///Send user email
        let userEmail = await getUserEmail();
        const emailData = {
          recipientEmail: userEmail,
          text: "Your itenerary email details: \n"  + "\n Departure flight number: " + depFlightNumber + "\nReturn flight number:" + arrFlightNumber + "\n Departure seats: " + departureSeats + "\n Return Seats: " + returnSeats,
        };
        await axios
          .post("http://localhost:5000/nodemailer/sendMail", emailData)
          .then((response) => {
            console.log("Sending email response: " + JSON.stringify(response.data));

          })
          .catch(function (error) {
            console.log("Sending email error: " + error);
          });
        }
        else{
          //update booking
          
          await axios.post("http://localhost:5000/bookings/update/" + BookingId, newBooking)
          .then(res =>{
            console.log(res.data);
            console.log("Successfully updated booking");

          }).catch(err=> {
            console.log("Booking update error: "+ err);
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
          }); 
          
          ///Send user email
        let userEmail = await getUserEmail();
        const emailData = {
          recipientEmail: userEmail,
          text: "Your itenerary Update details: \n"  + "\n Departure flight number: " + depFlightNumber + "\nReturn flight number:" + arrFlightNumber + "\n Departure seats: " + departureSeats + "\n Return Seats: " + returnSeats,
        };
        await axios
          .post("http://localhost:5000/nodemailer/sendMail", emailData)
          .then((response) => {
            console.log("Sending email response: " + JSON.stringify(response.data));

          })
          .catch(function (error) {
            console.log("Sending email error: " + error);
          }); 
          
          
        }
      }
      else{
        var price = 0;
        this.state.records.forEach((record)=>{
          price+= (record.Price)*100;
        });
        axios.post('http://localhost:5000/bookings/checkout', {
          flag: flag,
          price: price,
        }).then(res => {
        window.location.assign(res.data);
        }).catch(err=> {
          console.log('error: ' + err);
        });
      }
    }

  
    async getFilteredFlights(e){
      const filterParams = {
       
        FlightNumber: depFlightNumber
      };
  var arr=[];
  var arr1=[];
  
      await axios
       .get("http://localhost:5000/flights/getFilteredFlight", {params: filterParams})
      .then((response) => {
        console.log("Records gotten after filtering: "+ response.data);
        //this.setState({ records: response.data });
         arr1=response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    
    
      console.log("Getting return flight, number: "+ arrFlightNumber);
      console.log("Getting Departure flight, number: "+ depFlightNumber);

      const filterParams1 = {
       
        FlightNumber: arrFlightNumber
      };
  
  
      const response2= await axios
      .get("http://localhost:5000/flights/getFilteredFlightReturn", {params: filterParams1})
      .then((response) => {
        console.log("Getting Return: "+ response.data);
        //var arr=records.concat(response.data);
        arr=response.data;
        this.setState({ records: arr1.concat(arr) });
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
   
        <Divider>
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
                  {(paid)? (<Button variant="contained" color = "primary" onClick = {this.addBooking.bind(this)}
              
              >Done</Button>) : (<Button variant="contained" color = "primary" onClick = {this.addBooking.bind(this)}
              
              >Pay</Button>)}
              
                </Divider>
  
 
      </div>
      
    );
  }
}