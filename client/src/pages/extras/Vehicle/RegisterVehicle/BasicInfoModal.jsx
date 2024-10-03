import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const BasicInformation = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Registration Number</Form.Label>
            <Form.Control
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber || ''}
              onChange={handleChange}
              placeholder="Enter registration number"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Make</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={formData.make || ''}
              onChange={handleChange}
              placeholder="Enter vehicle make"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model || ''}
              onChange={handleChange}
              placeholder="Enter vehicle model"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              name="owner"
              value={formData.owner || ''}
              onChange={handleChange}
              placeholder="Enter owner's name"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default BasicInformation;
