import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter , Route,Routes, Link} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import Farmersregistratration from './Screens/Farmersregistration';
import Usersregistration from './Screens/Usersregistration';
import Userslogin from './Screens/Userslogin';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/home" exact Component = {Homescreen} />
          <Route path = "/registerfarmer" exact Component = {Farmersregistratration} />
          <Route path = "/registeruser" exact Component = {Usersregistration} />
          <Route path = "/loginuser" exact Component={Userslogin}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
