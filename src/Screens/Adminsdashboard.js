import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Spin, notification } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Adminscreen from './Screens/Adminscreen';
import { FarmersData, Addfarmers, Users } from './Screens/Adminscreen'; // Assuming these components are exported from AdminScreen.js

const { Header, Content, Sider } = Layout;

function Admindashboard() {
  const [farmersData, setFarmersData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={200}>
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
           {/* Import and display AdminScreen component when no tab is selected */}
           {!selectedTab && <Adminscreen />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admindashboard;





















































  