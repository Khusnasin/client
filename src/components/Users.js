import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/getallusers');
      const data = response.data;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
      setError(error);
    }
  };

  const isAdmin = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.isAdmin;
  };

  return (
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        {loading && <Loader />}
        {users.length > 0 && (
          <p style={{ fontSize: '20px' }}><b>Total: {users.length} Users</b></p>
        )}
        {isAdmin() && (
          <table className='table table-bordered table-dark'>
            {error && <Error />}
            <thead className='bs'>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isAdmin() && <p>You are not authorized to view this page.</p>}
      </div>
    </div>
  );
}

export default Users;
