import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TextField, Button, InputLabel, MenuItem, Select, FormControl} from '@mui/material';

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
           sessionStorage.setItem("airportTakeoff", props.record.AirportTakeOff);
           sessionStorage.setItem("airportArrival", props.record.AirportArrival);

           window.location.replace("http://localhost:3000/flights/users/pick-seat");
           
        }}>Confirm Departure</Button>
    </td>
  </tr>
);


export default class ListUserFlights extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.getFilteredFlights = this.getFilteredFlights.bind(this);
    this.onChangePassangers = this.onChangePassangers.bind(this);
    this.onChangeDateTakeoff = this.onChangeDateTakeoff.bind(this);
    this.onChangeDateArrival = this.onChangeDateArrival.bind(this);
    this.onChangeAirportArrival = this.onChangeAirportArrival.bind(this);
    this.onChangeAirportTakeOff = this.onChangeAirportTakeOff.bind(this);
    this.onChangeCabin = this.onChangeCabin.bind(this);

    this.toggleFilter = this.toggleFilter.bind(this);

    this.state = { 
      records: [],
      showFilterMenu: false,
      Passangers: "",
      DateTakeoff: "",
      DateArrival: "",
      AirportArrival: "",
      AirportTakeOff: "", 
      Cabin: "",
      BaggageAllowed: true,
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





  toggleFilter(e){
    e.preventDefault();
    this.setState({showFilterMenu: !this.state.showFilterMenu})
    console.log(this.state.showFilterMenu);
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
      Passangers: this.state.Passangers,
      DateTakeoff: this.state.DateTakeoff,
      DateArrival: this.state.DateArrival,
      AirportArrival: this.state.AirportArrival, 
      AirportTakeOff: this.state.AirportTakeOff,
      Cabin: this.state.Cabin
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
        <h3 style = {{marginBottom: 20, marginTop:10, marginLeft: 30}}>All Flights <Link to='/flights/user/itinerary'>
      <Button variant="contained" color='primary'>View My Flights</Button>
      
      </Link>
      <Button variant="contained" color='primary' onClick={this.toggleFilter} style={{marginLeft:10}}>Filter Flights</Button>
      </h3>
        
           <div style={this.state.showFilterMenu? {}: {display: 'none'}}>
          <form>
        <div class="d-flex justify-content-between" style={{marginLeft:30, marginRight:30}}>

          <Col>
          <div className="form-group">
              <TextField label="Number of Passangers" style={{display: "flex", marginRight: 10}} value={this.state.Passangers} variant="outlined" size="small" type="number" required onChange={this.onChangePassangers} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
          </Col>
          

            <Col style = {{marginBottom: 30,}}>
              <Col>
              <div className="form-group">
              <TextField label="Departure Date" style={{display: "flex", marginRight: 10}} value={this.state.DateTakeoff} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>

            <Col>
            <div className="form-group">
            <TextField label="Arrival Date" style={{display: "flex", marginRight: 10}} value={this.state.DateArrival} variant="outlined" size="small" type="date" required onChange={this.onChangeDateArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
            </Col>
            <Col></Col>
            </Col>

  
            <Col style = {{marginBottom: 30,}}>
            <Col>
          <div className="form-group">
          <TextField label="Departure" style={{display: "flex"}} value={this.state.AirportTakeOff} variant="outlined" size="small" type="text" required onChange={this.onChangeAirportTakeOff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
          </Col>
              <Col>
              <div className="form-group">
              <TextField label="Destination" style={{display: "flex"}} value={this.state.AirportArrival} variant="outlined" size="small" type="text" required onChange={this.onChangeAirportArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
              </Col>
          <Col></Col>

          <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Cabin</InputLabel>
  <Select
  defaultValue={"Economy"}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
   
    label="Cabin"
    onChange={this.onChangeCabin}
    
    
  >
    <MenuItem value={10}>First</MenuItem>
    <MenuItem value={20}>Business</MenuItem>
    <MenuItem value={30}>Economy</MenuItem>
  </Select>
</FormControl>

            </Col>
            </div>
            </form>
            <div class='col text-center'>
              <Row>
                <Col>
              <Button variant="contained" color = "primary" onClick = {this.getFlights.bind(this)}>Clear Filters </Button>
              </Col>
              <Col>
              <Button variant="contained" color = "primary" onClick = {this.getFilteredFlights.bind(this)
              }>Search </Button>
              </Col>
              </Row>
            </div>
            </div>
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