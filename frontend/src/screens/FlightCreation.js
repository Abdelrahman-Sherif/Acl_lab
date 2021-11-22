import React, { useState} from 'react'
import axios from 'axios'

const CreateFlight = () =>{
        // let history = useHistory(); // Use for Navigate on Previous
        const [user, setUser] = useState({
            FlightNumber: "",
            DepartureTime: "",
            ArrivalTime: "",
            DateTakeoff: "",
            DateArrival: "",
            EconomySeats: "",
            BusinessSeats: "",
            AirportArrival: "",
            AirportTakeOff: "",
          
        });

        const onSubmit = async e => {
            e.preventDefault();
            await axios.post("http://localhost:3000/postFlight",user);
            alert('Data Inserted');
            // history.push("/");
    };

        const {FlightNumber , DepartureTime , ArrivalTime , DateTakeoff , DateArrival , EconomySeats , BusinessSeats , AirportArrival , AirportTakeOff } = user;
   
        const onInputChange = e => {
          setUser({ ...user, [e.target.name]: e.target.value });
        };

    return (
    <div className="container bg-light">
      <div class="row">  
       <div className="col-sm-4 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Flight</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Flight Number"
              name="FlightNumber"
              value={FlightNumber}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Departure Time"
              name="DepartureTime"
              value={DepartureTime}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Arrival Timen"
              name="ArrivalTime"
              value={ArrivalTime}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <div className="form-group">
            <input
              type="Date"
              className="form-control form-control-lg"
              placeholder="Enter Date of Takeoff"
              name="DateTakeoff"
              value={DateTakeoff}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="Date"
              className="form-control form-control-lg"
              placeholder="Enter Date of Arrival"
              name="DateArrival"
              value={DateArrival}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Number of Economy Seats"
              name="EconomySeats"
              value={EconomySeats}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Number of Business Seats"
              name="BusinessSeats"
              value={BusinessSeats}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Airport of Arrival"
              name="AirportArrival"
              value={AirportArrival}
              onChange={e => onInputChange(e)}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Airport of TakeOff"
              name="AirportTakeOff"
              value={AirportTakeOff}
              onChange={e => onInputChange(e)}
            />
          </div>

          <button className="btn btn-primary btn-block">Add Flight</button>
          </form>
      </div>
    </div>
  </div>  
  );
};

export default CreateFlight;