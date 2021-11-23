import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";



export default class CreateFlight extends Component {
  constructor(props) {
    super(props);
    this.onChangeFlightNumber = this.onChangeFlightNumber.bind(this);
    this.onChangeDepartureTime = this.onChangeDepartureTime.bind(this);
    this.onChangeArrivalTime = this.onChangeArrivalTime.bind(this);
    this.onChangeDateTakeoff = this.onChangeDateTakeoff.bind(this);
    this.onChangeDateArrival = this.onChangeDateArrival.bind(this);
    this.onChangeEconomySeats = this.onChangeEconomySeats.bind(this);
    this.onChangeBusinessSeats = this.onChangeBusinessSeats.bind(this);
    this.onChangeAirportArrival = this.onChangeAirportArrival.bind(this);
    this.onChangeAirportTakeOff = this.onChangeAirportTakeOff.bind(this);


    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      FlightNumber: "",
      DepartureTime: "",
      ArrivalTime: "",
      DateTakeoff: "",
      DateArrival: "",
      EconomySeats: "",
      BusinessSeats: "",
      AirportArrival: "",
      AirportTakeOff: "",
    }
  }


  onChangeFlightNumber(e) {
    this.setState({
      FlightNumber: e.target.value
    })
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

  async onSubmit(e) {
    e.preventDefault();

    const newflight = {
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

    console.log(newflight);

    await axios.post('http://localhost:5000/flights/add', newflight)
      .then(res => console.log(res.data))
      .catch((error) => {
        console.log(error);
    });
    window.location = '/';

      this.setState = {
        FlightNumber: "",
        DepartureTime: "",
        ArrivalTime: "",
        DateTakeoff: "",
        DateArrival: "",
        EconomySeats: "",
        BusinessSeats: "",
        AirportArrival: "",
        AirportTakeOff: "",
      }
  }

  render() {
    console.log("Adding flight");
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add A Flight</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Flight Number"
                name="FlightNumber"
                value={this.state.FlightNumber}
                onChange={this.onChangeFlightNumber}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Departure Time"
                name="DepartureTime"
                value={this.state.DepartureTime}
                onChange={this.onChangeDepartureTime}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Arrival Time"
                name="ArrivalTime"
                value={this.state.ArrivalTime}
                onChange={this.onChangeArrivalTime}
              />
            </div>
            
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-lg"
                placeholder="Enter Date of Takeoff"
                name="DateTakeoff"
                value={this.state.DateTakeoff}
                onChange={this.onChangeDateTakeoff}
              />
            </div>
  
            <div className="form-group">
              <input
                type="date"
                className="form-control form-control-lg"
                placeholder="Enter Date of Arrival"
                name="DateArrival"
                value={this.state.DateArrival}
                onChange={this.onChangeDateArrival}
              />
            </div>
  
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Number of Economy Seats"
                name="EconomySeats"
                value={this.state.EconomySeats}
                onChange={this.onChangeEconomySeats}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Number of Business Seats"
                name="BusinessSeats"
                value={this.state.BusinessSeats}
                onChange={this.onChangeBusinessSeats}
              />
            </div>
  
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Airport of Arrival"
                name="AirportArrival"
                value={this.state.AirportArrival}
                onChange={this.onChangeAirportArrival}
              />
            </div>
  
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Airport of TakeOff"
                name="AirportTakeOff"
                value={this.state.AirportTakeOff}
                onChange={this.onChangeAirportTakeOff}
              />
            </div>
  
            <button className="btn btn-primary btn-block">Add Flight</button>
            </form>
        </div>
      </div>
    </div>  
    );
  }
}