import React, { Component } from "react";
import axios from 'axios';
import {Divider, Chip} from '@mui/material';
var ReturnFlightNumber= sessionStorage.getItem("ReturnFlightNumber");
var DepartureFlightNumber= sessionStorage.getItem("DepartureFlightNumber");


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
    
        this.state = { 
          records: [],
          FlightNumber: "",
          DepartureTime: "",
          ArrivalTime: "",
          DateTakeoff: "",
          DateArrival: "",
          EconomySeats: "",
          BusinessSeats: "",
          AirportArrival: "",
          AirportTakeOff: "", 
          BaggageAllowed: "Yes",
        };
      }

      

        // This method will map out the users on the table
  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          key={currentrecord._id}
        />
      );
    });
  }

      componentDidMount() {
        this.getFilteredFlights();
      }
    
      ///Get filtered flights
  async getFilteredFlights(e){
  //  e.preventDefault();
    const filterParams = {
      FlightNumber: DepartureFlightNumber,
    };

    await axios
    .get("http://localhost:5000/flights/getFiltered", {params: filterParams})
    .then((response) => {
      console.log("Records gotten after filtering: "+ response.data);
      this.setState({ records: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
   
    render() {

    return (
        <div>
   
        <Divider><Chip label="Departure Flight" />
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
        </Divider>
    
        <Divider ><Chip label="Return Flight" />
        {}
        </Divider>
  
 
      </div>
      
    );
  }
}