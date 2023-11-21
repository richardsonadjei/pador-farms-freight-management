import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const CreateAccount = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephoneNumber: '',
    ghanaCardNumber: '',
    bank: '',
    bankAccountNumber: '',
    bankBranch: '',
    nextOfKinName: '',
    nextOfKinContact: '',
    nextOfKinGhanaCardNumber: '',
    witnessName: '',
    witnessContact: '',
    role: 'employee',
    category: 'all',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the server using fetch
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('Form submitted successfully');
        // Optionally, you can reset the form or navigate to another page upon successful submission
      } else {
        // If the request was not successful, log the error
        console.error('Form submission failed:', response.statusText);
        // Handle the error as needed (show an error message, etc.)
      }
    } catch (error) {
      // Handle any network or other errors that might occur during the fetch
      console.error('Error during form submission:', error);
      // Handle the error as needed (show an error message, etc.)
    }
  };

  return (
    <Container>
       <Row>
        <Col sm={12}>
          <h2 className="text-white font-weight-bold mb-4 ">Create Account</h2>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup row>
              <Label for="name" sm={4} className="text-white font-weight-bold">Name:</Label>
              <Col sm={8}>
                <Input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="userName" sm={4} className="text-white font-weight-bold">Username:</Label>
              <Col sm={8}>
                <Input type="text" name="userName" id="userName" value={formData.userName} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="email" sm={4} className="text-white font-weight-bold">Email:</Label>
              <Col sm={8}>
                <Input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={4} className="text-white font-weight-bold">Password:</Label>
              <Col sm={8}>
                <Input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" sm={4} className="text-white font-weight-bold">Confirm Password:</Label>
              <Col sm={8}>
                <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="telephoneNumber" sm={4} className="text-white font-weight-bold">Telephone Number:</Label>
              <Col sm={8}>
                <Input type="text" name="telephoneNumber" id="telephoneNumber" value={formData.telephoneNumber} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ghanaCardNumber" sm={4} className="text-white font-weight-bold">Ghana Card Number:</Label>
              <Col sm={8}>
                <Input type="text" name="ghanaCardNumber" id="ghanaCardNumber" value={formData.ghanaCardNumber} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="bank" sm={4} className="text-white font-weight-bold">Bank:</Label>
              <Col sm={8}>
                <Input type="text" name="bank" id="bank" value={formData.bank} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="bankAccountNumber" sm={4} className="text-white font-weight-bold">Bank Account Number:</Label>
              <Col sm={8}>
                <Input type="text" name="bankAccountNumber" id="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="bankBranch" sm={4} className="text-white font-weight-bold">Bank Branch:</Label>
              <Col sm={8}>
                <Input type="text" name="bankBranch" id="bankBranch" value={formData.bankBranch} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup row>
              <Label for="nextOfKinName" sm={4} className="text-white font-weight-bold">Next of Kin Name:</Label>
              <Col sm={8}>
                <Input type="text" name="nextOfKinName" id="nextOfKinName" value={formData.nextOfKinName} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="nextOfKinContact" sm={4} className="text-white font-weight-bold">Next of Kin Contact:</Label>
              <Col sm={8}>
                <Input type="text" name="nextOfKinContact" id="nextOfKinContact" value={formData.nextOfKinContact} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="nextOfKinGhanaCardNumber" sm={4} className="text-white font-weight-bold">Next of Kin Ghana Card Number:</Label>
              <Col sm={8}>
                <Input type="text" name="nextOfKinGhanaCardNumber" id="nextOfKinGhanaCardNumber" value={formData.nextOfKinGhanaCardNumber} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="witnessName" sm={4} className="text-white font-weight-bold">Witness Name:</Label>
              <Col sm={8}>
                <Input type="text" name="witnessName" id="witnessName" value={formData.witnessName} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="witnessContact" sm={4} className="text-white font-weight-bold">Witness Contact:</Label>
              <Col sm={8}>
                <Input type="text" name="witnessContact" id="witnessContact" value={formData.witnessContact} onChange={handleInputChange} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="role" sm={4} className="text-white font-weight-bold">Role:</Label>
              <Col sm={8}>
                <Input type="select" name="role" id="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="category" sm={4} className="text-white font-weight-bold">Category:</Label>
              <Col sm={8}>
                <Input type="select" name="category" id="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="driver">Driver</option>
                  <option value="labourer">Labourer</option>
                  <option value="all">All</option>
                </Input>
              </Col>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup row>
          <Col sm={{ offset: 4, size: 8 }}>
            <Button type="submit" color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default CreateAccount;