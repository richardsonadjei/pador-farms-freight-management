import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OTExpenditure = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [vehicleRegistrationNumbers, setVehicleRegistrationNumbers] = useState([]);
  const [tripNumbers, setTripNumbers] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    vehicleRegistrationNumber: '',
    tripNumber: '',
    amount: '', // Include the amount field
    description: '',
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'pending payment', // Set default status to 'pending payment'
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch expenditure categories
    fetch('/api/expenditure-categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));

    // Fetch vehicle registration numbers
    fetch('/api/all-vehicles')
      .then((response) => response.json())
      .then((data) => {
        if (data.vehicles && Array.isArray(data.vehicles)) {
          setVehicleRegistrationNumbers(data.vehicles);
        } else {
          console.error('Invalid response from /api/vehicles');
        }
      })
      .catch((error) => console.error(error));

    fetch('/api/other-trips')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // If it's an array, directly map the trip numbers
          setTripNumbers(data.map((trip) => trip.tripNumber));
        } else if (data.otherTrips && Array.isArray(data.otherTrips)) {
          // If it's an object with an 'otherTrips' property, map the trip numbers from that array
          setTripNumbers(data.otherTrips.map((trip) => trip.tripNumber));
        } else {
          console.error('Invalid response from /api/other-trips');
        }
      })
      .catch((error) => console.error(error));

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/ot-expenditure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data._id) { // Check if the response contains the _id property
          setSuccess('Expenditure recorded successfully');
          setError(''); // Clear any previous errors
          navigate('/dashboard');
        } else {
          setError('Failed to record expenditure');
          setSuccess(''); // Clear any previous success message
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Server Error');
        setSuccess(''); // Clear any previous success message
      });
  };

  return (
    <Container>
      <h2 className="text-white">Record Other Trip Expenditure</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Date</Label>
              <Input type="date" name="date" onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Category</Label>
              <Input type="select" name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Vehicle Registration Number</Label>
              <Input
                type="select"
                name="vehicleRegistrationNumber"
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle Registration Number</option>
                {vehicleRegistrationNumbers.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle.registrationNumber}>
                    {vehicle.registrationNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Trip Number</Label>
              <Input
                type="select"
                name="tripNumber"
                onChange={handleChange}
                required
              >
                <option value="">Select Trip Number</option>
                {tripNumbers.map((tripNumber) => (
                  <option key={tripNumber} value={tripNumber}>
                    {tripNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Amount</Label>
              <Input type="number" name="amount" onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Description</Label>
              <Input type="textarea" name="description" onChange={handleChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Recorded By</Label>
              <Input type="text" name="recordedBy" value={currentUser ? currentUser.userName : ''} readOnly />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Status</Label>
              <Input type="select" name="status" onChange={handleChange} defaultValue="pending payment">
                <option value="paid">Paid</option>
                <option value="pending payment">Pending Payment</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">Submit</Button>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
    </Container>
  );
};

export default OTExpenditure;
