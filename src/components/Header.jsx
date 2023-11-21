import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/home">
          <span style={{ color: '#ff0000', fontWeight: 'bold' }}>Pador</span>{' '}
          <span style={{ color: '#00ff00', fontWeight: 'bold' }}>Farms</span>{' '}
          <span style={{ color: '#0000ff', fontWeight: 'bold' }}>Freight</span>{' '}
          <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>Services</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Farm Projects
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Primary Evacuations</Link></li>
                <li><Link className="dropdown-item" to="#">Business Trips</Link></li>
                {/* Add other project links */}
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/create-project">Reports</Link></li>
              </ul>
            </li>
          </ul>
          <div className="dropdown text-end mx-auto">
            <Link className="d-block link-body-emphasis text-decoration-none dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">
              User
              <i className="bi bi-person-circle" style={{ fontSize: '32px' }}></i>
            </Link>
            <ul className="dropdown-menu text-small">
              {/* Dropdown menu items */}
              <li><Link className="dropdown-item" to="/sign-out">Sign Out</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/create-account">Create An Account</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
