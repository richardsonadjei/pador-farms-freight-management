import React from 'react';
import { Link } from 'react-router-dom';

const BusinessSettings = () => {
  return (
    <div className="container mt-5">
      <h2 style={{ color: 'white' }}>Business Settings</h2>
      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register A Driver</h5>
              <p className="card-text">Register a new driver for your fleet.</p>
              <Link to="/register-driver" className="btn btn-primary">
                Register Driver
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View Renewals</h5>
              <p className="card-text">View and manage vehicle renewals.</p>
              <Link to="/view-renewals" className="btn btn-primary">
                View Renewals
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Income Category</h5>
              <p className="card-text">Create Income Categeory</p>
              <Link to="/income-category" className="btn btn-primary">
              Create
              </Link>
            </div>
          </div>
        </div>
        {/* Add more cards with buttons for other business settings features */}
      </div>
    </div>
  );
};

export default BusinessSettings;
