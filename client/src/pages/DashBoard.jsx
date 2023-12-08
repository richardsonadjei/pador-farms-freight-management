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
              <Link to="/primary-evacuations" className="nav-link text-light">
                Primary Evacuation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/other-trip-main" className="nav-link text-light">
                Other Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-income-reports" className="nav-link text-light">
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
              <>
                <li className="nav-item">
                  <Link to="/reports" className="nav-link text-light">
                    Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/human-resource" className="nav-link text-light">
                    Human Resource Management
                  </Link>
                </li>
              </>
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
                <div className="card mb-4 bg-primary text-white" id="primary-evacuation">
                  <div className="card-body">
                    <h3 className="card-title">Primary Evacuation</h3>
                    <p className="card-text">Some description about primary evacuation.</p>
                    <Link to="/pe">
                      <button className="btn btn-primary btn-light">Record PE</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 text-bg-info text-white" id="other-trips">
                  <div className="card-body">
                    <h3 className="card-title">Other Trips</h3>
                    <p className="card-text">Some description about business trips.</p>
                    <Link to="/other-trips">
                      <button className="btn btn-light">Record Other Trips</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 bg-danger text-white" id="expenditure">
                  <div className="card-body">
                    <h3 className="card-title">Expenditure</h3>
                    <p className="card-text">Some description about expenditure.</p>
                    <Link to="/pe-expense" className="me-2">
                      <button className="btn btn-light mb-2">PE Expenditure</button>
                    </Link>
                    <Link to="/ot-expense">
                      <button className="btn btn-light mb-2"> OT Expenditure</button>
                    </Link>
                    <Link to="/general-expense">
                      <button className="btn btn-light mb-2"> General Expense</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Dashboard Items */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="pe-income">
                  <div className="card-body">
                    <h3 className="card-title">PE Income</h3>
                    <p className="card-text">View PE Incomes</p>
                    <Link to="/pe-income-reports">
                      <button className="btn btn-light">View PE incomes</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="ot-income">
                  <div className="card-body">
                    <h3 className="card-title">Other Trips Income</h3>
                    <p className="card-text">View Other Trips Income </p>
                    <Link to="/ot-income-reports">
                      <button className="btn btn-light">View Other Trips Income</button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card mb-4" id="fleet-management">
                  <div className="card-body">
                    <h3 className="card-title">Fleet Management</h3>
                    <br />
                    <Link to="/renew-insurance">
                      <button className="btn btn-light mb-2">Renew-Insurance</button>
                    </Link>
                    <br />
                    <Link to="/renew-roadworthy">
                      <button className="btn btn-light mb-2">Renew-RoadWorthy</button>
                    </Link>
                    <br />
                    <Link to="/view-renewals">
                      <button className="btn btn-light">View All Renewals</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* ... Additional Rows ... */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="business-settings">
                  <div className="card-body">
                    <h3 className="card-title">Business Settings</h3>
                    <p className="card-text">Some description about business settings.</p>
                    <Link to="/income-category" className="me-2">
                      <button className="btn btn-light mb-2">Income Category</button>
                    </Link>
                    <Link to="/expense-category">
                      <button className="btn btn-light mb-2">Expense Category </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="hr-management">
                  <div className="card-body">
                    <h3 className="card-title">HR Management</h3>
                    <p className="card-text">Some description about HR management.</p>
                    <Link to="/all-drivers">
                      <button className="btn btn-light mb-2">All Drivers</button>
                    </Link>
                    {/* Add more buttons or links related to HR management if needed */}
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-4">
                  <div className="card mb-4" id="reports">
                    <div className="card-body">
                      <h3 className="card-title">Reports</h3>
                      <p className="card-text">All Profit Report</p>
                      <Link to="/all-profit">
                        <button className="btn btn-light">Profit/Loss</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* Add more cards or rows if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
