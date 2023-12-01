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

const PendingPaymentDriverCommission = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pendingPaymentCommissions, setPendingPaymentCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPendingPaymentCommissions = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/pending-payment-commissions?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();

      setPendingPaymentCommissions(data);
    } catch (error) {
      console.error('Error fetching pending payment commissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPendingPaymentCommissions();
  };

  // Function to get unique categories from the data
  const getUniqueCategories = () => {
    const categories = new Set(pendingPaymentCommissions.map((commission) => commission.category));
    return Array.from(categories);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
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
            <Button color="primary" type="submit" disabled={isLoading}>
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {isLoading && <p>Loading...</p>}

      {pendingPaymentCommissions.length > 0 && (
        <div>
          <Row className="mt-4">
            <Col md={12}>
              <h2 style={{ color: 'white', marginBottom: '20px' }}>Pending Payment Driver Commission Report</h2>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Driver Name</th>
                    <th>Category</th>
                    <th>PE/Trip Number</th>
                    <th>Amount</th>
                    <th>Status</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {pendingPaymentCommissions.map((commission) => (
                    <tr key={commission._id}>
                      <td>{new Date(commission.date).toLocaleDateString()}</td>
                      <td>{commission.driverName}</td>
                      <td>{commission.category}</td>
                      <td>{commission.peNumber || commission.tripNumber}</td>
                      <td>{commission.totalCommissionAmount}</td>
                      <td>{commission.status}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          {/* Summary Report */}
          <Row className="mt-4">
            <Col md={12}>
              <h2 style={{ color: 'white', marginBottom: '20px' }}>Summary Report</h2>
              {getUniqueCategories().map((category) => (
                <Table key={category} responsive striped bordered>
                  <thead>
                    <tr>
                      <th>Total Amount ({category})</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {pendingPaymentCommissions
                          .filter((commission) => commission.category === category)
                          .reduce((total, commission) => total + commission.totalCommissionAmount, 0)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ))}

              {/* Total Sum of All Categories */}
              <Table responsive striped bordered className="mt-4">
                <thead>
                  <tr>
                    <th>Total Amount (All Categories)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {pendingPaymentCommissions.reduce((total, commission) => total + commission.totalCommissionAmount, 0)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default PendingPaymentDriverCommission;
