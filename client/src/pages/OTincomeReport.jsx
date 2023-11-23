import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const OTincomeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [otherTripIncome, setOtherTripIncome] = useState([]);
  const [error, setError] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/all-ot-incomeReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Server responded with ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOtherTripIncome(data.otherTripIncome);
      setError('');
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch data. ${error.message}`);
    }
  };

  const getTotal = (field) => {
    return otherTripIncome.reduce((total, income) => total + income[field], 0);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2 className="mt-3 mb-4" style={{ color: 'white' }}>Other Trip Income Report</h2>
          <Form>
            <FormGroup row>
              <Label for="startDate" sm={2} style={{ color: 'white' }}>
                Start Date
              </Label>
              <Col sm={4}>
                <Input type="date" name="startDate" id="startDate" value={startDate} onChange={handleStartDateChange} />
              </Col>
              <Label for="endDate" sm={2} style={{ color: 'white' }}>
                End Date
              </Label>
              <Col sm={4}>
                <Input type="date" name="endDate" id="endDate" value={endDate} onChange={handleEndDateChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary" onClick={handleFetchData}>
                  Fetch Data
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {error && (
        <Row className="mt-3">
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
        </Row>
      )}

      {otherTripIncome.length > 0 && (
        <Row className="mt-3">
          <Col>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Trip Number</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {otherTripIncome.map((income) => (
                  <tr key={income._id}>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.category}</td>
                    <td>{income.tripNumber}</td>
                    <td>{income.amount}</td>
                    <td>{income.description}</td>
                    <td>{income.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {otherTripIncome.length > 0 && (
        <Row className="mt-3">
          <Col>
            <h4 className="mt-3 mb-4" style={{ color: 'white' }}>Summary Income Report</h4>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th>Category</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Other Trip</td>
                  <td>{getTotal('amount')}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OTincomeReport;
