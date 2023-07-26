
import './App.css';
<<<<<<< HEAD
=======
import React from "react";
>>>>>>> 77247e9b340f4990ddeaf54ab792675cc0e2d506
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
import Adminregistration from './Screens/Adminregistration';
import Farmerlogin from './Screens/Farmerlogin';
import Adminlogin from './Screens/Adminlogin';
import Admindashboard from './Screens/Adminsdashboard';
import Adminscreen from './Screens/Adminscreen';
<<<<<<< HEAD
import Farmersdashboard from './Screens/Farmersdashboard';
import FarmerProfile from './components/Farmersprofile';
=======
//import Farmersdashboard from './Screens/Farmersdashboard';
//import Update from './components/Update';
import   AdminProvider  from './components/AdminContext';
>>>>>>> 77247e9b340f4990ddeaf54ab792675cc0e2d506

function App() {
  
  return (
    
    <div className="App">
      
      <Navbar/>
      <AdminProvider>
      <BrowserRouter>
      
        <Routes>
          <Route path = "/home" exact Component = {Homescreen} />
          <Route path = "/registerfarmer" exact Component = {Farmersregistratration} /> 
          <Route path = "/registeruseradmin" exact Component = {Adminregistration} />          
          <Route path = "/loginfarmer" exact Component={Farmerlogin}/>
          <Route path = "/loginadmin" exact Component={Adminlogin}/>
<<<<<<< HEAD
          <Route path= "/admin-screen" exact Component={Adminscreen}/>
          <Route path = "/farmer-profile/:farmerid" exact Component={Farmersdashboard}/>
=======
          <Route path= "/admin-screen" exact Component={Adminscreen}/>          
>>>>>>> 77247e9b340f4990ddeaf54ab792675cc0e2d506
          <Route path= "/admin-dashboard" exact Component={Admindashboard}/>
         
          
        </Routes>
        
      </BrowserRouter>
      </AdminProvider>
    </div>
    
  );
}

export default App;
