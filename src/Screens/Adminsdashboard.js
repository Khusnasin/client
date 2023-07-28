import React, { useState, useEffect } from 'react';
import { Layout, Menu, notification } from 'antd';
import axios from 'axios';
import {
  UserOutlined,
  FileAddOutlined,
  TeamOutlined
} from '@ant-design/icons';
import Adminscreen from './Adminscreen';
import { FarmersData, AddFarmers, Users}  from './Adminscreen';   //'../components/FarmersData'; // Import FarmersData component
//import AddFarmers from '../components/AddFarmers'; // Import AddFarmers component
//import Users from '../components/Users'; 
//import AdminContext from '../components/AdminContext';
import Loader from "../components/Loader";
import Error from "../components/Error";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//import StatisticsTab from "../components/StatisticsTab";

const { Header, Content, Sider } = Layout;
function Admindashboard() {
 // const {farmersData, loading, error, setFarmersData, setLoading, setError} = useContext(AdminContext);
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
      
      // Convert empty string fields to null
      const updatedFarmerWithNull = { ...updatedFarmer };
      for (const key in updatedFarmerWithNull) {
        if (updatedFarmerWithNull[key] === '') {
          updatedFarmerWithNull[key] = null;
        }
      }
      await axios.put(`/api/farmers/update-farmer-details/${updatedFarmer._id}`, updatedFarmerWithNull, {
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
   // State and functions for StatisticsTab
   const [selectedOption, setSelectedOption] = useState('Napier Grass');
   const [formData, setFormData] = useState({
     areaOfNapier: true,
     useOfNapier: '',
     numberOfCows: false,
     dungProduced_inKg: false,
     amountOfMilk_inLitre: false,
   });
 
   const handleOptionChange = (option) => {
     setSelectedOption(option);
 
     // Update formData based on the selected option
     if (option === 'Napier Grass') {
       setFormData({
         ...formData,
         areaOfNapier: true,
         useOfNapier: '',
         numberOfCows: false,
         dungProduced_inKg: false,
         amountOfMilk_inLitre: false,
       });
     } else if (option === 'Cows') {
       setFormData({
         ...formData,
         areaOfNapier: false,
         useOfNapier: false,
         numberOfCows: true,
         dungProduced_inKg: true,
         amountOfMilk_inLitre: true,
       });
     } else if (option === 'both') {
       setFormData({
         ...formData,
         areaOfNapier: true,
         useOfNapier: '',
         numberOfCows: true,
         dungProduced_inKg: true,
         amountOfMilk_inLitre: true,
       });
     }
   };
   const calculateStats = () => {
    if (!farmersData || farmersData.length === 0) {
      return []; // Return empty array if farmersData is not available or empty
    }
    if (selectedOption === 'Napier Grass') {
      // Calculate the number of farmers providing napier grass
      const napierGrassFarmersCount = farmersData.filter((farmer) => farmer.areaOfNapier).length;

      // Calculate the number of farmers providing napier grass and using it
      const napierGrassWithUseCount = farmersData.filter(
        (farmer) => farmer.areaOfNapier && farmer.useOfNapier
      ).length;

      return [
        { title: 'Providing Napier Grass', value: napierGrassFarmersCount, color: '#FF8C00' },
        { title: 'Using Napier Grass', value: napierGrassWithUseCount, color: '#FFD700' },
      ];
    } else if (selectedOption === 'Cows') {
      // Calculate the number of farmers providing cow dung
      const cowDungFarmersCount = farmersData.filter((farmer) => farmer.dungProduced_inKg).length;

      // Calculate the total amount of milk produced by all farmers
      const totalMilkAmount = farmersData.reduce(
        (total, farmer) => total + (farmer.amountOfMilk_inLitre ? farmer.amountOfMilk_inLitre : 0),
        0
      );

      // Calculate the total number of cows owned by all farmers
      const totalCowsCount = farmersData.reduce(
        (total, farmer) => total + (farmer.numberOfCows ? farmer.numberOfCows : 0),
        0
      );

      return [
        { title: 'Providing Cow Dung', value: cowDungFarmersCount, color: '#008000' },
        { title: 'Total Milk Production', value: totalMilkAmount, color: '#4169E1' },
        { title: 'Total Number of Cows', value: totalCowsCount, color: '#DC143C' },
      ];
    } else if (selectedOption === 'both') {
      // Calculate the number of farmers providing napier grass and using it
      const napierGrassWithUseCount = farmersData.filter(
        (farmer) => farmer.areaOfNapier && farmer.useOfNapier
      ).length;

      // Calculate the number of farmers providing cow dung
      const cowDungFarmersCount = farmersData.filter((farmer) => farmer.dungProduced_inKg).length;

      // Calculate the total amount of milk produced by all farmers
      const totalMilkAmount = farmersData.reduce(
        (total, farmer) => total + (farmer.amountOfMilk_inLitre ? farmer.amountOfMilk_inLitre : 0),
        0
      );

      // Calculate the total number of cows owned by all farmers
      const totalCowsCount = farmersData.reduce(
        (total, farmer) => total + (farmer.numberOfCows ? farmer.numberOfCows : 0),
        0
      );

      return [
        { title: 'Using Napier Grass', value: napierGrassWithUseCount, color: '#FFD700' },
        { title: 'Providing Cow Dung', value: cowDungFarmersCount, color: '#008000' },
        { title: 'Total Milk Production', value: totalMilkAmount, color: '#4169E1' },
        { title: 'Total Number of Cows', value: totalCowsCount, color: '#DC143C' },
      ];
    }

    return [];
  };
 
 
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={150}>
         
      {loading && <Loader />}
      {error && <Error />}
      
        <Menu
          mode="inline"
          selectedKeys={[selectedTab]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="1" icon={<TeamOutlined />}>
            Statistics
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
            <div>
              {/* Your code for StatisticsTab here */}
              {/* For simplicity, I'm including the entire StatisticsTab component code here */}
              <div>
                <h2>Statistics</h2>
                {/* Your radio buttons and other UI components for StatisticsTab here */}
                {/* ... */}
              </div>
              <div>
                <h3>Pie Chart</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={calculateStats()}
                      dataKey="value"
                      nameKey="title"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {calculateStats().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}


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