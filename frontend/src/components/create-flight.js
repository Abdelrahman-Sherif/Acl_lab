import React, { Component } from 'react';
import axios from 'axios';
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import {TextField, Button} from '@mui/material';




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
    this.onChangeFirstSeats = this.onChangeFirstSeats.bind(this);
    this.onChangeAirportArrival = this.onChangeAirportArrival.bind(this);
    this.onChangeAirportTakeOff = this.onChangeAirportTakeOff.bind(this);


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
    }
  }

  
  validate(){

  this.setState({
    FlightNumberError: this.state.FlightNumber?"":"error"
  })

  this.setState({
    DepartureTimeError: this.state.DepartureTime?"":"error"
  })

  this.setState({
    ArrivalTimeError: this.state.ArrivalTime?"":"error"
  })

  this.setState({
    DateTakeoffError: this.state.DateTakeoff?"":"error"
  })

  this.setState({
    DateArrivalError: this.state.DateArrival?"":"error"
  })

  this.setState({
    EconomySeatsError: this.state.EconomySeats <= 0? "error": ""
  })

  this.setState({
    BusinessSeatsError: this.state.BusinessSeats <= 0? "error": ""
  })

  this.setState({
    FirstSeatsError: this.state.FirstSeats<= 0? "error": ""
  })

  this.setState({
    AirportArrivalError: this.state.AirportArrival.length ===3 ?"":"error"
  })

  this.setState({
    AirportTakeOffError: this.state.AirportTakeOff.length ===3 ?"":"error"
  })
 
  if(!this.state.FlightNumber || !this.state.DepartureTime || !this.state.ArrivalTime || !this.state.DateTakeoff 
    || !this.state.DateArrival || !this.state.EconomySeats || !this.state.BusinessSeats || !this.state.FirstSeats
    || !this.state.AirportArrival || !this.state.AirportTakeOff){
      console.log("emptyFields")
      return false
  }
  if(this.state.EconomySeats<=0 || this.state.BusinessSeats<0 || this.state.FirstSeats<0){
  console.log("emptySeats")

  return false
  }

  if(this.state.AirportTakeOff.length!== 3 || this.state.AirportArrival.length!==3){
    console.log("wrongLength")
    this.setState({
      AirportArrivalError: this.state.AirportArrival.length===3? "":"error"
    })
  
    this.setState({
      AirportTakeOffError: this.state.AirportTakeOff.length===3?"":"error"
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
      EconomySeatsError: e.target.value <= 0? "error": ""

    })
  }

  onChangeBusinessSeats(e) {
    this.setState({
      BusinessSeats: e.target.value
    })
    console.log(this.state.BusinessSeats)
    this.setState({
      BusinessSeatsError: e.target.value <= 0? "error": ""
    })
  }


  onChangeFirstSeats(e) {
    this.setState({
      FirstSeats: e.target.value
    })

    this.setState({
      FirstSeatsError: e.target.value <= 0? "error": ""
    })
  }

  onChangeAirportArrival(e) {
    this.setState({
      AirportArrival: e.target.value
    })
    this.setState({
      AirportArrivalError: e.target.value.length===3?"":"error"
    })
  }

  onChangeAirportTakeOff(e) {
    this.setState({
      AirportTakeOff: e.target.value
    })
    this.setState({
      AirportTakeOffError: e.target.value.length===3?"":"error"
    })
  }

  async onSubmit(e) {
    console.log(this.validate())
    if (this.validate()){
    e.preventDefault();
    const newflight = {
    FlightNumber: this.state.FlightNumber,
    DepartureTime: this.state.DepartureTime,
    ArrivalTime: this.state.ArrivalTime,
    DateTakeoff: this.state.DateTakeoff,
    DateArrival: this.state.DateArrival,
    EconomySeats: this.state.EconomySeats,
    BusinessSeats: this.state.BusinessSeats,
    FirstSeats: this.state.FirstSeats,
    AirportArrival: this.state.AirportArrival,
    AirportTakeOff: this.state.AirportTakeOff,
    };
    this.validate();
    
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
        EconomySeats: 0,
        BusinessSeats: 0,
        FirstSeats: 0,
        AirportArrival: "",
        AirportTakeOff: "",

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
      }
    }
  }

  render() {
    console.log("Adding flight");
    return (
      <div className="container bg-light">
        <div className="row">  
         <div className="col-sm-4 mx-auto  p-5">
          <h2 className="text-center mb-4">Add Flight</h2>
            <div className="form-group">
             
              <TextField label="Flight Number" value={this.state.FlightNumber} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeFlightNumber} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.FlightNumberError? true : false}/>
            </div>

            <div>
              <TextField label="Departure Time" value={this.state.DepartureTime} variant="outlined" size="small" type="time" required style={{width:300}} onChange={this.onChangeDepartureTime} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.DepartureTimeError? true : false}/>
            </div>
            
              <div>
              <TextField label="Arrival Time" value={this.state.ArrivalTime} variant="outlined" size="small" type="time" required style={{width:300}} onChange={this.onChangeArrivalTime} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.ArrivalTimeError? true : false} />
            </div>
           
            
            <div>
              <TextField label="Takeoff Date" value={this.state.DateTakeoff} variant="outlined" size="small" type="date" required style={{width:300}} onChange={this.onChangeDateTakeoff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.DateTakeoffError? true : false}/>
            </div>
  

            <div>
              <TextField label="Arrival Date" value={this.state.DateArrival} variant="outlined" size="small" type="date" required style={{width:300}} onChange={this.onChangeDateArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.DateArrivalError? true : false}/>
            </div>

            <div>
              <TextField label="Economy Seats" value={this.state.EconomySeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeEconomySeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.EconomySeatsError? true : false}/>
            </div>
  
            <div>
              <TextField label="Business Seats" value={this.state.BusinessSeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeBusinessSeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.BusinessSeatsError? true : false}/>
            </div>

            <div>
              <TextField label="First Seats" value={this.state.FirstSeats} variant="outlined" size="small" type="number" required style={{width:300}} onChange={this.onChangeFirstSeats} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.FirstSeatsError? true : false}/>
            </div>
  
            <div>
              <TextField label="Destination" value={this.state.AirportArrival} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeAirportArrival} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.AirportArrivalError? true : false}/>
            </div>
  
            <div>
              <TextField label="Departure" value={this.state.AirportTakeOff} variant="outlined" size="small" type="text" required style={{width:300}} onChange={this.onChangeAirportTakeOff} margin="normal"  InputLabelProps={{
            shrink: true,
          }} error= {this.state.AirportTakeOffError? true : false}/>
            </div>
  
            <Button variant="contained" color = "primary" onClick = {this.onSubmit.bind(this)}>Add Flight </Button>
        </div>
      </div>
    </div>  
    );

  }
}