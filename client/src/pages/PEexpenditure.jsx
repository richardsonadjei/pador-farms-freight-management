import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecordPEexpenditure = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
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
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'paid',
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

    fetch('/api/all-vehicles')
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
  }, [currentUser]);

  const handleChange = (name, selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption.value,
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
          navigate('/primary-evacuations');
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
  <Input type="date" name="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
</FormGroup>

          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Category</Label>
              <Select
  options={categories.map((category) => ({ label: category.name, value: category.name }))}
  value={formData.category ? { label: formData.category, value: formData.category } : null}
  onChange={(selectedOption) => handleChange('category', selectedOption)}
  isSearchable
  placeholder="Search or select category"
/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">PE Number</Label>
              <Select
  options={peNumbers.map((pe) => ({ label: pe.peNumber, value: pe.peNumber }))}
  value={formData.peNumber ? { label: formData.peNumber, value: formData.peNumber } : null}
  onChange={(selectedOption) => handleChange('peNumber', selectedOption)}
  isSearchable
  placeholder="Search or select PE Number"
/>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Truck Registration Number</Label>
              <Select
  options={truckRegistrationNumbers.map((truck) => ({ label: truck.registrationNumber, value: truck.registrationNumber }))}
  value={formData.truckRegistrationNumber ? { label: formData.truckRegistrationNumber, value: formData.truckRegistrationNumber } : null}
  onChange={(selectedOption) => handleChange('truckRegistrationNumber', selectedOption)}
  isSearchable
  placeholder="Search or select Truck Registration Number"
/>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Expenditure Amount</Label>
              <Input type="number" name="expenditureAmount" onChange={(e) => setFormData({ ...formData, expenditureAmount: e.target.value })} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Description</Label>
              <Input type="textarea" name="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
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
                onChange={(e) => setFormData({ ...formData, recordedBy: e.target.value })}
                value={currentUser ? currentUser.userName : ''}
                readOnly
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Status</Label>
              <Select
                options={[
                  { label: 'Pending Payment', value: 'pending payment' },
                  { label: 'Paid', value: 'paid' },
                ]}
                value={{ label: formData.status, value: formData.status }}
                onChange={(selectedOption) => handleChange('status', selectedOption)}
                isSearchable
              />
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
