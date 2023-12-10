import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap'; // Add Input to the import
import Select from 'react-select'; // Import react-select
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
    category: null, // Use null for react-select
    vehicleRegistrationNumber: '',
    tripNumber: '',
    amount: '',
    description: '',
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'paid',
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
          setTripNumbers(data.map((trip) => ({ label: trip.tripNumber, value: trip.tripNumber })));
        } else if (data.otherTrips && Array.isArray(data.otherTrips)) {
          setTripNumbers(data.otherTrips.map((trip) => ({ label: trip.tripNumber, value: trip.tripNumber })));
        } else {
          console.error('Invalid response from /api/other-trips');
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption,
    });
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert the selectedOption to the string value
    const formDataToSend = {
      ...formData,
      category: formData.category ? formData.category.value : null,
      tripNumber: formData.tripNumber ? formData.tripNumber.value : null,
    };
  
    fetch('/api/ot-expenditure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          setSuccess('Expenditure recorded successfully');
          setError('');
          navigate('/other-trip-main');
        } else {
          setError('Failed to record expenditure');
          setSuccess('');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Server Error');
        setSuccess('');
      });
  };
  


  return (
    <Container>
      <h2 className="text-white">Record Other Trip Expenditure</h2>
      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
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
              <Select
  options={categories.map((category) => ({
    label: category.name,
    value: category.name,
  }))}
  value={formData.category}
  onChange={handleCategoryChange}
  isSearchable
  placeholder="Search or select category"
/>
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
      <Select
        options={tripNumbers}
        value={formData.tripNumber}
        onChange={(selectedOption) => setFormData({ ...formData, tripNumber: selectedOption })}
        isSearchable
        placeholder="Search or select Trip Number"
      />
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
              <Input type="select" name="status" onChange={handleChange} defaultValue="paid">
                <option value="paid">Paid</option>
                <option value="pending payment">Pending Payment</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">Submit</Button>
      </Form>
    
    </Container>
  );
};

export default OTExpenditure;
