import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          <span style={{ color: '#ff0000', fontWeight: 'bold' }}>Pador</span>{' '}
          <span style={{ color: '#00ff00', fontWeight: 'bold' }}>Farms</span>{' '}
          <span style={{ color: '#0000ff', fontWeight: 'bold' }}>Freight</span>{' '}
          <span style={{ color: '#ff00ff', fontWeight: 'bold' }}>Services</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link active fw-bold text-yellow" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle fw-bold text-yellow"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Business
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/pe">
                      Primary Evacuations
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="other-trips">
                      Other Trips
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/expenditure">
                      Expenditure
                    </Link>
                  </li>
                  
                  <li>
                    <Link className="dropdown-item" to="/fleet-management">
                      Fleet Management
                    </Link>
                  </li>
                  
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  
                  <li>
                    <Link className="dropdown-item" to="business-settings">
                      Business Settings
                    </Link>
                  </li>
                  
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/reports">
                        Reports
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            )}
          </ul>
          <div className="dropdown text-end mx-auto">
            {currentUser ? (
              <>
                <Link
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentUser.username}
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: '32px' }}
                  ></i>
                </Link>
                <ul className="dropdown-menu text-small">
                  <li>
                    <Link className="dropdown-item" to="/sign-out">
                      Sign Out
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/update-profile">
                        Update Your Account
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link className="dropdown-item" to="/create-account">
                        Create An Account
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </>
            ) : (
              <Link
                className="d-block link-body-emphasis text-decoration-none"
                to="/sign-in"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
