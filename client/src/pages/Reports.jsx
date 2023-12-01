import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Reports = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Reports Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/pe-reports" className="nav-link text-light">
                PE Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ot-reports" className="nav-link text-light">
                Other Trips Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-income-dashboard" className="nav-link text-light">
                Income Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-expenditure-dashboard" className="nav-link text-light">
                Expenditure Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partner-shares" className="nav-link text-light">
                View Shares To Partners
              </Link>
            </li>
            
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            {/* PE Reports Subsection */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="pe-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">PE Reports</h3>
                    <p className="card-text">Some description about PE reports.</p>
                    <Link to="/pe-reports">
                      <button className="btn btn-primary mb-2">View PE Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Other Trips Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="ot-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Other Trips Reports</h3>
                    <p className="card-text">Some description about other trips reports.</p>
                    <Link to="/ot-reports">
                      <button className="btn btn-primary mb-2">View OT Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Income Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="income-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Income Reports</h3>
                    <p className="card-text">Some description about income reports.</p>
                    <Link to="/all-income-reports" className="me-2">
                      <button className="btn btn-primary mb-2">View All Income Reports</button>
                    </Link>
                    <Link to="/pe-income-reports" className="me-2">
                      <button className="btn btn-primary mb-2">View PE Income Reports</button>
                    </Link>
                    <Link to="/ot-income-reports">
                      <button className="btn btn-primary mb-2">View OT Income Reports</button>
                    </Link>
                    
                  </div>
                </div>
              </div>
              
              {/* Expenditure Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="expenditure-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Expenditure Reports</h3>
                    <p className="card-text">Some description about expenditure reports.</p>
                    <Link to="/pe-expense-reports">
                      <button className="btn btn-primary mb-2">View PE Expenditure Reports</button>
                    </Link>
                    <Link to="/ot-expense-reports">
                      <button className="btn btn-primary mb-2">View OT Expenditure Reports</button>
                    </Link>
                    <Link to="/all-general-expenditure">
                      <button className="btn btn-primary mb-2">View General Expense Reports</button>
                    </Link>
                    <Link to="/all-expense-reports">
                      <button className="btn btn-primary mb-2">View All Expense Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Income and Expenditure Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="income-expenditure-section">
                  <div className="card-body">
                    <h3 className="card-title">Profit Loss Reports</h3>
                    <p className="card-text">Income And Expenses For PEs And Other Trips Including Driver's Commission And Net Balances</p>
                    <Link to="/pe-income-expenditure" className="me-2">
                      <button className="btn btn-primary mb-2">Each PE </button>
                    </Link>
                    <Link to="/ot-income-expenditure" className="me-2">
                      <button className="btn btn-primary mb-2">Each OT</button>
                    </Link>
                    <Link to="/all-pe-income-expenditure" className="me-2">
                      <button className="btn btn-primary mb-2" >All PEs Within A Period</button>
                    </Link>
                    <Link to="/all-ot-income-expenditure" className="me-2">
                      <button className="btn btn-primary mb-2" >All OT Within A Period</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4" id="renewals-section">
                  <div className="card-body">
                    <h3 className="card-title">Renewals Reports</h3>
                    <p className="card-text">Renewal Of Regulatory Requirements</p>
                    <Link to="/insurance-reports" className="me-2">
                      <button className="btn btn-primary mb-2">Insurance Renewals</button>
                    </Link>
                    <Link to="/roadworhty-reports" className="me-2">
                      <button className="btn btn-primary mb-2">RoadWorthy Renewals</button>
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

export default Reports;
