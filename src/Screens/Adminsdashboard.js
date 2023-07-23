import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Adminscreen from './Screens/Adminscreen';
import { FarmersData, Addfarmers, Users } from './Screens/Adminscreen'; // Assuming these components are exported from AdminScreen.js

const { Header, Content, Sider } = Layout;

function Admindashboard() {
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
          {selectedTab === '1' && <FarmersData />}
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
