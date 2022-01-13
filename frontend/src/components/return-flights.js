import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TextField, Button, InputLabel, MenuItem, Select, FormControl} from '@mui/material';
import queryString from 'query-string';


var {flag}=queryString.parse(window.location.search);
console.log("flag", flag);

var airportTakeoff= sessionStorage.getItem("airportTakeoff");
var airportArrival= sessionStorage.getItem("airportArrival");
var ReturnFlightNumber= sessionStorage.getItem("ReturnFlightNumber");
var depFlightNumber= sessionStorage.getItem("DepartureFlightNumber");
var departureSeats = sessionStorage.getItem("DepBookedSeats");
console.log("depFlightNumber",depFlightNumber);
console.log("departureSeats",departureSeats);


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
    <td>
    <Button size="small" variant="contained" color = "error" onClick={() => {
           if (window.confirm('Are you sure you want to choose this flight?'))
           sessionStorage.setItem("ReturnFlightNumber", props.record.FlightNumber);
           sessionStorage.setItem("ReturnFlightID", props.record._id);
           if(flag===0){           
             window.location.replace("http://localhost:3000/flights/users/pick-return-seat") ;
          }else{
            window.location.replace(`http://localhost:3000/flights/users/pick-return-seat?flag=${flag}`) ;

          }
        }}>Confirm Return</Button>
    </td>
  </tr>
);

export default class ReturnFlights extends Component {
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

  async getFilteredFlights(e){
    if(flag===0){
      //creating new booking
      const filterParams = {
     
        FlightNumber: ReturnFlightNumber,
      };
      
  
      let cleanedParams = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v !== ""));
      let airportdep="";
      let airportarr="";
  
      const response2 = await axios.get("http://localhost:5000/flights/getFiltered", {params: cleanedParams})
      .then((response) => {
        console.log("Records gotten after filtering: "+ response.data);
        this.setState({ records: response.data });
        airportdep=response.data[0].AirportTakeOff;
        airportarr=response.data[0].AirportArrival;
  
      })
      .catch(function (error) {
        console.log(error);
      });
  
      
  
      const filterParams2 = {
          AirportTakeOff: airportdep,
  
          AirportArrival: airportarr,
        };
      await axios
      .get("http://localhost:5000/flights/getFiltered", {params: filterParams2})
      .then((response) => {
        console.log("Records gotten after filtering: "+ response.data);
        
        this.setState({ records: response.data });
        console.log("records", response.data[0].AirportArrival);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
//Editing a booking
      const filterParams = {
     
        AirportArrival: airportTakeoff,
        AirportTakeOff: airportArrival,
      };
  
      let cleanedParams = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v !== ""));
  
      await axios
      .get("http://localhost:5000/flights/getFiltered", {params: cleanedParams})
      .then((response) => {
        console.log("Records gotten after filtering: "+ response.data);
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });

  }}
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

  // This following section will display the table with the records of individuals.
  render() {

    return (
        <div>
        <h3 style = {{marginBottom: 20, marginTop:10, marginLeft: 30}}><Link to='/flights/users/list'>
        <Button variant="contained" color='primary'>Change Departure</Button>
      </Link>
      </h3>

        <table className="table table-striped" style={{ marginTop: 20}}>
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
        </div>
    
    );
  }
}