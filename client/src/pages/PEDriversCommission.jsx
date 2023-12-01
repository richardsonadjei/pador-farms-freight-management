import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PEDriversCommission = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [peNumbers, setPENumbers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    peNumber: '',
    driverName: '',
    totalCommissionAmount: '',
    description: '',
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'pending payment', // Adjust the status based on your requirements
  });

  useEffect(() => {
    // Fetch PE Numbers
    fetch('/api/all-pe')
      .then((response) => response.json())
      .then((data) => {
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

    // Fetch Drivers
    fetch('/api/all-drivers')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.drivers)) {
          setDrivers(data.drivers);
        } else {
          console.error('Invalid response from /api/all-drivers');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching drivers');
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
    fetch('/api/pe-driver-commissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('PE Driver Commission created successfully');
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while creating PE Driver Commission');
      });
  };
  return (
    <Container>
      <h2 className="text-white">Record PE Driver Commission</h2>
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
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Driver Name</Label>
              <Input type="select" name="driverName" onChange={handleChange} required>
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={`${driver.firstName} ${driver.lastName}`}>
                    {`${driver.firstName} ${driver.lastName}`}
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
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label className="text-white">Description</Label>
              <Input
                type="textarea"
                name="description"
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label className="text-white">Status</Label>
              <Input type="select" name="status" value={formData.status} onChange={handleChange} required>
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

export default PEDriversCommission;
