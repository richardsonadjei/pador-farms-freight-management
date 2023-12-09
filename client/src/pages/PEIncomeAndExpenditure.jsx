import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Form, FormGroup, Label, Input, Container, Table, Col, Row } from 'reactstrap';

const PEIncomeAndExpenditure = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [peNumberOptions, setPENumberOptions] = useState([]);
  const [selectedPENumber, setSelectedPENumber] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch PE numbers and populate the dropdown options
    const fetchPENumbers = async () => {
      try {
        const response = await fetch('/api/all-pe'); // Use the consistent endpoint
        const data = await response.json();

        const options = data.map((pe) => ({
          value: pe.peNumber,
          label: pe.peNumber,
        }));

        setPENumberOptions(options);
      } catch (error) {
        console.error('Error fetching PE numbers:', error);
      }
    };

    fetchPENumbers();
  }, []); // Empty dependency array to ensure it only runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPENumber) {
      // Handle case where no PE number is selected
      return;
    }

    // Construct the URL with query parameters
    const url = `/api/pe-income-expenditure?peNumber=${selectedPENumber.value}&startDate=${startDate}&endDate=${endDate}`;

    // Fetch the report data
    try {
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
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-white">PE Income and Expenditure Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12} md={6}>
            <FormGroup>
              <Label for="peNumber" className="text-white">
                PE Number
              </Label>
              <Select
                id="peNumber"
                name="peNumber"
                options={peNumberOptions}
                value={selectedPENumber}
                onChange={(selectedOption) => setSelectedPENumber(selectedOption)}
                placeholder="Select PE Number"
              />
            </FormGroup>
          </Col>
          <Col sm={12} md={6}>
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
        </Row>
        <Row>
          <Col sm={12} md={6}>
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
        <Button color="primary" type="submit" style={{ color: 'white', marginTop: '15px' }}>
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
                  <td>{income.category}</td>
                  <td>{income.netTotalAmount}</td>
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
                  <td>{expenditure.category}</td>
                  <td>{expenditure.expenditureAmount}</td>
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
                <th>Overall Expenditure(+Driver Commission)</th>
                <th>Driver's Commission</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ color: 'blue', fontSize: '1.5em' }}>{reportData.totalIncome}</td>
                <td style={{ color: 'red', fontSize: '1.5em' }}>{reportData.totalExpenditure}</td>
                <td style={{ color: 'red', fontSize: '1.5em' }}>{reportData.totalDriverCommission}</td>
                <td style={{ color: reportData.profitLoss >= 0 ? 'green' : 'red', fontSize: '1.5em' }}>
                  {reportData.profitLoss}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default PEIncomeAndExpenditure;
