
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
import Adminregistration from './Screens/Adminregistration';
import Farmerlogin from './Screens/Farmerlogin';
import Adminlogin from './Screens/Adminlogin';
import Admindashboard from './Screens/Adminsdashboard';
import Adminscreen from './Screens/Adminscreen';
//import  AdminContext from './components/AdminContext';
//import ErrorBoundary from './components/ErrorBoundary';
//import StatisticsTab from './components/StatisticsTab';
import Farmersdashboard from './Screens/Farmersdashboard';
//import FarmerProfile from './components/Farmersprofile';


function App() {

  return (
    
    <div className="App">
      
      <Navbar/>
     
      <BrowserRouter>
    
        <Routes>
        
          <Route path = "/home" element = {<Homescreen/>} />
          <Route path = "/registerfarmer" element = {<Farmersregistratration/>} /> 
          <Route path = "/registeruseradmin" element = {<Adminregistration/>} />          
          <Route path = "/loginfarmer" element={<Farmerlogin/>}/>
          <Route path = "/loginadmin" element={<Adminlogin/>}/>
          <Route path= "/admin-screen" element={<Adminscreen/>}/>
          <Route path = "/farmer-profile/:farmerid" element={<Farmersdashboard/>}/>
          <Route path= "/admin-dashboard" element={<Admindashboard/>}/>
          
      
        </Routes>
      
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
