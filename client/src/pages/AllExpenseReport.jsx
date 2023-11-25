import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllExpenseReport = () => {
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
    fetch(`/api/all-expense-report?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
      })
      .catch((error) => console.error(error));
  };

  // Helper function to calculate total amount for a specific model
  const calculateTotalAmount = (expenditures) => {
    return expenditures.reduce((total, item) => total + (item.expenditureAmount || item.amount), 0);
  };

  return (
    <Container>
      <h2 className="text-white">All Expenditure Report</h2>
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

      {/* Render the report table only if data is available */}
      {reportData && (
        <>
          <h3 className="text-white mt-4">Expenditure Details</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Date</th>
                <th>Model</th>
                <th>Category</th>
                <th>PE Number / Trip Number</th>
                <th>Registration Number</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Recorded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through reportData and render each row */}
              {reportData.peExpenditures.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>PE Expenditure</td>
                  <td>{item.category}</td>
                  <td>{item.peNumber}</td>
                  <td>{item.truckRegistrationNumber}</td>
                  <td>{item.expenditureAmount}</td>
                  <td>{item.description}</td>
                  <td>{item.recordedBy}</td>
                  <td>
                  <a
  href={`/update-payment-status?id=${item._id}&model=${item.model}`}
  onClick={(e) => {
    e.preventDefault();
    window.location.href = `/update-payment-status?id=${item._id}&model=${item.model}`;
  }}
>
  {item.status}
</a>
                  </td>
                </tr>
              ))}
              {reportData.otherTripExpenditures.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>Other Trip Expenditure</td>
                  <td>{item.category}</td>
                  <td>{item.tripNumber}</td>
                  <td>{item.vehicleRegistrationNumber}</td>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.recordedBy}</td>
                  <td>
                    <a
                      href={`/update-payment-status?id=${item._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/update-payment-status?id=${item._id}`;
                      }}
                    >
                      {item.status}
                    </a>
                  </td>
                </tr>
              ))}
              {reportData.generalExpenditures.map((item) => (
                <tr key={item._id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>General Expenditure</td>
                  <td>{item.category}</td>
                  <td></td>
                  <td></td>
                  <td>{item.amount}</td>
                  <td>{item.description}</td>
                  <td>{item.recordedBy}</td>
                  <td>
                    <a
                      href={`/update-payment-status?id=${item._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/update-payment-status?id=${item._id}`;
                      }}
                    >
                      {item.status}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Table */}
          <h3 className="text-white mt-4">Summary Report</h3>
          <Table responsive className="table-shadow mt-2">
            <thead>
              <tr>
                <th>Model</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PE Expenditure</td>
                <td>{calculateTotalAmount(reportData.peExpenditures)}</td>
              </tr>
              <tr>
                <td>Other Trip Expenditure</td>
                <td>{calculateTotalAmount(reportData.otherTripExpenditures)}</td>
              </tr>
              <tr>
                <td>General Expenditure</td>
                <td>{calculateTotalAmount(reportData.generalExpenditures)}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default AllExpenseReport;
