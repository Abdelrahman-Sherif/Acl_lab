import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TextField, Button} from '@mui/material';

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
    <td>{props.record.AirportArrival}</td>
    <td>{props.record.AirportTakeOff}</td>

    <td>
    <Button size="small" variant="contained" color = "error" onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecord(props.record._id);
        }}>Delete</Button>
    </td>
  </tr>
);

export default class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.getFilteredFlights = this.getFilteredFlights.bind(this);
    this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
    this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
    this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
    this.onChangeDateTakeoff = this.onChangeDateTakeoff.bind(this);
    this.onChangeDateArrival = this.onChangeDateArrival.bind(this);
    this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
    this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
    this.onChangeAirportArrival = this.onChangeAirportArrival.bind(this);
    this.onChangeAirportTakeOff = this.onChangeAirportTakeOff.bind(this);

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
    };
  }

  onChangeFlightNumber(e) {
    this.setState({
      FlightNumber: e.target.value
    });
  }

  onChangeDepartureTime(e) {
    this.setState({
      DepartureTime: e.target.value
    })
  }

  onChangeArrivalTime(e) {
    this.setState({
      ArrivalTime: e.target.value
    })
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

  onChangeEconomySeats(e) {
    this.setState({
      EconomySeats: e.target.value
    })
  }

  onChangeBusinessSeats(e) {
    this.setState({
      BusinessSeats: e.target.value
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

  ///Get filtered flights
  async getFilteredFlights(e){
    e.preventDefault();
    const filterParams = {
      FlightNumber: this.state.FlightNumber,
      DepartureTime: this.state.DepartureTime,
      ArrivalTime: this.state.ArrivalTime,
      DateTakeoff: this.state.DateTakeoff,
      DateArrival: this.state.DateArrival,
      EconomySeats: this.state.EconomySeats,
      BusinessSeats: this.state.BusinessSeats,
      AirportArrival: this.state.AirportArrival,
      AirportTakeOff: this.state.AirportTakeOff,
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
  }

  // This method will get the data from the database.
  componentDidMount() {
    this.getFlights();
  }

  // This method will delete a record based on the method
  async deleteRecord(id) {
    await axios.delete("http://localhost:5000/flights/delete/" + id).then((response) => {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    
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
        <h3 style = {{marginBottom: 20, marginTop:10, marginLeft: 30}}>All Flights <Link to='/flights/add'>
      <Button variant="contained" color='primary'>Add Flight</Button>
      </Link></h3>
        
        <p style = {{marginBottom: 0, marginLeft: 30}}>Search for a Flight</p>
        
          <form>

              <Col style = {{marginLeft: 30}}>
              <TextField label="Flight Number" value={this.state.FlightNumber} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeFlightNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
              </Col>

          
            <div class="d-flex justify-content-between"  style = {{marginLeft: 30, marginRight: 30}}>
              <Col>
              <TextField label="Departure Time" value={this.state.DepartureTime} variant="outlined" size="small" type="time" required style={{width:300}} onChange={this.onChangeDepartureTime} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
              </Col>

              <Col>
              <div className="form-group">
              <TextField label="Arrival Time" value={this.state.ArrivalTime} variant="outlined" size="small" type="time" required style={{width:300}} onChange={this.onChangeArrivalTime} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>
            <Col>
            </Col>
              </div>

            <div class="d-flex justify-content-between"  style = {{marginLeft: 30, marginRight: 30}}>
              <Col>
              <div className="form-group">
              <TextField label="Takeoff Date" value={this.state.DateTakeoff} variant="outlined" size="small" type="date" required style={{width:300}} onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>

            <Col>
            <div className="form-group">
            <TextField label="Arrival Date" value={this.state.DateArrival} variant="outlined" size="small" type="date" required style={{width:300}} onChange={this.onChangeDateArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
            </Col>
            <Col></Col>
            </div>


            <div class="d-flex justify-content-between"  style = {{marginLeft: 30, marginRight: 30}}>
              <Col>
              <div className="form-group">
              <TextField label="Economy Seats" value={this.state.EconomySeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeEconomySeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
              </Col>

              <Col>
              <div className="form-group">
              <TextField label="Business Seats" value={this.state.BusinessSeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeBusinessSeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
              </Col>

              <Col>
              <div className="form-group">
              <TextField label="First Seats" value={this.state.FirstSeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeFirstSeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
              </Col>    

            </div>
  
            <div class="d-flex justify-content-between"  style = {{marginLeft: 30, marginRight: 30}}>
              <Col>
              <div className="form-group">
              <TextField label="Destination" value={this.state.AirportArrival} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeAirportArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
              </Col>
              

          <Col>
          <div className="form-group">
          <TextField label="Departure" value={this.state.AirportTakeOff} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeAirportTakeOff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
          </Col>
          <Col></Col>

            </div>


            <div class='col text-center'>
              <Row>
                <Col>
              <Button variant="contained" color = "primary" onClick = {this.getFlights.bind(this)}>Clear Filters </Button>
              </Col>
              <Col>
              <Button variant="contained" color = "primary" onClick = {this.getFilteredFlights.bind(this)}>Search </Button>
              </Col>
              </Row>
            </div>
            </form>
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
              <th>Destination</th>
              <th>Departure</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}