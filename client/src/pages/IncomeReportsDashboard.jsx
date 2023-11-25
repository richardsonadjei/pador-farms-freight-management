import React from 'react';
import { Link } from 'react-router-dom';

const IncomeReportDashboard = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* PE Income Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">PE Income Report</h3>
              <p className="card-text">Some description about PE income reports.</p>
              <Link to="/pe-income-reports">
                <button className="btn btn-primary mb-2">View PE Income Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Trip Income Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Trip Income Report</h3>
              <p className="card-text">Some description about trip income reports.</p>
              <Link to="/trip-income-reports">
                <button className="btn btn-primary mb-2">View Trip Income Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* All PE Income Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">All PE Income Report</h3>
              <p className="card-text">Some description about all PE income reports.</p>
              <Link to="/all-pe-income-reports">
                <button className="btn btn-primary mb-2">View All PE Income Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* All Trip Income Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">All Trip Income Report</h3>
              <p className="card-text">Some description about all trip income reports.</p>
              <Link to="/all-trip-income-reports">
                <button className="btn btn-primary mb-2">View All Trip Income Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Monthly Income Analysis Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Monthly Income Analysis Report</h3>
              <p className="card-text">Some description about monthly income analysis reports.</p>
              <Link to="/monthly-income-analysis">
                <button className="btn btn-primary mb-2">View Monthly Income Analysis Report</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quarterly Income Analysis Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Quarterly Income Analysis Report</h3>
              <p className="card-text">Some description about quarterly income analysis reports.</p>
              <Link to="/quarterly-income-analysis">
                <button className="btn btn-primary mb-2">View Quarterly Income Analysis Report</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Yearly Income Analysis Report Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Yearly Income Analysis Report</h3>
              <p className="card-text">Some description about yearly income analysis reports.</p>
              <Link to="/yearly-income-analysis">
                <button className="btn btn-primary mb-2">View Yearly Income Analysis Report</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeReportDashboard;
