import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const OTReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [otData, setOTData] = useState([]);
  const [totalAmountCharged, setTotalAmountCharged] = useState(0);
  const [error, setError] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/viewByDateRange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Server responded with ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setOTData(data.otherTrips);
      
      // Calculate total amount charged
      const totalAmount = data.otherTrips.reduce((acc, ot) => acc + ot.totalAmountCharged, 0);
      setTotalAmountCharged(totalAmount);
      
      setError('');
    } catch (error) {
      console.error(error);
      setError(`Failed to fetch data. ${error.message}`);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <h2 className="mt-3 mb-4" style={{ color: 'white' }}>OTHER TRIPS REPORT WITHIN A PERIOD</h2>
        <Col>
          <Form>
            <FormGroup row>
              <Label for="startDate" sm={2} style={{ color: 'white' }}>
                Start Date
              </Label>
              <Col sm={4}>
                <Input type="date" name="startDate" id="startDate" value={startDate} onChange={handleStartDateChange} />
              </Col>
              <Label for="endDate" sm={2} style={{ color: 'white' }}>
                End Date
              </Label>
              <Col sm={4}>
                <Input type="date" name="endDate" id="endDate" value={endDate} onChange={handleEndDateChange} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary" onClick={handleFetchData}>
                  Fetch Data
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {error && (
        <Row className="mt-3">
          <Col>
            <p className="text-danger">{error}</p>
          </Col>
        </Row>
      )}

      {otData.length > 0 && (
        <Row className="mt-3">
          <Col>
            <div className="table-responsive">
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>Trip Number</th>
                    <th>Date</th>
                    <th>Vehicle Registration Number</th>
                    <th>Driver Name</th>
                    <th>Total Amount Charged</th>
                    <th>Destination Locations</th>
                    <th>Description</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {otData.map((ot) => (
                    <tr key={ot._id}>
                      <td>{ot.tripNumber}</td>
                      <td>{new Date(ot.date).toLocaleDateString()}</td>
                      <td>{ot.vehicleRegistrationNumber}</td>
                      <td>{ot.driverName}</td>
                      <td>{ot.totalAmountCharged}</td>
                      <td>{ot.destinationLocations}</td>
                      <td>{ot.description}</td>
                      <td>{ot.recordedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}

      {totalAmountCharged > 0 && (
        <Row className="mt-3">
          <Col>
            <h5 style={{ color: 'white' }}>Total Amount Charged: {totalAmountCharged}</h5>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default OTReport;
