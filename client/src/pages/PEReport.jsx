import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PEReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [PEData, setPEData] = useState([]);
  const [error, setError] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalWeightCarried, setTotalWeightCarried] = useState(0);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFetchData = async () => {
    try {
      const response = await fetch('/api/viewPEsByDateRange', {
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
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setPEData(data);

      // Calculate total quantity and total weight carried
      const totalQty = data.reduce((total, pe) => total + pe.quantity, 0);
      const totalWeight = data.reduce((total, pe) => total + pe.totalweightCarried, 0);

      setTotalQuantity(totalQty);
      setTotalWeightCarried(totalWeight);

      setError('');
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data. Please try again.');
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <h2 className="mt-3 mb-4" style={{ color: 'white' }}>
          PE REPORT WITHIN A PERIOD
        </h2>
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

      {PEData.length > 0 && (
        <Row className="mt-3">
          <h2 className="mt-3 mb-4" style={{ color: 'white' }}>
            Table Report
          </h2>
          <Col>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>PE Number</th>
                  <th>Truck Registration Number</th>
                  <th>Driver Name</th>
                  <th>Quantity</th>
                  <th>Total Weight Carried</th>
                  <th>Destination Locations</th>
                  <th>Recorded By</th>
                </tr>
              </thead>
              <tbody>
                {PEData.map((pe) => (
                  <tr key={pe.id}>
                    <td>{new Date(pe.date).toLocaleDateString()}</td>
                    <td>{pe.peNumber}</td>
                    <td>{pe.truckRegistrationNumber}</td>
                    <td>{pe.driverName}</td>
                    <td>{pe.quantity}</td>
                    <td>{pe.totalweightCarried}</td>
                    <td>{pe.destinationLocations}</td>
                    <td>{pe.recordedBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}

      {PEData.length > 0 && (
        <Row className="mt-3">
          <Col>
            <h2 className="mt-3 mb-4" style={{ color: 'white' }}>
              Summary Report
            </h2>
            <Table striped bordered responsive>
              <tbody>
                <tr>
                  <td >Total Quantity:</td>
                  <td >{totalQuantity}</td>
                </tr>
                <tr>
                  <td >Total Weight Carried (tonnes):</td>
                  <td >{totalWeightCarried / 1000}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PEReport;
