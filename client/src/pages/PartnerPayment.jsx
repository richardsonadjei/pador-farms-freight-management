import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PartnerPaymentReport = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [payments, setPayments] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch('/api/auth/all-users');
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data.users); // Use data.users, assuming that's the array of users
        } else {
          console.error('Error fetching users');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchAllUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!name || !startDate || !endDate) {
      window.alert('Please fill in all fields');
      return;
    }
  
    // Fetch data from the server
    try {
      const response = await fetch(`/api/partner-payments?name=${name}&startDate=${startDate}&endDate=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data);
        setShowReport(true);
      } else {
        const errorData = await response.json(); // Attempt to parse error response
        console.error('Failed to fetch payment report:', errorData.message);
        window.alert('Failed to fetch payment report. Please try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
      window.alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <Container>
      <h1 style={{ color: 'white' }}>Partner Payment Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name" style={{ color: 'white' }}>Partner Name</Label>
              <Input
                type="select"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              >
                <option value="" disabled>Select Partner</option>
                {allUsers && Array.isArray(allUsers) && allUsers.map((user) => (
                  <option key={user._id} value={user.userName}>{user.userName}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="startDate" style={{ color: 'white' }}>Start Date</Label>
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
          <Col md={6}>
            <FormGroup>
              <Label for="endDate" style={{ color: 'white' }}>End Date</Label>
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
        <FormGroup>
          <Button color="primary" type="submit">Generate Report</Button>
        </FormGroup>
      </Form>

      {showReport && (
        <div>
          <h2 style={{ color: 'white', marginTop: '20px' }}>Payment Report for {name}</h2>
          <Table striped responsive style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.name}</td>
                  <td>{payment.amount}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default PartnerPaymentReport;
