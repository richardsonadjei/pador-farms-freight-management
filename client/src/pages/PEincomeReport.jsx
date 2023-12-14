import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PEIncomeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [incomeRecords, setIncomeRecords] = useState([]);
  const [error, setError] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/all-pe-incomeReport', {
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
      setIncomeRecords(data.incomeRecords);
      setError('');
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch data. ${error.message}`);
    }
  };

  const getTotal = (fieldName) => {
    return incomeRecords.reduce((total, income) => total + income[fieldName], 0).toFixed(2);
  };

  return (
    <Container>
      <Row className="mt-5">
        <h2 className="mt-3 mb-4" style={{ color: 'white' }}>PE INCOME REPORT WITHIN A PERIOD</h2>
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

      {incomeRecords.length > 0 && (
        <Row className="mt-3">
            <h2 className="mt-3 mb-4" style={{ color: 'white' }}>Table Report</h2>
          <Col>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th>Date</th>
                  <th>PE Number</th>
                  <th>Truck Registration Number</th>
                  <th>Income Amount Per Bag</th>
                  <th>Total Income Amount</th>
                  <th>Tax Amount Per Bag</th>
                  <th>Total Tax Amount</th>
                  <th>Net Total Amount Per Bag</th>
                  <th>Net Total Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {incomeRecords.map((income) => (
                  <tr key={income._id}>
                    <td>{new Date(income.date).toLocaleDateString()}</td>
                    <td>{income.peNumber}</td>
                    <td>{income.truckRegistrationNumber}</td>
                    <td>{Number(income.incomeAmountPerBag).toFixed(2)}</td>
                    <td>{Number(income.totalIncomeAmount).toFixed(2)}</td>
                    <td>{income.taxAmountPerBag}</td>
                    <td>{Number(income.totalTaxAmount).toFixed(2)}</td>
                    <td>{Number(income.netTotalAmountPerbag).toFixed(2)}</td>
                    <td>{Number(income.netTotalAmount).toFixed(2)}</td>
                    <td>{income.description}</td>
                    <td>{income.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {incomeRecords.length > 0 && (
        <Row className="mt-3">
            <h2 className="mt-3 mb-4" style={{ color: 'white' }}>Summary Report</h2>
          <Col>
            <Table striped bordered responsive hover>
              <thead style={{ backgroundColor: '#007BFF', color: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <tr>
                  <th>Total Income Amount</th>
                  <th>Total Tax Amount</th>
                  <th>Total Net Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{getTotal('totalIncomeAmount')}</td>
                  <td>{getTotal('totalTaxAmount')}</td>
                  <td >{getTotal('netTotalAmount')}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PEIncomeReport;
