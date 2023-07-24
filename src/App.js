
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
import Adminregistration from './Screens/Adminregistration';
import Farmerlogin from './Screens/Farmerlogin';
import Admindashboard from './Screens/Adminsdashboard';
import Farmerdashboard from './Screens/Farmersdashboard';
import Adminscreen from './Screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/home" exact Component = {Homescreen} />
          <Route path = "/registerfarmer" exact Component = {Farmersregistratration} /> 
          <Route path = "/registeruseradmin" exact Component = {Adminregistration} />          
          <Route path = "/loginfarmer" exact Component={Farmerlogin}/>
          <Route path= "/admin" exact Component={Adminscreen}/>
          <Route path = "/update-farmer-details" exact Component={Farmerdashboard} />
          <Route path= "/admin-dashboard" exact Component={Admindashboard}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
