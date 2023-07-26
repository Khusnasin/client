import React, { useEffect, useContext } from 'react';
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import FarmersData from '../components/FarmersData'; // Import FarmersData component
import AddFarmers from '../components/AddFarmers'; // Import AddFarmers component
import Users from '../components/Users'; // Import Users component
import  {AdminContext}  from '../components/AdminContext';

function AdminScreen() {
  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  
  

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem('currentUser'));

    if (current_user && current_user.isAdmin) {
      setIsAdmin(true);
    } else {
<<<<<<< HEAD
      window.location.href = '/admin';
=======
      window.location.href = '/loginadmin';
>>>>>>> 77247e9b340f4990ddeaf54ab792675cc0e2d506
    }
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 style={{ fontWeight: 'bold', fontSize: '40px' }}>Admin Panel</h1>
        </div>
      </div>
    
        {isAdmin ? (
            <Tabs defaultActiveKeys='1'>
                <TabPane tab='FarmersData' key='1'>
                    <FarmersData />
                </TabPane>
                <TabPane tab='AddFarmers' key='2'>
                    <AddFarmers />
                </TabPane>
                <TabPane tab='Users' key='3'>
                    <Users />
                </TabPane>
            </Tabs>
        ) : (
            <p>You are not authorized to view this page.</p>
          )}
    </div>
)
}

export default AdminScreen;

