import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const EachOTIncomeExpenseReport = () => {
  const [tripNumber, setTripNumber] = useState('');
  const [reportData, setReportData] = useState(null);
  const [availableTripNumbers, setAvailableTripNumbers] = useState([]);

  useEffect(() => {
    // Fetch available other trip numbers when the component mounts
    fetchAvailableTripNumbers();
  }, []);

  const fetchAvailableTripNumbers = async () => {
    try {
      const response = await fetch('/api/other-trips');
      const data = await response.json();

      if (response.ok) {
        const tripNumbers = data.otherTrips.map(trip => trip.tripNumber);
        setAvailableTripNumbers(tripNumbers);
      } else {
        console.error('Error fetching available trip numbers:', data.message);
      }
    } catch (error) {
      console.error('Error fetching available trip numbers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/each-ot-income-expenditure?tripNumber=${tripNumber}`);
      const data = await response.json();

      if (response.ok) {
        setReportData(data);
      } else {
        console.error('Error fetching data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <Container className="mt-5">
    <Form onSubmit={handleSubmit}>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="tripNumber" className="text-white">Trip Number</Label>
            <Input
              type="select"
              name="tripNumber"
              id="tripNumber"
              value={tripNumber}
              onChange={(e) => setTripNumber(e.target.value)}
              required
            >
              <option value="" disabled>Select Trip Number</option>
              {availableTripNumbers.map((number) => (
                <option key={number} value={number}>{number}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={6}>
          <Button color="primary" type="submit">Generate Report</Button>
        </Col>
      </Row>
    </Form>

    {reportData && (
        <div className="mt-4">
          <h3 className="text-white">Income and Expense Report for Trip {reportData.tripNumber}</h3>

          {/* Income Table */}
          {reportData.incomeData.length > 0 && (
            <div>
              <h4 className="text-white">Income Data</h4>
              <Table className="table table-bordered table-striped table-responsive">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.incomeData.map((incomeRecord, index) => (
                    <tr key={`income-${index}`}>
                      <td>{new Date(incomeRecord.date).toLocaleDateString()}</td>
                      <td>{incomeRecord.amount}</td>
                      <td>{incomeRecord.description}</td>
                      <td>{incomeRecord.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

{reportData.expenditureData.length > 0 && (
  <div>
    <h4 className="text-white">Expenditure Data</h4>
    <Table className="table table-bordered table-striped table-responsive">
      <thead>
        <tr>
            <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Recorded By</th>
          <th>Status</th>
          
        </tr>
      </thead>
      <tbody>
        {reportData.expenditureData.map((expenditureRecord, index) => (
          <tr key={`expenditure-${index}`}>
            <td>{new Date(expenditureRecord.date).toLocaleDateString()}</td>
            <td>{expenditureRecord.category}</td>
            <td>{expenditureRecord.description}</td>
            <td>{expenditureRecord.amount}</td>
            <td>{expenditureRecord.recordedBy}</td>
            <td>{expenditureRecord.status}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)}
          {/* Summary Report */}
          <div className="mt-4">
            <h4 className="text-white">Summary Report</h4>
            <Table className="table table-bordered table-striped table-responsive">
              <thead>
                <tr>
                  <th>Total Income</th>
                  <th>Total Expenditure</th>
                  <th>Total Driver's Commission</th>
                  <th>Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reportData.totalIncome}</td>
                  <td>{reportData.totalExpenditure}</td>
                  <td>{reportData.totalDriverCommission}</td>
                  <td>{reportData.profitLoss}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default EachOTIncomeExpenseReport;
