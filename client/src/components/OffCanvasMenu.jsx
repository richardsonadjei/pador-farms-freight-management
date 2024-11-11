import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Offcanvas, Nav, Dropdown } from 'react-bootstrap';
import {
  FaHome, FaUser, FaSignOutAlt, FaSignInAlt, FaEllipsisV,
  FaTruck, FaUsers, FaClipboardList, FaMoneyBillWave, FaBalanceScale,
  FaDollarSign
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import NewExpenseCategoryModal from '../pages/finance/expensecategory';
import RegisterVehicleModal from '../pages/extras/Vehicle/RegisterVehicleModal';
import SignUpModal from '../pages/SignUp';
import AddCocoaPriceModal from '../pages/extras/PricePerBag/NewPricePerBag';
import NewWeightModal from '../pages/extras/StandardWeight/Weight';
import PEDriversCommissionModal from '../pages/extras/DriversCommisions/PEDriversCommission';


const OffcanvasMenu = ({ showOffcanvasRight, handleClose, handleItemClick }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [showExpenseCategoryModal, setShowExpenseCategoryModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showRegisterVehicleModal, setShowRegisterVehicleModal] = useState(false);
  const [showCocoaPriceModal, setShowCocoaPriceModal] = useState(false);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false); // State for Commission Modal

  const handleAddExpenseCategoryClick = () => {
    setShowExpenseCategoryModal(true);
    handleClose();
  };

  const handleExpenseCategoryModalClose = () => {
    setShowExpenseCategoryModal(false);
  };

  const handleAddEmployeeClick = () => {
    setShowSignUpModal(true);
    handleClose();
  };

  const handleSignUpModalClose = () => {
    setShowSignUpModal(false);
  };

  const handleAddVehicleClick = () => {
    setShowRegisterVehicleModal(true);
    handleClose();
  };

  const handleRegisterVehicleModalClose = () => {
    setShowRegisterVehicleModal(false);
  };

  const handleAddCocoaPriceClick = () => {
    setShowCocoaPriceModal(true);
    handleClose();
  };

  const handleCocoaPriceModalClose = () => {
    setShowCocoaPriceModal(false);
  };

  const handleUpdateWeightClick = () => {
    setShowWeightModal(true);
    handleClose();
  };

  const handleWeightModalClose = () => {
    setShowWeightModal(false);
  };

  const handleAddCommissionClick = () => {
    setShowCommissionModal(true);
    handleClose();
  };

  const handleCommissionModalClose = () => {
    setShowCommissionModal(false);
  };

  return (
    <>
      <Offcanvas show={showOffcanvasRight} onHide={handleClose} placement="end" className="custom-offcanvas">
        <Offcanvas.Header closeButton className="offcanvas-header-new">
          <Offcanvas.Title className="offcanvas-title-new">Freight Monitoring</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleItemClick} className="nav-link-new">
              <FaHome /> Home
            </Nav.Link>

            <Dropdown className="mt-3">
              <Dropdown.Toggle variant="link" id="dropdown-others" className="dropdown-toggle-new nav-link-new no-underline">
                <FaEllipsisV /> Business Settings
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-new">
                
                <Dropdown.Item onClick={handleAddCocoaPriceClick} className="dropdown-item-new">
                  <FaMoneyBillWave /> Update Cocoa Price Per Bag
                </Dropdown.Item>
                <Dropdown.Item onClick={handleUpdateWeightClick} className="dropdown-item-new">
                  <FaBalanceScale /> Update Standard Weight Per Bag
                </Dropdown.Item>
                <Dropdown.Item onClick={handleAddCommissionClick} className="dropdown-item-new">
                  <FaDollarSign /> Update PE Driver's Commission
                </Dropdown.Item>
                <Dropdown.Item onClick={handleAddExpenseCategoryClick} className="dropdown-item-new">
                  <FaClipboardList /> Add Expense Category
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mt-3">
              <Dropdown.Toggle variant="link" id="dropdown-vehicles" className="dropdown-toggle-new nav-link-new no-underline">
                <FaTruck /> Vehicle's
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-new">
                <Dropdown.Item as={Link} to="/vehicle-list" onClick={handleItemClick} className="dropdown-item-new">
                  Vehicle List
                </Dropdown.Item>
                <Dropdown.Item onClick={handleAddVehicleClick} className="dropdown-item-new">
                  Add Vehicle
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mt-3">
              <Dropdown.Toggle variant="link" id="dropdown-hr" className="dropdown-toggle-new nav-link-new no-underline">
                <FaUsers /> Human Resource
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-new">
                <Dropdown.Item onClick={handleAddEmployeeClick} className="dropdown-item-new">
                  Register New Employee
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/employee-list" onClick={handleItemClick} className="dropdown-item-new">
                  Employee List
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/payrolls" onClick={handleItemClick} className="dropdown-item-new">
                  View PayRoll
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleItemClick} className="nav-link-new">
                  <FaUser /> <span>{currentUser.userName}</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/sign-out" onClick={handleItemClick} className="nav-link-new">
                  <FaSignOutAlt /> Sign Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/sign-in" onClick={handleItemClick} className="nav-link-new">
                <FaSignInAlt /> Sign In
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modals */}
      <NewExpenseCategoryModal show={showExpenseCategoryModal} handleClose={handleExpenseCategoryModalClose} />
      <SignUpModal show={showSignUpModal} handleClose={handleSignUpModalClose} />
      {showRegisterVehicleModal && (
        <RegisterVehicleModal 
          show={showRegisterVehicleModal}
          onClose={handleRegisterVehicleModalClose}
        />
      )}
      {showCocoaPriceModal && (
        <AddCocoaPriceModal 
          show={showCocoaPriceModal}
          handleClose={handleCocoaPriceModalClose}
        />
      )}
      {showWeightModal && (
        <NewWeightModal
          show={showWeightModal}
          onClose={handleWeightModalClose}
        />
      )}
      {showCommissionModal && (
        <PEDriversCommissionModal
          show={showCommissionModal}
          onClose={handleCommissionModalClose}
          onSave={() => {
            console.log("Driver's commission recorded");
          }}
        />
      )}
    </>
  );
};

export default OffcanvasMenu;
