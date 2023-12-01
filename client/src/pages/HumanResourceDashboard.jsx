import React from 'react';
import { Link } from 'react-router-dom';

const HumanResourceDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Human Resource Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/view-all-drivers" className="nav-link text-light">
                View All Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pe-drivers-commission" className="nav-link text-light">
                Pay PE Commission 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ot-drivers-commission" className="nav-link text-light">
              Pay OT Commission 
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-all-labourers" className="nav-link text-light">
                View All Labourers
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="view-all-drivers">
                  <div className="card-body">
                    <h3 className="card-title">Rgister A Driver</h3>
                    <p className="card-text">Register A Driver.</p>
                    <Link to="/register-driver">
                      <button className="btn btn-primary">Register</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="view-all-drivers">
                  <div className="card-body">
                    <h3 className="card-title">View All Drivers</h3>
                    <p className="card-text">View details of all drivers.</p>
                    <Link to="/all-drivers">
                      <button className="btn btn-primary">View Drivers</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="pe-commission-payment">
                  <div className="card-body">
                    <h3 className="card-title">Pay PE Commission </h3>
                    <p className="card-text">Process commission payment for PE.</p>
                    <Link to="/pe-drivers-commission">
                      <button className="btn btn-primary">Process Payment</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="ot-commission-payment">
                  <div className="card-body">
                    <h3 className="card-title">Pay OT Commission</h3>
                    <p className="card-text">Process commission payment for OT.</p>
                    <Link to="/ot-drivers-commission">
                      <button className="btn btn-primary">Process Payment</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="ot-commission-payment">
                  <div className="card-body">
                    <h3 className="card-title">Pay Shares To Partners</h3>
                    <p className="card-text">Pay shares of profit to each partner</p>
                    <Link to="/partner-shares">
                      <button className="btn btn-primary">Process Payment</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="view-all-labourers">
                  <div className="card-body">
                    <h3 className="card-title">Register Labourer</h3>
                    <p className="card-text">Register labourers.</p>
                    <Link to="/register-labourers">
                      <button className="btn btn-primary">Register</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="view-all-labourers">
                  <div className="card-body">
                    <h3 className="card-title">View All Labourers</h3>
                    <p className="card-text">View details of all labourers.</p>
                    <Link to="/view-all-labourers">
                      <button className="btn btn-primary">View Labourers</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanResourceDashboard;
