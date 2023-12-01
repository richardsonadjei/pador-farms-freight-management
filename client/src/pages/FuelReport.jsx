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

const FuelReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [peFuelExpenditures, setPEFuelExpenditures] = useState([]);
  const [otherTripFuelExpenditures, setOtherTripFuelExpenditures] = useState([]);
  const [peSummaryReport, setPESummaryReport] = useState({ totalAmount: 0 });
  const [otherTripSummaryReport, setOtherTripSummaryReport] = useState({ totalAmount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/all-fuel-expenseReport?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      // Separate PE fuel expenditures and OtherTrip fuel expenditures
      const peExpenditures = data.filter(expenditure => expenditure.peNumber);
      const otherTripExpenditures = data.filter(expenditure => expenditure.tripNumber);

      // Update the state with fetched data
      setPEFuelExpenditures(peExpenditures);
      setOtherTripFuelExpenditures(otherTripExpenditures);

      // Calculate total amount for the summary report
      const peTotalAmount = peExpenditures.reduce(
        (total, expenditure) => total + expenditure.expenditureAmount,
        0
      );
      const otherTripTotalAmount = otherTripExpenditures.reduce(
        (total, expenditure) => total + expenditure.amount,
        0
      );

      setPESummaryReport({ totalAmount: peTotalAmount });
      setOtherTripSummaryReport({ totalAmount: otherTripTotalAmount });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
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
            <Button color="primary" onClick={fetchData} disabled={isLoading}>
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {isLoading && <p>Loading...</p>}

      {/* Conditionally render the PE fuel expenditures table */}
      {peFuelExpenditures.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <h2 style={{ color: 'white' }}>PE Fuel Expenditure Report</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>PE Number</th>
                  <th>Truck Registration</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {peFuelExpenditures.map((expenditure) => (
                  <tr key={expenditure._id}>
                    <td>{new Date(expenditure.date).toLocaleDateString()}</td>
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
          </Col>
        </Row>
      )}

      {/* Conditionally render the OtherTrip fuel expenditures table */}
      {otherTripFuelExpenditures.length > 0 && (
        <Row className="mt-4">
          <Col md={12}>
            <h2 style={{ color: 'white' }}>OtherTrip Fuel Expenditure Report</h2>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>OtherTrip Number</th>
                  <th>Vehicle Registration</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Recorded By</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {otherTripFuelExpenditures.map((expenditure) => (
                  <tr key={expenditure._id}>
                    <td>{new Date(expenditure.date).toLocaleDateString()}</td>
                    <td>{expenditure.tripNumber}</td>
                    <td>{expenditure.vehicleRegistrationNumber}</td>
                    <td>{expenditure.amount}</td>
                    <td>{expenditure.description}</td>
                    <td>{expenditure.recordedBy}</td>
                    <td>{expenditure.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {/* Combined Summary Report */}
      {!isLoading && (peFuelExpenditures.length > 0 || otherTripFuelExpenditures.length > 0) && (
  <Row className="mt-4">
    <Col md={12}>
      <h2 style={{ color: 'white', marginTop: '20px' }}>Combined Fuel Expenditure Summary</h2>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>PE Total Amount</th>
            <th>OtherTrip Total Amount</th>
            <th>Total Combined Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{peSummaryReport.totalAmount}</td>
            <td>{otherTripSummaryReport.totalAmount}</td>
            <td>{peSummaryReport.totalAmount + otherTripSummaryReport.totalAmount}</td>
          </tr>
        </tbody>
      </Table>
    </Col>
  </Row>
)}
    </Container>
  );
};

export default FuelReport;
