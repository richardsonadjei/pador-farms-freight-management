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
          <h2 className="mt-3 mb-4">My Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/pe" className="nav-link text-light">
                Primary Evacuation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/business-trips" className="nav-link text-light">
                Other Trips
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to="/income" className="nav-link text-light">
                Income
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/expenditure" className="nav-link text-light">
                Expenditure
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
                  <div className="card-body">
                    <h3 className="card-title">Primary Evacuation</h3>
                    <p className="card-text">Some description about primary evacuation.</p>
                    <Link to="/evacuation-subsection">
                      <button className="btn btn-primary">Go to Evacuation Subsection</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="business-trips">
                  <div className="card-body">
                    <h3 className="card-title">Other Trips</h3>
                    <p className="card-text">Some description about business trips.</p>
                    <Link to="/trips-subsection">
                      <button className="btn btn-primary">Go to Trips Subsection</button>
                    </Link>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-4">
                  <div className="card mb-4" id="reports">
                    <div className="card-body">
                      <h3 className="card-title">Reports</h3>
                      <p className="card-text">Some description about reports.</p>
                      <Link to="/reports-subsection">
                        <button className="btn btn-primary">Go to Reports Subsection</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Additional Dashboard Items */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="income">
                  <div className="card-body">
                    <h3 className="card-title">Income</h3>
                    <p className="card-text">Some description about income.</p>
                    <Link to="/income-subsection">
                      <button className="btn btn-primary">Go to Income Subsection</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="expenditure">
                  <div className="card-body">
                    <h3 className="card-title">Expenditure</h3>
                    <p className="card-text">Some description about expenditure.</p>
                    <Link to="/expenditure-subsection">
                      <button className="btn btn-primary">Go to Expenditure Subsection</button>
                    </Link>
                  </div>
                </div>
              </div>
             
              <div className="col-md-4">
                <div className="card mb-4" id="fleet-management">
                  <div className="card-body">
                    <h3 className="card-title">Fleet Management</h3>
                    <p className="card-text">Some description about fleet management.</p>
                    <Link to="/fleet-management-subsection">
                      <button className="btn btn-primary">Go to Fleet Management Subsection</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="business-settings">
                  <div className="card-body">
                    <h3 className="card-title">Business Settings</h3>
                    <p className="card-text">Some description about business settings.</p>
                    <Link to="/business-settings-subsection">
                      <button className="btn btn-primary">Go to Business Settings Subsection</button>
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
