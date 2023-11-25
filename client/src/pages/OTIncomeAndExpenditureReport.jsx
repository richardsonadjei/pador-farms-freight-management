import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Table, Col, Row } from 'reactstrap';

const OTIncomeAndExpenditureReport = () => {
  const [tripNumbers, setTripNumbers] = useState([]);
  const [tripNumber, setTripNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  useEffect(() => {
    // Fetch all available tripNumbers
    fetch('/api/other-trips')
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
      
  
        // Check if data is an array before calling map
        if (Array.isArray(data.otherTrips)) {
          setTripNumbers(data.otherTrips.map((trip) => trip.tripNumber));
        } else {
          console.error('Unexpected data format:', data);
        }
      })
      .catch((error) => console.error('Error fetching trip numbers:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the URL with query parameters
    const url = `/api/ot-income-expenditure?tripNumber=${tripNumber}&startDate=${startDate}&endDate=${endDate}`;

    // Fetch the report data
    const response = await fetch(url);
    const data = await response.json();

    // Convert UTC dates to local dates
    const convertDatesToLocal = (records) =>
      records.map((record) => {
        record.date = new Date(record.date).toLocaleDateString();
        return record;
      });

    data.incomeData = convertDatesToLocal(data.incomeData);
    data.expenditureData = convertDatesToLocal(data.expenditureData);

    setReportData(data);
  };

  return (
    <Container>
      <h1 className="text-white">Other Trip Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} md={6}>
            <FormGroup>
              <Label for="tripNumber" className="text-white">
                Trip Number
              </Label>
              <Input
                type="select"
                name="tripNumber"
                id="tripNumber"
                value={tripNumber}
                onChange={(e) => setTripNumber(e.target.value)}
              >
                <option value="">Select Trip Number</option>
                {tripNumbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col sm={12} md={3}>
            <FormGroup>
              <Label for="startDate" className="text-white">
                Start Date
              </Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={3}>
            <FormGroup>
              <Label for="endDate" className="text-white">
                End Date
              </Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit" style={{ color: 'white' }}>
          Generate Report
        </Button>
      </Form>
      {reportData && (
        <div>
          <h2 className="text-white">Income Data</h2>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Trip Number</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Recorded By</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reportData.incomeData.map((income) => (
                <tr key={income._id}>
                  <td>{income.date}</td>
                  <td>{income.tripNumber}</td>
                  <td>{income.category}</td>
                  <td>{income.amount}</td>
                  <td>{income.recordedBy}</td>
                  <td>{income.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2 className="text-white">Expenditure Data</h2>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Trip Number</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Recorded By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reportData.expenditureData.map((expenditure) => (
                <tr key={expenditure._id}>
                  <td>{expenditure.date}</td>
                  <td>{expenditure.tripNumber}</td>
                  <td>{expenditure.category}</td>
                  <td>{expenditure.amount}</td>
                  <td>{expenditure.description}</td>
                  <td>{expenditure.recordedBy}</td>
                  <td>{expenditure.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2 className="text-white">Summary Report</h2>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Total Income</th>
                <th>Total Expenditure</th>
                <th>Profit/Loss</th>
                <th>Driver's Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.totalIncome}</td>
                <td>{reportData.totalExpenditure}</td>
                <td>{reportData.profitLoss}</td>
                <td>{reportData.driversCommission}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default OTIncomeAndExpenditureReport;
