import React from 'react';
import './landing.css'; 

const LandingScreen = () => {
  return (
    <div className="landing-container">
      <div className="buttons-container">
        <div className="farmers-buttons">
          <button className="Farmerregistration">Farmers Register</button>
          <button className="Farmerlogin">Farmers Login</button>
        </div>
        <div className="admins-buttons">
        <button className="Adminregistration">Admin Register</button>
          <button className="Adminlogin">Admin Login</button>
        </div>
      </div>
      <div className="separator-line"></div>
    </div>
  );
};

export default LandingScreen;