import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const AdditionalDetails = ({ formData, setFormData }) => {
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
            <Form.Label>Insurance Company</Form.Label>
            <Form.Control
              type="text"
              name="insuranceCompany"
              value={formData.insuranceCompany || ''}
              onChange={handleChange}
              placeholder="Enter insurance company"
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Policy Number</Form.Label>
            <Form.Control
              type="text"
              name="policyNumber"
              value={formData.policyNumber || ''}
              onChange={handleChange}
              placeholder="Enter policy number"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Insurance Expiry Date</Form.Label>
            <Form.Control
              type="date"
              name="insuranceExpiry"
              value={formData.insuranceExpiry || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Registration Date</Form.Label>
            <Form.Control
              type="date"
              name="registrationDate"
              value={formData.registrationDate || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status || ''}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="decommissioned">Decommissioned</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              placeholder="Enter additional notes"
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default AdditionalDetails;
