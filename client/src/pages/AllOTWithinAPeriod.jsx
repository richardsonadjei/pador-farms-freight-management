import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllOtherTripsWithinPeriodReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [otherTrips, setOtherTrips] = useState([]);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch other trips based on date range when component mounts
    fetchOtherTrips();
  }, []);

  const fetchOtherTrips = async () => {
    try {
      const response = await fetch('/api/viewByDateRange', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startDate, endDate }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtherTrips(data.otherTrips);
        setReportData(data); // You can adjust the structure of the data as needed
      } else {
        console.error('Error fetching other trips:', data.message);
      }
    } catch (error) {
      console.error('Error fetching other trips:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOtherTrips();
  };

  // Function to calculate the total amount charged for all trips
  const calculateTotalAmountCharged = (trips) => {
    return trips.reduce((total, trip) => total + trip.totalAmountCharged, 0);
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="startDate" className="text-white">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="endDate" className="text-white">End Date</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <Button color="primary" type="submit">Generate Report</Button>
          </Col>
        </Row>
      </Form>

      {reportData && (
        <div className="mt-4">
          <h3 className="text-white">Other Trips Report</h3>

          {/* Table for Other Trips Data */}
          <Table className="table table-bordered table-striped table-responsive">
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
                {/* ... (other headers) */}
              </tr>
            </thead>
            <tbody>
              {otherTrips.map((trip) => (
                <tr key={trip._id}>
                  <td>{trip.tripNumber}</td>
                  <td>{new Date(trip.date).toLocaleDateString()}</td>
                  <td>{trip.vehicleRegistrationNumber}</td>
                  <td>{trip.driverName}</td>
                  <td>{trip.totalAmountCharged}</td>
                  <td>{trip.destinationLocations}</td>
                  <td>{trip.description}</td>
                  <td>{trip.recordedBy}</td>
                  {/* ... (other cells) */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Summary Report */}
          <div className="mt-4">
            <h4 className="text-white">Summary Report</h4>
            <Table className="table table-bordered table-striped table-responsive">
              <thead>
                <tr>
                  <th>Total Trips</th>
                  <th>Total Amount Charged</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{otherTrips.length}</td>
                  <td>{calculateTotalAmountCharged(otherTrips)}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllOtherTripsWithinPeriodReport;