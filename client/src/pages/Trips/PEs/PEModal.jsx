import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import {
  FaCalendarAlt, FaTruck, FaUser, FaMapMarkerAlt, FaWeightHanging, FaGasPump, FaBalanceScale
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AddPrimaryEvacuationExpenseModal from '../../finance/Expense/PeExpenseModal';

const AddPrimaryEvacuationModal = ({ show, handleClose, handleSave }) => {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [formData, setFormData] = useState({
    cocoaPricePerBag: '',
    vehicle: '',
    driver: '',
    overallWeight: '',
    standardWeightPerBag: '', // New field for standard weight per bag
    dateOfEvacuation: today,
    evacuationLocation: 'Asikuma-Odoben-Ajumako General Area',
    notes: `Haulage of cocoa weighing on ${new Date(today).toLocaleDateString('en-GB', {
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
  const [showFuelModal, setShowFuelModal] = useState(false); // To show fuel modal

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
            // Sort prices by createdAt (most recent first)
            const sortedPrices = prices.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
      } catch (error) {
        console.error('Error fetching cocoa prices:', error);
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

        // Fetch Standard Weight Per Bag
        const weightResponse = await fetch('/api/weight');
        if (weightResponse.ok) {
          const weightData = await weightResponse.json();
          const weights = Array.isArray(weightData) ? weightData : weightData.data;
          if (weights && weights.length > 0) {
            const latestWeight = weights[0].weight;
            setFormData((prev) => ({
              ...prev,
              standardWeightPerBag: latestWeight,
            }));
          } else {
            alert('No standard weight per bag record found. Please update the standard weight.');
          }
        } else {
          throw new Error('Failed to fetch standard weight');
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update notes when overallWeight or dateOfEvacuation changes
    if (name === 'overallWeight' || name === 'dateOfEvacuation') {
      setFormData((prev) => ({
        ...prev,
        notes: `Haulage of cocoa weighing ${name === 'overallWeight' ? value : prev.overallWeight} kg on ${new Date(
          prev.dateOfEvacuation || today
        ).toLocaleDateString('en-GB', {
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
    <>
      <Modal show={show} onHide={handleClose} animation={true} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New Primary Evacuation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Form fields */}
            <Row className="mb-3">
              <p>
                <Button
                  variant="link"
                  onClick={() => setShowFuelModal(true)}
                  style={{
                    textDecoration: 'none',
                    color: 'red',
                    fontWeight: 'bold',
                    animation: 'blinkingText 1.5s infinite, scalePulse 1.5s infinite',
                  }}
                >
                  <FaGasPump style={{ marginRight: '5px' }} />
                  Click here to record Fuel Purchase Before Proceeding.
                </Button>
              </p>
              <Col md={6}>
                <Form.Group controlId="cocoaPricePerBag">
                  <Form.Label>Cocoa Price Per Bag</Form.Label>
                  <Form.Control
                    as="select"
                    name="cocoaPricePerBag"
                    value={formData.cocoaPricePerBag}
                    onChange={handleChange}
                    readOnly
                  >
                    <option value="">Select Cocoa Price</option>
                    {cocoaPrices.map((price) => (
                      <option key={price._id} value={price._id}>
                        {`${price.currency}${price.pricePerBagAfterTax}`}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              {/* New Standard Weight Per Bag Field */}
              <Col md={6}>
                <Form.Group controlId="standardWeightPerBag">
                  <Form.Label>Standard Weight Per Bag (kg)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaBalanceScale />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="standardWeightPerBag"
                      value={formData.standardWeightPerBag}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
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
                      readOnly
                      disabled
                    >
                      <option value="">Select Vehicle</option>
                      {vehicles.map((vehicle) => (
                        <option key={vehicle._id} value={vehicle._id}>
                          {vehicle.registrationNumber}
                        </option>
                      ))}
                    </Form.Control>
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
                    <Form.Control
                      as="select"
                      name="driver"
                      value={formData.driver}
                      onChange={handleChange}
                      readOnly
                      disabled
                    >
                      <option value="">Select Driver</option>
                      {drivers.map((driver) => (
                        <option key={driver._id} value={driver._id}>
                          {`${driver.firstName} ${driver.lastName}`}
                        </option>
                      ))}
                    </Form.Control>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="overallWeight">
                  <Form.Label>Overall Weight (kg)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaWeightHanging />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="overallWeight"
                      value={formData.overallWeight}
                      onChange={handleChange}
                      placeholder="Enter overall weight in kg"
                      required
                      style={{ backgroundColor: 'yellow' }}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

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
                      
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
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
                      readOnly
                      disabled
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
                  readOnly
                  disabled
                />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Fuel Modal */}
      <AddPrimaryEvacuationExpenseModal
        show={showFuelModal}
        handleClose={() => setShowFuelModal(false)}
        handleSave={() => setShowFuelModal(false)}
      />

      {/* Inline CSS for blinking text and scaling animation */}
      <style type="text/css">
        {`
        @keyframes blinkingText {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @keyframes scalePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        `}
      </style>
    </>
  );
};

export default AddPrimaryEvacuationModal;
