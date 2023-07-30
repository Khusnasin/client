import React, {useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
//import { AdminContext } from './AdminContext';

 function FarmersData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [farmersData, setFarmersData] = useState([]);
  //const {farmersData, loading, error, setFarmersData, setLoading, setError} = useContext(AdminContext);

  useEffect(() => {
    fetchFarmersData();
  }, []);

  const fetchFarmersData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/farmers/getallfarmers');
      
      setFarmersData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching farmers data:',error);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className='row'>
      <div className='col-md-12'>
        <h2>Farmers Data</h2>
        {loading && <Loader />}
        {farmersData.length > 0 && (
          <p style={{ fontSize: '20px' }}><b>Total: {farmersData.length} Farmer Data</b></p>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
          {error && (<Error />)}
          <thead style={{ background: '#0d0d20', color: '#fff' }}>
            <tr>
              <th style={tableCellStyles}>Name</th>
              <th style={tableCellStyles}>Location</th>
              <th style={tableCellStyles}>Phone Number</th>
              <th style={tableCellStyles}>Area Of Napier</th>
              <th style={tableCellStyles}>Use Of Napier</th>
              <th style={tableCellStyles}>Number Of Cows</th>
              <th style={tableCellStyles}>Dung Produced in Kg</th>
              <th style={tableCellStyles}>Amount Of Milk in Litre</th>
              <th style={tableCellStyles}>Image Urls</th>
              <th style={tableCellStyles}>Description</th>
              <th style={tableCellStyles}>Challenges</th>
              <th style={tableCellStyles}>Interest In Training</th>
            </tr>
          </thead>
          <tbody>
            {farmersData.map(farmer => (
              <tr key={farmer._id}>
                <td style={tableCellStyles}>{farmer.Name}</td>
                <td style={tableCellStyles}>{farmer.location}</td>
                <td style={tableCellStyles}>{farmer.phoneNumber}</td>
                <td style={tableCellStyles}>{farmer.areaOfNapier}</td>
                <td style={tableCellStyles}>{farmer.useOfNapier}</td>
                <td style={tableCellStyles}>{farmer.numberOfCows}</td>
                <td style={tableCellStyles}>{farmer.dungProduced_inKg}</td>
                <td style={tableCellStyles}>{farmer.amountOfMilk_inLitre}</td>
                <td style={tableCellStyles}>{farmer.imageUrls}</td>
                <td style={tableCellStyles}>{farmer.description}</td>
                <td style={tableCellStyles}>{farmer.challenges}</td>
                <td style={tableCellStyles}>{farmer.interestInTraining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const tableCellStyles = {
  padding: '8px',
  border: '2px solid #0d0d20',
  //background: 'rgb(120, 120, 155)'
};

export default FarmersData;
