
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OtherTrips = () => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [date, setDate] = useState('');
    const [driverName, setDriverName] = useState('');
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] = useState('');
    const [totalAmountCharged, setTotalAmountCharged] = useState('');
    const [destinationLocations, setDestinationLocations] = useState('');
    const [description, setDescription] = useState('');
    const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.userName : '');
    const [category, setCategory] = useState('');
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [vehicleRegistrationNumbers, setVehicleRegistrationNumbers] = useState([]);
    const [drivers, setDrivers] = useState([]); // Add this line to define the 'drivers' state
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
  useEffect(() => {
    fetchIncomeCategories();
    fetchVehicleRegistrationNumbers();
    fetchDrivers();
  }, []);
  
  const fetchIncomeCategories = async () => {
    try {
      const response = await fetch('/api/income-categories');
      const data = await response.json();
      if (response.ok) {
        setIncomeCategories(data.categories);
      } else {
        setError('Failed to fetch income categories');
      }
    } catch (error) {
      console.error(error);
      setError('Server Error');
    }
  };

  const fetchVehicleRegistrationNumbers = async () => {
    try {
      const response = await fetch('/api/vehicles');
      const data = await response.json();
      console.log('API Response:', data);  // Log the entire response
      if (response.ok) {
        const registrationNumbers = data.vehicles || [];
        console.log('Vehicle Registration Numbers:', registrationNumbers);
        setVehicleRegistrationNumbers(registrationNumbers);
      } else {
        setError('Failed to fetch vehicle registration numbers');
      }
    } catch (error) {
      console.error(error);
      setError('Server Error');
    }
  };
  
  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/all-drivers');
      const data = await response.json();
      if (response.ok) {
        setDrivers(data.drivers);
      } else {
        setError('Failed to fetch drivers');
      }
    } catch (error) {
      console.error(error);
      setError('Server Error');
    }
  };
  
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-other-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          driverName,
          vehicleRegistrationNumber,
          totalAmountCharged,
          destinationLocations,
          description,
          recordedBy: currentUser ? currentUser.userName : '',
          category,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Other trip created successfully!');
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Server Error');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ color: 'white' }}>Create Other Trip</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="date" style={{ color: 'white' }}>Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
              <FormGroup>
                  <Label for="driverName" style={{ color: 'white' }}>Driver Name</Label>
                  <Input
                    type="select"
                    name="driverName"
                    id="driverName"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                  >
                    <option value="">Select driver name</option>
                    {drivers.map((driver) => (
                      <option key={driver._id} value={driver.firstName}>
                        {driver.firstName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
              <FormGroup>
  <Label for="vehicleRegistrationNumber" style={{ color: 'white' }}>Vehicle Registration Number</Label>
  <Input
    type="select"
    name="vehicleRegistrationNumber"
    id="vehicleRegistrationNumber"
    value={vehicleRegistrationNumber}
    onChange={(e) => setVehicleRegistrationNumber(e.target.value)}
    required
  >
    <option value="">Select vehicle registration number</option>
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
                  <Label for="totalAmountCharged" style={{ color: 'white' }}>Total Amount Charged</Label>
                  <Input
                    type="number"
                    name="totalAmountCharged"
                    id="totalAmountCharged"
                    placeholder="Enter total amount charged"
                    value={totalAmountCharged}
                    onChange={(e) => setTotalAmountCharged(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="destinationLocations" style={{ color: 'white' }}>Destination Locations</Label>
                  <Input
                    type="text"
                    name="destinationLocations"
                    id="destinationLocations"
                    placeholder="Enter destination locations"
                    value={destinationLocations}
                    onChange={(e) => setDestinationLocations(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="description" style={{ color: 'white' }}>Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5} // Adjust the number of rows as needed
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
                    name="recordedBy"
                    id="recordedBy"
                    placeholder="Enter recorded by"
                    value={recordedBy}
                    onChange={(e) => setRecordedBy(e.target.value)}
                    required
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="category" style={{ color: 'white' }}>Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {incomeCategories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Create</Button>
          </Form>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default OtherTrips;