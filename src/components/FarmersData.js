import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Farmers() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetchFarmers();
    }, []);

    async function fetchFarmers() {
        try {
            const response = await axios.get(`${API_URL}/farmers`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        }
    }

    return (
        <div>
            <h2>Farmers Data</h2>
            <ul>
                {farmers.map((farmer) => (
                    <li key={farmer._id}>{farmer.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Farmers;
