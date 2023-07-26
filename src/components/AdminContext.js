import { createContext, useState} from 'react';
import ReactDOM from "react-dom/client";

// Create the AdminContext
 const AdminContext= createContext();
 

// Create the AdminProvider component to wrap the application
 function AdminProvider({children })  {
    const [farmersData, setFarmersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);


 
  return (
    <AdminContext.Provider value={{ farmersData, setFarmersData, loading, setLoading, error, setError, isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
  }


export {AdminContext};
export default AdminProvider;
 //export {AdminContext, AdminProvider};
