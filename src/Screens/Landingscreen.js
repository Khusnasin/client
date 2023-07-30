import React from 'react';

const LandingScreen = () => {
  return (
    <div className="landing-container">
      <div className="buttons-container">
        <div className="farmers-buttons">
          <button className="register-button">Farmers Register</button>
          <button className="login-button">Farmers Login</button>
        </div>
        <div className="admins-buttons">
          <button className="login-button">Admin Login</button>
        </div>
      </div>
      <div className="separator-line"></div>
    </div>
  );
};

export default LandingScreen;