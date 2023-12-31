import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const OTExpenseReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch data from the server based on the date range
    fetch(`/api/all-ot-report?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((error) => console.error(error));
  };

  const calculateTotalAmount = (expenditures, field) => {
    return expenditures.reduce((total, item) => total + (Number(item[field]) || 0), 0);
  };

  return (
    <Container>
      <h2 className="text-white mt-4">Other Trip Expenditure Report</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" name="startDate" onChange={handleStartDateChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" name="endDate" onChange={handleEndDateChange} required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <Button type="submit" color="primary">
              Generate Report
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Render the Other Trip Expenditure report table only if data is available */}
      {reportData && (
        <>
          <h3 className="text-white mt-4">Other Trip Expenditure Details</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Trip Number</th>
                <th>Registration Number</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Recorded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through reportData.otherTripExpenditures and render each row */}
              {reportData.otherTripExpenditures.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.category}</td>
                  <td>{item.tripNumber}</td>
                  <td>{item.vehicleRegistrationNumber}</td>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.recordedBy}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Table for Other Trip Expenditure */}
          <h3 className="text-white mt-4">Other Trip Expenditure Summary</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculateTotalAmount(reportData.otherTripExpenditures, 'amount')}</td>
              </tr>
            </tbody>
          </Table>

          {/* Render the Driver's Commission report table only if data is available */}
          <h3 className="text-white mt-4">Driver's Commission Details</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>PE Number</th>
                <th>Driver Name</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through reportData.driverCommissions and render each row */}
              {reportData.driverCommissions.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{item.peNumber}</td>
                  <td>{item.driverName}</td>
                  <td>{item.totalCommissionAmount}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>{item.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Table for Driver's Commission */}
          <h3 className="text-white mt-4">Driver's Commission Summary</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{calculateTotalAmount(reportData.driverCommissions, 'totalCommissionAmount')}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default OTExpenseReport;
