import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaMoneyBillWave, FaCalendarAlt, FaStickyNote, FaTruck } from 'react-icons/fa';
import Select from 'react-select';

const AddOtherTripExpenseModal = ({ show, handleClose, handleSave }) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    vehicle: '',
    category: '',
    amount: '',
    currency: 'Ghc',
    dateOfExpense: today,
    recordedBy: currentUser ? currentUser.userName : '',
    notes: '',
  });

  const [vehicles, setVehicles] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        recordedBy: currentUser.userName,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (show) {
      fetchVehicles();
      fetchCategories();
    }
  }, [show]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicle');
      if (response.ok) {
        const data = await response.json();
        const vehicleOptions = data.map((vehicle) => ({
          value: vehicle._id,
          label: vehicle.registrationNumber,
        }));
        setVehicles(vehicleOptions);
        if (vehicleOptions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            vehicle: vehicleOptions[0].value,
          }));
        }
      } else {
        console.error('Failed to fetch vehicles');
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/all-expense-categories');
      if (response.ok) {
        const data = await response.json();
        const categoryOptions = data.map((category) => ({
          value: category._id,
          label: category.name,
        }));
        setCategories(categoryOptions);
        if (categoryOptions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: categoryOptions.find((cat) => cat.label === 'Fuel')?.value || categoryOptions[0].value,
          }));
        }
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/other-trip-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Other trip expense recorded successfully!');
        handleSave(formData);
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding other trip expense:', error);
      alert('Failed to add other trip expense. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Other Trip Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="vehicle">
                <Form.Label>Vehicle</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaTruck />
                  </InputGroup.Text>
                  <Select
                    options={vehicles}
                    name="vehicle"
                    value={vehicles.find((v) => v.value === formData.vehicle) || ''}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'vehicle' })}
                    placeholder="Select vehicle"
                    isClearable
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="category">
                <Form.Label>Expense Category</Form.Label>
                <Select
                  options={categories}
                  name="category"
                  value={categories.find((cat) => cat.value === formData.category) || ''}
                  onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'category' })}
                  placeholder="Select category"
                  isClearable
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
            <Form.Group controlId="amount">
  <Form.Label>Amount</Form.Label>
  <InputGroup>
    <InputGroup.Text>
      <FaMoneyBillWave />
    </InputGroup.Text>
    <Form.Control
      type="number"
      name="amount"
      value={formData.amount}
      onChange={handleChange}
      min="0"
      placeholder="Enter amount"
      required
      style={{ backgroundColor: 'yellow' }} // Custom background color
    />
  </InputGroup>
</Form.Group>

            </Col>
            <Col md={6}>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <option value="Ghc">Ghc</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="dateOfExpense">
                <Form.Label>Date of Expense</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dateOfExpense"
                    value={formData.dateOfExpense}
                    onChange={handleChange}
                    required
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
                    rows={1}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional notes"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddOtherTripExpenseModal;
