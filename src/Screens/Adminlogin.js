
import React, { useState } from "react";
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
          const isAdmin = formData.adminCode === "your-secret-admin-code"; // Replace "your-admin-code" with the actual admin code
          const currentUser = {
          email: formData.email,
          password: formData.password,
          isAdmin
          
        };
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          localStorage.setItem("token", response.data.token); // Save the token in local storage
          navigate("/admin-screen"); // Redirect to the admin-screen after successful login
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
  
  export default LoginAdmin;