import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AdminContext
const AdminContext = createContext();

// Create the AdminContextProvider component to wrap the application
const AdminContextProvider = ({ children }) => {
  const [farmersData, setFarmersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch farmers data from the backend
  useEffect(() => {
    const fetchFarmersData = async () => {
      try {
        const response = await axios.get('/api/farmers/getallfarmers');
        setFarmersData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching farmers data:', error);
        setLoading(false);
      }
    };

    fetchFarmersData();
  }, []);

  return (
    <AdminContext.Provider value={{ farmersData, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
