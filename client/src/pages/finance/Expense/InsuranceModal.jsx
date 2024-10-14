import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const AddInsuranceModal = ({ show, handleClose, handleSave }) => {
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux
  const [vehicles, setVehicles] = useState([]); // State to store vehicle options
  const [formData, setFormData] = useState({
    vehicle: '',
    insuranceCompany: '',
    policyNumber: '',
    startDate: '',
    endDate: '',
    premiumAmount: '',
    coverageDetails: '',
    recordedBy: currentUser ? currentUser.userName : '', // Automatically set recordedBy
  });

  // Fetch vehicles when the modal is shown
  useEffect(() => {
    if (show) {
      fetchVehicles();
    }
  }, [show]);

  // Fetch vehicles from the API
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

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Select change
  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      vehicle: selectedOption ? selectedOption.value : '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Insurance record created successfully!');
        handleSave(data);
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting insurance form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Insurance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="vehicle">
                <Form.Label>Vehicle</Form.Label>
                <Select
                  options={vehicles}
                  value={vehicles.find((v) => v.value === formData.vehicle)}
                  onChange={handleSelectChange}
                  placeholder="Select Vehicle"
                  isClearable
                  isSearchable
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="insuranceCompany">
                <Form.Label>Insurance Company</Form.Label>
                <Form.Control
                  type="text"
                  name="insuranceCompany"
                  value={formData.insuranceCompany}
                  onChange={handleChange}
                  placeholder="Enter Insurance Company"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="policyNumber">
                <Form.Label>Policy Number</Form.Label>
                <Form.Control
                  type="text"
                  name="policyNumber"
                  value={formData.policyNumber}
                  onChange={handleChange}
                  placeholder="Enter Policy Number"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="premiumAmount">
                <Form.Label>Premium Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text>Ghc</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="premiumAmount"
                    value={formData.premiumAmount}
                    onChange={handleChange}
                    placeholder="Enter Premium Amount"
                    required
                    min="0"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="coverageDetails">
                <Form.Label>Coverage Details</Form.Label>
                <Form.Control
                  type="text"
                  name="coverageDetails"
                  value={formData.coverageDetails}
                  onChange={handleChange}
                  placeholder="Comprehensive or Third Party"
                />
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

export default AddInsuranceModal;
