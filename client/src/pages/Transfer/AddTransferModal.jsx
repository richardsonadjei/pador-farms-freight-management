import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaTruck, FaUser, FaMoneyBillWave, FaDollarSign, FaPhone, FaStickyNote, FaUserCircle } from 'react-icons/fa';

const RecordTransferModal = ({ show, handleClose, handleSave }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    vehicle: '',
    recipient: '',
    amount: '',
    paymentMethod: 'Cash', // Default to Cash
    momoNumber: '',
    notes: '',
    recordedBy: currentUser ? currentUser.userName : '', // Assuming this will be set by current user context
  });

  const [vehicles, setVehicles] = useState([]);
  const [partners, setPartners] = useState([]);

  // Fetch vehicles when modal is shown
  useEffect(() => {
    if (show) {
      const fetchVehicles = async () => {
        try {
          const vehiclesResponse = await fetch('/api/vehicle');
          if (vehiclesResponse.ok) {
            const vehiclesData = await vehiclesResponse.json();
            const vehicleList = Array.isArray(vehiclesData) ? vehiclesData : vehiclesData.data || [];
            setVehicles(vehicleList);
            if (vehicleList.length > 0) {
              // Set the first vehicle as default
              setFormData((prev) => ({
                ...prev,
                vehicle: vehicleList[0]._id,
              }));
            }
          } else {
            throw new Error('Failed to fetch vehicles');
          }
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      };

      const fetchPartners = async () => {
        try {
          const partnersResponse = await fetch('/api/partners');
          if (partnersResponse.ok) {
            const partnersData = await partnersResponse.json();
            setPartners(Array.isArray(partnersData) ? partnersData : partnersData.data || []);
          } else {
            throw new Error('Failed to fetch partners');
          }
        } catch (error) {
          console.error('Error fetching partners:', error);
        }
      };

      fetchVehicles();
      fetchPartners();
    }
  }, [show]);

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
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Transfer recorded successfully!');
        handleSave(data);
        handleClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error recording transfer:', error);
      alert('Failed to record transfer. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" animation={true}>
      <Modal.Header closeButton>
        <Modal.Title>Record Transfer</Modal.Title>
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
                  <Form.Control
                    as="select"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    disabled
                    required
                  >
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
              <Form.Group controlId="recipient">
                <Form.Label>Recipient (Partner)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    as="select"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Recipient</option>
                    {partners.map((partner) => (
                      <option key={partner._id} value={partner._id}>
                        {partner.name}
                      </option>
                    ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    Ghc{/* <FaDollarSign /> */}
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="0"
                    placeholder="Enter amount"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="paymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMoneyBillWave />
                  </InputGroup.Text>
                  <Form.Control
                    as="select"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Momo">Momo</option>
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
            {formData.paymentMethod === 'Momo' && (
              <Col md={4}>
                <Form.Group controlId="momoNumber">
                  <Form.Label>Momo Number</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="momoNumber"
                      value={formData.momoNumber}
                      onChange={handleChange}
                      placeholder="Enter Momo number"
                      required={formData.paymentMethod === 'Momo'}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            )}
          </Row>

         

          <Form.Group controlId="notes" className="mb-3">
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
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="recordedBy">
                <Form.Label>Recorded By</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUserCircle />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="recordedBy"
                    value={formData.recordedBy}
                    onChange={handleChange}
                    disabled
                    required
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

export default RecordTransferModal;
