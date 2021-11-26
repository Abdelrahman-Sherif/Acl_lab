import React from 'react';
import CreateFlight from './components/create-flight';
import RecordList from './components/list-flight';
import EditFlight from './components/edit-flight';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const App = () => {
    return (
      <Router>
          <Routes>
          <Route exact path="/" element={<RecordList/>}/>
           <Route exact path="/flights/add" element={<CreateFlight/>}/>
           <Route  path="/flights/edit/:id" element={<EditFlight/>}/>
  
          </Routes>
      </Router>
    );
  }
  
  export default App;