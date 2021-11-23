import React from 'react';
import CreateFlight from './components/create-flight';
import RecordList from './components/list-flight';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
    return (
      <Router>
          <Routes>
          <Route exact path="/" element={<h1> You can try "localhost:3000/flights" or "localhost:3000/flights/add" </h1>}/>
            <Route exact path="/flights/add" element={<CreateFlight/>}/>
            <Route exact path="/flights" element={<RecordList/>}/>
          </Routes>
      </Router>
    );
  }
  
  
  export default App;