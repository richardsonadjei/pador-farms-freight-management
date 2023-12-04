// CreatePartnerShares.jsx
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const CreatePartnerShares = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [partnerName, setPartnerName] = useState('');
  const [reasonForPayment, setReasonForPayment] = useState('');
  const [paymentType, setPaymentType] = useState('cash');
  const [amount, setAmount] = useState('');
  const [momoNumberTransferedTo, setMomoNumberTransferedTo] = useState('');
  const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.userName : '');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all users on component mount
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/shares-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerName,
          reasonForPayment,
          paymentType,
          amount: parseFloat(amount),
          momoNumberTransferedTo,
          recordedBy,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setSuccessMessage('Payment successfully submitted!');
        setErrorMessage('');
        // Redirect after a short delay
        setTimeout(() => {
          window.location.replace('/partner-shares');
        }, 2000);
      } else {
        const data = await response.json();
        setErrorMessage(`Error: ${data.message}`);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(`Error: ${error.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <Container>
      <h2 className="text-white mt-4 mb-4">Record Partner Shares</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="partnerName">Partner Name</Label>
              <Input type="select" id="partnerName" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required>
                <option value="" disabled>Select Partner</option>
                {allUsers.map((user) => (
                  <option key={user._id} value={user.userName}>{user.userName}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="reasonForPayment">Reason For Payment</Label>
              <Input type="text" id="reasonForPayment" value={reasonForPayment} onChange={(e) => setReasonForPayment(e.target.value)} required />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="paymentType">Payment Type</Label>
              <Input type="select" id="paymentType" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} required>
                <option value="cash">Cash</option>
                <option value="momo">Mobile Money</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="amount">Amount</Label>
              <Input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </FormGroup>
          </Col>
        </Row>

        {paymentType === 'momo' && (
          <FormGroup>
            <Label className="text-white" for="momoNumberTransferedTo">Mobile Money Number</Label>
            <Input type="text" id="momoNumberTransferedTo" value={momoNumberTransferedTo} onChange={(e) => setMomoNumberTransferedTo(e.target.value)} required />
          </FormGroup>
        )}

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white" for="recordedBy">Recorded By</Label>
              <Input type="text" id="recordedBy" value={recordedBy} onChange={(e) => setRecordedBy(e.target.value)} required readOnly />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit" color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreatePartnerShares;
