import React, { useState } from 'react';
import { Card, OverlayTrigger, Tooltip, Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaMinusCircle, FaCar } from 'react-icons/fa';
import AddRoadworthyModal from '../finance/Expense/RoadWorthyModal';
import AddInsuranceModal from '../finance/Expense/InsuranceModal';

const ExpenseCard = ({ handleShow }) => {
  const [showRoadworthyModal, setShowRoadworthyModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showVehicleComplianceModal, setShowVehicleComplianceModal] = useState(false); // To show the selection modal
  const [selectedOption, setSelectedOption] = useState(''); // State to track selected radio option

  // Handle Roadworthy Modal
  const handleShowRoadworthyModal = () => setShowRoadworthyModal(true);
  const handleCloseRoadworthyModal = () => setShowRoadworthyModal(false);

  // Handle Insurance Modal
  const handleShowInsuranceModal = () => setShowInsuranceModal(true);
  const handleCloseInsuranceModal = () => setShowInsuranceModal(false);

  // Handle Vehicle Compliance Selection Modal
  const handleShowVehicleComplianceModal = () => setShowVehicleComplianceModal(true);
  const handleCloseVehicleComplianceModal = () => setShowVehicleComplianceModal(false);

  const handleProceed = () => {
    if (selectedOption === 'roadworthy') {
      handleCloseVehicleComplianceModal(); // Close selection modal
      handleShowRoadworthyModal(); // Show Roadworthy modal
    } else if (selectedOption === 'insurance') {
      handleCloseVehicleComplianceModal(); // Close selection modal
      handleShowInsuranceModal(); // Show Insurance modal
    }
  };

  return (
    <Card className="custom-card add-expense-card" style={{ cursor: 'pointer', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Expenditures Icon with Tooltip */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="expenditures-tooltip">Expenditures</Tooltip>}
        >
          <FaMinusCircle className="icon-large" style={{ marginRight: '15px', cursor: 'pointer' }} onClick={handleShow} />
        </OverlayTrigger>

        {/* Vehicle Compliance Fees Icon with Tooltip */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="vehicle-compliance-tooltip">Vehicle Compliance Fees</Tooltip>}
        >
          <FaCar
            className="icon-large"
            style={{ cursor: 'pointer' }}
            onClick={handleShowVehicleComplianceModal} // Show selection modal on click
          />
        </OverlayTrigger>
      </div>

      {/* Card Title */}
      <Card.Title>Expenses</Card.Title>

      {/* Vehicle Compliance Selection Modal */}
      <Modal
  show={showVehicleComplianceModal}
  onHide={handleCloseVehicleComplianceModal}
  centered
  dialogClassName="custom-vehicle-compliance-modal" // Custom class for modal size
>
  <Modal.Header closeButton>
    <Modal.Title>Select Vehicle Compliance Type</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group as={Row} style={{ justifyContent: 'center' }}>
        <Col xs="auto">
          <Form.Check
            type="radio"
            label={
              <span style={{ color: '#007bff' }}>Roadworthy</span> // Blue color for Roadworthy
            }
            name="vehicleCompliance"
            id="roadworthy"
            value="roadworthy"
            checked={selectedOption === 'roadworthy'}
            onChange={() => setSelectedOption('roadworthy')}
            style={{ marginBottom: '10px', cursor: 'pointer' }}
          />
        </Col>
        <Col xs="auto">
          <Form.Check
            type="radio"
            label={
              <span style={{ color: '#28a745' }}>Insurance</span> // Green color for Insurance
            }
            name="vehicleCompliance"
            id="insurance"
            value="insurance"
            checked={selectedOption === 'insurance'}
            onChange={() => setSelectedOption('insurance')}
            style={{ cursor: 'pointer' }}
          />
        </Col>
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseVehicleComplianceModal}>
      Close
    </Button>
    <Button
      variant="primary"
      onClick={handleProceed}
      disabled={!selectedOption} // Disable button if no option is selected
    >
      Proceed
    </Button>
  </Modal.Footer>
</Modal>


      {/* Roadworthy Modal */}
      <AddRoadworthyModal
        show={showRoadworthyModal}
        handleClose={handleCloseRoadworthyModal}
        handleSave={(data) => console.log('Roadworthy record saved:', data)}
      />

      {/* Insurance Modal */}
      <AddInsuranceModal
        show={showInsuranceModal}
        handleClose={handleCloseInsuranceModal}
        handleSave={(data) => console.log('Insurance record saved:', data)}
      />
    </Card>
  );
};

export default ExpenseCard;
