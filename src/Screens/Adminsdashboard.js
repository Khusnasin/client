import React, { useState, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import { UserOutlined, FileAddOutlined, TeamOutlined } from '@ant-design/icons';
import Adminscreen from './Adminscreen';
import { FarmersData, AddFarmers, Users } from './Adminscreen';
import Loader from "../components/Loader";
import Error from "../components/Error";
import StatisticsTab from "../components/StatisticsTab"
//import { Bar } from 'react-chartjs-2';

const { Header, Content, Sider } = Layout;

function Admindashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [farmersData, setFarmersData] = useState([]);
  const [selectedTab, setSelectedTab] = useState('1');
  //const [selectedOption, setSelectedOption] = useState('Napier Grass');
  //const [statisticsData, setStatisticsData] = useState(null);

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
    //handleOptionChange(selectedOption);
  }, []); 

 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ... */}
      <Sider theme="dark" width={150}>
        {loading && <Loader />}
        {error && <Error />}

        <Menu
          mode="inline"
          selectedKeys={[selectedTab]}
         
        >
          <Menu.Item key="1" icon={<TeamOutlined />} onClick={() => setSelectedTab('1')}>
            Statistical Data
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => setSelectedTab('2')}>
            Farmers Data
          </Menu.Item>
          <Menu.Item key="3" icon={<FileAddOutlined />}onClick={() => setSelectedTab('3')}>
            Add Farmers
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}onClick={() => setSelectedTab('4')}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ fontSize: '35px', color: 'white', padding: 0 }} >Admin Dashboard</Header>
        <Content style={{ margin: '20px' }}>
          <Content>
            <h4>Welcome to the Admin Dashboard!</h4>
            <p>(Here you can manage Farmers Data, Add New Farmers, and View User Information.)</p>
          </Content>

          {selectedTab === '1' && <StatisticsTab/>}
          {selectedTab === '2' && (
            <FarmersData farmersData={farmersData} loading={loading} />
          )}
          {selectedTab === '3' && <AddFarmers />}
          {selectedTab === '4' && <Users />}
          {/* Import and display AdminScreen component when no tab is selected */}
          {!selectedTab && <Adminscreen />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admindashboard;

/*import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Adminscreen from './Adminscreen';
import { FarmersData, AddFarmers, Users}  from './Adminscreen';   //'../components/FarmersData'; // Import FarmersData component
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Bar } from 'react-chartjs-2';
//import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
 
//const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//import StatisticsTab from "../components/StatisticsTab";

const { Header, Content, Sider } = Layout;
function Admindashboard() {
 // const {farmersData, loading, error, setFarmersData, setLoading, setError} = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
  const [farmersData, setFarmersData] = useState([]);

  const [selectedTab, setSelectedTab] = useState('1');
  const [selectedOption, setSelectedOption] = useState('Napier Grass');
  const [statisticsData, setStatisticsData] = React.useState(null);
  //const [selectedFarmer, setSelectedFarmer] = useState(null);
  // Function to fetch farmers' data from the backend
  const handleOptionChange = useCallback(async (option) => {
    setSelectedOption(option);

    try {
      const response = await axios.get(`/api/farmers/statistics/${option}`);

      //const response = await axios.get(`/api/farmers/statistics/${option}`);
      setStatisticsData(response.data);
    } catch (error) {
      console.error('Error fetching statistics data:', error);
      setStatisticsData(null);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch statistics data. Please try again later.',
      });
    }
  }, []);
  useEffect(() => {

    handleOptionChange(selectedOption);
  }, [selectedOption]); // Fetch data when the component mounts
  
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

  // Function to fetch statistics data from the backend
  
  
  
  


const calculateCounts = () => {
  const counts = {
    areaOfNapier: 0,
    
    numberOfCows: 0,
    dungProduced_inKg: 0,
    amountOfMilk_inLitre: 0,
  };

  statisticsData.forEach((data) => {
    if (data.areaOfNapier) counts.areaOfNapier++;   
    if (data.numberOfCows) counts.numberOfCows++;
    if (data.dungProduced_inKg) counts.dungProduced_inKg++;
    if (data.amountOfMilk_inLitre) counts.amountOfMilk_inLitre++;
  });

  return counts;
};
{/* const calculateCounts = () => {
    const counts = {
      areaOfNapier: 0,
      numberOfCows: 0,
      dungProduced_inKg: 0,
      amountOfMilk_inLitre: 0,
    };

    statisticsData.forEach((data) => {
      if (data.areaOfNapier) counts.areaOfNapier++;
      if (data.numberOfCows) counts.numberOfCows++;
      if (data.dungProduced_inKg) counts.dungProduced_inKg++;
      if (data.amountOfMilk_inLitre) counts.amountOfMilk_inLitre++;
    });

    return counts;
  };
  // Helper function to get labels and data for the chart
  const getChartLabelsAndData = () => {
    const counts = calculateCounts();
    const labels = Object.keys(counts);
    const data = Object.values(counts);
    return { labels, data };
  };

// Helper function to get labels and data for the chart
const getChartLabelsAndData = () => {
  const counts = calculateCounts();
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  return { labels, data };
};
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={150}>
         
      {loading && <Loader />}
      {error && <Error />}
      
        <Menu
          mode="inline"
          selectedKeys={[selectedTab]}
          
        >
          <Menu.Item key="1" icon={<UserOutlined />} onClick={() => handleOptionChange(selectedOption)}>
            Statistical Data
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Farmers Data
          </Menu.Item>
          <Menu.Item key="3" icon={<FileAddOutlined />}>
            Add Farmers
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>      
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ fontSize:'35px', color: 'white', padding: 0 }} >Admin Dashboard</Header>
        <Content style={{ margin: '20px' }}>
        <Content>                   
            <h4>Welcome to the Admin Dashboard!</h4>
            <p>(Here you can manage Farmers Data, Add New Farmers, and View User Information.)</p>
          </Content>
         
          {selectedTab === '1' && (
            <>
              <h2>Statistics</h2>
              <div style={{ marginBottom: '20px' }}>
            <label>
              Select Option:
              <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
                <option value="Napier Grass">Napier Grass</option>
                <option value="Cows">Cows</option>
                <option value="both">Both</option>
              </select>
            </label>
          </div>
          {statisticsData !== null ? (
            <Bar
              data={{
                labels: getChartLabelsAndData().labels,
                datasets: [
                  {
                    label: 'Farmers Distribution',
                    data: getChartLabelsAndData().data,
                    backgroundColor: 'rgba(75,192,192,0.6)',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          ) : (
            <p>No statistics data available for the selected option.</p>
          )}
        </>
      )}
          {selectedTab === '2' && (
            <FarmersData farmersData={farmersData} loading={loading} />
          )}
          {selectedTab === '3' && <AddFarmers />}
          {selectedTab === '4' && <Users />}
           {/* Import and display AdminScreen component when no tab is selected }
           {!selectedTab && <Adminscreen />}
          </Content> 
          </Layout>
          </Layout>
       
  );        
             

}
 {/*const handleOptionChange = useCallback(async (option) => {
    setSelectedOption(option);
    try {
      const response = await axios.get(`/api/farmers/statistics/${option}`);
      console.log('Statistics Data Response:', response.data); // Add this line for debugging
      setStatisticsData(response.data);
    } catch (error) {
      console.error('Error fetching statistics data:', error);
      setStatisticsData(null);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch statistics data. Please try again later.',
      });
    }
  }, []); */

// eslint-disable-next-line no-lone-blocks
{/*
  const handleEditFarmer = (farmer) => {
    setSelectedFarmer(farmer);
  };
  const handleUpdateFarmer = async (updatedFarmer) => {
    try {
      setLoading(true);
      
      // Convert empty string fields to null
     
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
  }; }
  // eslint-disable-next-line no-lone-blocks
  {/*const handleRemoveFarmer = async (farmerId) => {
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
*/ }
