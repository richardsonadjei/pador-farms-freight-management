import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MultiStep from 'react-multistep';
import UserInformation from './SignUp/UserInformation';
import EmployeeDetails from './SignUp/EmployeeDetails';
import UserRoleCategory from './SignUp/Role';


const SignUpModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userName: '',
    phoneNumber: '',
    role: [],
    category: [],
    dateOfBirth: '',
    position: 'Driver',
    hireDate: '',
    salary: '',
  });

  const steps = [
    { component: <UserInformation formData={formData} setFormData={setFormData} /> },
    { component: <EmployeeDetails formData={formData} setFormData={setFormData} /> },
    { component: <UserRoleCategory formData={formData} setFormData={setFormData} /> },
  ];

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert(responseData.message);
        handleClose();
        window.location.href = '/sign-in';
      } else {
        const errorData = await response.json();
        console.error('Failed to create user:', errorData.error);
        alert(`Failed to create user. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Register New Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MultiStep steps={steps} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Complete Registration
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SignUpModal;
