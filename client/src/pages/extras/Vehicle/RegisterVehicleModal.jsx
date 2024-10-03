import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import MultiStep from 'react-multistep';
import BasicInformation from './RegisterVehicle/BasicInfoModal';
import VehicleDetails from './RegisterVehicle/DetailsModal';
import AdditionalDetails from './RegisterVehicle/AdditionalDetails';


const RegisterVehicleModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { component: <BasicInformation setFormData={setFormData} formData={formData} /> },
    { component: <VehicleDetails setFormData={setFormData} formData={formData} /> },
    { component: <AdditionalDetails setFormData={setFormData} formData={formData} /> },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/vehicle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Vehicle registered successfully!');
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Register New Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MultiStep steps={steps} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterVehicleModal;