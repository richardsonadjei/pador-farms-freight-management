import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ExpenditureReports = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Expenditure Reports Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/fuel-reports" className="nav-link text-light">
                Fuel Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/repairs-maintenance-reports" className="nav-link text-light">
                Repairs and Maintenance Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/labourers-renumeration-reports" className="nav-link text-light">
                Labourers Renumeration Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/partner-shares-reports" className="nav-link text-light">
                Partner Shares Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/driver-commission-pe-reports" className="nav-link text-light">
                Driver's Commission on PEs Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/driver-commission-ot-reports" className="nav-link text-light">
                Driver's Commission on OTs Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/insurance-renewals-reports" className="nav-link text-light">
                Insurance Renewals Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/roadworthy-renewals-reports" className="nav-link text-light">
                Roadworthy Renewals Reports
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link to="/admin-expenditure-reports" className="nav-link text-light">
                  Admin Expenditure Reports
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            {/* Fuel Reports Subsection */}
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4" id="fuel-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Fuel Reports</h3>
                    <p className="card-text">All about fuel Purchases</p>
                    <Link to="/pe-fuel-reports">
                      <button className="btn btn-primary mb-2">View PE Fuel Reports</button>
                    </Link>
                    <Link to="/ot-fuel-reports">
                      <button className="btn btn-primary mb-2">View OT Fuel Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Repairs and Maintenance Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="repairs-maintenance-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Repairs and Maintenance </h3>
                    <p className="card-text">Some description about repairs and maintenance reports.</p>
                    <Link to="/maintenance-reports">
                      <button className="btn btn-primary mb-2">View Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Labourers Renumeration Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="labourers-renumeration-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Labourers Renumeration Reports</h3>
                    <p className="card-text">Some description about labourers renumeration .</p>
                    <Link to="/labourers-renumeration-reports">
                      <button className="btn btn-primary mb-2">View Labourers Renumeration Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Partner Shares Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="partner-shares-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Partner Shares Reports</h3>
                    <p className="card-text">Some description about partner shares </p>
                    <Link to="/partner-shares-reports">
                      <button className="btn btn-primary mb-2">View Partner Shares </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Driver's Commission on PEs Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="driver-commission-pe-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Driver's Commission on PEs Reports</h3>
                    <p className="card-text">Some description about driver's commission on PEs </p>
                    <Link to="/driver-commission-pe-reports">
                      <button className="btn btn-primary mb-2">View Driver's Commission on PEs Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Driver's Commission on OTs Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="driver-commission-ot-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Driver's Commission on OTs Reports</h3>
                    <p className="card-text">Some description about driver's commission on OTs </p>
                    <Link to="/driver-commission-ot-reports">
                      <button className="btn btn-primary mb-2">View Driver's Commission on OTs Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Insurance Renewals Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="insurance-renewals-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Insurance Renewals Reports</h3>
                    <p className="card-text">Some description about insurance renewals </p>
                    <Link to="/insurance-renewals-reports">
                      <button className="btn btn-primary mb-2">View Insurance Renewals Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Roadworthy Renewals Reports Subsection */}
              <div className="col-md-4">
                <div className="card mb-4" id="roadworthy-renewals-reports-section">
                  <div className="card-body">
                    <h3 className="card-title">Roadworthy Renewals Reports</h3>
                    <p className="card-text">Some description about roadworthy renewals</p>
                    <Link to="/roadworthy-renewals-reports">
                      <button className="btn btn-primary mb-2">View Roadworthy Renewals Reports</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Add more cards for other expenditure reports */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditureReports;
