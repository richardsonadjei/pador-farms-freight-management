import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'; // Adjust the import path

const SignIn = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    userNameOrEmail: '',
    password: '',
  });

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
      {error && <div className="text-danger mt-3">{error}</div>}
        <Col xs="12" md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userNameOrEmail" style={{ color: 'white' }}>Username or Email</Label>
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
              <Label for="password" style={{ color: 'white' }}>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormGroup>
            <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
