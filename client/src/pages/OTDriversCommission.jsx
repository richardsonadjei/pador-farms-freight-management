import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OTDriversCommission = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [tripNumbers, setTripNumbers] = useState([]);
  const [driverNames, setDriverNames] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    tripNumber: '',
    driverName: '',
    totalCommissionAmount: '',
    description: '',
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'pending payment', // Adjust the status based on your requirements
  });

  useEffect(() => {
    // Fetch trip numbers
    fetch('/api/other-trips')
      .then((response) => response.json())
      .then((data) => {
        console.log('Other Trips Response:', data); // Log the response for debugging
  
        if (Array.isArray(data.otherTrips)) {
          setTripNumbers(data.otherTrips);
        } else {
          console.error('Invalid response from /api/other-trips');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching other trips');
      });
  
    // Fetch driver names
    fetch('/api/all-drivers')
      .then((response) => response.json())
      .then((data) => {
        // Check if data has the 'drivers' property
        if (Array.isArray(data.drivers)) {
          setDriverNames(data.drivers.map((driver) => `${driver.firstName} ${driver.lastName}`));
        } else {
          console.error('Invalid response from /api/all-drivers');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching driver names');
      });
  }, [currentUser]);
  
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/ot-driver-commissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          alert('OT Driver Commission recorded successfully');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while recording OT Driver Commission');
      });
  };

  return (
    <Container>
      <h2 className="text-white">Record OT Driver Commission</h2>
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
    <Label className="text-white">Trip Number</Label>
    <Input type="select" name="tripNumber" onChange={handleChange} required>
      <option value="">Select Trip Number</option>
      {tripNumbers.map((trip) => (
        <option key={trip._id} value={trip.tripNumber}>
          {trip.tripNumber}
        </option>
      ))}
    </Input>
  </FormGroup>
</Col>

        </Row>
        <Row>
        <Col md={6}>
  <FormGroup>
    <Label className="text-white">Driver Name</Label>
    <Input type="select" name="driverName" onChange={handleChange} required>
      <option value="">Select Driver Name</option>
      {driverNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Input>
  </FormGroup>
</Col>

          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Total Commission Amount</Label>
              <Input
                type="number"
                name="totalCommissionAmount"
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label className="text-white">Description</Label>
          <Input
            type="textarea"
            name="description"
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label className="text-white">Recorded By</Label>
          <Input
            type="text"
            name="recordedBy"
            value={formData.recordedBy}
            readOnly
            required
          />
        </FormGroup>
        <FormGroup>
          <Label className="text-white">Status</Label>
          <Input type="select" name="status" value={formData.status} onChange={handleChange} required>
            <option value="pending payment">Pending Payment</option>
            <option value="paid">Paid</option>
          </Input>
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default OTDriversCommission;
