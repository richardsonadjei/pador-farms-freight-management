import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GeneralExpenditure = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    description: '',
    amount: '', // New field for amount
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'pending payment', // Default status
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch expenditure categories
    fetch('/api/expenditure-categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/general-expenditures', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          setSuccess('General expenditure created successfully.');
          setError('');
          navigate('/dashboard');
        } else {
          setError('Failed to create general expenditure');
          setSuccess('');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Server Error');
        setSuccess('');
      });
  };

  return (
    <Container>
      <h2 className="text-white">Create General Expenditure</h2>
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
              <Label className="text-white">Category</Label>
              <Input type="select" name="category" onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Description</Label>
              <Input type="textarea" name="description" onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Amount</Label>
              <Input type="number" name="amount" onChange={handleChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Status</Label>
              <Input type="select" name="status" onChange={handleChange} required>
                <option value="pending payment">Pending Payment</option>
                <option value="paid">Paid</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Recorded By</Label>
              <Input type="text" name="recordedBy" value={currentUser ? currentUser.userName : ''} readOnly />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>}
      {success && <p className="text-success mt-3">{success}</p>}
    </Container>
  );
};

export default GeneralExpenditure;
