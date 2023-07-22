
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route, Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
//import Usersregistration from './Screens/Usersregistration';
import Farmerlogin from './Screens/Farmerlogin';
import Adminscreen from './Screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/home" exact Component = {Homescreen} />
          <Route path = "/registerfarmer" exact Component = {Farmersregistratration} />
          
          <Route path = "/loginfarmer" exact Component={Farmerlogin}/>
          <Route path="/admin" exact Component={Adminscreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
