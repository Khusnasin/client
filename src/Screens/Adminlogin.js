import React, { useState } from 'react';
import axios from 'axios';

function Adminlogin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setadminCode] = useState('');

  const handleLogin = async () => {
    // Make the login request to the server and get the 'isAdmin' value from the response
    try {
      const response = await axios.post('/api/admin/login', {
        email,
        password,
      });

      const { isAdmin } = response.data; // Assuming the server returns isAdmin

      // Set the 'currentUser' object in localStorage
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          email,
          adminCode,
          isAdmin,
          // Other user properties...
        })
      );
      const currentUser = {
        email: 'admin@example.com',
        isAdmin: true,
        // Other user properties...
      };

      // Set the 'isAdmin' state to true so the component can handle the redirect
      setIsAdmin(isAdmin);

      // Handle successful login, e.g., redirect to AdminScreen or perform other actions
      window.location.href = '/admin'; // Redirect to the AdminScreen after successful login
    } catch (error) {
      // Handle login error, e.g., show error message
      console.error('Login error:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
                    type="password"
                    className="form-control"
                    placeholder="admincode"
                    name="adminCode"
                    value={adminCode}
                    onChange={(e) => setadminCode(e.target.value)}
                    required
                  />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Adminlogin;

/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";


function LoginAdmin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      adminCode: "",
    });
  
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = await axios.post("/api/admin/loginadmin", formData);
        if (response.status === 200) {
          setLoading(false);
          localStorage.setItem("token", response.data.token); // Save the token in local storage
          navigate("/admin"); // Redirect to the admin-screen after successful login
        }
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred during login. Please try again later.");
        }
      }
    };
  
    return (
      <div>
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          {loading && <Loader />}
          {error && <Error message={error} />}
          <div className="row justify-content-center mt-5">
            <div className="col-md-5 mt-5">
              <div className="bs">
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Admin Code:</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="admincode"
                    name="adminCode"
                    value={formData.adminCode}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  
  export default LoginAdmin;*/