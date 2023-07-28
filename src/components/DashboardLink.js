// components/DashboardLink.js
import React from 'react';
import { Link } from 'react-router-dom';

function DashboardLink() {
  return (
    <Link to="/admin-dashboard">Go to Admin Dashboard</Link>
  );
}

export default DashboardLink;
