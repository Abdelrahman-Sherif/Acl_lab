import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {TextField, Button,ButtonGroup, InputLabel, MenuItem, Select, FormControl} from '@mui/material';
var bookingId= sessionStorage.getItem("BookingId");
console.log("Booking still: " + bookingId);
sessionStorage.setItem("NewBooking", false);


const Record = (props) => (
  
  <tr>

<td>{props.record.depFlightNumber}</td>
    <td>{props.record.arrFlightNumber}</td>
    <td>{props.record.returnSeats}</td>
    <td>{props.record.departureSeats}</td>
    <td>{props.record.firstName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record._id}</td>



    
    <td>
    
  <Button onClick={() => {
           if (window.confirm('Are you sure you want to change departure flight?')) {

         
           sessionStorage.setItem("depFlightNumber", props.record.depFlightNumber);
           sessionStorage.setItem("ReturnFlightNumber", props.record.arrFlightNumber);
           sessionStorage.setItem("RetBookedSeats", props.record.departureSeats);
           sessionStorage.setItem("DepBookedSeats", props.record.departureSeats);

           sessionStorage.setItem("BookingID", props.record.BookingID);

           sessionStorage.setItem("oldSeats",props.record.returnSeats);



            
           window.location.replace("http://localhost:3000/flights/users/departure");
           }
           
        }}>Change Departure</Button>
</td>
<td>
<Button onClick={() => {
           if (window.confirm('Are you sure you want to change Return flight?')) {

         
            sessionStorage.setItem("depFlightNumber", props.record.depFlightNumber);
            sessionStorage.setItem("ReturnFlightNumber", props.record.arrFlightNumber);

            sessionStorage.setItem("DepBookedSeats", props.record.departureSeats);
            console.log("depFlightNumber",props.record.depFlightNumber);
            console.log("departureSeats",props.record.departureSeats);

            sessionStorage.setItem("oldSeats",props.record.returnSeats);

            
            
           window.location.replace("http://localhost:3000/flights/users/return");
           }
           
        }}>Change Return</Button>
        </td>
        <td>
  <Button onClick={() => {
           if (window.confirm('Are you sure you want to change seats in Departure flight?')) {

         
           sessionStorage.setItem("airportArrival", props.record.AirportArrival);
            
           window.location.replace("http://localhost:3000/flights/users/pick-seat");
           }
           
        }}>Edit Dep Seats</Button>
         </td>
        <td>
  <Button onClick={() => {
           if (window.confirm('Are you sure you want to change seats in Return flight?')) {

         
           sessionStorage.setItem("airportArrival", props.record.AirportArrival);
            
           window.location.replace("http://localhost:3000/flights/users/pick-return-seat");
           }
           
        }}>Edit Ret Seats</Button>

</td> 

  </tr>
);


export default class EditUserBookings extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);

    this.state = { 
  
      bookings: [],
     
    };
  }







  toggleFilter(e){
    e.preventDefault();
    this.setState({showFilterMenu: !this.state.showFilterMenu})
    console.log(this.state.showFilterMenu);
  }

  ///Get updated flights
  async getUserBookings(){
    console.log("Getting users bookings");
  await axios
  .get("http://localhost:5000/bookings/getuserbookings/"+ bookingId)
  .then((response) => {
    console.log("User Bookings gotten: "+ JSON.stringify(response.data));
    
    this.setState({ bookings: [response.data]});
    //this.state.bookings.push(response.data);
    console.log("User Bookings to be displayed: "+ response.data);

  })
  .catch(function (error) {
    console.log(error);
  });
}



// This method will get the data from the database.
componentDidMount() {
  console.log("Getting users bookings");
  this.getUserBookings();
}

  // Delete booking & send email
  async deleteBooking(id) {
      console.log("Gonna delete with id: "+ id);
    await axios.delete("http://localhost:5000/bookings/delete/" + id).then((response) => {

      console.log("Deletion result: "+response.data);
    }).catch(function (error) {
      console.log(error);
    });
    
    window.location.reload(false);
    
  }



  // This method will map out the users on the table
  recordList() {
    console.log("Booking state is: "+ this.state.bookings);

    return this.state.bookings.map((currentrecord) => {
        console.log("Booking data is: "+ currentrecord);
      return (
        <Record
          record={currentrecord}
          deleteBooking={this.deleteBooking}
          key={currentrecord._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  render() {

    return (
      <div>
      <Link to='/flights/users/bookings'>
      <Button variant="contained" color='primary' style={{marginLeft:10}}> My Bookings</Button>
      
      </Link>
      
           <div style={this.state.showFilterMenu? {}: {display: 'none'}}>
          <form>
        <div class="d-flex justify-content-between" style={{marginLeft:30, marginRight:30}}>

          <Col>
          <div className="form-group">
              <TextField label="Arrival Flight number" style={{display: "flex", marginRight: 10}} value={this.state.arrFlightNumber} variant="outlined" size="small" type="number" required onChange={this.onChangePassangers} margin="normal"  InputLabelProps={{
            shrink: true,
          }}/>
            </div>
          </Col>
          

            <Col style = {{marginBottom: 30,}}>
              <Col>
              <div className="form-group">
              <TextField label="Departure Flight number" style={{display: "flex", marginRight: 10}} value={this.state.depFlightNumber} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>

          

            <Col>
              <div className="form-group">
              <TextField label="Return Seats" style={{display: "flex", marginRight: 10}} value={this.state.returnSeats} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>

            <Col>
              <div className="form-group">
              <TextField label="Departure Seats" style={{display: "flex", marginRight: 10}} value={this.state.departureSeats} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>

            <Col>
              <div className="form-group">
              <TextField label="First Name" style={{display: "flex", marginRight: 10}} value={this.state.firstName} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>
            <Col>
              <div className="form-group">
              <TextField label="Last Name" style={{display: "flex", marginRight: 10}} value={this.state.lastName} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>
            <Col>
              <div className="form-group">
              <TextField label="Booking ID" style={{display: "flex", marginRight: 10}} value={this.state.bookingId} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} />
            </div>
            </Col>
            
            </Col>

  
            <Col style = {{marginBottom: 30,}}>
            
              
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
               
              </Row>
            </div>
            </div>
        <table className="table table-striped" style={{ marginTop: 20}}>
          <thead>
            <tr>
            <th>Dep Flight Number</th>
            <th>Arr Flight Number</th>
            <th>Return Seats</th>
            <th>Departure Seats</th>
            <th>First Name</th>
            <th>Last Name </th>
            <th>Booking ID </th>

            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
        
      </div>
    );
  }
}