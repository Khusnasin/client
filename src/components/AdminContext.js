import { createContext} from 'react';


const AdminContext = createContext({
  farmersData: [], 
  setFarmersData: () => {} ,
  loading: [true], 
  setLoading: () => {},
  error: [false], 
  setError: () => {}, 
  //const [isAdmin, setIsAdmin] = useState(false);
});
 
export default AdminContext;

