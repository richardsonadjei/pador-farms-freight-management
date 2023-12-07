import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const ExpectedPECommissionReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/expected-pe-drivers-commission?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Calculate the sum of all commissions
    if (reportData) {
      const totalCommission = reportData.driverCommissions.reduce(
        (total, commission) => total + commission.commission,
        0
      );
      setReportData((prevData) => ({ ...prevData, totalCommission }));
    }
  }, [reportData]);

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate" style={{ color: 'white' }}>Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    placeholder="Select Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate" style={{ color: 'white' }}>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    placeholder="Select End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>

      {reportData && (
        <div>
          <h2 style={{ color: 'white', marginTop: '20px' }}>Expected PE Commission Report</h2>

          <Table responsive bordered style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>PE Numbers</th>
                <th>Total Quantity</th>
                <th>Total Commission</th>
                <th>Driver Name</th>
               
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.peNumbers.join(', ')}</td>
                <td>{reportData.totalQuantityOfBags}</td>
                <td>
                  {/* Create a Link to navigate to /monthly-pe-commission with totalCommission as a query parameter */}
                  <Link to={`/monthly-pe-commission?totalCommission=${reportData.totalCommission}`}>
                    {reportData.totalCommission}
                  </Link>
                </td>
                <td>{reportData.driverCommissions[0].driverName}</td>
               
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ExpectedPECommissionReport;
