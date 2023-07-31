import React, { useState, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import { UserOutlined, BarChartOutlined, FileAddOutlined, PlusOutlined } from '@ant-design/icons';
//import Adminscreen from './Adminscreen';
//import { FarmersData, AddFarmers, Users } from './Adminscreen';
import FarmersData from "../components/FarmersData";
import AddFarmers from "../components/AddFarmers";
import AdminDetails from "../components/AdminDetails";
import StatisticsTab from "../components/StatisticsTab"
//import MenuItem from 'antd/es/menu/MenuItem';
//import { Bar } from 'react-chartjs-2';

const { Header, Content, Sider } = Layout;

function Admindashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [farmersData, setFarmersData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('farmers-data');
  //const [selectedOption, setSelectedOption] = useState('Napier Grass');
  //const [selectedOption, setSelectedOption] = useState('Napier Grass');
  //const [statisticsData, setStatisticsData] = useState(null);
  //const [admins, setAdmins] = useState([]);

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
  // Function to fetch statistics data from the backend based on the selected option
{/*const fetchStatisticsData = async (option) => {
  try {
    setLoading(true);
    const response = await axios.get(`/api/farmers/statistics?option=${option}`);
    setStatisticsData(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching statistics data:', error);
    setStatisticsData(null);
    setLoading(false);
    setError(true);
    notification.error({
      message: 'Error',
      description: 'Failed to fetch statistics data. Please try again later.',
    });
  }
};
const fetchAdminsData = async () => {
  try {
    setLoading(true);
    const response = await axios.get('/api/admins/getalladmins');
    setAdmins(response.data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    setLoading(false);
    setError(true);
    notification.error({
      message: 'Error',
      description: 'Failed to fetch admin data. Please try again later.',
    });
  }
}; */

// Fetch farmers' data and statistics data when the component mounts
useEffect(() => {
  fetchFarmersData();
  //fetchStatisticsData(selectedOption);
  
}, []);
  

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'admin-details':
        return <AdminDetails/>;
        
      case 'statistics':
        return <StatisticsTab farmersData={farmersData}  />;
      case 'farmers-data':
        return <FarmersData farmersData={farmersData} />;
      case 'add-farmers':
        return <AddFarmers/>;
      default:
        return null;
    }
  };
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ... */}
      <Sider theme="dark" width={150}>
        {loading && <div>Loading...</div>}
        {error && <div>Error fetching data.</div>}

        <Menu
          mode="inline"
          selectedKeys={[selectedTab]} >
        <Menu.Item key="statistics" icon={<BarChartOutlined />} onClick={() => handleTabChange('statistics')}>
            Statistical Data
  </Menu.Item>
          <Menu.Item key="farmers-data" icon={<FileAddOutlined />} onClick={() => handleTabChange('farmers-data')}>
            Farmers Data
          </Menu.Item>
          <Menu.Item key="add-farmers" icon={<PlusOutlined />}onClick={() => handleTabChange('add-farmers')}>
            Add Farmers
          </Menu.Item>
          <Menu.Item key="admin-details" icon={<UserOutlined />} onClick={() => handleTabChange('admin-details')}>
            Admin Details
            </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ fontSize: '35px', color: 'white', padding: 0 }} >Admin Dashboard</Header>
        <Content style={{ margin: '20px' }}>
          <div>
            <h4>Welcome to the Admin Dashboard!</h4>
            <p>(Here you can manage Statistical Data, Farmers Data, Add New Farmers, and View Admin Information.)</p>
          </div>
          {renderTabContent()}
          
        </Content>
      </Layout>
    </Layout>
  );
}
}
export default Admindashboard;
