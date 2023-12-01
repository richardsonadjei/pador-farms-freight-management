// GeneralExpenditureReport.jsx

import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const GeneralExpenditureReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/all-all-general-expenditure?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  const renderReportTable = () => {
    if (!reportData || reportData.length === 0) {
      return <p className="text-white">No data to display</p>;
    }

    return (
      <Table responsive bordered className="mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Recorded By</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((expenditure) => (
            <tr key={expenditure._id}>
              <td>{new Date(expenditure.date).toLocaleDateString()}</td>
              <td>{expenditure.category}</td>
              <td>{expenditure.amount}</td>
              <td>{expenditure.description}</td>
              <td>{expenditure.recordedBy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderSummaryReport = () => {
    if (!reportData || reportData.length === 0) {
      return null;
    }

    const totalAmount = reportData.reduce((sum, expenditure) => sum + expenditure.amount, 0);

    return (
      <Table responsive bordered className="mt-4">
        <thead>
          <tr>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalAmount}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="startDate" className="text-white">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                placeholder="Select start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate" className="text-white">End Date</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                placeholder="Select end date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {reportData && (
        <div className="mt-5">
          <h2 className="text-white">General Expenditure Report</h2>
          {renderReportTable()}
          <h4 className="text-white mt-5">Summary Report</h4>
          {renderSummaryReport()}
        </div>
      )}
    </Container>
  );
};

export default GeneralExpenditureReport;
