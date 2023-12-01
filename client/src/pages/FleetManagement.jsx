import React from 'react';
import { Link } from 'react-router-dom';

const FleetManagement = () => {
  return (
    <div className="container mt-5">
      <h2 style={{ color: 'white' }}>Fleet Management</h2>
      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register Vehicle</h5>
              <p className="card-text">Register a new vehicle under your fleet.</p>
              <Link to="/register-vehicle" className="btn btn-primary">
                Register Vehicle
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Maintenance</h5>
              <p className="card-text">Record and manage vehicle maintenance.</p>
              <Link to="/general-expense" className="btn btn-primary">
                Maintenance
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Maintenance History</h5>
              <p className="card-text">View the maintenance history of your fleet.</p>
              <Link to="/maintenance-reports" className="btn btn-primary">
                Maintenance History
              </Link>
            </div>
          </div>
        </div>
        {/* Add more cards with buttons for other fleet management features */}
      </div>
    </div>
  );
};

export default FleetManagement;
