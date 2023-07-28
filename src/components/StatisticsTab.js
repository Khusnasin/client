import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StatisticsTab({ farmersData }) {
  const [selectedOption, setSelectedOption] = useState('Napier Grass');
  const [formData, setFormData] = useState({
    areaOfNapier: true,
    
    numberOfCows: false,
    dungProduced_inKg: false,
    amountOfMilk_inLitre: false,
  });
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === 'Napier Grass') {
      setFormData({
        areaOfNapier: true,
        
        numberOfCows: false,
        dungProduced_inKg: false,
        amountOfMilk_inLitre: false,
      });
    } else if (option === 'Cows') {
      setFormData({
        areaOfNapier: false,
        
        numberOfCows: true,
        dungProduced_inKg: true,
        amountOfMilk_inLitre: true,
      });
    } else if (option === 'both') {
      setFormData({
        areaOfNapier: true,
        
        numberOfCows: true,
        dungProduced_inKg: true,
        amountOfMilk_inLitre: true,
      });
    }
  
  };

  if (!farmersData) {
    return <div>Loading...</div>; // Or show an appropriate loading/fallback UI
  }

  // Calculate statistical data based on the selected option
  const calculateStats = () => {
    if (!farmersData || farmersData.length === 0) {
      return []; // Return empty array if farmersData is not available or empty
    }
    if (selectedOption === 'Napier Grass') {
      // Calculate the number of farmers providing napier grass
      const napierGrassFarmersCount = farmersData.filter((farmer) => farmer.areaOfNapier).length;

     

      return [
        { title: 'Providing Napier Grass', value: napierGrassFarmersCount, color: '#FF8C00' },
        
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
      const napierGrassAreaCount = farmersData.filter((farmer) => farmer.areaOfNapier).length;

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
    }

    return [];
  };

  return (
    <div>
      <h2>Statistics</h2>
      <div>
        <input
          type="radio"
          name="statistics"
          value="Napier Grass"
          checked={selectedOption === 'Napier Grass'}
          onChange={() => handleOptionChange('Napier Grass')}
        />
        <label>Statistics for Napier Grass</label>
      </div>
      <div>
        <input
          type="radio"
          name="statistics"
          value="Cows"
          checked={selectedOption === 'Cows'}
          onChange={() => handleOptionChange('Cows')}
        />
        <label>Statistics for Cows</label>
      </div>
      <div>
        <input
          type="radio"
          name="statistics"
          value="both"
          checked={selectedOption === 'both'}
          onChange={() => handleOptionChange('both')}
        />
        <label>Statistics for Both</label>
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
  );
}

export default StatisticsTab;

/*import React, { useState, useEffect } from 'react';
import { notification } from 'antd';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Statistics = () => {
  const [selectedOption, setSelectedOption] = useState('Napier Grass');
  const [statisticsData, setStatisticsData] = useState(null);

  useEffect(() => {
    handleOptionChange(selectedOption);
  }, [selectedOption]);

  const handleOptionChange = async (option) => {
    setSelectedOption(option);

    try {
      const response = await axios.get(`/api/farmers/statistics/${option}`);
      setStatisticsData(response.data);
    } catch (error) {
      console.error('Error fetching statistics data:', error);
      setStatisticsData(null);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch statistics data. Please try again later.',
      });
    }
  };

  // Helper function to calculate counts
  const calculateCounts = () => {
    // Your existing calculateCounts function
    // ...
  };

  // Helper function to get chart labels and data
  const getChartLabelsAndData = () => {
    // Your existing getChartLabelsAndData function
    // ...
  };

  return (
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
  );
};

export default Statistics;

/*import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function StatisticsTab({ farmersData }) {
   
    const [selectedOption, setSelectedOption] = useState('Napier Grass');
    const [formData, setFormData] = useState({
      areaOfNapier: true,
      useOfNapier: '',
      numberOfCows: false,
      dungProduced_inKg: false,
      amountOfMilk_inLitre: false,
    });
    // Ensure farmersData is defined and not null before using useState
   
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
      if (option === 'Napier Grass') {
        setFormData({
          areaOfNapier: true,
          useOfNapier: '',
          numberOfCows: false,
          dungProduced_inKg: false,
          amountOfMilk_inLitre: false,
        });
      } else if (option === 'Cows') {
        setFormData({
          areaOfNapier: false,
          useOfNapier: false,
          numberOfCows: true,
          dungProduced_inKg: true,
          amountOfMilk_inLitre: true,
        });
      } else if (option === 'both') {
        setFormData({
          areaOfNapier: true,
          useOfNapier: '',
          numberOfCows: true,
          dungProduced_inKg: true,
          amountOfMilk_inLitre: true,
        });
      }
    };
    if (!farmersData) {
      return <div>Loading...</div>; // Or show an appropriate loading/fallback UI
    }
    // Calculate statistical data based on the selected option
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
      <div>
        <h2>Statistics</h2>
        <div>
          <input
            type="radio"
            name="statistics"
            value="Napier Grass"
            checked={selectedOption === 'Napier Grass'}
            onChange={() => handleOptionChange('Napier Grass')}
          />
          <label>Statistics for Napier Grass</label>
        </div>
        <div>
          <input
            type="radio"
            name="statistics"
            value="Cows"
            checked={selectedOption === 'Cows'}
            onChange={() => handleOptionChange('Cows')}
          />
          <label>Statistics for Cows</label>
        </div>
        <div>
          <input
            type="radio"
            name="statistics"
            value="both"
            checked={selectedOption === 'both'}
            onChange={() => handleOptionChange('both')}
          />
          <label>Statistics for Both</label>
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
  );
}

export default StatisticsTab;





*/