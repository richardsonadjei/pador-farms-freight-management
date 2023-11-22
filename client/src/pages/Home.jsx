import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../public/images/00071492.jpg'; // Replace with the actual path to your image
import { useSelector } from 'react-redux';

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 p-0">
          {/* Responsive image covering the entire page */}
          <img
            src={backgroundImage}
            alt="Background"
            className="img-fluid w-100"
            style={{ height: '100vh', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Centered content */}
      <div className="row align-items-center text-center" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="col-12 text-white">
          <h1 style={{ color: '#7B68EE', fontSize: '3rem' }}>
            Welcome <span style={{ color: '#7FFFD4', fontWeight: 'bold', fontFamily: 'YourCustomFont' }}>{currentUser.userName}</span>
          </h1>
          <p style={{ color: '#F5F5DC' }}>Official Website Of Pador Farms Freight Management</p>
          {/* Use Link to navigate to /dashboard */}
          <Link to="/dashboard">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
