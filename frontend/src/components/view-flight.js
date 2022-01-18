import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { TextField, Button } from '@mui/material';




const styles = {
  color: "red",
  background: "#FFFFFF",
  fontSize: "16px"
};








export default class ViewFlight extends Component {

  constructor(props) {
    super(props);
    

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
      Price:0,

     
    }
  }



  
  ///Get flight data 
async getFlightByNumber(flightNumber) {
    await axios
      .get("http://localhost:5000/flights/flightByNumber/" + flightNumber)
      .then((response) => {
        console.log("Flight data : " + JSON.stringify(response.data));

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
            Price: response.data.Price,
          });
        return response.data;
        // console.log("Arrival date: " + this.state.DateArrival.);
      })
      .catch(function (error) {
        console.log("Flight fetch error:" + error);
        
  
      });
    
  }

  
  componentDidMount() {
    var url = window.location.href;
    var fetchedFlightNumber = /[^/]*$/.exec(url)[0];
    
    this.getFlightByNumber(fetchedFlightNumber)

  }

  render() {

    return (
      <div className="container bg-light">
        <div className="row">
          <div className="col-sm-4 mx-auto  p-5">
            <h2 className="text-center mb-4">Flight Details</h2>
            <div className="form-group">

              <TextField label="Flight Number" value={this.state.FlightNumber} variant="outlined" size="small" type="text" disabled="true"  required style={{ width: 300 }} onChange={this.onChangeFlightNumber} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="Departure Time" value={this.state.DepartureTime} variant="outlined" size="small" type="time" disabled="true" required style={{ width: 300 }} onChange={this.onChangeDepartureTime} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="Arrival Time" value={this.state.ArrivalTime} variant="outlined" size="small" type="time" disabled="true" required style={{ width: 300 }} onChange={this.onChangeArrivalTime} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>


            <div>
              <TextField label="Takeoff Date" value={this.state.DateTakeoff} variant="outlined" size="small" type="date" disabled="true" required style={{ width: 300 }} onChange={this.onChangeDateTakeoff} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>


            <div>
              <TextField label="Arrival Date" value={this.state.DateArrival} variant="outlined" size="small" type="date" disabled="true" required style={{ width: 300 }} onChange={this.onChangeDateArrival} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="Economy Seats" value={this.state.EconomySeats} variant="outlined" size="small" type="number" disabled="true" required style={{ width: 300 }} onChange={this.onChangeEconomySeats} margin="normal" InputLabelProps={{
                shrink: true,
              }} />
            </div>

            <div>
              <TextField label="Business Seats" value={this.state.BusinessSeats} variant="outlined" size="small" type="number" disabled="true" required style={{ width: 300 }} onChange={this.onChangeBusinessSeats} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="First Seats" value={this.state.FirstSeats} variant="outlined" size="small" type="number" disabled="true" required style={{ width: 300 }} onChange={this.onChangeFirstSeats} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="Price" value={this.state.Price} variant="outlined" size="small" type="number" disabled="true" required style={{ width: 300 }} onChange={this.onChangePrice} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>


            <div>
              <TextField label="Destination" value={this.state.AirportArrival} variant="outlined" size="small" type="text" disabled="true" required style={{ width: 300 }} onChange={this.onChangeAirportArrival} margin="normal" InputLabelProps={{
                shrink: true,
              }}  />
            </div>

            <div>
              <TextField label="Departure" value={this.state.AirportTakeOff} variant="outlined" size="small" type="text" disabled="true" required style={{ width: 300 }} onChange={this.onChangeAirportTakeOff} margin="normal" InputLabelProps={{
                shrink: true,
              }} />
            </div>

          </div>
        </div>
      </div>
    );

  }
}