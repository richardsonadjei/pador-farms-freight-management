// ExpenseReportDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ExpenseReportDashboard = () => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Fuel Expense Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Fuel Expense</h3>
              <p className="card-text">Some description about fuel expense reports.</p>
              <Link to="/all-fuel-reports">
                <button className="btn btn-primary mb-2">View Fuel Expense Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Renewal Expense Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Renewal Expense</h3>
              <p className="card-text">Some description about renewal expense reports.</p>
              <Link to="/renewal-expense-reports">
                <button className="btn btn-primary mb-2">View Renewal Expense Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Driver's Commission PE Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Paid Driver's Commission </h3>
              <p className="card-text">Some description about driver's commission PE reports.</p>
              <Link to="/paid-drivers-commission">
                <button className="btn btn-primary mb-2">View Driver's Commission PE Reports</button>
              </Link>
            </div>
          </div>
        </div>
        {/* Driver's Commission PE Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Driver's Commission Pending Payment</h3>
              <p className="card-text">Some description about driver's commission PE reports.</p>
              <Link to="/pending-payment-drivers-commission">
                <button className="btn btn-primary mb-2">View Driver's Commission PE Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Labourers Remuneration Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Labourers Remuneration</h3>
              <p className="card-text">Some description about labourers remuneration reports.</p>
              <Link to="/labourers-remuneration-reports">
                <button className="btn btn-primary mb-2">View Labourers Remuneration Reports</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Partner Shares Subsection */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Partner Shares</h3>
              <p className="card-text">Some description about partner shares reports.</p>
              <Link to="/partner-shares-reports">
                <button className="btn btn-primary mb-2">View Partner Shares Reports</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title">Pending Payment Shares</h3>
              <p className="card-text">All Expenditures Incured That Are Yet To Pay</p>
              <Link to="/partner-shares-reports">
                <button className="btn btn-primary mb-2">Pending Payments</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseReportDashboard;
