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

      // Handling null values in the response data
      const usersWithNullFields = data.map(user => ({
        ...user,
        name: user.name || null,
        email: user.email || null,
        password: user.password || null,
      }));
      setUsers(usersWithNullFields);
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
        <h2>Users</h2>
        {loading && <Loader />}
        {users.length > 0 && (
          <p style={{ fontSize: '20px' }}><b>Total: {users.length} Users</b></p>
        )}
        {isAdmin() && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            {error && <Error />}
            <thead style={{ background: '#0d0d20', color: '#fff' }}>
              <tr>
                <th style={tableCellStyles}>Name</th>
                <th style={tableCellStyles} >Email</th>
                <th style={tableCellStyles}>Password</th>
                <th style={tableCellStyles}>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={tableCellStyles}>{user.name}</td>
                  <td style={tableCellStyles}>{user.email}</td>
                  <td style={tableCellStyles}>{user.password}</td>
                  <td style={tableCellStyles}>{user.isAdmin ? 'Yes' : 'No'}</td>
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
const tableCellStyles = {
  padding: '8px',
  border: '3px solid #0d0d20',
  //background: 'rgb(120, 120, 155)'
};

export default Users;
