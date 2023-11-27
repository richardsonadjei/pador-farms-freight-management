import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecordPEexpenditure = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // Assuming you have a 'user' slice in your Redux store
  const [categories, setCategories] = useState([]);
  const [peNumbers, setPENumbers] = useState([]);
  const [truckRegistrationNumbers, setTruckRegistrationNumbers] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    peNumber: '',
    truckRegistrationNumber: '',
    expenditureAmount: '',
    description: '',
    recordedBy: currentUser ? currentUser.username : '', // Set recordedBy to current user
    status: 'pending payment', // Set default status
  });

  useEffect(() => {
    fetch('/api/expenditure-categories')
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch('/api/all-pe')
      .then((response) => response.json())
      .then((data) => {
        console.log('API Response (PE Numbers):', data);
        if (Array.isArray(data)) {
          setPENumbers(data);
        } else {
          console.error('Invalid response from /api/all-pe');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching PE numbers');
      });

    fetch('/api/vehicles')
      .then((response) => response.json())
      .then((data) => {
        if (data.vehicles && Array.isArray(data.vehicles)) {
          setTruckRegistrationNumbers(data.vehicles);
        } else {
          console.error('Invalid response from /api/vehicles');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching truck registration numbers');
      });
  }, [currentUser]); // Add currentUser as a dependency to the useEffect

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/pe-expenditure', {
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
          alert('Expenditure recorded successfully');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while recording expenditure');
      });
  };

  return (
    <Container>
      <h2 className="text-white">Record PE Expenditure</h2>
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
              <Label className="text-white">PE Number</Label>
              <Input type="select" name="peNumber" onChange={handleChange} required>
                <option value="">Select PE Number</option>
                {peNumbers.map((pe) => (
                  <option key={pe._id} value={pe.peNumber}>
                    {pe.peNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Truck Registration Number</Label>
              <Input
                type="select"
                name="truckRegistrationNumber"
                onChange={handleChange}
                required
              >
                <option value="">Select Truck Registration Number</option>
                {truckRegistrationNumbers.map((truck) => (
                  <option key={truck._id} value={truck.registrationNumber}>
                    {truck.registrationNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Expenditure Amount</Label>
              <Input type="number" name="expenditureAmount" onChange={handleChange} required />
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
              <Input
                type="text"
                name="recordedBy"
                onChange={handleChange}
                value={formData.recordedBy}
                readOnly
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Status</Label>
              <Input type="select" name="status" onChange={handleChange} required>
                <option value="pending payment">Pending Payment</option>
                <option value="paid">Paid</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default RecordPEexpenditure;
