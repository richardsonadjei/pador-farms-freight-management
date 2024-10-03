import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

const UserRole = ({ formData, setFormData }) => {
  const handleMultiSelectChange = (selectedOptions, { name }) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Select
              options={[
                { value: 'employee', label: 'Employee' },
                { value: 'manager', label: 'Manager' },
                { value: 'admin', label: 'Admin' },
                { value: 'finance', label: 'Finance' },
                { value: 'human-resource', label: 'Human Resource' },
              ]}
              name="role"
              value={formData.role.map((role) => ({ value: role, label: role }))}
              onChange={(selectedOptions) =>
                handleMultiSelectChange(selectedOptions, { name: 'role' })
              }
              isMulti
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default UserRole;
