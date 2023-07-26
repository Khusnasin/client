import { createContext, useState} from 'react';


// Create the AdminContext
export const AdminContext = createContext();

// Create the AdminContextProvider component to wrap the application
export const AdminProvider = ({ children }) => {
  const [farmersData, setFarmersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ farmersData, setFarmersData, loading, setLoading, error, setError, isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};


 
