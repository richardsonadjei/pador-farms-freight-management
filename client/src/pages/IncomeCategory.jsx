import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const IncomeCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the category name already exists
      const response = await fetch('/api/create-income-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        // Display success alert
        window.alert('Income category created successfully.');
        // Navigate after alert is closed
        navigate('/business-settings');
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error creating income category:', error);
      setError('Internal Server Error. Please try again later.');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Create Income Category</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleFormSubmit}>
            <FormGroup row>
              <Label for="name" sm={2} style={{ color: 'white' }}>Name</Label>
              <Col sm={10}>
                <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" sm={2} style={{ color: 'white' }}>Description</Label>
              <Col sm={10}>
                <Input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button type="submit" color="primary">Create</Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default IncomeCategory;
