/*import React, { useState, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Adminscreen from './Adminscreen';
import { FarmersData, Addfarmers, Users } from './Adminscreen'; // Assuming these components are exported from AdminScreen.js
import Loader from "../components/Loader";
import Error from "../components/Error";
const { Header, Content, Sider } = Layout;


function Admindashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [farmersData, setFarmersData] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Function to fetch farmers' data from the backend
  const fetchFarmersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/farmers/getallfarmers');
      setFarmersData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching farmers data:', error);
      setLoading(false);
      setError(true);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch farmers data. Please try again later.',
      });
    }
  };

  useEffect(() => {
    fetchFarmersData();
  }, []); // Fetch data when the component mounts



  const [selectedTab, setSelectedTab] = useState('1');

  const handleMenuClick = (e) => {
    setSelectedTab(e.key);
  };

  const handleEditFarmer = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleUpdateFarmer = async (updatedFarmer) => {
    try {
      setLoading(true);
      await axios.put(`/api/farmers/update-farmer-details/${updatedFarmer._id}`, updatedFarmer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      setSelectedFarmer(null);
      fetchFarmersData(); // Fetch updated data after successful update
      // Show success message or perform any other action
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Show error message or perform any other action
    }
  };

  const handleRemoveFarmer = async (farmerId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/farmers/removefarmer/${farmerId}`);
      setLoading(false);
      fetchFarmersData(); // Fetch updated data after successful remove
      // Show success message or perform any other action
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Show error message or perform any other action
    }
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
      
      <h1 style={{ fontSize: '30px' }}><b>Admin Dashboard</b></h1>
      {loading && <Loader />}
      {error && <Error />}
      
        <Menu
          mode="inline"
          selectedKeys={[selectedTab]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Farmers Data
          </Menu.Item>
          <Menu.Item key="2" icon={<FileAddOutlined />}>
            Add Farmers
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>      
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          {selectedTab === '1' && (
            <FarmersData farmersData={farmersData} loading={loading} />
          )}
          {selectedTab === '2' && <Addfarmers />}
          {selectedTab === '3' && <Users />}
           {/* Import and display AdminScreen component when no tab is selected }*/
           //{!selectedTab && <Adminscreen />}
       // </Content>
      //</Layout>
   // </Layout>
 // );
          
             
//}


//export default Admindashboard;
