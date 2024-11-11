import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaDollarSign } from 'react-icons/fa';


const PEDriversCommissionModal = ({ show, onClose, onSave }) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    date: today,
    amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pe-commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Commission recorded successfully');
        onSave(); // Call onSave to update the parent component if needed
        onClose(); // Close the modal
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error recording commission:', error);
      alert('Failed to record commission. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Record Driver's Commission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Date Field */}
          <Form.Group controlId="date" className="mb-3">
            <Form.Label>Date</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Amount Field */}
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount Per Bag</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                Ghc
              </InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter commission amount"
                min="0"
                step="0.01"
                required
              />
            </InputGroup>
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PEDriversCommissionModal;
