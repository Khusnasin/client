
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
import Farmersdashboard from './Screens/Farmersdashboard';
import FarmerProfile from './components/Farmersprofile';

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
          <Route path= "/admin-screen" exact Component={Adminscreen}/>
          <Route path = "/farmer-profile/:farmerid" exact Component={Farmersdashboard}/>
          <Route path= "/admin-dashboard" exact Component={Admindashboard}/>
         
          
        </Routes>
        
      </BrowserRouter>
      </AdminProvider>
    </div>
    
  );
}

export default App;
