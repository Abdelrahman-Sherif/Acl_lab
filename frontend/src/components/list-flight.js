import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
//import { Link } from "react-router-dom";




const deleteFlight = (id) => {
  axios.delete(`http://localhost:5000/flights/delete/${id}`)
  
};

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
           if (window.confirm('Are you sure you wish to delete this item?')) deleteFlight(props.record._id);
        }}>Delete</button>;

    
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

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/flights/get")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete("http://localhost:5000/flights/:id" + id).then((response) => {
      console.log(response.data);
    });
    window.location = '/flights';


    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
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