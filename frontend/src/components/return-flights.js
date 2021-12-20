import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TextField, Button, InputLabel, MenuItem, Select, FormControl} from '@mui/material';


const Record = (props) => (
  <tr>

    <td>{props.record.DateTakeoff}</td>
    <td>{props.record.DateArrival}</td>
    <td>{props.record.AirportTakeOff}</td>
    <td>{props.record.AirportArrival}</td>
    <td>{props.record.Cabin}</td>


    <td>
    <Button size="small" variant="contained" color = "error" onClick={() => {
           if (window.confirm('Are you sure you want to choose this flight?')) window.location.replace("http://localhost:3000/flights/users/pick-seat") ;
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


  ///Get updated flights
  async getFlights(){
    await axios
    .get("http://localhost:5000/flights/get")
    .then((response) => {
      console.log("Records gotten after deletion: "+ response.data);
      this.setState({ records: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

 

 

  // This method will get the data from the database.
  componentDidMount() {
    this.getFlights();
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
              <th>Departure Date</th>
              <th>Arrival Date</th>
              <th>Departure</th>
              <th>Destination</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
        </div>
    
    );
  }
}