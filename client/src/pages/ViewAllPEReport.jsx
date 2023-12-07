import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const ViewAllPEReport = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const [peData, setPEData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch PE data based on the date range
      const response = await fetch(`/api/all-pe?startDate=${formData.startDate}&endDate=${formData.endDate}`);
      const data = await response.json();

      setPEData(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching PE data');
    }
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>Truck Registration</th>
          <th>Driver Name</th>
          <th>Quantity</th>
          <th>Total Weight Carried(Kg)</th>
          <th>Destination Locations</th>
          <th>Recorded By</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return (
      <tbody>
        {peData.map((pe) => (
          <tr key={pe._id}>
            <td>{new Date(pe.date).toLocaleDateString()}</td>
            <td>{pe.truckRegistrationNumber}</td>
            <td>{pe.driverName}</td>
            <td>{pe.quantity}</td>
            <td>{pe.totalweightCarried}</td>
            <td>{pe.destinationLocations}</td>
            <td>{pe.recordedBy}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  
const renderSummaryReport = () => {
    // Calculate summary data
    const totalQuantity = peData.reduce((acc, pe) => acc + pe.quantity, 0);
    const totalWeightCarried = peData.reduce((acc, pe) => acc + pe.totalweightCarried, 0);
    const totalWeightInTonnes = (totalWeightCarried / 1000).toFixed(2); // Convert total weight to tonnes
  
    return (
      <div>
        <h3 className="text-white">Summary Report</h3>
        <Table bordered responsive>
          <tbody>
            <tr>
              <td>Total Quantity</td>
              <td>{totalQuantity}</td>
            </tr>
            <tr>
              <td>Total Weight Carried(Kg)</td>
              <td>{totalWeightCarried}</td>
            </tr>
            <tr>
              <td>Total Weight in Tonnes</td>
              <td>{totalWeightInTonnes}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };
  return (
    <Container>
      <h2 className="text-white">View All PE Report</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" name="startDate" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" name="endDate" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>

      {peData.length > 0 && (
        <div>
          <h3 className="mt-4 text-white">Detailed Report</h3>
          <Table bordered striped responsive className="mt-2">
            {renderTableHeader()}
            {renderTableRows()}
          </Table>

          {renderSummaryReport()}
        </div>
      )}
    </Container>
  );
};

export default ViewAllPEReport;
