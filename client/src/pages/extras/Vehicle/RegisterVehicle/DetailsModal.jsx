import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const VehicleDetails = ({ formData, setFormData }) => {
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
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year || ''}
              onChange={handleChange}
              placeholder="Enter manufacturing year"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={formData.color || ''}
              onChange={handleChange}
              placeholder="Enter vehicle color"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Chassis Number</Form.Label>
            <Form.Control
              type="number"
              name="chassisNumber"
              value={formData.chassisNumber || ''}
              onChange={handleChange}
              placeholder="Enter chassis number"
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Engine Number</Form.Label>
            <Form.Control
              type="text"
              name="engineNumber"
              value={formData.engineNumber || ''}
              onChange={handleChange}
              placeholder="Enter engine number"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default VehicleDetails;
