// SharesPaymentReportWithinAPeriod.jsx
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const SharesPaymentReportWithinAPeriod = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Your fetch logic to get payments within the date range
    try {
      const response = await fetch(`/api/all-payments?startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data);

        // Calculate summary
        const summaryData = {};
        data.forEach((payment) => {
          if (summaryData[payment.partnerName]) {
            summaryData[payment.partnerName] += payment.amount;
          } else {
            summaryData[payment.partnerName] = payment.amount;
          }
        });
        setSummary(summaryData);

        setIsSubmitted(true);
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <Container>
      <h2 className="text-white mt-4 mb-4">Shares Payment Report Within a Period</h2>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="startDate">Start Date</Label>
              <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="endDate">End Date</Label>
              <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="primary">Generate Report</Button>
      </Form>

      {isSubmitted && (
        <div>
          <h2 className="text-white mt-4 mb-4">Shares Payment Report</h2>
          <Table responsive className="table-shadow">
            <thead>
              <tr>
                <th>Partner Name</th>
                <th>Reason For Payment</th>
                <th>Payment Type</th>
                <th>Amount</th>
                <th>Recorded By</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.partnerName}</td>
                  <td>{payment.reasonForPayment}</td>
                  <td>{payment.paymentType}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.recordedBy}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Report */}
          <h3 className="text-white mt-4 mb-4">Summary Report</h3>
          <Table responsive className="table-shadow">
            <thead>
              <tr>
                <th>Partner Name</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary).map(([partnerName, totalAmount]) => (
                <tr key={partnerName}>
                  <td>{partnerName}</td>
                  <td>{totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default SharesPaymentReportWithinAPeriod;
