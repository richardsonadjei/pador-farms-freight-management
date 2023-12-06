
import React, { useState } from 'react';
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

const AllProfitReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/all-profit-loss?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderTableRows = (data, keys) => {
    return data.map((item, index) => (
      <tr key={index}>
        {keys.map((key) => {
          const value = item[key];
          const formattedValue = key.includes('Date') && value && !isNaN(new Date(value))
            ? new Date(value).toLocaleDateString() : value;

  
          return (
            <td key={key}>
              {formattedValue}
            </td>
          );
        })}
      </tr>
    ));
  };
  
  

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="startDate" style={{ color: 'white' }}>
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
          <Col>
            <FormGroup>
              <Label for="endDate" style={{ color: 'white' }}>
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
        <Button color="primary" onClick={handleSubmit}>
          Generate Report
        </Button>
      </Form>

      {reportData && (
        <div>
          {/* Income Hauling Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>PE Income</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>PE Number</th>
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
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.incomeHaulingData, [
                'date',
                'category',
                'peNumber',
                'truckRegistrationNumber',
                'incomeAmountPerBag',
                'totalIncomeAmount',
                'taxAmountPerBag',
                'totalTaxAmount',
                'netTotalAmountPerbag',
                'netTotalAmount',
                'description',
                'recordedBy',
              ])}
            </tbody>
          </Table>

          {/* Other Trip Income Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>Other Trip Income</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Trip Number</th>
                <th>Amount</th>
                <th>Recorded By</th>
                <th>Description</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.otherTripIncomeData, [
                'date',
                'category',
                'tripNumber',
                'amount',
                'recordedBy',
                'description',
              ])}
            </tbody>
          </Table>

          {/* Expenditure Tables */}
          {/* PE Expenditure Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>PE Expenditure</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>PE Number</th>
                <th>Truck Registration Number</th>
                <th>Expenditure Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.peExpenditureData, [
                'date',
                'category',
                'peNumber',
                'truckRegistrationNumber',
                'expenditureAmount',
                'description',
                'status',
              ])}
            </tbody>
          </Table>

          {/* General Expenditure Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>General Expenditure</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.generalExpenditureData, [
                'date',
                'category',
                'amount',
                'description',
                'status',
              ])}
            </tbody>
          </Table>

          {/* Other Trip Expenditure Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>Other Trip Expenditure</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Vehicle Registration Number</th>
                <th>Trip Number</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.otherTripExpenditureData, [
                'date',
                'category',
                'vehicleRegistrationNumber',
                'tripNumber',
                'amount',
                'description',
                'status',
              ])}
            </tbody>
          </Table>

          {/* Payment Expenditure Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>Payment Expenditure</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Date</th>
                <th>Partner Name</th>
                <th>Reason for Payment</th>
                <th>Payment Type</th>
                <th>Amount</th>
                <th>Momo Number Transferred To</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {renderTableRows(reportData.paymentData, [
                'date',
                'partnerName',
                'reasonForPayment',
                'paymentType',
                'amount',
                'momoNumberTransferedTo',
                'recordedBy',
              ])}
            </tbody>
          </Table>

          {/* Summary Report Table */}
          <h2 style={{ color: 'white', marginTop: '20px' }}>Summary Report</h2>
          <Table striped responsive>
            {/* Table Headers */}
            <thead>
              <tr>
                <th>Total Income</th>
                <th>Total Expenditure</th>
                <th>Profit/Loss</th>
                <th>Total Driver Commission</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              <tr>
                <td>{reportData.totalIncome}</td>
                <td>{reportData.totalExpenditure}</td>
                <td>{reportData.profitLoss}</td>
                <td>{reportData.totalDriverCommission}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default AllProfitReport;