import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
//import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.FlightNumber}</td>
    <td>{props.record.DepartureTime}</td>
    <td>{props.record.ArrivalTime}</td>
    <td>{props.record.DateTakeoff}</td>
    <td>{props.record.DateArrival}</td>
    <td>{props.record.EconomySeats}</td>
    <td>{props.record.BusinessSeats}</td>
    <td>{props.record.AirportArrival}</td>
    <td>{props.record.AirportTakeOff}</td>

    <td>
    <button onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) props.deleteRecord(props.record._id);
        }}>Delete</button>
    </td>
  </tr>
);

export default class RecordList extends Component {

  
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
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
        <h3>Flight List</h3>
          <form onSubmit={this.onSubmit}>
            <Row>
              <Col>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Flight Number"
                name="FlightNumber"
                value={this.state.FlightNumber}
                onChange={this.onChangeFlightNumber}
              />
              </Col>
              <Col>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Terminal"
                name="Terminal"
                value={this.state.Terminal}
                onChange={this.onChangeTerminal}
              />
              </Col>
            </Row>
          
            <Row style={{marginTop: 10}}>
              <Col>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Departure Time"
                name="DepartureTime"
                value={this.state.DepartureTime}
                onChange={this.onChangeDepartureTime}
              />
              </Col>
              <Col>
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
            </Col>
              </Row>
            <Row style={{marginTop: 10}}>
              <Col>
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
            </Col>
            <Col>
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
            </Col>
            </Row>
            
            <Row style={{marginTop: 10}}>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
  
            <Row style={{marginTop: 10}}>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
            <div class='col text-center'>
              <Row>
                <Col>
              <button className="btn btn-secondary btn-block" style={{marginTop: 10}}>Clear Filters</button>

              </Col>
              <Col>
              <button className="btn btn-primary btn-block" style={{marginTop: 10}}>Search</button>

              </Col>
              </Row>
            </div>
            </form>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>FlightNumber</th>
              <th>DepartureTime</th>
              <th>ArrivalTime</th>
              <th>DateTakeoff</th>
              <th>DateArrival</th>
              <th>EconomySeats</th>
              <th>BusinessSeats</th>
              <th>AirportArrival</th>
              <th>AirportTakeOff</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}