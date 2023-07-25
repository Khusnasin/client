
import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
import Farmerlogin from './Screens/Farmerlogin';
import Admindashboard from './Screens/Adminsdashboard';
//import Farmerdashboard from './Screens/Farmersdashboard';
import Adminscreen from './Screens/Adminscreen';
import Farmersdashboard from './Screens/Farmersdashboard';
import Update from './components/Update';

function App() {
  
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/home" exact Component = {Homescreen} />
          <Route path = "/registerfarmer" exact Component = {Farmersregistratration} />          
          <Route path = "/loginfarmer" exact Component={Farmerlogin}/>
          <Route path= "/admin" exact Component={Adminscreen}/>
          <Route path = "/update-farmer-details" exact Component={Update}/>
          <Route path= "/admin-dashboard" exact Component={Admindashboard}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
