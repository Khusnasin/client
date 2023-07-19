import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Farmers() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = async () => {
        try {
            const response = await axios.get(`${API_URL}/farmers`);
            setFarmers(response.data);
        } catch (error) {
            console.error('Error fetching farmers:', error);
        }
    };

    return (
        <div>
            <h2>Farmers</h2>
            <ul>
                {farmers.map((farmer) => (
                    <li key={farmer._id}>{farmer.name}</li>
                ))}
            </ul>
        </div>
    );
}

function AddFarmer() {
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/farmers`, { name, contact });
            setName('');
            setContact('');
            alert('Farmer added successfully!');
        } catch (error) {
            console.error('Error adding farmer:', error);
            alert('Failed to add farmer');
        }
    };

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

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/admin/farmers">Farmers</Link>
            </li>
            <li>
              <Link to="/admin/add-farmer">Add Farmer</Link>
            </li>
            <li>
              <Link to="/admin/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/admin/farmers" component={Farmers} />
        <Route path="/admin/add-farmer" component={AddFarmer} />
        <Route path="/admin/users" component={Users} />
      </div>
    </Router>
  );
};

export default Adminscreen;