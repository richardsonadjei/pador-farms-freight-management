// PartnerShares.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PartnerShares = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Partner Shares Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/create-partner-shares" className="nav-link text-light">
                Record Partner Shares
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shares-payment-report-within-a-period" className="nav-link text-light">
                View All Shares Paid Within A Period
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-payments-to-partners" className="nav-link text-light">
                View Payments Made to Each Partner
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            {/* Record Partner Shares */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="record-partner-shares-section">
                  <div className="card-body">
                    <h3 className="card-title">Record Partner Shares</h3>
                    <p className="card-text">Record new partner shares information.</p>
                    <Link to="/create-partner-shares">
                      <button className="btn btn-primary mb-2">Record Shares</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* View All Shares Paid Within A Period */}
              <div className="col-md-4">
                <div className="card mb-4" id="view-shares-within-period-section">
                  <div className="card-body">
                    <h3 className="card-title">View All Shares Within A Period</h3>
                    <p className="card-text">View partner shares paid within a specific period.</p>
                    <Link to="/shares-payment-report-within-a-period">
                      <button className="btn btn-primary mb-2">View Shares</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* View Payments Made to Each Partner */}
              <div className="col-md-4">
                <div className="card mb-4" id="view-payments-to-partners-section">
                  <div className="card-body">
                    <h3 className="card-title">View Payments to Each Partner</h3>
                    <p className="card-text">View detailed information about payments made to each partner.</p>
                    <Link to="/view-payments-to-partners">
                      <button className="btn btn-primary mb-2">View Payments</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Add more cards for other partner shares functionalities */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerShares;
