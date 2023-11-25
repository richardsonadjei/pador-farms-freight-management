import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllIncomeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [incomeData, setIncomeData] = useState({ otherTripIncome: [], incomeHauling: [] });
  const [error, setError] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/all-incomeReport', {
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
      setIncomeData(data);
      setError('');
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch data. ${error.message}`);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <h2 className="mt-3 mb-4" style={{ color: 'white' }}>All INCOME REPORT WITHIN A PERIOD</h2>
        <Col>
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

      {(incomeData.otherTripIncome.length > 0 || incomeData.incomeHauling.length > 0) && (
        <Row className="mt-3">
            <h2 className="mt-3 mb-4" style={{ color: 'white' }}>All Income Report</h2>
          <Col>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
                <tr>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Trip/PE Number</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {incomeData.otherTripIncome.map((income) => (
                  <tr key={income._id}>
                    <td>Other Trip</td>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.tripNumber}</td>
                    <td>{income.amount}</td>
                    <td>{income.description}</td>
                    <td>{income.recordedBy}</td>
                  </tr>
                ))}
                {incomeData.incomeHauling.map((income) => (
                  <tr key={income._id}>
                    <td>Income Hauling</td>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.peNumber}</td>
                    <td>{income.netTotalAmount}</td>
                    <td>{income.description}</td>
                    <td>{income.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {incomeData.otherTripIncome.length > 0 || incomeData.incomeHauling.length > 0 ? (
        <Row className="mt-3">
            <h2 className="mt-3 mb-4" style={{ color: 'white' }}>Summary Income Report</h2>
          <Col>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white' }}>
                <tr>
                  <th>Category</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Other Trip</td>
                  <td>
                    {incomeData.otherTripIncome.reduce((total, income) => total + income.amount, 0)}
                  </td>
                </tr>
                <tr>
                  <td>Income Hauling</td>
                  <td>
                    {incomeData.incomeHauling.reduce((total, income) => total + income.netTotalAmount, 0)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default AllIncomeReport;
