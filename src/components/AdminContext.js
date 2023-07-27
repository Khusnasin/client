import { createContext} from 'react';


const AdminContext = createContext({
  farmersData: [], 
  setFarmersData: [] ,
  loading: [true], 
  setLoading: [true],
  error: [false], 
  setError: [false], 
  //const [isAdmin, setIsAdmin] = useState(false);
});
 
export default AdminContext;

