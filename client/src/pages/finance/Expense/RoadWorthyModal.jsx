import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaCar, FaMoneyBillWave, FaStickyNote, FaBuilding } from 'react-icons/fa';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddRoadworthyModal = ({ show, handleClose, handleSave }) => {
  const { currentUser } = useSelector((state) => state.user);
  
  const [formData, setFormData] = useState({
    vehicle: '',
    certificateNumber: '',
    issueDate: '',
    expiryDate: '',
    renewalAmount: '',
    roadworthyCenter: '', // Added roadworthyCenter field
    details: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [vehicles, setVehicles] = useState([]);

  // Fetch available vehicles from the API when the modal is opened
  useEffect(() => {
    if (show) {
      fetchVehicles();
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
      } else {
        console.error('Failed to fetch vehicles');
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, vehicle: selectedOption ? selectedOption.value : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/roadworthy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newRoadworthy = await response.json();
        handleSave(newRoadworthy); // Call the handleSave function to handle the saved data
        handleClose(); // Close the modal after successful save
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating roadworthy record:', error);
      alert('Failed to create roadworthy record. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Roadworthy Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="vehicle">
                <Form.Label>Vehicle</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCar />
                  </InputGroup.Text>
                  <Select
                    options={vehicles}
                    value={vehicles.find((v) => v.value === formData.vehicle) || ''}
                    onChange={handleSelectChange}
                    placeholder="Select vehicle"
                    isClearable
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="certificateNumber">
                <Form.Label>Certificate Number</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleChange}
                    placeholder="Enter certificate number"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="issueDate">
                <Form.Label>Issue Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="expiryDate">
                <Form.Label>Expiry Date</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="renewalAmount">
                <Form.Label>Renewal Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="renewalAmount"
                    value={formData.renewalAmount}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter renewal amount"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="roadworthyCenter">
                <Form.Label>Roadworthy Center</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaBuilding />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="roadworthyCenter"
                    value={formData.roadworthyCenter}
                    onChange={handleChange}
                    placeholder="Enter roadworthy center"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="details">
                <Form.Label>Details</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaStickyNote />
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Enter details"
                    rows={2}
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

export default AddRoadworthyModal;
