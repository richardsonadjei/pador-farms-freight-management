import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';

const SignIn = () => {
  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        // Redirect to the home page upon successful signin
        console.log('User signed in successfully:', user);
        window.location.href = '/'; // Change the URL to the home page
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Assuming the server sends an error message in the response
      }
    } catch (error) {
      console.error('Error during signin:', error);
      setError('An error occurred during signin.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs="12" md="6">
          {error && <Alert color="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userNameOrEmail">Username or Email</Label>
              <Input
                type="text"
                name="userNameOrEmail"
                id="userNameOrEmail"
                placeholder="Enter your username or email"
                value={formData.userNameOrEmail}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
