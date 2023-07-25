import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Adminscreen from './Adminscreen';
import FarmersData from '../components/FarmersData'; // Import FarmersData component
import AddFarmers from '../components/AddFarmers'; // Import AddFarmers component
import Users from '../components/Users'; // Import Users component
import Loader from "../components/Loader";
import Error from "../components/Error";
import styled from 'styled-components';



const { Header, Content, Sider } = Layout;

// Styled Components
const AdminHeader = styled.h1`
  font-size: 50px;
  color: #000;
  text-align: center;
`;

const Sidebar = styled(Sider)`
  background-color: #001529;
  color: #fff;
`;

const MenuItem = styled(Menu.Item)`
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  margin: 8px;
  transition: background-color 0.3s;

  &.ant-menu-item-selected {
    background-color: #1890ff;
  }
`;

const PageContent = styled(Content)`
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const TabContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
      
      <Sidebar theme="dark" width={150}>
        <AdminHeader>Admin Dashboard</AdminHeader>
        {loading && <Loader />}
        {error && <Error />}
        <Menu mode="inline" selectedKeys={[selectedTab]} onClick={handleMenuClick}>
          <MenuItem key="1" icon={<UserOutlined />}>
            Farmers Data
          </MenuItem>
          <MenuItem key="2" icon={<FileAddOutlined />}>
            Add Farmers
          </MenuItem>
          <MenuItem key="3" icon={<TeamOutlined />}>
            Users
          </MenuItem>
        </Menu>
      </Sidebar>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <PageContent>
          {selectedTab === '1' && <FarmersData farmersData={farmersData} loading={loading} />}
          {selectedTab === '2' && <AddFarmers />}
          {selectedTab === '3' && <Users />}
          {!selectedTab && <Adminscreen />}
          <TabContent>
             {/* Your content for the TabContent goes here */}
             <h2>Welcome to the Admin Dashboard!</h2>
            <p>Here you can manage Farmers Data, Add New Farmers, and View User Information.</p>
          </TabContent>
        </PageContent>
      </Layout>      
    </Layout>
   );
}

export default Admindashboard;



















































  