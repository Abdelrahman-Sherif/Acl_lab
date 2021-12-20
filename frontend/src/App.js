import React from 'react';
import CreateFlight from './components/create-flight';
import RecordList from './components/list-flight';
import EditFlight from './components/edit-flight';
import ListUserFlights from './components/list-user-flight';
import ReturnFlights from './components/return-flights.js'
import BookMySeats from './components/pick-seat';
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
          </Routes>
      </Router>
    );
  }
  
  export default App;