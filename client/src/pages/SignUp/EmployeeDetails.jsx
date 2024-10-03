import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const EmployeeDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
              type="date"
              name="hireDate"
              value={formData.hireDate || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position || 'Driver'}
              onChange={handleChange}
              placeholder="Enter position"
              readOnly
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="text"
              name="salary"
              value={formData.salary || ''}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeDetails;
