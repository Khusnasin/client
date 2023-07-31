import React, { useState, useEffect  } from 'react';
import { Table } from 'antd';
//import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
function AdminDetails() {
  
  const [admins, setAdmins] = useState([]);
   // Fetch admin data from the backend
   const fetchAdminsData = async () => {
    try {
      const response = await axios.get('/api/admins/getalladmins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  // Fetch admin data when the component mounts
  useEffect(() => {
    fetchAdminsData();
  }, []);
  

  // Table columns configuration
  const columns = [
    
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    
  ];
  return (
    <div>
      <h2>Admin Details</h2>
      <Table dataSource={admins} columns={columns} />
    </div>
  );
 

}

export default AdminDetails;
