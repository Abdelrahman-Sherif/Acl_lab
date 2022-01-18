import React from 'react';
import CreateFlight from './components/create-flight';
import RecordList from './components/list-flight';
import EditFlight from './components/edit-flight';
import ListUserFlights from './components/list-user-flight';
import ReturnFlights from './components/return-flights.js'
import DepartureFlights from './components/departure-fights.js'

import BookMySeats from './components/pick-seat.js';
import BookMyReturnSeats from './components/pick-return-seat.js';
import MyItinerary from './components/itinerary';
import EditUserBookings from './components/edit-booking';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProfilePage from './components/profile_page';
import UserBookings from './components/user_bookings';
import RegisterUser from './components/register-user';
import LoginUser from './components/login-user';
import ChangePassword from './components/change-password';
import Demo from './demo'

const App = () => {
    return (

      
      <Router>
          <Routes>
          <Route exact path="/" element={<Demo/>}/>
          <Route exact path="/register" element={<RegisterUser/>}/>
          <Route exact path="/login" element={<LoginUser/>}/>
          <Route exact path="/allFlights" element={<RecordList/>}/>
           <Route exact path="/flights/add" element={<CreateFlight/>}/>
           <Route  path="/flights/edit/:id" element={<EditFlight/>}/>
           <Route  path="/flights/users/bookings/edit/:id" element={<EditUserBookings/>}/>

           <Route  path="/flights/users/list" element={<ListUserFlights/>}/>
           <Route  path="/flights/users/return" element={<ReturnFlights/>}/>
           <Route  path="/flights/users/departure" element={<DepartureFlights/>}/>

           <Route  path="/flights/users/pick-seat" element={<BookMySeats/>}/>
           <Route  path="/flights/users/pick-return-seat" element={<BookMyReturnSeats/>}/>
           <Route  path="/flights/users/itinerary" element={<MyItinerary/>}/>
           <Route  path="/flights/users/profile/" element={<ProfilePage/>}/>
           <Route  path="/flights/users/profile/changePassword/" element={<ChangePassword/>}/>
           <Route  path="/flights/users/bookings" element={<UserBookings/>}/>

          </Routes>
      </Router>

      
    );
  }
  
  export default App;