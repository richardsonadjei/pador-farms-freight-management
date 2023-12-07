import React from 'react';
import { Link } from 'react-router-dom';

const OtherTripMain = () => {
  return (
    <div className="container mt-5">
      <h2 style={{ color: 'white' }}>Other Trip</h2>
      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Record Other Trip</h5>
              <p className="card-text">Record other trip incidents.</p>
              <Link to="/other-trips" className="btn btn-primary">
                Record
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All Other Trips</h5>
              <p className="card-text">View all recorded other trip incidents.</p>
              <Link to="/all-other-trips" className="btn btn-primary">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All Other Trips Income</h5>
              <p className="card-text">View all income from other trips.</p>
              <Link to="/all-other-trips" className="btn btn-primary">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Record Other Trip Expenses</h5>
              <p className="card-text">Record expenses related to other trips.</p>
              <Link to="/ot-expense" className="btn btn-danger">
                Record
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All Other Trip Expenses</h5>
              <p className="card-text">View all expenses related to other trips.</p>
              <Link to="/ot-expense-reports" className="btn btn-danger">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Expected Other Trip Commission Report </h5>
              <p className="card-text">View commissions for primary evacuation services.</p>
              <Link to="/expected other-trip-commission" className="btn btn-light"> {/* Added btn-danger class */}
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">Pay Each Other Trip Commission</h5>
              <p className="card-text">Pay commission for other trip services.</p>
              <Link to="/ot-drivers-commission" className="btn btn-danger">
                Pay
              </Link>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View Each Other Trip Income and Expenditure</h5>
              <p className="card-text">View income and expenditure details for other trips.</p>
              <Link to="/each-other-trips-income-expense" className="btn btn-light">
                View
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card bg-info text-white">
            <div className="card-body">
              <h5 className="card-title">View All Other Trip Income and Expenditure</h5>
              <p className="card-text">View income and expenditure details for other trips.</p>
              <Link to="/all-ot-income-expenditure" className="btn btn-light">
                View
              </Link>
            </div>
          </div>
        </div>
        {/* Add more cards with buttons for other trip features */}
      </div>
    </div>
  );
};

export default OtherTripMain;
