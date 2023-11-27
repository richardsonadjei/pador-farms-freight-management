import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PE = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [truckRegistrationNumber, setTruckRegistrationNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalweightCarried, setTotalweightCarried] = useState('');
  const [destinationLocations, setDestinationLocations] = useState('');
  const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.userName : '');
  const [incomeAmountPerBag, setIncomeAmountPerBag] = useState('');
  const [category, setCategory] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);

  useEffect(() => {
    // Fetch drivers
    fetch('/api/drivers')
      .then(response => response.json())
      .then(data => setDrivers(data.drivers))
      .catch(error => console.error('Error fetching drivers:', error));

    // Fetch vehicles
    fetch('/api/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data.vehicles))
      .catch(error => console.error('Error fetching vehicles:', error));

    // Fetch income categories
    fetch('/api/income-categories')
      .then(response => response.json())
      .then(data => setIncomeCategories(data.categories))
      .catch(error => console.error('Error fetching income categories:', error));
  }, []);

  useEffect(() => {
    // Set the initial value of recordedBy once currentUser is available
    if (currentUser) {
      setRecordedBy(currentUser.userName);
    }
  }, [currentUser]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/record-pe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          driverName,
          truckRegistrationNumber,
          quantity,
          totalweightCarried,
          destinationLocations,
          recordedBy: currentUser ? currentUser.userName : '',
          incomeAmountPerBag,
          category,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
  
      alert('Cocoa haulage and income transaction created successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating cocoa haulage:', error);
      alert('An error occurred while creating the cocoa haulage. Please try again.');
    }
  };
  
  

  return (
    <Container>
      <h1 style={{ color: 'white' }}>Record PE</h1>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="date" style={{ color: 'white' }}>Date</Label>
              <Input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
              <Label for="truckRegistrationNumber" style={{ color: 'white' }}>Truck Registration Number</Label>
              {/* Use a select input to choose from available vehicles */}
              <Input
                type="select"
                id="truckRegistrationNumber"
                value={truckRegistrationNumber}
                onChange={(e) => setTruckRegistrationNumber(e.target.value)}
                required
              >
                <option value="" disabled>Select Truck</option>
                {vehicles.map(vehicle => (
                  <option key={vehicle._id} value={vehicle.registrationNumber}>{vehicle.registrationNumber}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <FormGroup>
              <Label for="driverName" style={{ color: 'white' }}>Driver Name</Label>
              {/* Use a select input to choose from available drivers */}
              <Input
                type="select"
                id="driverName"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
              >
                <option value="" disabled>Select Driver</option>
                {drivers.map(driver => (
                  <option key={driver._id} value={driver.firstName}>{driver.firstName}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="quantity" style={{ color: 'white' }}>Quantity</Label>
              <Input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="totalweightCarried" style={{ color: 'white' }}>Total Weight Carried</Label>
              <Input
                type="number"
                id="totalweightCarried"
                value={totalweightCarried}
                onChange={(e) => setTotalweightCarried(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="destinationLocations" style={{ color: 'white' }}>Destination Locations</Label>
              <Input
                type="textarea"
                id="destinationLocations"
                value={destinationLocations}
                onChange={(e) => setDestinationLocations(e.target.value)}
                style={{ height: '150px' }} 
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy" style={{ color: 'white' }}>Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={recordedBy}
                onChange={(e) => setRecordedBy(e.target.value)}
                required
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="incomeAmountPerBag" style={{ color: 'white' }}>Income Amount Per Bag</Label>
              <Input
                type="number"
                id="incomeAmountPerBag"
                value={incomeAmountPerBag}
                onChange={(e) => setIncomeAmountPerBag(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="category" style={{ color: 'white' }}>Category</Label>
              <Input
                type="select"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select Category</option>
                {incomeCategories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </Input>
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

export default PE;