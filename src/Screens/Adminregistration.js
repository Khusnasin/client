import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function Adminregistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    adminCode: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/admin/registeruseradmin', formData);
      if (response.status === 201) {
        setSuccess('Registration Successful!');
        setLoading(false);
        navigate('/loginadmin'); // Redirect to the login page after successful registration
      
    } 
  }catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during admin registration. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit}>
        {loading && <Loader />}
        {error && <Error message={error} />}
        {success && <Success message='Registration Successful!' />}
        <div className="row justify-content-center mt-5">
          <div className="col-md-5 mt-5">
            <div className="bs">
              <div>
                <label>Name:</label>
                <input type="text" className="form-control" placeholder="name"
                  name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" className="form-control" placeholder="email"
                  name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label>Password:</label>
                <input type="password" className="form-control" placeholder="password"
                  name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <label>Admin Code:</label>
                <input type="password" className="form-control" placeholder="admincode"
                  name="adminCode" value={formData.adminCode} onChange={handleChange} />
              </div>
              <div>
                <button type="submit" className="btn btn-primary mt-3">Register</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Adminregistration;

