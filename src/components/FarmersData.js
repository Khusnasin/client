import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function FarmersData() {
  const [farmersData, setFarmersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get('/api/farmers/getallfarmers');
      const data = response.data;
      setFarmersData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Farmers Data</h1>
        {loading && <Loader />}
        {farmersData.length > 0 && (
          <p style={{ fontSize: '20px' }}><b>Total: {farmersData.length} Farmer Data</b></p>
        )}
        <table className='table table-bordered table-dark'>
          {error && (<Error />)}
          <thead className='bs'>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Phone Number</th>
              <th>Area Of Napier</th>
              <th>Use Of Napier</th>
              <th>Number Of Cows</th>
              <th>Dung Produced in Kg</th>
              <th>Amount Of Milk in Litre</th>
              <th>Image Urls</th>
              <th>Description</th>
              <th>Challenges</th>
              <th>Interest In Training</th>
            </tr>
          </thead>
          <tbody>
            {farmersData.map(farmer => (
              <tr key={farmer._id}>
                <td>{farmer.Name}</td>
                <td>{farmer.location}</td>
                <td>{farmer.phoneNumber}</td>
                <td>{farmer.areaOfNapier}</td>
                <td>{farmer.useOfNapier}</td>
                <td>{farmer.numberOfCows}</td>
                <td>{farmer.dungProduced_inKg}</td>
                <td>{farmer.amountOfMilk_inLitre}</td>
                <td>{farmer.imageUrls}</td>
                <td>{farmer.description}</td>
                <td>{farmer.challenges}</td>
                <td>{farmer.interestInTraining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmersData;
