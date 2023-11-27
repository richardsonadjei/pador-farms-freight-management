import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const RegisterVehicle = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [registrationNumber, setRegistrationNumber] = useState('');
  const [make, setMake] = useState('');
  const [chasisNumber, setChasisNumber] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [capacity, setCapacity] = useState('');
  const [yearPurchased, setYearPurchased] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [status, setStatus] = useState(''); // Default status can be set here
  const [registeredBy, setRegisteredBy] = useState(currentUser.userName);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for the POST request
    const formData = {
      registrationNumber,
      make,
      chasisNumber,
      model,
      year,
      capacity,
      yearPurchased,
      price,
      description,
      color,
      mileage,
      fuelType,
      status,
      registeredBy:currentUser ? currentUser.userName : '',
    };

    try {
      // Replace 'your-api-endpoint' with the actual API endpoint for registering a vehicle
      const response = await fetch('/api/register-vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        window.alert('Vehicle registered successfully');
        // Navigate to /fleet-management
        window.location.href = '/fleet-management';
      } else {
        // Handle error
        console.error('Failed to register vehicle:', response.statusText);
        window.alert('Failed to register vehicle. Please try again.');
      }
    } catch (error) {
      console.error('Error during vehicle registration:', error);
    }
  };

  return (
    <Container>
      <h1 style={{ color: 'white' }}>Register Vehicle</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="registrationNumber" style={{ color: 'white' }}>Registration Number</Label>
              <Input
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="make" style={{ color: 'white' }}>Make</Label>
              <Input
                type="text"
                name="make"
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="chasisNumber" style={{ color: 'white' }}>Chasis Number</Label>
              <Input
                type="text"
                name="chasisNumber"
                id="chasisNumber"
                value={chasisNumber}
                onChange={(e) => setChasisNumber(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="model" style={{ color: 'white' }}>Model</Label>
              <Input
                type="text"
                name="model"
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="year" style={{ color: 'white' }}>Make Year </Label>
              <Input
                type="number"
                name="year"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="capacity" style={{ color: 'white' }}>Capacity</Label>
              <Input
                type="number"
                name="capacity"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="yearPurchased" style={{ color: 'white' }}>Year Purchased</Label>
              <Input
                type="number"
                name="yearPurchased"
                id="yearPurchased"
                value={yearPurchased}
                onChange={(e) => setYearPurchased(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="price" style={{ color: 'white' }}>Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="description" style={{ color: 'white' }}>Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="color" style={{ color: 'white' }}>Color</Label>
              <Input
                type="text"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="mileage" style={{ color: 'white' }}>Mileage</Label>
              <Input
                type="number"
                name="mileage"
                id="mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="fuelType" style={{ color: 'white' }}>Fuel Type</Label>
              <Input
                type="text"
                name="fuelType"
                id="fuelType"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <FormGroup>
              <Label for="status" style={{ color: 'white' }}>Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Serviceable">Serviceable</option>
                <option value="Unserviceable">Unserviceable</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="registeredBy" style={{ color: 'white' }}>Registered By</Label>
              <Input
                type="text"
                name="registeredBy"
                id="registeredBy"
                value={registeredBy}
                onChange={(e) => setRegisteredBy(e.target.value)}
                readOnly
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Button color="primary" type="submit">Submit</Button>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default RegisterVehicle;