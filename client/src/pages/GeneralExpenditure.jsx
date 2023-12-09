import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
    amount: '',
    recordedBy: currentUser ? currentUser.userName : '',
    status: 'pending payment',
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

  const handleCategoryChange = (selectedOption) => {
    setFormData({
      ...formData,
      category: selectedOption ? selectedOption.value : '',
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
    <Container className="general-expenditure-container">
      <h2 className="form-title text-black">Create General Expenditure</h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Date</Label>
              <Input type="date" name="date" onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Category</Label>
              <Select
                options={categories.map((category) => ({ value: category.name, label: category.name }))}
                placeholder="Select Category"
                onChange={handleCategoryChange}
                isSearchable
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Description</Label>
              <Input type="textarea" name="description" onChange={handleChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Amount</Label>
              <Input type="number" name="amount" onChange={handleChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Status</Label>
              <Input type="select" name="status" onChange={handleChange} required>
                <option value="pending payment">Pending Payment</option>
                <option value="paid">Paid</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-black">Recorded By</Label>
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
