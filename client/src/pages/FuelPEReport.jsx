import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  Table,
} from 'reactstrap';

const FuelPEReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [fuelExpenditures, setFuelExpenditures] = useState([]);
  const [summaryReport, setSummaryReport] = useState({ totalAmount: 0 });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/all-fuelPE-expenseReport?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      // Update the state with fetched data
      setFuelExpenditures(data);

      // Calculate total amount for the summary report
      const totalAmount = data.reduce(
        (total, expenditure) => total + expenditure.expenditureAmount,
        0
      );

      setSummaryReport({ totalAmount });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6}>
          <Form>
            <FormGroup>
              <Label for="startDate" style={{ color: 'white' }}>
                Start Date
              </Label>
              <Input
                type="date"
                id="startDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate" style={{ color: 'white' }}>
                End Date
              </Label>
              <Input
                type="date"
                id="endDate"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={fetchData}>
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Conditionally render the table if fuelExpenditures is not empty */}
      {fuelExpenditures.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <h2 style={{ color: 'white' }}>Fuel Expenditure Report</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>PE Number</th>
                  <th>Truck Registration</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fuelExpenditures.map((expenditure) => (
                  <tr key={expenditure._id}>
                     <td>{new Date(expenditure.date).toLocaleDateString()}</td>
                    <td>{expenditure.category}</td>
                    <td>{expenditure.peNumber}</td>
                    <td>{expenditure.truckRegistrationNumber}</td>
                    <td>{expenditure.expenditureAmount}</td>
                    <td>{expenditure.description}</td>
                    <td>{expenditure.recordedBy}</td>
                    <td>{expenditure.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Summary Report */}
            <h2 style={{ color: 'white', marginTop: '20px' }}>Summary Report</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{summaryReport.totalAmount}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FuelPEReport;
