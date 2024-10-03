import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaCalendarAlt, FaTruck, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AddPrimaryEvacuationModal = ({ show, handleClose, handleSave }) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    cocoaPricePerBag: '',
    vehicle: '',
    driver: '',
    numberOfBags: '', // Set default number of bags to 10
    dateOfEvacuation: today,
    evacuationLocation: 'Asikuma-Odoben-Ajumako General Area',
    notes: `Haulage of 10 Cocoa Bags on ${new Date(today).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })}`,
    recordedBy: '',
  });

  const [cocoaPrices, setCocoaPrices] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        recordedBy: currentUser.userName,
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Cocoa Prices
        const cocoaPricesResponse = await fetch('/api/cocoa-prices');
        if (cocoaPricesResponse.ok) {
          const cocoaPricesData = await cocoaPricesResponse.json();
          const prices = Array.isArray(cocoaPricesData) ? cocoaPricesData : cocoaPricesData.data;
          if (Array.isArray(prices)) {
            const sortedPrices = prices.sort((a, b) => new Date(b.date) - new Date(a.date));
            setCocoaPrices(sortedPrices);
            if (sortedPrices.length > 0) {
              setFormData((prev) => ({
                ...prev,
                cocoaPricePerBag: sortedPrices[0]._id,
              }));
            }
          }
        } else {
          throw new Error('Failed to fetch cocoa prices');
        }

        // Fetch Vehicles
        const vehiclesResponse = await fetch('/api/vehicle');
        if (vehiclesResponse.ok) {
          const vehiclesData = await vehiclesResponse.json();
          const vehiclesList = Array.isArray(vehiclesData) ? vehiclesData : vehiclesData.data;
          setVehicles(vehiclesList);
          if (vehiclesList.length > 0) {
            setFormData((prev) => ({
              ...prev,
              vehicle: vehiclesList[0]._id,
            }));
          }
        } else {
          throw new Error('Failed to fetch vehicles');
        }

        // Fetch Drivers
        const driversResponse = await fetch('/api/employee');
        if (driversResponse.ok) {
          const driversData = await driversResponse.json();
          const driversList = Array.isArray(driversData) ? driversData : driversData.data;
          setDrivers(driversList);
          if (driversList.length > 0) {
            setFormData((prev) => ({
              ...prev,
              driver: driversList[0]._id,
            }));
          }
        } else {
          throw new Error('Failed to fetch drivers');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the formData
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update notes when numberOfBags or dateOfEvacuation changes
    if (name === 'numberOfBags' || name === 'dateOfEvacuation') {
      setFormData((prev) => ({
        ...prev,
        notes: `Haulage of ${name === 'numberOfBags' ? value : prev.numberOfBags} Cocoa Bags on ${new Date(prev.dateOfEvacuation || today).toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/primary-evacuation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Primary evacuation added successfully!');
        handleSave(formData);
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error adding primary evacuation:', error);
      alert('Failed to add primary evacuation. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={true} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Add New Primary Evacuation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="cocoaPricePerBag">
                <Form.Label>Cocoa Price Per Bag</Form.Label>
                <Form.Control
                  as="select"
                  name="cocoaPricePerBag"
                  value={formData.cocoaPricePerBag}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Cocoa Price</option>
                  {Array.isArray(cocoaPrices) &&
                    cocoaPrices.map((price) => (
                      <option key={price._id} value={price._id}>
                        {`${price.currency}${price.pricePerBagAfterTax} `}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="vehicle">
                <Form.Label>Vehicle</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaTruck />
                  </InputGroup.Text>
                  <Form.Control
                    as="select"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Vehicle</option>
                    {Array.isArray(vehicles) &&
                      vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.registrationNumber}
                        </option>
                      ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="driver">
                <Form.Label>Driver</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    as="select"
                    name="driver"
                    value={formData.driver}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Driver</option>
                    {Array.isArray(drivers) &&
                      drivers.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                          {`${driver.firstName} ${driver.lastName}`}
                        </option>
                      ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="numberOfBags">
                <Form.Label>Number of Bags</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="numberOfBags"
                    value={formData.numberOfBags}
                    onChange={handleChange}
                    min="1"
                    placeholder="Enter number of bags"
                    required
                    style={{
                      backgroundColor: 'yellow',
                      transition: 'background-color 0.5s ease-in-out',
                    }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="dateOfEvacuation">
                <Form.Label>Date of Evacuation</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaCalendarAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    name="dateOfEvacuation"
                    value={formData.dateOfEvacuation}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="evacuationLocation">
                <Form.Label>Evacuation Location</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="evacuationLocation"
                    value={formData.evacuationLocation}
                    onChange={handleChange}
                    placeholder="Enter evacuation location"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="notes" className="mb-3">
            <Form.Label>Notes</Form.Label>
            <InputGroup>
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

          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
      
    </Modal>
  );
};

export default AddPrimaryEvacuationModal;
