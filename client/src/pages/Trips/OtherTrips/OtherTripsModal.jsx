import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { FaTruck, FaUser, FaMapMarkerAlt, FaStickyNote, FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';

const AddOtherTripModal = ({ show, handleClose, handleSave }) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    vehicle: '',
    driver: '',
    startLocation: 'Bremang-Asikuma',
    endLocation: 'Mankesim',
    dateOfTrip: today,
    purpose: `Haulage of goods from Bremang-Asikuma to Mankesim on ${new Date(today).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`,
    incomeAmount: '',
    notes: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Fetch vehicles and drivers when the modal is opened
  useEffect(() => {
    if (show) {
      fetchVehicles();
      fetchDrivers();
    }
  }, [show]);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicle');
      if (response.ok) {
        const data = await response.json();
        const vehicleOptions = Array.isArray(data) ? data : data.data;
        setVehicles(vehicleOptions.map((vehicle) => ({ value: vehicle._id, label: vehicle.registrationNumber })));
        if (vehicleOptions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            vehicle: vehicleOptions[0]._id,
          }));
        }
      } else {
        console.error('Failed to fetch vehicles');
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/employee');
      if (response.ok) {
        const data = await response.json();
        const driverOptions = Array.isArray(data) ? data : data.data;
        setDrivers(driverOptions.map((driver) => ({ value: driver._id, label: `${driver.firstName} ${driver.lastName}` })));
        if (driverOptions.length > 0) {
          setFormData((prev) => ({
            ...prev,
            driver: driverOptions[0]._id,
          }));
        }
      } else {
        console.error('Failed to fetch drivers');
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  // Update the purpose field when startLocation, endLocation, or dateOfTrip changes
  useEffect(() => {
    const newPurpose = `Haulage of goods from ${formData.startLocation} to ${formData.endLocation} on ${new Date(formData.dateOfTrip).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`;
    setFormData((prev) => ({
      ...prev,
      purpose: newPurpose,
    }));
  }, [formData.startLocation, formData.endLocation, formData.dateOfTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData
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
      const response = await fetch('/api/other-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Trip and income recorded successfully!');
        handleSave();
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding other trip:', error);
      alert('Failed to add other trip. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Record Other Trip and Income</Modal.Title>
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
              <Form.Group controlId="driver">
                <Form.Label>Driver</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Select
                    options={drivers}
                    name="driver"
                    value={drivers.find((d) => d.value === formData.driver) || ''}
                    onChange={(selectedOption) => handleSelectChange(selectedOption, { name: 'driver' })}
                    placeholder="Select driver"
                    isClearable
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="purpose">
                <Form.Label>Purpose</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Enter purpose of the trip"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="dateOfTrip">
                <Form.Label>Date of Trip</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dateOfTrip"
                    value={formData.dateOfTrip}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="startLocation">
                <Form.Label>Start Location</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleChange}
                    placeholder="Enter start location"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="endLocation">
                <Form.Label>End Location</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="endLocation"
                    value={formData.endLocation}
                    onChange={handleChange}
                    placeholder="Enter end location"
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="incomeAmount">
                <Form.Label>Income Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="incomeAmount"
                    value={formData.incomeAmount}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter income amount"
                    required
                    style={{
                      backgroundColor: 'yellow',
                      transition: 'background-color 0.5s ease',
                    }}
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
                    type="text"
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

export default AddOtherTripModal;
