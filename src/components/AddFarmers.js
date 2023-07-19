import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function AddFarmers() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            await axios.post(
                `${API_URL}/farmers`,
                { name, contact },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setName('');
            setContact('');
            alert('Farmer added successfully!');
        } catch (error) {
            console.error('Error adding farmer:', error);
            alert('Failed to add farmer');
        }
    }

    return (
        <div>
            <h2>Add Farmer</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required />
                <br />
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Contact"
                    required />
                <br />
                <button type="submit">Add Farmer</button>
            </form>
        </div>
    );
}

export default AddFarmers;
