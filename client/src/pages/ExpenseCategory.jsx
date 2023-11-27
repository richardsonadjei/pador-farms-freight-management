
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ExpenseCategory = () => {
    const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.username : '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-expense-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, recordedBy:currentUser ? currentUser.username : '', }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Expenditure category created successfully!');
        navigate('/business-settings');
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
          <h1 style={{ color: 'white' }}>Create Expenditure Category</h1>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="name" style={{ color: 'white' }}>Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" style={{ color: 'white' }}>Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormGroup>
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
              />
            </FormGroup>
            <Button color="primary" type="submit">Create</Button>
          </Form>
          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseCategory;