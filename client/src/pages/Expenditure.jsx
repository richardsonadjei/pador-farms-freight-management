import React from 'react';
import { Link } from 'react-router-dom';

const Expenditure = () => {
  return (
    <div className="container mt-5">
      <h2 style={{ color: 'white' }}>Expenditure</h2>
      <div className="row mt-3">
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Record PE Expenditure</h5>
              <p className="card-text">Record general expenses for the business.</p>
              <Link to="/pe-expense" className="btn btn-primary">
                PE Expense
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Record Other Trips Expenditure</h5>
              <p className="card-text">Record general expenses for the business.</p>
              <Link to="/ot-expense" className="btn btn-primary">
                Other Trip Expense
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">General Expense</h5>
              <p className="card-text">Create General Expense</p>
              <Link to="/general-expense" className="btn btn-primary">
                Create General Expenses
              </Link>
            </div>
          </div>
        </div>
       
        {/* Add more cards with buttons for other expenditure features */}
      </div>
    </div>
  );
};

export default Expenditure;
