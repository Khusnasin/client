import React from 'react';
import { Link } from "react-router-dom";

const LandingScreen = () => {
  return (
    <div className="row landing justify-content-center">
      <div className="col-md-9 my-auto text-center" style={{ borderRight: '8px solid white' }}>
        <h2 style={{ color: 'white', fontSize: '110px' }}>Bluecore</h2>
        <h3 style={{ color: 'white', fontSize: '40px' }}>"A collection of farmers data"</h3>

        <Link to='/registerfarmer'>
          <div className="farmers-buttons">
            <button className="btn landingbtn">Farmers Register</button>
          </div>
        </Link>

        <Link to='/loginfarmer'>
          <div className="farmers-buttons">
            <button className="btn landingbtn">Farmers Login</button>
          </div>
        </Link>

        <div className="separator-line"></div>

        <Link to='/registeruseradmin'>
          <div className="admins-buttons">
            <button className="btn landingbtn">Admin Register</button>
          </div>
        </Link>

        <Link to='/loginadmin'>
          <div className="admins-buttons">
            <button className="btn landingbtn">Admin Login</button>
          </div>
        </Link>
      </div>

      <Link to='/home'>
        <button className="btn landingbtn" style={{ color: 'black' }}>Get Started</button>
      </Link>

    </div>
  );
};

export default LandingScreen;