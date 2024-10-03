import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaMoneyBillWave, FaBuilding, FaStickyNote, FaCoins } from 'react-icons/fa';

const AddCocoaPriceModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    date: '',
    pricePerBagBeforeTax: '',
    pricePerBagAfterTax: '',
    haulageCompany: 'Cargil Cocoa Sourcing',
    currency: 'Ghc',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/cocoa-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cocoa price added successfully!');
        handleSave();
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding cocoa price:', error);
      alert('Failed to add cocoa price. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Cocoa Price Per Bag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="date">
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
            </Col>
            <Col md={6}>
              <Form.Group controlId="pricePerBagBeforeTax">
                <Form.Label>Price Per Bag (Before Tax)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="pricePerBagBeforeTax"
                    value={formData.pricePerBagBeforeTax}
                    onChange={handleChange}
                    min="0"
                    step="0.01" // Allow decimal values
                    placeholder="Enter price per bag before tax"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="pricePerBagAfterTax">
                <Form.Label>Price Per Bag (After Tax)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="pricePerBagAfterTax"
                    value={formData.pricePerBagAfterTax}
                    onChange={handleChange}
                    min="0"
                    step="0.01" // Allow decimal values
                    placeholder="Enter price per bag after tax"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="haulageCompany">
                <Form.Label>Haulage Company</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaBuilding />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="haulageCompany"
                    value={formData.haulageCompany}
                    onChange={handleChange}
                    placeholder="Enter haulage company"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCoins />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    placeholder="Enter currency"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="notes">
                <Form.Label>Notes</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaStickyNote />
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional notes"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddCocoaPriceModal;
