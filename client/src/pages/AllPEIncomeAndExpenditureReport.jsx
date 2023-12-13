import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Table, Col, Row } from 'reactstrap';

const AllPEIncomeAndExpenditureReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construct the URL with query parameters
    const url = `/api/all-pe-income-expenditure?startDate=${startDate}&endDate=${endDate}`;
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
      <h1 className="text-white">PE Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
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
                <th>PE Number</th>
                <th>Category</th>
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
              {reportData.incomeData.map((income) => (
                <tr key={income._id}>
                  <td>{income.date}</td>
                  <td>{income.peNumber}</td>
                  <td>{income.category}</td>
                  <td>{income.truckRegistrationNumber}</td>
                  <td>{income.incomeAmountPerBag}</td>
                  <td>{parseFloat(income.totalIncomeAmount).toFixed(2)}</td>
                  <td>{income.taxAmountPerBag}</td>
                  <td>{parseFloat(income.totalTaxAmount).toFixed(2)}</td>
                  <td>{income.netTotalAmountPerbag}</td>
                  <td>{parseFloat(income.netTotalAmount).toFixed(2)}</td>
                  <td>{income.description}</td>
                  <td>{income.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h2 className="text-white">Expenditure Data</h2>
    <Table responsive bordered striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>PE Number</th>
          <th>Category</th>
          <th>Truck Registration Number</th>
          <th>Expenditure Amount</th>
          <th>Description</th>
          <th>Recorded By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Render regular expenditure data */}
        {reportData.expenditureData.map((expenditure) => (
          <tr key={expenditure._id}>
            <td>{expenditure.date}</td>
            <td>{expenditure.peNumber}</td>
            <td>{expenditure.category}</td>
            <td>{expenditure.truckRegistrationNumber}</td>
            <td>{expenditure.expenditureAmount}</td>
            <td>{expenditure.description}</td>
            <td>{expenditure.recordedBy}</td>
            <td>{expenditure.status}</td>
          </tr>
        ))}
        {/* Check if driverCommissionData exists before mapping */}
        {reportData.driverCommissionData && reportData.driverCommissionData.map((commission) => (
          <tr key={commission._id}>
            <td>{commission.date}</td>
            <td>{commission.peNumber}</td>
            <td>{commission.category}</td>
            <td></td> {/* Adjust based on your data structure */}
            <td>{commission.totalCommissionAmount}</td>
            <td>{commission.description}</td>
            <td>{commission.recordedBy}</td>
            <td>{commission.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
          <h2 className="text-white">Summary Report</h2>
          <Table responsive bordered striped>
            <thead>
              <tr>
                <th>Total Income</th>
                <th>Total Expenditure + Drivers's Commission</th>
                <th>Driver's Commission</th>
                <th>Profit/Loss</th>
                
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>{parseFloat(reportData.totalIncome).toFixed(2)}</td>
              <td>{parseFloat(reportData.totalExpenditure).toFixed(2)}</td>
              <td>{parseFloat(reportData.totalDriverCommission).toFixed(2)}</td>
                <td>{parseFloat(reportData.profitLoss).toFixed(2)}</td>
              
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default AllPEIncomeAndExpenditureReport;
