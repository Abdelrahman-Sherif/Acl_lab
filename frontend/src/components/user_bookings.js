import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TextField, Button, InputLabel, MenuItem, Select, FormControl } from '@mui/material';

///Get flight data 
async function getFlightByNumber(flightNumber) {
  let price = await axios
    .get("http://localhost:5000/flights/flightByNumber/" + flightNumber)
    .then((response) => {
      console.log("Flight price : " + JSON.stringify(response.data.Price));
      return response.data.Price;
      // console.log("Arrival date: " + this.state.DateArrival.);
    })
    .catch(function (error) {
      console.log("Flight fetch error:" + error);
      return 0;

    });
  return price;
}

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

const Record = (props) => (

  <tr>
    <td>
      <Button
        onClick={() => {
          console.log("routing to another page");
          window.location.href = "http://localhost:3000/flights/view/" + props.record.depFlightNumber
        }
        }>
        {props.record.depFlightNumber}
      </Button>
    </td>
    <td>
      <Button 
        onClick={() =>
          window.location.href = "http://localhost:3000/flights/view/" + props.record.arrFlightNumber
        }>
        {props.record.arrFlightNumber}
      </Button>
    </td>
    <td>{JSON.stringify(props.record.returnSeats)}</td>
    <td>{JSON.stringify(props.record.departureSeats)}</td>
    <td>{props.record.firstName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record._id}</td>

    <td>
      <Button size="small" variant="contained" color="error" onClick={async () => {

        if (window.confirm('Are you sure you want to delete this booking?')) {

          props.deleteBooking(props.record._id);

          ///Get user email
          let userEmail = await getUserEmail();

          //Get flight prices first to send refund amount
          let priceDeparture = await getFlightByNumber(props.record.depFlightNumber);
          let priceArrival = await getFlightByNumber(props.record.arrFlightNumber);

          const emailData = {
            recipientEmail: userEmail,
            text: "Your booking has been deleted successfully: \nBooking ID: " + props.record._id + "\n Refund amount: " + priceDeparture + priceArrival,
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
      }}>Delete Booking</Button>
    </td>
    <td>
      <Link to={{ pathname: `/flights/users/bookings/edit/${props.record._id}` }}>
        <Button size="small" variant="contained" color="info" onClick={() => {
          sessionStorage.setItem("BookingId", props.record._id);
          console.log("Booking : " + props.record._id);
        }}>Edit</Button>
      </Link>

    </td>
    <td>

      <Button size="small" variant="contained" color="success" onClick={async () => {

        window.alert('Email has been sent');


        ///Get user email
        let userEmail = await getUserEmail();
        const emailData = {
          recipientEmail: userEmail,
          text: "Your itenerary email details: \n" + "Booking ID: " + props.record._id + "\n Departure flight number: " + props.record.depFlightNumber + "\nReturn flight number:" + props.record.arrFlightNumber + "\n Departure seats: " + props.record.departureSeats + "\n Return Seats: " + props.record.returnSeats,
        };
        await axios
          .post("http://localhost:5000/nodemailer/sendMail", emailData)
          .then((response) => {
            console.log("Sending email response: " + JSON.stringify(response.data));

          })
          .catch(function (error) {
            console.log("Sending email error: " + error);
          });


      }}>Email Itenerary</Button>


    </td>


  </tr>
);


export default class UserBookings extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.toggleFilter = this.toggleFilter.bind(this);

    this.state = {

      bookings: [],

    };
  }







  toggleFilter(e) {
    e.preventDefault();
    this.setState({ showFilterMenu: !this.state.showFilterMenu })
    console.log(this.state.showFilterMenu);
  }

  ///Get updated flights
  async getUserBookings() {
    console.log("Getting users bookings");

    var currUserId = sessionStorage.getItem("currUser");
    await axios
      .get("http://localhost:5000/bookings/getAllUserBookings/" + currUserId)
      .then((response) => {
        console.log("User Bookings gotten: " + JSON.stringify(response.data));
        this.setState({ bookings: response.data });
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
    console.log("Gonna delete with id: " + id);
    await axios.delete("http://localhost:5000/bookings/delete/" + id).then((response) => {

      console.log("Deletion result: " + response.data);
    }).catch(function (error) {
      console.log(error);
    });

    window.location.reload(false);

  }



  // This method will map out the users on the table
  recordList() {
    return this.state.bookings.map((currentrecord) => {
      console.log("Booking data is: " + currentrecord);



      return (
        <Record
          record={currentrecord}
          deleteBooking={this.deleteBooking}
          key={currentrecord._id}
        />
      );
    });
  }

  async logout(id) {
    await axios.delete("http://localhost:5000/auth/logout/").then((response) => {
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });

  }

  // This following section will display the table with the records of individuals.
  render() {

    return (
      <div>
        <h3 style={{ marginBottom: 20, marginTop: 10, marginLeft: 30 }}>My Bookings </h3>
        <Link to='/flights/users/profile'>
          <Button variant="contained" color='primary' style={{ marginLeft: 10 }}> My Profile</Button>

        </Link>

        <Link to='/'>
          <Button variant="contained" color='primary' onClick={this.logout.bind(this)} style={{ marginLeft: 10 }}>logout</Button>

        </Link>

        <div style={this.state.showFilterMenu ? {} : { display: 'none' }}>
          <form>
            <div class="d-flex justify-content-between" style={{ marginLeft: 30, marginRight: 30 }}>

              <Col>
                <div className="form-group">
                  <TextField label="Arrival Flight number" style={{ display: "flex", marginRight: 10 }} value={this.state.arrFlightNumber} variant="outlined" size="small" type="number" required onChange={this.onChangePassangers} margin="normal" InputLabelProps={{
                    shrink: true,
                  }} />
                </div>
              </Col>


              <Col style={{ marginBottom: 30, }}>
                <Col>
                  <div className="form-group">
                    <TextField label="Departure Flight number" style={{ display: "flex", marginRight: 10 }} value={this.state.depFlightNumber} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>



                <Col>
                  <div className="form-group">
                    <TextField label="Return Seats" style={{ display: "flex", marginRight: 10 }} value={this.state.returnSeats} variant="outlined" size="small" type="text" margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>

                <Col>
                  <div className="form-group">
                    <TextField label="Departure Seats" style={{ display: "flex", marginRight: 10 }} value={this.state.departureSeats} variant="outlined" size="small" type="text" margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>

                <Col>
                  <div className="form-group">
                    <TextField label="First Name" style={{ display: "flex", marginRight: 10 }} value={this.state.firstName} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <TextField label="Last Name" style={{ display: "flex", marginRight: 10 }} value={this.state.lastName} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <TextField label="Booking ID" style={{ display: "flex", marginRight: 10 }} value={this.state.bookingId} variant="outlined" size="small" type="date" required onChange={this.onChangeDateTakeoff} margin="normal" InputLabelProps={{
                      shrink: true,
                    }} />
                  </div>
                </Col>

              </Col>


              <Col style={{ marginBottom: 30, }}>


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
        <table className="table table-striped" style={{ marginTop: 20 }}>
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