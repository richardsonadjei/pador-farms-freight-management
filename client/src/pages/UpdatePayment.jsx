import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const UpdatePaymentStatus = () => {
  const [model, setModel] = useState('');
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract id from URL parameters
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');

    if (idParam) {
      setId(idParam);
    }
  }, []);

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch('/api/update-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, id, status }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);

        // Alert the user before navigating back to /all-expense-reports
        if (window.confirm('Update successful. Do you want to go back to All Expense Reports?')) {
          // Navigate back to /all-expense-reports after user confirmation
          navigate('/all-expense-reports', { replace: true });
        }
      } else {
        setMessage('Error updating expenditure status');
      }
    } catch (error) {
      console.error(error);
      setMessage('Server error');
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ color: 'white' }}>Update Expenditure Status</h1>
          <Form>
            <FormGroup>
              <Label for="model" style={{ color: 'white' }}>Model</Label>
              <Input type="select" name="model" id="model" value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="">Select Model</option>
                <option value="GeneralExpenditure">General Expenditure</option>
                <option value="OtherTripExpenditure">Other Trip Expenditure</option>
                <option value="PEExpenditure">PE Expenditure</option>
                <option value="DriverCommission">Driver Commission</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="id" style={{ color: 'white' }}>ID</Label>
              {/* The id value is now set from the URL parameters */}
              <Input type="text" name="id" id="id" value={id} readOnly />
            </FormGroup>
            <FormGroup>
              <Label for="status" style={{ color: 'white' }}>Status</Label>
              <Input type="select" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select Status</option>
                <option value="paid">Paid</option>
                <option value="pending payment">Pending Payment</option>
              </Input>
            </FormGroup>
            <Button color="primary" onClick={handleUpdateStatus}>Update Status</Button>
          </Form>
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePaymentStatus;