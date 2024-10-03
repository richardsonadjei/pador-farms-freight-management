import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import IncomeCard from './Home/Income';
import ExpenseCard from './Home/Expense';
import TransferCard from './Home/Transfer';
import TransactionCard from './Home/Transaction';
import BalanceSummary from './Home/BalanceSummary';
import RecentTransactions from './Home/RecentTransaction';
import TransferModal from './Transfer/AddTransferModal';
import AddPrimaryEvacuationModal from './Trips/PEs/PEModal';
import AddOtherTripModal from './Trips/OtherTrips/OtherTripsModal';
import AddGeneralExpenseModal from './finance/Expense/GeneralExpenseModal';
import AddOtherTripExpenseModal from './finance/Expense/OtExpenseModal';
import AddPrimaryEvacuationExpenseModal from './finance/Expense/PeExpenseModal';


const Home = () => {
  const [showExpenseSelectionModal, setShowExpenseSelectionModal] = useState(false);
  const [showPrimaryEvacuationExpenseModal, setShowPrimaryEvacuationExpenseModal] = useState(false);
  const [showOtherTripExpenseModal, setShowOtherTripExpenseModal] = useState(false);
  const [showGeneralExpenseModal, setShowGeneralExpenseModal] = useState(false);
  const [showIncomeSelectionModal, setShowIncomeSelectionModal] = useState(false);
  const [showPrimaryEvacuationModal, setShowPrimaryEvacuationModal] = useState(false);
  const [showOtherTripModal, setShowOtherTripModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedIncomeType, setSelectedIncomeType] = useState('');
  const [selectedExpenseType, setSelectedExpenseType] = useState('');

  // Handle Expense Selection Modal
  const handleCloseExpenseSelection = () => setShowExpenseSelectionModal(false);
  const handleShowExpenseSelection = () => setShowExpenseSelectionModal(true);

  // Handle Primary Evacuation Expense Modal
  const handleShowPrimaryEvacuationExpense = () => {
    setShowPrimaryEvacuationExpenseModal(true);
    handleCloseExpenseSelection();
  };
  const handleClosePrimaryEvacuationExpense = () => setShowPrimaryEvacuationExpenseModal(false);

  // Handle Other Trip Expense Modal
  const handleShowOtherTripExpense = () => {
    setShowOtherTripExpenseModal(true);
    handleCloseExpenseSelection();
  };
  const handleCloseOtherTripExpense = () => setShowOtherTripExpenseModal(false);

  // Handle General Expense Modal
  const handleShowGeneralExpense = () => {
    setShowGeneralExpenseModal(true);
    handleCloseExpenseSelection();
  };
  const handleCloseGeneralExpense = () => setShowGeneralExpenseModal(false);

  // Handle Income Selection Modal
  const handleCloseIncomeSelection = () => setShowIncomeSelectionModal(false);
  const handleShowIncomeSelection = () => setShowIncomeSelectionModal(true);

  // Handle Primary Evacuation Modal
  const handleShowPrimaryEvacuation = () => {
    setShowPrimaryEvacuationModal(true);
    handleCloseIncomeSelection();
  };
  const handleClosePrimaryEvacuation = () => setShowPrimaryEvacuationModal(false);

  // Handle Other Trip Modal
  const handleShowOtherTrip = () => {
    setShowOtherTripModal(true);
    handleCloseIncomeSelection();
  };
  const handleCloseOtherTrip = () => setShowOtherTripModal(false);

  // Handle Transfer Modal
  const handleCloseTransfer = () => setShowTransferModal(false);
  const handleShowTransfer = () => setShowTransferModal(true);

  // Save Primary Evacuation Expense
  const handleSavePrimaryEvacuationExpense = (expenseData) => {
    console.log('Saved Primary Evacuation Expense:', expenseData);
  };

  // Save Other Trip Expense
  const handleSaveOtherTripExpense = (expenseData) => {
    console.log('Saved Other Trip Expense:', expenseData);
  };

  // Save General Expense
  const handleSaveGeneralExpense = (expenseData) => {
    console.log('Saved General Expense:', expenseData);
  };

  return (
    <div className="home-container">
      <div className="button-grid">
        <Row>
          <Col xs={6} md={3}>
            <IncomeCard handleShow={handleShowIncomeSelection} />
          </Col>
          <Col xs={6} md={3}>
            <ExpenseCard handleShow={handleShowExpenseSelection} />
          </Col>
          <Col xs={6} md={3}>
            <TransferCard handleShow={handleShowTransfer} />
          </Col>
          <Col xs={6} md={3}>
            <TransactionCard />
          </Col>
        </Row>
      </div>

      <BalanceSummary />
      <RecentTransactions />

      {/* Expense Selection Modal */}
      <Modal
        show={showExpenseSelectionModal}
        onHide={handleCloseExpenseSelection}
        centered
        dialogClassName="custom-modal"
        animation
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Expense Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col xs={4}>
                <Form.Check
                  type="radio"
                  label="Primary Evacuation Expense"
                  name="expenseType"
                  value="primaryEvacuation"
                  onChange={(e) => setSelectedExpenseType(e.target.value)}
                  checked={selectedExpenseType === 'primaryEvacuation'}
                />
              </Col>
              <Col xs={4}>
                <Form.Check
                  type="radio"
                  label="Other Trip Expense"
                  name="expenseType"
                  value="otherTrip"
                  onChange={(e) => setSelectedExpenseType(e.target.value)}
                  checked={selectedExpenseType === 'otherTrip'}
                />
              </Col>
              <Col xs={4}>
                <Form.Check
                  type="radio"
                  label="General Expense"
                  name="expenseType"
                  value="generalExpense"
                  onChange={(e) => setSelectedExpenseType(e.target.value)}
                  checked={selectedExpenseType === 'generalExpense'}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExpenseSelection}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedExpenseType === 'primaryEvacuation') {
                handleShowPrimaryEvacuationExpense();
              } else if (selectedExpenseType === 'otherTrip') {
                handleShowOtherTripExpense();
              } else if (selectedExpenseType === 'generalExpense') {
                handleShowGeneralExpense();
              }
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Primary Evacuation Expense Modal */}
      <AddPrimaryEvacuationExpenseModal
        show={showPrimaryEvacuationExpenseModal}
        handleClose={handleClosePrimaryEvacuationExpense}
        handleSave={handleSavePrimaryEvacuationExpense}
      />

      {/* Other Trip Expense Modal */}
      <AddOtherTripExpenseModal
        show={showOtherTripExpenseModal}
        handleClose={handleCloseOtherTripExpense}
        handleSave={handleSaveOtherTripExpense}
      />

      {/* General Expense Modal */}
      <AddGeneralExpenseModal
        show={showGeneralExpenseModal}
        handleClose={handleCloseGeneralExpense}
        handleSave={handleSaveGeneralExpense}
      />

      {/* Income Selection Modal */}
      <Modal
        show={showIncomeSelectionModal}
        onHide={handleCloseIncomeSelection}
        centered
        dialogClassName="custom-modal"
        animation
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Income Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col xs={6}>
                <Form.Check
                  type="radio"
                  label="Primary Evacuation"
                  name="incomeType"
                  value="primaryEvacuation"
                  onChange={(e) => setSelectedIncomeType(e.target.value)}
                  checked={selectedIncomeType === 'primaryEvacuation'}
                />
              </Col>
              <Col xs={6}>
                <Form.Check
                  type="radio"
                  label="Other Trip"
                  name="incomeType"
                  value="otherTrip"
                  onChange={(e) => setSelectedIncomeType(e.target.value)}
                  checked={selectedIncomeType === 'otherTrip'}
                />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIncomeSelection}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedIncomeType === 'primaryEvacuation') {
                handleShowPrimaryEvacuation();
              } else if (selectedIncomeType === 'otherTrip') {
                handleShowOtherTrip();
              }
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Primary Evacuation Modal */}
      <AddPrimaryEvacuationModal
        show={showPrimaryEvacuationModal}
        handleClose={handleClosePrimaryEvacuation}
        handleSave={() => {}}
      />

      {/* Other Trip Modal */}
      <AddOtherTripModal
        show={showOtherTripModal}
        handleClose={handleCloseOtherTrip}
        handleSave={() => {}}
      />

      {/* Transfer Modal */}
      <TransferModal
        show={showTransferModal}
        handleClose={handleCloseTransfer}
        handleSave={() => {}}
      />
    </div>
  );
};

export default Home;
