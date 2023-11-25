import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from '../redux/user/userSlice';

const UpdateUser = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    userName: currentUser.userName,
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
  
      const res = await fetch(`/api/auth/user/${currentUser.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
  
      dispatch(updateUserSuccess(data));
  
      // Alert the user (you can replace this with your preferred alert/notification library)
      alert('User updated successfully! Please sign in again.');
  
      // Redirect to the signin page
      window.location.href = '/sign-in';
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  

  return (
    <Container>
      <h1 className='text-3xl font-semibold text-center my-7' style={{ color: 'white' }}>Update Your Account</h1>
      <Form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <FormGroup>
          <Label for='userName'style={{ color: 'white' }}>Username</Label>
          <Input
            type='text'
            id='userName'
            value={formData.userName}
            onChange={handleChange}
            disabled={loading}
          />
        </FormGroup>
        <FormGroup>
          <Label for='password'style={{ color: 'white' }}>New Password</Label>
          <Input
            type='password'
            id='password'
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </FormGroup>
        <Button color='primary' type='submit' disabled={loading}>
          {loading ? 'Updating...' : 'Update User'}
        </Button>
      </Form>
      {error && <p className='text-red-700 mt-3'>{error}</p>}
    </Container>
  );
};

export default UpdateUser;
