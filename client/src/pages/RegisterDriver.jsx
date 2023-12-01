
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterDriver = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [ghanaCardId, setGhanaCardId] = useState('');
  const [witnessName, setWitnessName] = useState('');
  const [witnessContact, setWitnessContact] = useState('');
  const [registeredBy, setRegisteredBy] = useState(currentUser ? currentUser.userName : '');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driverData = {
      firstName,
      lastName,
      licenseNumber,
      dateOfBirth,
      contactNumber,
      email,
      town,
      city,
      region,
      ghanaCardId,
      witnessName,
      witnessContact,
      registeredBy: currentUser ? currentUser.userName : '',
    };

    try {
      const response = await fetch('/api/register-driver', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });

      if (response.ok) {
        alert('Driver created successfully');
        navigate('/business-settings');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Error creating driver:', error);
      alert('An error occurred while creating the driver. Please try again.');
    }
  };

  return (
    <Container>
      <h1 style={{ color: 'white' }}>Register Driver</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName" style={{ color: 'white' }}>First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="lastName" style={{ color: 'white' }}>Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="licenseNumber" style={{ color: 'white' }}>License Number</Label>
              <Input
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dateOfBirth" style={{ color: 'white' }}>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="contactNumber" style={{ color: 'white' }}>Contact Number</Label>
              <Input
                type="text"
                name="contactNumber"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email" style={{ color: 'white' }}>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="town" style={{ color: 'white' }}>Town</Label>
              <Input
                type="text"
                name="town"
                id="town"
                value={town}
                onChange={(e) => setTown(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="city" style={{ color: 'white' }}>City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="region" style={{ color: 'white' }}>Region</Label>
              <Input
                type="text"
                name="region"
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="ghanaCardId" style={{ color: 'white' }}>Ghana Card ID</Label>
              <Input
                type="text"
                name="ghanaCardId"
                id="ghanaCardId"
                value={ghanaCardId}
                onChange={(e) => setGhanaCardId(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="witnessName" style={{ color: 'white' }}>Witness Name</Label>
              <Input
                type="text"
                name="witnessName"
                id="witnessName"
                value={witnessName}
                onChange={(e) => setWitnessName(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="witnessContact" style={{ color: 'white' }}>Witness Contact</Label>
              <Input
                type="text"
                name="witnessContact"
                id="witnessContact"
                value={witnessContact}
                onChange={(e) => setWitnessContact(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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

export default RegisterDriver;