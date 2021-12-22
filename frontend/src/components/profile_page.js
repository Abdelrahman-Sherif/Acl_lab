import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { TextField, Button } from '@mui/material';




const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};






export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      FlightNumber: "",
      DepartureTime: "",
      ArrivalTime: "",
      DateTakeoff: "",
      DateArrival: "",
      EconomySeats: 0,
      BusinessSeats: 0,
      FirstSeats: 0,
      AirportArrival: "",
      AirportTakeOff: "",
      flightId: "",

      FlightNumberError: "",
      DepartureTimeError: "",
      ArrivalTimeError: "",
      DateTakeoffError: "",
      DateArrivalError: "",
      EconomySeatsError: "",
      BusinessSeatsError: "",
      FirstSeatsError: "",
      AirportArrivalError: "",
      AirportTakeOffError: "",
      errorMessage: ""
    }
  }



  ///Get user data, currently hardcoding to 1 until authentication is done next
  async getUser( userId) {
    await axios
      .get("http://localhost:5000/users/" + "1")
      .then((response) => {
        console.log("User gotten from id: " + response.data);
        this.setState({
          FlightNumber: response.data.FlightNumber,
          DepartureTime: response.data.DepartureTime,
          ArrivalTime: response.data.ArrivalTime,
          DateTakeoff: response.data.DateTakeoff.substring(0,10),
          DateArrival: response.data.DateArrival.substring(0,10),
          EconomySeats: response.data.EconomySeats,
          BusinessSeats: response.data.BusinessSeats,
          FirstSeats: response.data.FirstSeats,
          AirportArrival: response.data.AirportArrival,
          AirportTakeOff: response.data.AirportTakeOff,
        });
        // console.log("Arrival date: " + this.state.DateArrival.);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    var url = window.location.href;
    var fetchedFlightId = /[^/]*$/.exec(url)[0];
    this.state.flightId = fetchedFlightId;
    this.getFlight(this.state.flightId);

  }


  validate() {

    this.setState({
      FlightNumberError: this.state.FlightNumber ? "" : "error"
    })

    this.setState({
      DepartureTimeError: this.state.DepartureTime ? "" : "error"
    })

    this.setState({
      ArrivalTimeError: this.state.ArrivalTime ? "" : "error"
    })

    this.setState({
      DateTakeoffError: this.state.DateTakeoff ? "" : "error"
    })

    this.setState({
      DateArrivalError: this.state.DateArrival ? "" : "error"
    })

    this.setState({
      EconomySeatsError: this.state.EconomySeats <= 0 ? "error" : ""
    })

    this.setState({
      BusinessSeatsError: this.state.BusinessSeats <= 0 ? "error" : ""
    })

    this.setState({
      FirstSeatsError: this.state.FirstSeats <= 0 ? "error" : ""
    })

    this.setState({
      AirportArrivalError: this.state.AirportArrival.length === 3 ? "" : "error"
    })

    this.setState({
      AirportTakeOffError: this.state.AirportTakeOff.length === 3 ? "" : "error"
    })

    if (!this.state.FlightNumber || !this.state.DepartureTime || !this.state.ArrivalTime || !this.state.DateTakeoff
      || !this.state.DateArrival || !this.state.EconomySeats || !this.state.BusinessSeats || !this.state.FirstSeats
      || !this.state.AirportArrival || !this.state.AirportTakeOff) {
      console.log(!this.state.FlightNumber, !this.state.DepartureTime, !this.state.ArrivalTime, !this.state.DateTakeoff
        , !this.state.DateArrival, !this.state.EconomySeats, !this.state.BusinessSeats, !this.state.FirstSeats
        , !this.state.AirportArrival, !this.state.AirportTakeOff)
      console.log("emptyFields")
      this.setState({
        errorMessage: "Please fill all fields",
      });
      return false
    }
    if (this.state.EconomySeats <= 0 || this.state.BusinessSeats < 0 || this.state.FirstSeats < 0) {
      console.log("emptySeats")
      this.setState({
        errorMessage: "Empty seats",
      });

      return false
    }

    if (this.state.DateArrival < this.state.DateTakeoff) {
      console.log("Take off date has to be before arrival date");
      this.setState({
        DateArrivalError: "error",
        errorMessage: "Take off date has to be before arrival date",
      })
      return false
    }

    if (this.state.AirportTakeOff.length !== 3 || this.state.AirportArrival.length !== 3) {
      console.log("wrongLength")
      this.setState({
        AirportArrivalError: this.state.AirportArrival.length === 3 ? "" : "error",
     
        AirportTakeOffError: this.state.AirportTakeOff.length === 3 ? "" : "error",
        errorMessage: "Wrong airport length (3 characters required)",
      })

      return false
    }

    return true
  }

  onChangeFlightNumber(e) {
    this.setState({
      FlightNumber: e.target.value
    })

    this.setState({
      FlightNumberError: ""
    })

  }

  onChangeDepartureTime(e) {
    this.setState({
      DepartureTime: e.target.value
    })

    this.setState({
      DepartureTimeError: ""
    })
  }

  onChangeArrivalTime(e) {
    this.setState({
      ArrivalTime: e.target.value
    })
    this.setState({
      ArrivalTimeError: ""
    })

  }

  onChangeDateTakeoff(e) {
    console.log('Date changed to: ' + e.target.value);
    this.setState({
      DateTakeoff: e.target.value
    })
    this.setState({
      DateTakeoffError: ""
    })
  }

  onChangeDateArrival(e) {
    this.setState({
      DateArrival: e.target.value
    })
    this.setState({
      DateArrivalError: ""
    })

  }

  onChangeEconomySeats(e) {
    this.setState({
      EconomySeats: e.target.value
    })
    this.setState({
      EconomySeatsError: e.target.value <= 0 ? "error" : ""

    })
  }

  onChangeBusinessSeats(e) {
    this.setState({
      BusinessSeats: e.target.value
    })
    console.log(this.state.BusinessSeats)
    this.setState({
      BusinessSeatsError: e.target.value <= 0 ? "error" : ""
    })
  }


  onChangeFirstSeats(e) {
    this.setState({
      FirstSeats: e.target.value
    })

    this.setState({
      FirstSeatsError: e.target.value <= 0 ? "error" : ""
    })
  }

  onChangeAirportArrival(e) {
    this.setState({
      AirportArrival: e.target.value
    })
    this.setState({
      AirportArrivalError: e.target.value.length === 3 ? "" : "error"
    })
  }

  onChangeAirportTakeOff(e) {
    this.setState({
      AirportTakeOff: e.target.value
    })
    this.setState({
      AirportTakeOffError: e.target.value.length === 3 ? "" : "error"
    })
  }

  async onSubmit(e) {
    console.log(this.validate())
    if (this.validate()) {
      e.preventDefault();
      const updatedUser = {
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        passportNumber: this.state.passportNumber,
      };


      await axios.post('http://localhost:5000/users/update/' + this.state.userId, newflight)
        .then(res => {

          console.log(res.data);

          window.location = '/flights/users/list';

          this.setState = {
            email: "",
            firstName: "",
            lastName: "",
            passportNumber: "",
            

            emailError: "",
            firstNameError: "",
            lastNameError: "",
            passportNumberError: "",
    
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.message });
        });



    }

  }

  render() {

    return (
      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-4 mx-auto  p-5">
            <h2 className="text-center mb-4">Edit Profile</h2>
            <div className="form-group">

              <TextField label="Email" value={this.state.email} variant="outlined" size="small" type="text" required style={{ width: 300 }} onChange={this.onChangeEmail} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.FlightNumberError ? true : false} />
            </div>

            <div>
              <TextField label="First Name" value={this.state.firstName} variant="outlined" size="small" type="time" required style={{ width: 300 }} onChange={this.onChangeFirstName} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.DepartureTimeError ? true : false} />
            </div>

            <div>
              <TextField label="Last Name" value={this.state.lastName} variant="outlined" size="small" type="time" required style={{ width: 300 }} onChange={this.onChangeLastName} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.ArrivalTimeError ? true : false} />
            </div>


            <div>
              <TextField label="Passport Number" value={this.state.passportNumber} variant="outlined" size="small" type="date" required style={{ width: 300 }} onChange={this.onChangePassportNumber} margin="normal" InputLabelProps={{
                shrink: true,
              }} error={this.state.DateTakeoffError ? true : false} />
            </div>

            {this.state.errorMessage &&
              <h5 style={styles} className="error"> {this.state.errorMessage} </h5>}

            <Button variant="contained" color="primary" onClick={this.onSubmit.bind(this)}>Edit Profile </Button>
          </div>
        </div>
      </div>
    );

  }
}