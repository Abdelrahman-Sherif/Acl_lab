import React, { Component } from "react";
import axios from 'axios';
import {Divider, Chip, Button} from '@mui/material';
var ReturnFlightNumber= sessionStorage.getItem("ReturnFlightNumber");
var DepartureFlightNumber= sessionStorage.getItem("DepartureFlightNumber");

console.log(ReturnFlightNumber);
console.log(DepartureFlightNumber);



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
  
  
  
export default class MyItinerary extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
      super(props);
   
      this.onChangePassangers = this.onChangePassangers.bind(this);
      this.onChangeDateTakeoff = this.onChangeDateTakeoff.bind(this);
      this.onChangeDateArrival = this.onChangeDateArrival.bind(this);
      this.onChangeAirportArrival = this.onChangeAirportArrival.bind(this);
      this.onChangeAirportTakeOff = this.onChangeAirportTakeOff.bind(this);
      this.onChangeCabin = this.onChangeCabin.bind(this);
  
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
  
    onChangePassangers(e) {
      this.setState({
        Passangers: e.target.value
      });
    }
  
  
    onChangeDateTakeoff(e) {
      this.setState({
        DateTakeoff: e.target.value
      })
    }
   
  
    onChangeDateArrival(e) {
      this.setState({
        DateArrival: e.target.value
      })
    }
  
  
    onChangeAirportArrival(e) {
      this.setState({
        AirportArrival: e.target.value
      })
    }
  
    onChangeAirportTakeOff(e) {
      this.setState({
        AirportTakeOff: e.target.value
      })
    }
  
    onChangeCabin(e) {
      this.setState({
        Cabin: e.target.value
      })
    }


    async addBooking(e) {
      const newBooking = {
        userID: "Aly",
        DepflightNumber: DepartureFlightNumber,
        ArrflightNumber: ReturnFlightNumber,
        bookingID: "Aly"+DepartureFlightNumber+ReturnFlightNumber,
  
      };
      //console.log(newBooking);
  
      await axios.post('http://localhost:5000/bookings/addBooking', newBooking)
        .then(res =>{
          console.log(res.data);
          window.location = '/';
        
        })
        
      
    }

  
    async getFilteredFlights(e){
      const filterParams = {
       
        FlightNumber: DepartureFlightNumber
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
      const filterParams = {
       
        FlightNumber: ReturnFlightNumber
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
    ///Get updated flights
    
   
  
   
  
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
                  
              <Button variant="contained" color = "primary" onClick = {this.addBooking}
              
              >Confirm </Button>
              
                </Divider>
  
 
      </div>
      
    );
  }
}