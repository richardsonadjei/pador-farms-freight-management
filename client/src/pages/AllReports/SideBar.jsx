import React, { useState, useEffect } from 'react';
import { Nav, Offcanvas, Modal, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaDollarSign, FaChartPie } from 'react-icons/fa';

const ReportsHomeSidebar = ({ setSelectedDashboard }) => {
  const [vehicles, setVehicles] = useState([]); // State to store all vehicles
  const [selectedVehicleId, setSelectedVehicleId] = useState(''); // State to store the selected vehicle ID
  const [registrationNumber, setRegistrationNumber] = useState(''); // State to store the registration number
  const [show, setShow] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [reportType, setReportType] = useState('all'); // State for radio button selection

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all vehicles
    const fetchVehicles = async () => {
      try {
        const response = await fetch('/api/vehicle');
        if (!response.ok) {
          console.error('Error fetching vehicles:', response.status);
          return;
        }

        const data = await response.json();
        if (data.length > 0) {
          setVehicles(data);
          setSelectedVehicleId(data[0]._id); // Set the first vehicle as the default
          setRegistrationNumber(data[0].registrationNumber); // Set the registration number of the first vehicle
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (selectedVehicleId) {
      setShow(true);
    } else {
      alert('No vehicles available.');
    }
  };

  const handleIncomeModalClose = () => setShowIncomeModal(false);
  const handleIncomeModalShow = () => {
    if (selectedVehicleId) {
      setShowIncomeModal(true);
    } else {
      alert('No vehicles available.');
    }
  };

  const handleExpenseModalClose = () => setShowExpenseModal(false);
  const handleExpenseModalShow = () => {
    if (selectedVehicleId) {
      setShowExpenseModal(true);
    } else {
      alert('No vehicles available.');
    }
  };

  const handleIncomeReportSelection = () => {
    setShowIncomeModal(false);
    if (reportType === 'all') {
      navigate(`/all-vehicle-income`);
    } else if (reportType === 'period') {
      navigate(`/all-vehicle-income-by-period`);
    }
  };

  const handleExpenseReportSelection = () => {
    setShowExpenseModal(false);
    if (reportType === 'all') {
      navigate(`/all-vehicle-expense`);
    } else if (reportType === 'period') {
      navigate(`/all-vehicle-expense-by-period`);
    }
  };

  return (
    <>
      {/* Sidebar Toggle Icon */}
      <div style={{ position: 'fixed', top: '65px', left: '20px', zIndex: 1040 }}>
        <FaBars
          onClick={handleShow}
          style={{
            color: 'red',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        />
      </div>

      {/* Offcanvas Sidebar */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="custom-offcanvas"
        style={{
          backgroundColor: '#242526',
          color: 'white',
          transition: 'transform 0.5s ease-in-out',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: 'yellow', fontWeight: 'bold' }}>
            Reports for {registrationNumber ? `Vehicle: ${registrationNumber}` : 'N/A'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ padding: '10px', animation: 'fadeIn 1s ease-in-out' }}>
          <Nav defaultActiveKey="/cash-crop" className="flex-column custom-nav-links">
            <Nav.Link
              as="button"
              onClick={handleExpenseModalShow}
              className="custom-nav-link"
              style={{
                color: 'white',
                marginBottom: '5px',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#495057')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <FaChartPie style={{ marginRight: '10px' }} /> Expense By Category
            </Nav.Link>
            <Nav.Link
              as="button"
              onClick={handleIncomeModalShow}
              className="custom-nav-link"
              style={{
                color: 'white',
                borderRadius: '5px',
                transition: 'background-color 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#495057')}
              onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
            >
              <FaDollarSign style={{ marginRight: '10px' }} /> Income 
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal for Selecting Expense Report Type */}
      <Modal show={showExpenseModal} onHide={handleExpenseModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Expense Report Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              label="View All Expense Reports"
              name="reportType"
              value="all"
              checked={reportType === 'all'}
              onChange={(e) => setReportType(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="View Expense Within a Particular Period"
              name="reportType"
              value="period"
              checked={reportType === 'period'}
              onChange={(e) => setReportType(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExpenseModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleExpenseReportSelection}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Selecting Income Report Type */}
      <Modal show={showIncomeModal} onHide={handleIncomeModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select Income Report Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check
              type="radio"
              label="View All Income Reports"
              name="reportType"
              value="all"
              checked={reportType === 'all'}
              onChange={(e) => setReportType(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="View Income Within a Particular Period"
              name="reportType"
              value="period"
              checked={reportType === 'period'}
              onChange={(e) => setReportType(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleIncomeModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleIncomeReportSelection}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReportsHomeSidebar;
