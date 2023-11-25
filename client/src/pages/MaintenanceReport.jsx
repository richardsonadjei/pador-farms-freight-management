import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const MaintenanceReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenditures, setExpenditures] = useState([]);
  const [summary, setSummary] = useState({ totalAmount: 0, totalCount: 0 });

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch repairs and maintenance expenditures within the date range
    fetch(`/api/all-maintenance-expenseReport?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setExpenditures(data);
        // Calculate summary
        const totalAmount = data.reduce((total, expenditure) => total + expenditure.amount, 0);
        const totalCount = data.length;
        setSummary({ totalAmount, totalCount });
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <h2 className="text-white">Maintenance Report</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" name="startDate" onChange={handleStartDateChange} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" name="endDate" onChange={handleEndDateChange} required />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <Button type="submit" color="primary">
              Generate Report
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Render tables only if expenditures data is available */}
      {expenditures.length > 0 && (
        <>
          {/* Expenditures Table */}
          <h3 className="text-white mt-4">Expenditures</h3>
          <Table responsive className="table-shadow">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenditures.map((expenditure) => (
                <tr key={expenditure._id}>
                  <td>{new Date(expenditure.date).toLocaleDateString()}</td>
                  <td>{expenditure.category}</td>
                  <td>{expenditure.description}</td>
                  <td>{expenditure.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Table */}
          <h3 className="text-white mt-4">Summary</h3>
          <Table responsive className="table-shadow">
            <thead>
              <tr>
                <th>Total Expenditures</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{summary.totalCount}</td>
                <td>{summary.totalAmount}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default MaintenanceReport;
