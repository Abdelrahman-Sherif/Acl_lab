import React from 'react';
import CreateFlight from './components/create-flight';
import RecordList from './components/list-flight';
import EditFlight from './components/edit-flight';
import ListUserFlights from './components/list-user-flight';
import ReturnFlights from './components/return-flights.js'
import BookMySeats from './components/pick-seat.js';
import BookMyReturnSeats from './components/pick-return-seat.js';
import MyFlights from './components/itinerary';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


const App = () => {
    return (
      <Router>
          <Routes>
          <Route exact path="/" element={<RecordList/>}/>
           <Route exact path="/flights/add" element={<CreateFlight/>}/>
           <Route  path="/flights/edit/:id" element={<EditFlight/>}/>
           <Route  path="/flights/users/list" element={<ListUserFlights/>}/>
           <Route  path="/flights/users/return" element={<ReturnFlights/>}/>
           <Route  path="/flights/users/pick-seat" element={<BookMySeats/>}/>
           <Route  path="/flights/users/pick-return-seat" element={<BookMyReturnSeats/>}/>
           <Route  path="/flights/users/itinerary" element={<MyFlights/>}/>

          </Routes>
      </Router>
    );
  }
  
  export default App;