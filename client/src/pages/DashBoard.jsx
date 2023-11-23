import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Business Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/pe" className="nav-link text-light">
                Primary Evacuation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/other-trips" className="nav-link text-light">
                Other Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/fleet-management" className="nav-link text-light">
                Fleet Management
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link to="/reports" className="nav-link text-light">
                  Reports
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link to="/business-settings" className="nav-link text-light">
                Business Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="primary-evacuation">
                  <div className="card-body text-center">
                    <h3 className="card-title">Primary Evacuation</h3>
                    <Link to="/evacuation-subsection">
                      <button className="btn btn-primary">Record Evacuation</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="other-trips">
                  <div className="card-body text-center">
                    <h3 className="card-title">Other Trips</h3>
                    <Link to="/other-trips">
                      <button className="btn btn-primary">Record Other Trips</button>
                    </Link>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-4">
                  <div className="card mb-4" id="reports">
                    <div className="card-body text-center">
                      <h3 className="card-title">Reports</h3>
                      <Link to="/reports">
                        <button className="btn btn-primary">Reports</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Additional Dashboard Items */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="fleet-management">
                  <div className="card-body text-center">
                    <h3 className="card-title">Fleet Management</h3>
                    <Link to="/renew-insurance">
                      <button className="btn btn-primary mb-2">Renew Insurance</button>
                    </Link>
                    <Link to="/renew-roadworthy">
                      <button className="btn btn-primary mb-2">Renew RoadWorthy</button>
                    </Link>
                    <Link to="/view-renewals">
                      <button className="btn btn-primary">View All Renewals</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="business-settings">
                  <div className="card-body text-center">
                    <h3 className="card-title">Business Settings</h3>
                    <Link to="/business-settings">
                      <button className="btn btn-primary">Click</button>
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

export default Dashboard;
