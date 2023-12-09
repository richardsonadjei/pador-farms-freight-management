import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryEvacuation = () => {
  return (
    <div className="container mt-5">
      <h2 style={{ color: 'white' }}>Primary Evacuation</h2>
      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Record PE</h5>
              <p className="card-text">Record primary evacuation incidents.</p>
              <Link to="/pe" className="btn btn-primary"> {/* Added btn-primary class */}
                Record 
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All PE</h5>
              <p className="card-text">View all recorded primary evacuation incidents.</p>
              <Link to="/all-pe-report" className="btn btn-primary"> {/* Added btn-primary class */}
                View 
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All PE Incomes</h5>
              <p className="card-text">View all Incomes From Primary Evacuations.</p>
              <Link to="/all-income-reports" className="btn btn-primary"> {/* Added btn-primary class */}
                View 
              </Link>
            </div>
          </div>
        </div>
      
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Record Expenses</h5>
              <p className="card-text">Record expenses related to primary evacuation.</p>
              <Link to="/pe-expense" className="btn btn-danger"> {/* Added btn-danger class */}
                Record 
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All PE Expenses</h5>
              <p className="card-text">View all expenses related to primary evacuation.</p>
              <Link to="/pe-expense-reports" className="btn btn-danger"> {/* Added btn-danger class */}
                View 
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Expected Monthly PE Commission Report </h5>
              <p className="card-text">View commissions for primary evacuation services.</p>
              <Link to="/expected-pe-commission" className="btn btn-light"> {/* Added btn-danger class */}
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Pay Monthly PE Commission</h5>
              <p className="card-text">Pay commission for primary evacuation services.</p>
              <Link to="/monthly-pe-commission" className="btn btn-danger"> {/* Added btn-danger class */}
                Pay 
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Pay Each PE Commission</h5>
              <p className="card-text">Pay commission for primary evacuation services.</p>
              <Link to="/pe-drivers-commission" className="btn btn-danger"> {/* Added btn-danger class */}
                Pay 
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View PE Income and Expenditure</h5>
              <p className="card-text">View income and expenditure details for primary evacuation.</p>
              <Link to="/all-pe-income-expenditure" className="btn btn-light"> 
                View 
              </Link>
            </div>
          </div>
        </div>
        {/* Add more cards with buttons for other primary evacuation features */}
      </div>
    </div>
  );
};

export default PrimaryEvacuation;
